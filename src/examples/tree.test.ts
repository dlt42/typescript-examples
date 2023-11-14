import { describe, expect, it } from "vitest";
import { readAndConvert, readCsvToArray } from "./tree.js";

describe(`readCsvToArray`, () => {
  it(`loads the csv data`, async () => {
    const csvData = await readCsvToArray(`./tree.data.csv`);
    expect(csvData.length).to.be.greaterThan(0);
    expect(csvData[1]).toEqual([
      `Eadel`,
      `Broadcasting`,
      `Indonesia`,
      `Asia/Jakarta`,
      `Duwakkandung`,
    ]);
  });

  it(`loads the csv data`, async () => {
    const fullTree = await readAndConvert(`./tree.data.csv`, [4, 0, 3, 2, 1]);
    expect(fullTree).toEqual(
      expect.objectContaining({
        tree: expect.objectContaining({
          Duwakkandung: expect.objectContaining({
            Eadel: expect.objectContaining({
              "Asia/Jakarta": expect.objectContaining({
                Indonesia: [`Broadcasting`],
              }),
            }),
          }),
        }),
      })
    );
  });
});
