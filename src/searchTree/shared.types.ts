export class Node<K, V> {
  public key: K;
  public value: V;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export type Comparator<K> = (treeNodeKey: K, nodeKey: K) => number;

export type MatchHandler<V> = (nodeValue: V, value: V) => V;

export type ArrayMatchHandler<T> = MatchHandler<T | T[]>;
