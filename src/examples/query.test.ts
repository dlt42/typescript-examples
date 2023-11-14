import { describe, expect, test } from 'vitest';
import { DataType, Query, QueryConditions } from './query.types.js';
import { runQuery } from './query.js';

describe(`runQuery`, () => {
  const conditions: QueryConditions<DataType> = {
    name: (name) => name.indexOf(`An`) > -1,
    age: (age) => age > 30,
  };

  const orQuery: Query<DataType> = {
    queryType: `OR`,
    conditions,
  };

  const andQuery: Query<DataType> = {
    queryType: `AND`,
    conditions,
  };

  const emptyQuery: Query<DataType> = {
    queryType: `AND`,
    conditions: {},
  };

  const data: DataType[] = [
    { name: `Ted`, age: 12 },
    { name: `Angie`, age: 31 },
    { name: `Andrew`, age: 29 },
  ];

  test(`returns correct matches for an \`AND\` query`, async () => {
    const andMatches = runQuery<DataType>(data, andQuery);
    expect(andMatches).toEqual([
      {
        age: 31,
        name: `Angie`,
      },
    ]);
  });
  test(`returns correct matches for an \`OR\` query`, async () => {
    const orMatches = runQuery<DataType>(data, orQuery);
    expect(orMatches).toEqual([
      {
        age: 31,
        name: `Angie`,
      },
      {
        age: 29,
        name: `Andrew`,
      },
    ]);
  });
  test(`returns all items for a query withh no conditions`, async () => {
    const matches = runQuery<DataType>(data, emptyQuery);
    expect(matches).toEqual([
      {
        age: 12,
        name: `Ted`,
      },
      {
        age: 31,
        name: `Angie`,
      },
      {
        age: 29,
        name: `Andrew`,
      },
    ]);
  });
  test(`doesn\`t fail for an empty data array (OR query)`, async () => {
    const matches = runQuery<DataType>([], orQuery);
    expect(matches).toEqual([]);
  });
  test(`doesn\`t fail for an empty data array (AND query)`, async () => {
    const matches = runQuery<DataType>([], andQuery);
    expect(matches).toEqual([]);
  });
});
