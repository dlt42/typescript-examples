const EMPTY = -1;

const getSideValue = (
  binaryTree: number[],
  start: number,
  end: number
): number => {
  const part = binaryTree.slice(start, end);
  return part.length > 0
    ? part.reduce(
        (subTotal, current) => subTotal + (current === EMPTY ? 0 : current),
        0
      )
    : 0;
};

type LargestSideResult =
  | `Left`
  | `Right`
  | `Equal`
  | `NoData`
  | `InsufficentData`;

export const largestSide = (binaryTree: number[]): LargestSideResult => {
  if (binaryTree.length === 0) {
    return `NoData`;
  }
  if (binaryTree.length === 1) {
    return `InsufficentData`;
  }
  let step = 2;
  let start = binaryTree[0];
  let result = { left: start, right: start };
  while (step <= binaryTree.length) {
    const start = step - 1;
    const split = Math.round(step / 2);
    const levelMidPoint = start + split;
    result.left += getSideValue(binaryTree, start, levelMidPoint);
    result.right += getSideValue(binaryTree, levelMidPoint, start + step);
    step *= 2;
  }
  if (result.left === result.right) {
    return `Equal`;
  }
  return result.left > result.right ? `Left` : `Right`;
};
