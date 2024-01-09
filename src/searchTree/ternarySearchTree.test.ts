import { describe, expect, test } from "vitest";
import { STNode, TernarySearchTree as SearchTree } from "./ternarySearchTree.js";
import {
  numberAdditiveMatchHandler,
  numberArrayMatchHandler,
  numberIgnoreMatchHandler,
  numberKeyComparator,
  numberReplaceMatchHandler,
  stringKeyComparator,
} from "./shared.js";

const createTestNodes = (
  tree: SearchTree<string, number[] | number> | SearchTree<string, number>,
  addDuplicate?: boolean
) => {
  const root = tree.add(`b`, 2);
  tree.add(`a`, 1);
  tree.add(`c`, 3);
  tree.add(`bb`, 22);
  if (addDuplicate) tree.add(`c`, 4);
  return root;
};

const expectedNodes: STNode<string, number | number[]> = {
  key: `b`,
  value: 2,
  left: { key: `a`, value: 1, left: null, middle: null, right: null },
  middle: { key: `bb`, value: 22, left: null, middle: null, right: null },
  right: { key: `c`, value: 3, left: null, middle: null, right: null },
};

describe(`TernarySearchTree`, () => {
  test(`stores and retrieves key/value pairs`, async () => {
    const tree: SearchTree<number, string> = new SearchTree(
      numberKeyComparator
    );
    tree.add(1, `one`);
    tree.add(2, `two`);
    tree.add(3, `three`);
    tree.add(4, `four`);
    tree.add(5, `five`);
    tree.add(6, `six`);
    expect(tree.get(4)).toEqual(`four`);
  });

  test(`stores key/value pairs correctly`, async () => {
    const tree: SearchTree<string, number> = new SearchTree(
      stringKeyComparator
    );
    const root = createTestNodes(tree);
    expect(root).toEqual({ ...expectedNodes });
    expect(tree.get(`bb`)).toEqual(22);
  });

  test(`stores key/value pairs correctly with a match handler (additive)`, async () => {
    const tree: SearchTree<string, number> = new SearchTree(
      stringKeyComparator,
      numberAdditiveMatchHandler
    );
    const root = createTestNodes(tree, true);
    expect(root).toEqual({
      ...expectedNodes,
      right: { key: `c`, value: 7, left: null, middle: null, right: null },
    });
  });

  test(`stores key/value pairs correctly with a match handler (replace)`, async () => {
    const tree: SearchTree<string, number> = new SearchTree(
      stringKeyComparator,
      numberReplaceMatchHandler
    );
    const root = createTestNodes(tree, true);
    expect(root).toEqual({
      ...expectedNodes,
      right: { key: `c`, value: 4, left: null, middle: null, right: null },
    });
  });

  test(`stores key/value pairs correctly with a match handler (ignore)`, async () => {
    const tree: SearchTree<string, number> = new SearchTree(
      stringKeyComparator,
      numberIgnoreMatchHandler
    );
    const root = createTestNodes(tree, true);
    expect(root).toEqual({
      ...expectedNodes,
      right: { key: `c`, value: 3, left: null, middle: null, right: null },
    });
  });

  test(`stores key/value pairs correctly with a match handler (array)`, async () => {
    const tree: SearchTree<string, number[] | number> = new SearchTree(
      stringKeyComparator,
      numberArrayMatchHandler
    );
    const root = createTestNodes(tree, true);
    expect(root).toEqual({
      ...expectedNodes,
      right: { key: `c`, value: [3, 4], left: null, middle: null, right: null },
    });
  });
});
