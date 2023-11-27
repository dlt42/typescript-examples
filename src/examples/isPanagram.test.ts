import { describe, expect, it } from "vitest";
import { isPanagram } from "./isPanagram.js";

describe(`isPanagram`, () => {
  it(`returns true for a valid string`, () =>
    expect(isPanagram(`The quick brown fox jumps over the lazy dog`)).toEqual(
      true
    ));
  it(`returns false for a string with random characters`, () =>
    expect(isPanagram(`The.quick!brown_fox-jumps,over@the£lazy$dog`)).toEqual(
      false
    ));
  it(`returns false for an invalid string`, () =>
    expect(isPanagram(`The brown fox jumps over the dog`)).toEqual(false));
  it(`returns false for an empty string`, () =>
    expect(isPanagram(``)).toEqual(false));
});
