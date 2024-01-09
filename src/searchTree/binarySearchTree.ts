/**
 * (2) Search Tree
 * 
 * Part 1:
 * Write code that implements a binary search tree in an object-oriented fashion with the following features and properties:
 *    ● In the tree one can address nodes using a key. No assumption should be made about the type of the key.
 *    ● Each node also stores a value. Again, no assumption should be made about the type of the value.
 *    ● Implement a method to store a value under a given key in the tree, and another one to retrieve the value stored under a given key. These should complete in time proportional to the depth of the tree. There is no need to implement deletion of nodes or tree balancing.
 *    ● Provide a means through which other programmers who use your code can specify the mechanism for choosing which of the descendant nodes to follow when traversing the tree to insert or retrieve a value.
 *    ● Use any suitable language, e.g. Python, Java, JavaScript, PHP, Perl, etc.
 */

import { Node, Comparator, MatchHandler } from "./shared.types.js";

export class STNode<K, V> extends Node<K, V> {
  public left: STNode<K, V> | null;
  public right: STNode<K, V> | null;

  constructor(key: K, value: V) {
    super(key, value);
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree<K, V> {
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
      } else {
        if (currentTreeNode.left) {
          currentTreeNode = currentTreeNode.left;
        } else {
          currentTreeNode.left = resultNode;
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
      } else {
        currentTreeNode = currentTreeNode.left ? currentTreeNode.left : null;
      }
    }
    return null;
  }
}
