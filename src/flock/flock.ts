type RawRowData = (` ` | `*`)[];

export type RawData = RawRowData[];

type Cell = {
  sheepPresent: boolean;
  groupNumber: number | null;
  processed: boolean;
};
type RowData = Cell[];
type FieldData = RowData[];

type FieldInput =
  | {
      type: `FieldData`;
      data: FieldData;
    }
  | {
      type: `RawData`;
      data: RawData;
    };

export class Field {
  private fieldData: FieldData;
  private groupCounter = 0;

  constructor(input: FieldInput) {
    if (input.type === `FieldData`) {
      this.fieldData = input.data;
    } else {
      this.fieldData = input.data.map((currentRow) =>
        currentRow.map((current) => ({
          groupNumber: null,
          processed: false,
          sheepPresent: current === `*`,
        }))
      );
    }
    this.findGroups();
  }

  public getGroupCount(): number {
    return this.groupCounter;
  }

  public getGroupData(groupNumber: number): RawData {
    return this.fieldData.map((currentRow) =>
      currentRow.map((current) =>
        current.groupNumber === groupNumber ? `*` : ` `
      )
    );
  }

  private isOutOfBounds(x: number, y: number): boolean {
    return (
      x < 0 ||
      y < 0 ||
      x > this.fieldData.length - 1 ||
      y > this.fieldData[0].length - 1
    );
  }

  private findGroupMembers(x: number, y: number, cell: Cell) {
    // Ignore processed Cells
    if (cell.processed) {
      return;
    }

    // Flag the Cell as processed
    cell.processed = true;

    // If the current Cell has a sheep present
    if (cell.sheepPresent) {
      // Set the groupNumber for the Cell
      cell.groupNumber = this.groupCounter;

      // Recursively process neighboring cells
      for (let neighborX = x - 1; neighborX <= x + 1; neighborX++) {
        for (let neighborY = y - 1; neighborY <= y + 1; neighborY++) {
          /*
           * Don't recursively process the coordinates if they are
           * out of bounds or are the coordinates of the passed Cell
           */
          const isCellCoordinates = neighborX === x && neighborY === y;
          if (this.isOutOfBounds(neighborX, neighborY) || isCellCoordinates) {
            continue;
          }

          // Get the neighbor cell
          const neighborCell = this.fieldData[neighborX][neighborY];

          // Recursively process the neighboring cell
          this.findGroupMembers(neighborX, neighborY, neighborCell);
        }
      }
    }
  }

  private findGroups() {
    // Iterate over the Cells in teh FieldData
    for (let x = 0; x < this.fieldData.length; x++) {
      for (let y = 0; y < this.fieldData[0].length; y++) {
        // Get the current Cell
        const currentCell = this.fieldData[x][y];

        // Ignore processed Cells
        if (currentCell.processed) {
          continue;
        }

        // If the current Cell has a sheep present then...
        if (currentCell.sheepPresent) {
          // Recursively process neighbors to determine the complete group of sheep
          this.groupCounter++;
          this.findGroupMembers(x, y, currentCell);
        } else {
          // Or just flag the cell as processed
          currentCell.processed = true;
        }
      }
    }
  }
}
