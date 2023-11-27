import { describe, expect, it } from "vitest";
import { validBraces } from "./validBraces.js";

describe(`validBraces`, () => {
  it(`returns true for an empty string`, () =>
    expect(validBraces(``)).toEqual(true));
  it(`returns true for single set of correct curly braces`, () =>
    expect(validBraces(`{}`)).toEqual(true));
  it(`returns true for single set of correct square braces`, () =>
    expect(validBraces(`[]`)).toEqual(true));
  it(`returns true for single set of correct braces`, () =>
    expect(validBraces(`()`)).toEqual(true));
  it(`returns false for single set of incorrect curly braces`, () =>
    expect(validBraces(`}{`)).toEqual(false));
  it(`returns false for single set of incorrect square braces`, () =>
    expect(validBraces(`][`)).toEqual(false));
  it(`returns false for single set of incorrect braces`, () =>
    expect(validBraces(`)(`)).toEqual(false));
  it(`returns true for multiple sets of correct braces`, () =>
    expect(validBraces(`{}[]()`)).toEqual(true));
  it(`returns false for multiple sets of incorrect braces`, () =>
    expect(validBraces(`}{][)(`)).toEqual(false));
  it(`returns false for multiple incorrectly placed braces`, () =>
    expect(validBraces(`{][)(}`)).toEqual(false));
  it(`returns true for nested braces`, () =>
    expect(validBraces(`{[]()}`)).toEqual(true));
  it(`returns false for incorrectly placed nested braces`, () =>
    expect(validBraces(`{[)(]}`)).toEqual(false));
  it(`returns true for a long series of nested braces`, () =>
    expect(validBraces(`{[([])([])][{[]}{[]}]}`)).toEqual(true));
  it(`returns true for a long series of incorrectly placed nested braces`, () =>
    expect(validBraces(`{([])][{[]}[([]){[]}]}`)).toEqual(false));
});
