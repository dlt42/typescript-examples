// Finds the largest ascending range between two numbers in the provided array
export const getMaxRange = (numbers: number[]) => {
  if (numbers.length < 2) {
    throw Error(`Array must contain more 2 or more numbers`);
  }
  var maxRange = numbers.reduce(
    (prevMaxRange: number | null, leftNumber: number, leftIndex) => {
      var currentMaxRange = prevMaxRange;
      numbers.slice(leftIndex + 1, numbers.length).forEach((rightNumber) => {
        var currentRange =
          rightNumber > leftNumber ? rightNumber - leftNumber : null;
        if ((currentRange || 0) > (currentMaxRange || 0))
          currentMaxRange = currentRange;
      });
      return currentMaxRange;
    },
    null
  );
  return maxRange;
};
