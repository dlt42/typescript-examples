import { runQuery } from './query.js';
import { DataType, Query, QueryConditions } from './query.types.js';

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

const data: DataType[] = [
  { name: `Ted`, age: 12 },
  { name: `Angie`, age: 31 },
  { name: `Andrew`, age: 29 },
];

const orMatches = runQuery<DataType>(data, orQuery);
const andMatches = runQuery<DataType>(data, andQuery);

console.log(`OR MATCHES: ${JSON.stringify(orMatches)}`);
console.log(`AND MATCHES: ${JSON.stringify(andMatches)}`);
