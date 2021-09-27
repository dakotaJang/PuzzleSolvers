import { writeFile } from "fs";
import { readFile } from "fs/promises";
import { inspect } from "util";
import { solve } from "./tubes/Solve";

const run = async (puzzleType: string, dataFile: string) => {
  if (puzzleType !== 'tube') {
    console.error(`Solver for "${puzzleType}" isn't here.`)
    return;
  }
  if (!dataFile) {
    console.error(`dataFile undefined\nUse "npm start {dataFile path}"\n`);
    process.exit(1);
  }
  //readFile
  const data = await readFile(dataFile);
  //compile
  const state = data.toString()
    .split('\n')
    .map(line => line.split('').map(n => parseInt(n, 16)))
  const height = state[0].length;
  //solve
  const result = solve(state);
  //output
  const output = inspect(result, {depth:null, maxArrayLength: null});
  console.log(output, result[0].steps?.length)
  writeFile(`../_output/${puzzleType}.txt`, output, () => null)
}

const main = () => {
  const [,,puzzleType, dataFile] = process.argv;
  run(puzzleType, dataFile).catch(console.error)
}

main();