/**
 * (2) Search Tree
 * 
 * Part 2:
 * Extend the code so that each node could have a maximum of three children instead of two.
 */

import { Node, Comparator, MatchHandler } from "./shared.types.js";

export class STNode<K, V> extends Node<K, V> {
  public left: STNode<K, V> | null;
  public right: STNode<K, V> | null;
  public middle: STNode<K, V> | null;

  constructor(key: K, value: V) {
    super(key, value);
    this.left = null;
    this.right = null;
    this.middle = null;
  }
}

export class TernarySearchTree<K, V> {
  private root: STNode<K, V> | null = null;
  private comparator: Comparator<K>;
  private matchHandler: MatchHandler<V>;

  constructor(comparator: Comparator<K>, matchHandler?: MatchHandler<V>) {
    this.comparator = comparator;
    this.matchHandler = matchHandler
      ? matchHandler
      : (nodeValue, value) => nodeValue;
  }

  public add(key: K, value: V) {
    let resultNode = new STNode(key, value);
    let processed = false;

    if (!this.root) {
      this.root = resultNode;
      processed = true;
    }

    let currentTreeNode = this.root;
    while (!processed) {
      if (currentTreeNode.key === key) {
        currentTreeNode.value = this.matchHandler(currentTreeNode.value, value);
        resultNode = currentTreeNode;
        processed = true;
        return currentTreeNode;
      }
      const comparison = this.comparator(currentTreeNode.key, resultNode.key);
      if (comparison > 0) {
        if (currentTreeNode.right) {
          currentTreeNode = currentTreeNode.right;
        } else {
          currentTreeNode.right = resultNode;
          processed = true;
        }
      } else if (comparison < 0) {
        if (currentTreeNode.left) {
          currentTreeNode = currentTreeNode.left;
        } else {
          currentTreeNode.left = resultNode;
          processed = true;
        }
      } else if (comparison === 0) {
        if (currentTreeNode.middle) {
          currentTreeNode = currentTreeNode.middle;
        } else {
          currentTreeNode.middle = resultNode;
          processed = true;
        }
      }
    }

    return resultNode;
  }

  public get(key: K) {
    let currentTreeNode = this.root;
    while (currentTreeNode) {
      if (currentTreeNode.key === key) {
        return currentTreeNode.value;
      }
      const comparison = this.comparator(currentTreeNode.key, key);
      if (comparison > 0) {
        currentTreeNode = currentTreeNode.right ? currentTreeNode.right : null;
      } else if (comparison < 0) {
        currentTreeNode = currentTreeNode.left ? currentTreeNode.left : null;
      } else if (comparison === 0) {
        currentTreeNode = currentTreeNode.middle
          ? currentTreeNode.middle
          : null;
      }
    }
    return null;
  }
}
