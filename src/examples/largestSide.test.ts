import { describe, expect, it } from "vitest";
import { isPanagram } from "./isPanagram.js";
import { largestSide } from "./largestSide.js";

describe(`isPanagram`, () => {
  it(`returns Left`, () =>
    expect(largestSide([3, 6, 2, 9, -1, 10])).toEqual(`Left`));
  it(`returns Right`, () =>
    expect(largestSide([1, 4, 100, 5])).toEqual(`Right`));
  it(`returns Equal`, () =>
    expect(largestSide([1, 10, 5, 1, 0, 6])).toEqual(`Equal`));
  it(`returns NoData`, () => expect(largestSide([])).toEqual(`NoData`));
  it(`returns InsufficentData`, () =>
    expect(largestSide([1])).toEqual(`InsufficentData`));
});
