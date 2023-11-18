import { describe, expect, test } from "vitest";
import { getMaxRange } from "./maxRange.js";

describe(`maxRange`, () => {
  test(`returns the largest range for two numbers`, async () => {
    const max = getMaxRange([1, 2]);
    expect(max).toEqual(1);
  });
  test(`returns the largest range for consecutive ascending numbers`, async () => {
    const max = getMaxRange([1, 2, 3, 4, 5]);
    expect(max).toEqual(4);
  });
  test(`returns the largest range for consecutive descending numbers`, async () => {
    const max = getMaxRange([5, 4, 3, 2, 1]);
    expect(max).toEqual(null);
  });
  test(`returns the largest range for a series of numbers alternating between low and high`, async () => {
    const max = getMaxRange([1, 5, 2, 7, 3, 9]);
    expect(max).toEqual(8);
  });
  test(`returns the largest range for a series of numbers alternating between low and high (reversed high numbers)`, async () => {
    const max = getMaxRange([1, 9, 2, 7, 3, 5]);
    expect(max).toEqual(8);
  });
  test(`returns the largest range for a series of numbers with peaks at either end`, async () => {
    const max = getMaxRange([1, 9, 2, 3, 4, 10]);
    expect(max).toEqual(9);
  });
  test(`returns the largest range for a series of numbers with peaks at either end (swapped)`, async () => {
    const max = getMaxRange([4, 9, 3, 2, 1, 10]);
    expect(max).toEqual(9);
  });
  test(`returns null if there is only one number in the array`, async () => {
    expect(() => getMaxRange([10])).toThrowError(
      `Array must contain more 2 or more numbers`
    );
  });
  test(`returns null if there are no numbers in the array`, async () => {
    expect(() => getMaxRange([])).toThrowError(
      `Array must contain more 2 or more numbers`
    );
  });
});
