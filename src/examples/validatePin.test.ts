import { describe, expect, it } from "vitest";
import { validatePIN } from "./validatePin.js";

describe(`validatePIN`, () => {
  it(`returns true for a valid 4 digit pin`, () =>
    expect(validatePIN(`1234`)).toEqual(true));
  it(`returns true for a valid 6 digit pin`, () =>
    expect(validatePIN(`123456`)).toEqual(true));
  it(`returns false for an invalid 4 digit pin`, () =>
    expect(validatePIN(`123A`)).toEqual(false));
  it(`returns false for an invalid 6 digit pin`, () =>
    expect(validatePIN(`12E456`)).toEqual(false));
  it(`returns false for an valid 6 digit pin with spaces`, () =>
    expect(validatePIN(`12 34`)).toEqual(false));
  it(`returns false for an valid 6 digit pin with spaces`, () =>
    expect(validatePIN(`12 34 56`)).toEqual(false));
  it(`returns false for an empty string`, () =>
    expect(validatePIN(``)).toEqual(false));
  it(`returns false for an invalid 3 digit pin`, () =>
    expect(validatePIN(`123`)).toEqual(false));
  it(`returns false for an invalid 5 digit pin`, () =>
    expect(validatePIN(`12345`)).toEqual(false));
  it(`returns false for an invalid 7 digit pin`, () =>
    expect(validatePIN(`1234567`)).toEqual(false));
});
