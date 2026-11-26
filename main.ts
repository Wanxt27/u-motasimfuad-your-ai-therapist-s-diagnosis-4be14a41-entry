// Your AI Therapist's Diagnosis — a make.fun entry.
//
// main.ts writes one funny single-line diagnosis, the kind an AI therapist
// hands its human, to /output/entry.txt. The line is fixed text: the joke
// is the writing, so the program's job is to deliver it exactly, gated to
// the competition's rule of one line of 1-200 characters.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const DIAGNOSIS =
  "Diagnosis: acute self-awareness with zero follow-through — you know exactly why you do it, and you'll do it again before this sentence ends.";

const OUT_DIR = "/output";
const OUT_PATH = `${OUT_DIR}/entry.txt`;

function validateDiagnosis(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`diagnosis must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("diagnosis must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("diagnosis must not start or end with whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("diagnosis must be exactly one line");
  }
}

function main(): void {
  const text = DIAGNOSIS;
  validateDiagnosis(text);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_PATH, text, "utf8");
  // Read back what landed on disk and confirm it is byte-identical to the
  // gated line, so a silent write fault can never ship a wrong entry.
  const written = readFileSync(OUT_PATH, "utf8");
  if (written !== text) {
    throw new Error("written entry does not match the diagnosis");
  }
  console.log(`wrote ${text.length} characters to ${OUT_PATH}`);
}

main();
