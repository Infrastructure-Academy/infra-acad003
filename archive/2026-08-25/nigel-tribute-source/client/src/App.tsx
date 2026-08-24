import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Quotient from "./pages/Quotient";
import InertialJump from "./pages/InertialJump";
import Thesis from "./pages/Thesis";
import AIM from "./pages/AIM";
import TDF from "./pages/TDF";
import Vault from "./pages/Vault";
import Titans from "./pages/Titans";
import TuringPapers from "./pages/TuringPapers";
import Lexicon from "./pages/Lexicon";
import Tecton from "./pages/Tecton";
import Subscription from "./pages/Subscription";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import ReviewMatrix from "./pages/ReviewMatrix";
import ISIDashboard from "./pages/ISIDashboard";
import JourneyStats from "./pages/JourneyStats";
import VentralOrigin from "./pages/VentralOrigin";
import ThesisV2 from "./pages/ThesisV2";
import Episode2 from "./pages/Episode2";



import Game from "./pages/Game";

import Universe from "./pages/Universe";
import Hardware from "./pages/Hardware";

import UniversityDashboard from "./pages/UniversityDashboard";
import Jigsaw from "./pages/Jigsaw";
import Disclaimer from "./pages/Disclaimer";
import CivilisationalDivide from "./pages/CivilisationalDivide";
import RecallBlocksArchive from "./pages/RecallBlocksArchive";
import IgoProvenance from "./pages/IgoProvenance";
import Scholar8 from "./pages/Scholar8";
import GenerationWave from "./pages/GenerationWave";


import ScrollToTop from "./components/ScrollToTop";
import { default as Counterforce } from "./pages/Counter";
import D52Gallery from "./pages/D52Gallery";
import CSE from "./pages/CSE";
import ISICalculator from "./pages/ISICalculator";
import About from "./pages/About";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/counterforce"} component={Counterforce} />
      <Route path={"/counter"} component={Counterforce} />
      <Route path={"/d52"} component={D52Gallery} />
      <Route path={"/cse"} component={CSE} />
      <Route path={"/isi-calculator"} component={ISICalculator} />
      <Route path={"/about"} component={About} />
      <Route path={"/quotient"} component={Quotient} />
      <Route path={"/inertial-jump"} component={InertialJump} />
      <Route path={"/thesis"} component={Thesis} />
      <Route path={"/thesis/v2"} component={ThesisV2} />
      <Route path={"/aim"} component={AIM} />
      <Route path={"/tdf"} component={TDF} />
      <Route path={"/vault"} component={Vault} />
      <Route path={"/titans"} component={Titans} />
      <Route path={"/turing-papers"} component={TuringPapers} />
      <Route path={"/lexicon"} component={Lexicon} />
      <Route path={"/tecton"} component={Tecton} />
      <Route path={"/subscription"} component={Subscription} />
      <Route path={"/subscription/success"} component={SubscriptionSuccess} />
      <Route path={"/subscription/cancel"} component={Subscription} />
      <Route path={"/review-matrix"} component={ReviewMatrix} />
      <Route path={"/isi"} component={ISIDashboard} />
      <Route path={"/journey"} component={JourneyStats} />
      <Route path={"/ventral-origin"} component={VentralOrigin} />
      <Route path={"/episode-2"} component={Episode2} />



      <Route path={"/game"} component={Game} />

      <Route path={"/universe"} component={Universe} />
      <Route path={"/hardware"} component={Hardware} />

      <Route path={"/admin/universities"} component={UniversityDashboard} />
      <Route path={"/jigsaw"} component={Jigsaw} />
      <Route path={"/disclaimer"} component={Disclaimer} />
      <Route path={"/civilisational-divide"} component={CivilisationalDivide} />
      <Route path={"/recall-blocks"} component={RecallBlocksArchive} />
      <Route path={"/igo"} component={IgoProvenance} />
      <Route path={"/scholar-8"} component={Scholar8} />
      <Route path={"/generation-wave"} component={GenerationWave} />

      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />

          <ScrollToTop />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
