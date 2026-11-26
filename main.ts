// Deadpan Forecasts for Cities That Do Not Exist — entry program.
//
// Writes a single deadpan weather line (1-160 chars) to /output/entry.txt:
// a broadcast-true forecast for the invented city of Brackenmoor — a real
// forecaster's cadence (high of 19, light rain) carrying one absurd but
// believable image: a single cloud that has been following the mayor
// since Tuesday. Concrete numbers, one vivid twist, deadpan tone.
//
// Run: node main.ts   (Node 22.18+ runs TypeScript as-is)
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "In Brackenmoor, expect a high of 19 degrees, light rain, and one cloud that has been following the mayor since Tuesday.";

// The competition's gate: /output/entry.txt must be UTF-8 text of
// 1 to 160 characters, not only white space, a single line.
if (ENTRY.length < 1 || ENTRY.length > 160) {
  throw new Error(
    `entry is ${ENTRY.length} characters, outside the 1-160 gate`,
  );
}
if (ENTRY.trim() !== ENTRY) {
  throw new Error("entry must not start or end with whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Verify what was actually written: the gate reads the file, not the
// constant, so the run fails loudly instead of shipping a wrong file.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the intended line");
}
if (written.length < 1 || written.length > 160) {
  throw new Error(
    `written entry is ${written.length} characters, outside the 1-160 gate`,
  );
}
