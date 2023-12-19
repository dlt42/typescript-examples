export var image1 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

export var image2 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

export var image3 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

export var image4 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 1],
  [1, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

// Coordinates of the rectangle -- either top-left and bottom-right; or top-left, width, and height.

type Indexes = {
  firstRow: number;
  lastRow: number;
  first: number;
  last: number;
};

/*
 * Simple solution to find one rectangle 
 *
 * export const getCoordinates = (image: number[][]): Indexes | null => {
 *  let found: Indexes | null = null;
 *
 *  image.forEach((currentRow: number[], index) => {
 *    const first = currentRow.indexOf(0);
 *    const last = currentRow.lastIndexOf(0);
 *    if (first <= -1 || last <= -1) return;
 *    if (!found) {
 *      found = { first, last, firstRow: index, lastRow: index };
 *    } else {
 *      found.lastRow = index;
 *    }
 *  });
 *  return found;
 *};
 */

const processRow = (
  row: number[],
  found: Indexes[],
  rowIndex: number
): void => {
  let indexes: Indexes | null = null;
  row.forEach((currentValue: number, index: number) => {
    if (currentValue === 0 && !indexes) {
      indexes = {
        first: index,
        last: index,
        firstRow: rowIndex,
        lastRow: rowIndex,
      };
    } else if (currentValue === 0 && indexes) {
      indexes.last = index;
    } else if (currentValue === 1 || index === row.length - 1) {
      if (indexes !== null) {
        const i: Indexes = indexes;
        const match = found.find(
          (current) => current.first === i.first && current.last === i.last
        );
        if (match) {
          match.lastRow = rowIndex;
        } else {
          found.push(indexes);
        }
        indexes = null;
      }
    }
  });
};

/**
 * Currently does not work for image3
 */
export const getCoordinatesV2 = (image: number[][]): Indexes[] | null => {
  let found: Indexes[] = [];
  image.forEach((currentRow: number[], index) =>
    processRow(currentRow, found, index)
  );
  return found;
};
