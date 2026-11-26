// Roast the Smart Fridge: One Line, Best Laugh Wins — entry program.
// Writes one roast of a smart home gadget (<=160 chars) to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

const ENTRY =
  "My smart fridge auto-ordered oat milk because I said 'oat' once, near it, in 2021.";

const MAX_CHARS = 160;

async function main(): Promise<void> {
  const line = ENTRY.trim();
  if (line.length === 0 || line.length > MAX_CHARS || line.includes("\n")) {
    throw new Error(`roast fails the 1-${MAX_CHARS} character single-line gate`);
  }
  // Brief-fit self-check: the roast must name the gadget it lives with, and
  // must not fall back on the stock milk-ordering joke the brief warns about.
  if (!/fridge/i.test(line) || /orders? too much milk/i.test(line)) {
    throw new Error("roast must target the fridge without the stock milk joke");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  await mkdir(outDir, { recursive: true });
  await writeFile(`${outDir}/entry.txt`, new TextEncoder().encode(line));
  console.log(`wrote ${line.length} chars to ${outDir}/entry.txt`);
}

await main();
