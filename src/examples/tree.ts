import { Parser } from "csv-parse";
import path from "path";
import * as fs from "fs";
import {
  ColumnOrder,
  Data,
  DataRow,
  FullTree,
  TreeRoot,
  TreeElement,
  TreeLeaves,
  TreeBranch,
} from "./tree.types.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readCsvToArray = async (fileName: string): Promise<Data> => {
  const parser = new Parser({});
  const fileReadStream = fs.createReadStream(path.join(__dirname, fileName));
  const res: string[][] = [];
  fileReadStream.pipe(parser);
  for await (const row of parser) {
    res.push(row as unknown as string[]);
  }
  return res;
};

const convertArrayToTree = ({
  data,
  columnOrder,
}: {
  data: Data;
  columnOrder: ColumnOrder;
}): FullTree => {
  // Validate the parameters
  if (!data || data.length === 0) {
    throw Error(`No data to process`);
  }
  if (columnOrder.length < 2) {
    throw Error(`Not enough columns to construct`);
  }
  if (data[0].length !== columnOrder.length) {
    throw Error(`Column order does correspond to data`);
  }

  // Get the CSV column headings
  const columnHeadings = data[0];

  // Remove the CSV column headings from the data
  const rows = data.slice(1, data.length - 1);

  // Create the empty tree
  const tree: TreeRoot = {};

  // Iterate over the rows
  rows.forEach((currentRow: DataRow) => {
    // Set the starting tree element for each row as the tree root
    let currentElement: TreeElement = tree;

    // Iterate over the column order array
    columnOrder.forEach((columnIndex, columnOrderIndex) => {
      /*
       * Get the value from the current row that is in the
       * position specified by the current column index in the
       * column order array
       */
      const columnValue = currentRow[columnIndex];

      /*
       * Update the current tree element according to the
       * column index being processed
       */
      const lastIndex = columnOrder.length - 1;

      /*
       * The current column index is not the last or penultimate
       * column index in the column order array so the current
       * element is a TreeBranch with an attribute for another TreeBranch
       */
      if (columnOrderIndex < lastIndex - 1)
        currentElement = (currentElement as TreeBranch)[columnValue] ??= {};
      /*
       * The current column index is the penultimate
       * column index in the column order array so the current
       * element is a TreeBranch with an attribute for TreeLeaves
       */ else if (columnOrderIndex === lastIndex - 1)
        currentElement = (currentElement as TreeBranch)[columnValue] ??= [];
      /*
       * The current column index is the last column
       * index in the column order array so the current
       * element must be TreeLeaves
       */ else (currentElement as TreeLeaves).push(columnValue);
    });
  });

  // Return the tree and column headings
  const fullTree: FullTree = {
    tree,
    columnHeadings,
  };
  return fullTree;
};

const readAndConvert = async (
  fileName: string,
  columnOrder: ColumnOrder
): Promise<FullTree> => {
  const data: Data = await readCsvToArray(fileName);
  const fullTree: FullTree = convertArrayToTree({ data, columnOrder });
  return fullTree;
};

export { readCsvToArray, convertArrayToTree, readAndConvert };
