type QueryFunction<T, K extends keyof T> = (value: T[K]) => boolean;

type QueryConditions<T> = {
  [K in keyof T]?: QueryFunction<T, K>;
};

type Query<T> = {
  queryType: `AND` | `OR`;
  conditions: QueryConditions<T>;
};

type DataType = {
  name: string;
  age: number;
};

type RunQuery = <T extends object>(items: T[], query: Query<T>) => T[];

export { Query, DataType, QueryConditions, QueryFunction, RunQuery };
