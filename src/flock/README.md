# Flock of Sheep

We have the coordinates of a number of sheep in a large field. Propose an algorithm that can determine how many groups they form. What are the advantages and disadvantages of the proposed algorithm? Can you describe any circumstances in which it can go wrong, and if so, how?

See:
  - flock.ts
  - flock.test.ts

## Assumptions

A group of sheep is defined as a set of sheep in neighboring coordinates  


## Proposed Algorithm

The field would be mapped to a two dimensional array in which each element is a Cell object.

The Cell object would have the following attributes:

sheepPresent: boolean
groupNumber: number
processed: boolean

The coordinates of each sheep would be used to update the sheepPresent attribute of the relevant Cell in the grid.

A global group counter would be initialized with the value 0

The algorithm would iterate over x and y coordinates, limited by the width and height of the array, so that each Cell in the array can be processed.

For each Cell the loop would perform the following steps:

1. If the current Cell has already been flagged as processed:
    - Continue the loop
2. If the current Cell does not have a sheep present:
    - Flag the Cell as processed and continue the loop
3. If the current Cell has a sheep present:
    - Increment the global group counter
    - Flag the Cell as processed
    - Assign the value of the global group counter to the groupNumber attribute of the Cell
    - Recursively process the 8 neighboring Cells as follows:
        - Ignore neighbor cells that have already been processed 
        - Flag the Cell as processed
        - If the Cell has a sheep present:
            - Assign the value of the global group counter to the groupNumber attribute of the Cell
            - Continue the recursion for that Cell

Once the loop has completed all cells would have been flagged as processed by the loop or the recursion within.

The value of the global group counter will be the number of groups of sheep in the field, and the two dimensional Cell array can be iterated to find the Cells for a particular group if needed. 

The algorithm could potentially handle irregular shaped fields if mapped to a bounding two dimensional array and the Cell object given an extra attribute called 'isField' which would determine if a cell should be processed by the algorithm.

## Issues / Failure Scenarios

The time it would take for the algorithm to process a field would increase with the size of the field and the granularity of the groups within the field. There may be a faster algorithm.