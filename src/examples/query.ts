import { Query, RunQuery } from './query.types.js';

const runQuery: RunQuery = <T extends object>(
  items: T[],
  query: Query<T>
) => {
  const queryConditionsKeys = Object.keys(query.conditions) as (keyof T)[];
  if (queryConditionsKeys.length === 0) {
    return items;
  }
  const { conditions, queryType } = query;
  return items.filter(item => {
    const keys = Object.keys(item) as (keyof T)[];
    const isOrQuery = queryType === `OR`;
    const isAndQuery = queryType === `AND`;

    for (const property of keys) {
      const propertyQuery = conditions[property];
      const matches = propertyQuery && propertyQuery(item[property]);
      if (matches && isOrQuery) {
        return true;
      }
      if (!matches && isAndQuery) {
        return false;
      }
    }
    return isAndQuery;
  });
};

export { runQuery };