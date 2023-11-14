export type DataRow = string[];
export type Data = DataRow[];
export type ColumnOrder = number[];

export type TreeLeaf = string;
export type EmptyNode = { [K in any]: never }
export type TreeLeaves = TreeLeaf[];
export type TreeBranch = { [K in `${string}`]: TreeElement };

export type TreeElement = TreeBranch | TreeLeaves | EmptyNode;
export type TreeRoot = TreeBranch | EmptyNode;

export type FullTree = {
    tree: TreeRoot,
    columnHeadings: DataRow
}
