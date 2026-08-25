import fs from "node:fs";
import path from "node:path";

const root = path.resolve("client/src");
const extensions = new Set([".tsx", ".ts", ".json"]);
const replacements = [
  ["Holistic Quotient", "Human Quotient"],
  ["Haptic Quotient", "Human Quotient"],
  ["H = Holistic", "H = Human"],
  ["H = Haptic", "H = Human"],
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const changed = [];
for (const file of walk(root)) {
  if (!extensions.has(path.extname(file))) continue;
  const before = fs.readFileSync(file, "utf8");
  let after = before;
  for (const [from, to] of replacements) after = after.split(from).join(to);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed.push(path.relative(process.cwd(), file));
  }
}

console.log(JSON.stringify({ changed_files: changed.length, files: changed }, null, 2));
