// Sieve of Eratosthenes

type RangeElement = {
  rangeIndex: number, 
  isPrime: boolean 
}
const createRange = (start: number, end: number): RangeElement[] => {
  // Determine the number of items in the range
  const length = end - (start - 1);

  /*
   * Create the range array and set isPrime of each element to true
   * Prime until proven otherwise
   */
  return Array.from({ length }, (_, index) => {
    return { rangeIndex: start + index, isPrime: true };
  });
};

export const primes = (limit: number) => {
  // Create the range
  const start: number = 2;
  const range: RangeElement[] = createRange(start, limit);

  // Iterate over each element in the range
  range.forEach((rangeElement) => {
    // Get the multiple and isPrime value for the current range element
    const { rangeIndex: multiple, isPrime } = rangeElement;

    /*
     * If isPrime of the current range element is still true then it really is a prime number.
     * All multiples cannot be prime so set isPrime for each of those range elements to false
     */
    if (isPrime) {
      // Deterrmine the starting multiple
      let currentMultiple = multiple * 2;

      // Prevent evaluation for any multiple greater than the limit
      while (currentMultiple <= limit) {
        /*
         * Set the state to true
         * Adjust the array index by subtracting the range start
         */
        range[currentMultiple - start].isPrime = false;

        // Calculate the next muliple
        currentMultiple += multiple;
      }
    }
  });

  // Return only the prime numbers
  return range.reduce((prev, { isPrime, rangeIndex }) => {
    return isPrime ? [...prev, rangeIndex] : prev;
  }, [] as number[]);
};
