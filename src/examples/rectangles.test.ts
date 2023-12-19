import { describe, expect, test } from "vitest";
import {
  getCoordinatesV2,
  image1,
  image2,
  image3,
  image4,
} from "./rectangles.js";

describe(`getCoordinatesV2`, () => {
  test(`returns correct matches for image1`, async () => {
    expect(getCoordinatesV2(image1)).toEqual([]);
  });
  test(`returns correct matches for image2`, async () => {
    expect(getCoordinatesV2(image2)).toEqual([
      { first: 3, last: 5, firstRow: 2, lastRow: 3 },
    ]);
  });
  test(`returns correct matches for image3`, async () => {
    expect(getCoordinatesV2(image3)).toEqual([
      { first: 3, last: 5, firstRow: 2, lastRow: 3 },
      { first: 3, last: 5, firstRow: 4, lastRow: 5 },
    ]);
  });
  test(`returns correct matches for image4`, async () => {
    expect(getCoordinatesV2(image4)).toEqual([
      { first: 3, last: 5, firstRow: 2, lastRow: 3 },
      { first: 1, last: 1, firstRow: 3, lastRow: 5 },
      { first: 3, last: 4, firstRow: 5, lastRow: 6 },
    ]);
  });
});

/*
 * describe(`getCoordinates`, () => {
 *   test(`returns correct matches for image2`, async () => {
 *     expect(getCoordinates(image2)).toEqual(
 *       { first: 3, last: 5, firstRow: 2, lastRow: 3 },
 *     );
 *   });
 * });
 */
