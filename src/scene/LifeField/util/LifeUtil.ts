/**
 * Provides methods to get new random cells generation or get next generation
 * @class LifeUtil
 */
export class LifeUtil {
  private constructor() {
  }

  private static DEFAULT_FIELD_WIDTH: number = 50;
  private static DEFAULT_FIELD_HEIGHT: number = 50;

  public static getNextGeneration(sourceGeneration: Array<Array<boolean>>): Array<Array<boolean>> {
    const nextGeneration: Array<Array<boolean>> = new Array<Array<boolean>>();
    sourceGeneration.forEach((row: Array<boolean>) => nextGeneration.push(new Array<boolean>(row.length)));
    for (let currentRowNumber: number = 0; currentRowNumber < sourceGeneration.length; currentRowNumber++) {
      const currentRow: Array<boolean> = sourceGeneration[currentRowNumber];
      for (let currentColumnNumber: number = 0; currentColumnNumber < currentRow.length; currentColumnNumber++) {
        const isCurrentCellAlive: boolean = sourceGeneration[currentRowNumber][currentColumnNumber];
        const countOfAliveNeighbours: number = this.getCountOfAliveNeighbours(currentRowNumber, currentColumnNumber, sourceGeneration);
        if (isCurrentCellAlive) {
          nextGeneration[currentRowNumber][currentColumnNumber] = countOfAliveNeighbours === 2 || countOfAliveNeighbours === 3;
        } else {
          nextGeneration[currentRowNumber][currentColumnNumber] = countOfAliveNeighbours === 3;
        }
      }
    }
    return nextGeneration;
  }

  public static getNewRandomGeneration(density: number = 0.5,
                                       width: number = LifeUtil.DEFAULT_FIELD_WIDTH,
                                       height: number = LifeUtil.DEFAULT_FIELD_HEIGHT): Array<Array<boolean>> {
    const newGeneration: Array<Array<boolean>> = new Array<Array<boolean>>();
    for (let currentRowNumber: number = 0; currentRowNumber < height; currentRowNumber++) {
      const row = new Array<boolean>();
      for (let currentColumnNumber: number = 0; currentColumnNumber < width; currentColumnNumber++) {
        row.push(Math.random() < density);
      }
      newGeneration.push(row);
    }
    return newGeneration;
  }

  public static isEqualsGenerations(sourceGeneration: Array<Array<boolean>>, targetGeneration: Array<Array<boolean>>): boolean {
    return !sourceGeneration.some((row: Array<boolean>, rowNumber: number) =>
        row.some((isCellAlive: boolean, columnNumber: number) => isCellAlive !== targetGeneration[rowNumber][columnNumber]))
  }

  public static isGenerationDead(sourceGeneration: Array<Array<boolean>>): boolean {
    return !sourceGeneration.some((row: Array<boolean>): boolean => row.some((isCellAlive: boolean): boolean => isCellAlive));
  }

  private static getCountOfAliveNeighbours(rowNumber: number,
                                           columnNumber: number,
                                           sourceGeneration: Array<Array<boolean>>): number {
    let numberOfAliveNeighbours: number = 0;
    const range: number = 1;
    const startRowNumber: number = rowNumber > range - 1 ? rowNumber - range : 0;
    const endRowNumber: number = rowNumber < sourceGeneration.length - range ? rowNumber + range : rowNumber;
    for (let currentRowNumber = startRowNumber; currentRowNumber <= endRowNumber; currentRowNumber++) {
      const currentRow: Array<boolean> = sourceGeneration[currentRowNumber];
      const startColumnNumber: number = columnNumber > range ? columnNumber - range : 0;
      const endColumnNumber: number = columnNumber < currentRow.length - range ? columnNumber + range : columnNumber;
      for (let currentColumnNumber: number = startColumnNumber; currentColumnNumber <= endColumnNumber; currentColumnNumber++) {
        if (currentColumnNumber === columnNumber && currentRowNumber === rowNumber)
          continue;
        if (sourceGeneration[currentRowNumber][currentColumnNumber])
          numberOfAliveNeighbours++;
      }
    }
    return numberOfAliveNeighbours;
  }
}

export default LifeUtil;
