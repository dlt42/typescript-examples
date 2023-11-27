import { readAndConvert } from "./tree.js";

console.log(
  JSON.stringify(
    await readAndConvert(`./tree.data.csv`, [4, 0, 3, 2, 1]),
    null,
    2
  )
);
