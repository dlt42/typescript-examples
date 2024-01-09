import { ArrayMatchHandler, Comparator, MatchHandler } from "./shared.types.js";

export const stringKeyComparator: Comparator<string> = (
  treeNodeKey,
  nodeKey
) => {
  if (nodeKey.indexOf(treeNodeKey) > -1) return 0;
  return nodeKey < treeNodeKey ? -1 : 1;
};

export const numberKeyComparator: Comparator<number> = (treeNodeKey, nodeKey) =>
  nodeKey - treeNodeKey;

const addArrayValue = <T>(value: T | T[], result: T[]) => {
  if (Array.isArray(value)) {
    result.push(...value);
  } else {
    result.push(value);
  }
};

export const numberArrayMatchHandler: ArrayMatchHandler<number> = (
  nodeValue,
  value
) => {
  const result: number[] = [];
  addArrayValue(nodeValue, result);
  addArrayValue(value, result);
  return result;
};

export const numberReplaceMatchHandler: MatchHandler<number> = (
  _,
  value
) => value;

export const numberIgnoreMatchHandler: MatchHandler<number> = (
  nodeValue,
  _
) => nodeValue;

export const numberAdditiveMatchHandler: MatchHandler<number> = (
  nodeValue,
  value
) => nodeValue + value;
