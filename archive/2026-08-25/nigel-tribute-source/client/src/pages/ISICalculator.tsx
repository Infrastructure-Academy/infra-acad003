import { useState, useEffect, useMemo } from "react";

import { trpc } from "@/lib/trpc";

interface WorkedExample {
  Notes: string;
  [key: string]: any; // Allow other properties
}
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Relay definitions with default parameters
const RELAYS = {
  fire: { name: "Fire", domain: "Energy Ignition", defaultA: 0.8, defaultP: 0.6, defaultBeta: 0.5 },
  tree: { name: "Tree", domain: "Material Cycle", defaultA: 0.6, defaultP: 0.8, defaultBeta: 0.5 },
  river: { name: "River", domain: "Hydraulic Continuity", defaultA: 0.6, defaultP: 0.95, defaultBeta: 0.5 },
  horse: { name: "Horse", domain: "Mobility Vector", defaultA: 0.95, defaultP: 0.6, defaultBeta: 0.5 },
  roads: { name: "Roads", domain: "Connectivity", defaultA: 0.6, defaultP: 0.8, defaultBeta: 0.3 },
  ships: { name: "Ships", domain: "Exchange", defaultA: 0.8, defaultP: 0.8, defaultBeta: 0.5 },
  loom: { name: "Loom", domain: "Information Weaving", defaultA: 0.7, defaultP: 0.7, defaultBeta: 0.5 },
  rail: { name: "Rail", domain: "Acceleration", defaultA: 0.8, defaultP: 0.95, defaultBeta: 0.3 },
  engine: { name: "Engine", domain: "Power", defaultA: 0.95, defaultP: 0.8, defaultBeta: 0.5 },
  aaa: { name: "AAA Triad", domain: "Automation, Aviation, Airwaves", defaultA: 0.8, defaultP: 0.8, defaultBeta: 0.5 },
  orbit: { name: "Orbit", domain: "Planetary Systems", defaultA: 0.4, defaultP: 0.95, defaultBeta: 0.5 },
  human: { name: "Human Nodes", domain: "Consciousness", defaultA: 0.9, defaultP: 0.9, defaultBeta: 0.2 },
};

type RelayKey = keyof typeof RELAYS;

// Canonical equation parameters
// R(t) = R₀ · e^(-t/S₀) + k · (A × P) / β · (1 - e^(-n/N))
// For ISI, we focus on the remembrance term and normalize it.
// ISI = (A × P) / β · (1 - e^(-n/N))
function calculateISI(A: number, P: number, beta: number, n: number, N: number = 5): number {
  if (beta === 0) return 0; // Avoid division by zero
  const remembranceTerm = (A * P) / beta;
  const revisitEffect = 1 - Math.exp(-n / N);
  return Math.min(remembranceTerm * revisitEffect, 1.0); // Cap at 1.0
}

// Get 4R intervention suggestions based on ISI score
function getSuggestions(isi: number, relay: string): string[] {
  const suggestions: string[] = [];

  if (isi < 0.3) {
    suggestions.push("🔴 Revelation: Increase amplitude (A) through multi-modal encoding");
    suggestions.push("🔴 Resilience: Boost persistence (P) with more frequent revisitation");
  } else if (isi < 0.6) {
    suggestions.push("🟡 Regeneration: Reduce resistance (β) through network redundancy");
    suggestions.push("🟡 Recursion: Add fractal revisitation patterns");
  } else if (isi < 0.85) {
    suggestions.push("🟢 Resilience: Maintain current revisitation schedule");
    suggestions.push("🟢 Recursion: Deepen recursive structures for saturation");
  } else {
    suggestions.push("✅ Remembrance: Infrastructure consolidation achieved");
    suggestions.push("✅ Recursion: Infinite recursion mode—saturation approaching unity");
  }

  return suggestions;
}

interface WorkedExample {
  "Relay(s)": string;
  "A (0.1-10)": number;
  "P (0.1-10)": number;
  "β (Aggregate Physical Drag)": number;
  "ISI Score": number;
  "Band": string;
  "Notes": string;
}

export default function ISICalculator() {
  const { data: workedExamples, isLoading: isLoadingExamples } = trpc.isi.getWorkedExamples.useQuery();
  const [selectedExample, setSelectedExample] = useState<WorkedExample | null>(null);

  const [selectedRelay, setSelectedRelay] = useState<RelayKey>("fire");
  const [A, setA] = useState(RELAYS[selectedRelay].defaultA);
  const [P, setP] = useState(RELAYS[selectedRelay].defaultP);
  const [beta, setBeta] = useState(RELAYS[selectedRelay].defaultBeta);
  const [n, setN] = useState(3);
  const [N, setSpacingScale] = useState(5);

  useEffect(() => {
    if (workedExamples && workedExamples.length > 0 && !selectedExample) {
      setSelectedExample(workedExamples[0]); // Set first example as default
    }
  }, [workedExamples, selectedExample]);

  useEffect(() => {
    if (selectedExample) {
      setA(selectedExample["A (0.1-10)"] / 10);
      setP(selectedExample["P (0.1-10)"] / 10);
      setBeta(selectedExample["β (Aggregate Physical Drag)"] / 10);
      setN(3); // Default revisits for example
      setSpacingScale(5); // Default spacing scale for example

      const relayNameFromExample = selectedExample["Relay(s)"].split(", ")[0].replace("R", "").split(" ")[1]?.toLowerCase();
      const relayKey = Object.keys(RELAYS).find(key => RELAYS[key as RelayKey].name.toLowerCase() === relayNameFromExample);
      if (relayKey) {
        setSelectedRelay(relayKey as RelayKey);
      } else {
        // Fallback if relay name doesn't match exactly
        setSelectedRelay("fire");
      }
    }
  }, [selectedExample]);

  // Update defaults when relay changes
  const handleRelayChange = (relay: RelayKey) => {
    setSelectedRelay(relay);
    setA(RELAYS[relay].defaultA);
    setP(RELAYS[relay].defaultP);
    setBeta(RELAYS[relay].defaultBeta);
  };

  // Calculate ISI and suggestions
  const isi = useMemo(() => calculateISI(A, P, beta, n, N), [A, P, beta, n, N]);
  const suggestions = useMemo(() => getSuggestions(isi, selectedRelay), [isi, selectedRelay]);

  // Generate curve data for visualization
  const curveData = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 10; i++) {
      const value = calculateISI(A, P, beta, i, N);
      points.push({ x: i, y: value });
    }
    return points;
  }, [A, P, beta, N]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">ISI Calculator: Infrastructure Survival Index</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Parameters & Worked Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Worked Examples Selector */}
            <div>
              <Label htmlFor="worked-example">Load Worked Example</Label>
              <Select
                onValueChange={(value) => {
                  const example = workedExamples?.find((ex: WorkedExample) => ex["Notes"] === value);
                  if (example) setSelectedExample(example);
                }}
                value={selectedExample ? selectedExample["Notes"] : ""}
                disabled={isLoadingExamples}
              >
                <SelectTrigger id="worked-example">
                  <SelectValue placeholder="Select a worked example" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingExamples && <SelectItem value="loading" disabled>Loading examples...</SelectItem>}
                  {workedExamples?.map((example: WorkedExample, index: number) => (
                    <SelectItem key={index} value={example["Notes"]}>
                      {example["Notes"]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Relay Selector */}
            <div>
              <Label htmlFor="relay-select">Select Relay</Label>
              <Select
                onValueChange={(value: RelayKey) => handleRelayChange(value)}
                value={selectedRelay}
              >
                <SelectTrigger id="relay-select">
                  <SelectValue placeholder="Select a relay" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(RELAYS).map(([key, relay]) => (
                    <SelectItem key={key} value={key}>
                      {relay.name} ({relay.domain})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sliders */}
            <div className="space-y-2">
              <Label>Amplitude (A): {A.toFixed(2)}</Label>
              <Slider
                min={0.1}
                max={1.0}
                step={0.01}
                value={[A]}
                onValueChange={(val) => setA(val[0])}
              />
            </div>
            <div className="space-y-2">
              <Label>Persistence (P): {P.toFixed(2)}</Label>
              <Slider
                min={0.1}
                max={1.0}
                step={0.01}
                value={[P]}
                onValueChange={(val) => setP(val[0])}
              />
            </div>
            <div className="space-y-2">
              <Label>Resistance (β): {beta.toFixed(2)}</Label>
              <Slider
                min={0.1}
                max={1.0}
                step={0.01}
                value={[beta]}
                onValueChange={(val) => setBeta(val[0])}
              />
            </div>
            <div className="space-y-2">
              <Label>Revisits (n): {n}</Label>
              <Slider
                min={0}
                max={10}
                step={1}
                value={[n]}
                onValueChange={(val) => setN(val[0])}
              />
            </div>
            <div className="space-y-2">
              <Label>Spacing Scale (N): {N}</Label>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[N]}
                onValueChange={(val) => setSpacingScale(val[0])}
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Infrastructure Survival Index (ISI)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-lg font-semibold">Current ISI Score: <span className={`font-bold ${isi < 0.3 ? 'text-red-500' : isi < 0.6 ? 'text-yellow-500' : isi < 0.85 ? 'text-green-500' : 'text-blue-500'}`}>{isi.toFixed(3)}</span></p>
              <p className="text-sm text-gray-500">Canonical Equation: ISI = (A × P) / β × (1 - e^(-n/N))</p>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-2">4R Intervention Suggestions:</h3>
              <ul className="list-disc list-inside space-y-1">
                {suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-2">Consolidation Curve:</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={curveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" label={{ value: "Revisits (n)", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "ISI Score", angle: -90, position: "insideLeft" }} domain={[0, 1]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} name="ISI Score" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {selectedExample && (
              <div>
                <h3 className="text-md font-semibold mb-2">Worked Example Details:</h3>
                <p><strong>Relay:</strong> {selectedExample["Relay(s)"]}</p>
                <p><strong>A:</strong> {selectedExample["A (0.1-10)"] / 10}</p>
                <p><strong>P:</strong> {selectedExample["P (0.1-10)"] / 10}</p>
                <p><strong>β:</strong> {selectedExample["β (Aggregate Physical Drag)"] / 10}</p>
                <p><strong>ISI Score:</strong> {selectedExample["ISI Score"]}</p>
                <p><strong>Band:</strong> {selectedExample["Band"]}</p>
                <p><strong>Notes:</strong> {selectedExample["Notes"]}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
