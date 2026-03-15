import { isNonnegativePair, isNonnegativeTriplet, NonnegativePair, NonnegativeTriplet, One, Zero } from "../base";

/**
 *
 * Maps the positive integers (1..∞) to tuples of nonnegative integers (0..∞, 0..∞).
 * by diagonalizing them on a grid using the following path:
 *
 *      |  0 |  1 |  2 |  3 |  …
 *      |----|----|----|----|---
 * |  0 |  1 |  4 |  5 | 16 | 17
 * |  1 |  2 |  3 |  6 | 15 | 18
 * |  2 |  9 |  8 |  7 | 14 | 19
 * |  3 | 10 | 11 | 12 | 13 | 20
 * |  … | 25 | 24 | 23 | 22 | 21…
 *
 * Each cell represents a pair marked by the row and column indices. For example,
 * square 11 has a row index of 3 and a column index of 1.
 * 
 * Note: the terms `x` and `y` are deprecated.
 *
 * @param positive a positive integer
 * @returns a tuple of nonnegative integers, [row, column]
 *
 */
export function mapPositiveToNonnegativePair(positive: number): NonnegativePair {
  // erroneous inputs
  if (positive < One) throw new RangeError();
  if (positive != Math.floor(positive)) throw new RangeError();

  // base case
  if (positive === One) return [Zero, Zero];

  // positive numbers > 1
  //
  // We find the location of `positive` on the path in the above chart.
  // First, we compute the bounding square, which is the smallest square
  // that contains both `1` and `positive`. This is the length of
  // its side:
  const boundingSquareSideLength = Math.ceil(Math.sqrt(positive));

  // we are interested in the outer row and column of that square.
  // `positive` lies upon that track. For example, given
  // `positive === 6`, then `boundingSquareSideLength === 3`:
  //
  //      |  0 |  1 |  2 |  3 |  …
  //      |----|----|----|----|---
  // |  0 |    |    |  5 |    | 
  // |  1 |    |    |  6 |    | 
  // |  2 |  9 |  8 |  7 |    | 
  // |  3 |    |    |    |    | 
  // |  … |    |    |    |    | 
  //
  // Every positive on that track has two indices, one
  // of which must be the boundingSquareSideLength,
  // adjusted for zero-based indexing. In our
  // example, it will be `2`
  //
  const fixedIndex = boundingSquareSideLength - 1;

  // now to compute the other index. We start with
  // the relative distance from the end instead of
  // the absolute amount of positive. Given that our
  // `positive` is 6, `distanceFromEndOfTrack` will
  // be 3.
  //
  //      |  0 |  1 |  2 |  3 |  …
  //      |----|----|----|----|---
  // |  0 |    |    |  4 |    | 
  // |  1 |    |    |  3 |    | 
  // |  2 |  0 |  1 |  2 |    | 
  // |  3 |    |    |    |    | 
  // |  … |    |    |    |    | 
  // 
  const distanceFromEndOfTrack = Math.pow(boundingSquareSideLength, 2) - positive;

  // The other index (which is smaller than or equal to the first):
  //
  //      |  0 |  1 |  2 |  3 |  …
  //      |----|----|----|----|---
  // |  0 |    |    |  0 |    | 
  // |  1 |    |    |  1 |    | 
  // |  2 |  0 |  1 |  2 |    | 
  // |  3 |    |    |    |    | 
  // |  … |    |    |    |    | 
  // 
  const isOnFirstHalf = distanceFromEndOfTrack <= fixedIndex;
  const computedIndex =
    isOnFirstHalf
      ? distanceFromEndOfTrack
      : (fixedIndex * 2) - distanceFromEndOfTrack;

  // Now to figure out whether to return [fixedIndex, computedIndex] or
  // [computedIndex, fixedIndex].
  //
  // We have a 2x2 matrix of cases. isOnFirstHalf and downAndThenLeft
  //
  const downAndThenLeft = isDownAndThenLeft(fixedIndex);
  //
  // there are four places the positive can be. odd box lengths have down and left,
  // as above. Even box lengths have right and up:
  //
  //      |  0 |  1 |  2 |  3 |  …
  //      |----|----|----|----|---
  // |  0 |    |  U |  D |  U | 
  // |  1 |  R |  R |  D |  U | 
  // |  2 |  L |  L |  D |  U | 
  // |  3 |  R |  R |  R |  R | 
  // |  … |    |    |    |    | 
  //
  // Up and Down have a computed row and a fixed column. Left and Right have a
  // fixed row. and a computed column:
  //
  //  |                         | isOnFirstHalf = true | isOnFirstHalf = false |
  //  |-------------------------|----------------------|-----------------------|
  //  |  downAndThenLeft = true |           isUpOrDown |                       |
  //  | downAndThenLeft = false |                      |            isUpOrDown |
  //
  const isUpOrDown = isOnFirstHalf === downAndThenLeft;
  const [row, column] = isUpOrDown
    ? [computedIndex, fixedIndex]
    : [fixedIndex, computedIndex];

  return [row, column];
}

export function mapNonegativePairToPositive([row, column]: NonnegativePair): number {
  if (!isNonnegativePair([row, column])) throw new RangeError();

  // base case
  if (row === Zero && column === Zero) return One;

  // compound case
  const fixedIndex = Math.max(row, column);
  const computedIndex = Math.min(row, column);

  const downAndThenLeft = isDownAndThenLeft(fixedIndex);
  const isUpOrDown = fixedIndex === row; // the 'corner case' does not matter

  //
  //  |                         | isUpOrDown = true | isUpOrDown = false |
  //  |-------------------------|-------------------|--------------------|
  //  |  downAndThenLeft = true |     isOnFirstHalf |                    |
  //  | downAndThenLeft = false |                   |      isOnFirstHalf |
  const isOnFirstHalf =  downAndThenLeft === isUpOrDown;

  const distanceFromEndOfTrack =
    isOnFirstHalf
      ? (fixedIndex * 2) - computedIndex
      : computedIndex;

  return Math.pow((fixedIndex + 1), 2) - distanceFromEndOfTrack;
}

/**
 * Given a row or column index, returns whether the path
 * direction is down and then left (true) or right and then up
 * (false)
 */
function isDownAndThenLeft(rowOrColumnIndex: number) {
  return rowOrColumnIndex % 2 === 1;
}

/**
 *
 * The function mapPositiveToNonnegativePair above maps the positive integers (1..∞) to
 * tuples of nonnegative integers (0..∞, 0..∞) by diagonalizing them on
 * a grid like this:
 *
 *      |  0 |  1 |  2 |  3 |  …
 *      |----|----|----|----|---
 * |  0 |  1 |  4 |  5 | 16 | 17
 * |  1 |  2 |  3 |  6 | 15 | 18
 * |  2 |  9 |  8 |  7 | 14 | 19
 * |  3 | 10 | 11 | 12 | 13 | 20
 * |  … | 25 | 24 | 23 | 22 | 21…
 *
 * Each cell represents a pair marked by the row and column indices.
 *
 * Here we add a third, `layer` index to handle a finite range of numbers from `0` to
 * `numberOfLayers - 1`, which creates a 3d path out of the 2d path.
 *
 * @param positive a positive integer
 * @param numberOfLayers the total number of layers
 * @returns a triple of nonnegative integers, two of which are any finite integer,
 *          and the third of which is in a fixed range of 0..numberOfTypes-1
 *          and where numberOfTypes >= 1.
 *
 */
export function mapPositiveToNonnegativeTriplet(numberOfLayers: number) {
  if (numberOfLayers < One) throw new RangeError();
  if (numberOfLayers != Math.floor(numberOfLayers)) throw new RangeError();

  return function mapper(positive: number): NonnegativeTriplet {
    // erroneous inputs
    if (positive < One) throw new RangeError();
    if (positive != Math.floor(positive)) throw new RangeError();

    const positiveZeroBased = positive - 1;
    const positive2d = Math.floor(positiveZeroBased / numberOfLayers) + 1;
    const layer = positiveZeroBased % numberOfLayers;

    const [row, column]: NonnegativePair = mapPositiveToNonnegativePair(positive2d);

    return [row, column, layer];
  };
}

export function mapNonnegativeTripletToPositive([row, column, layer]: NonnegativeTriplet, numberOfLayers: number): number {
  if (!isNonnegativeTriplet([row, column, layer], numberOfLayers)) throw new RangeError();
  
  const positive2d = mapNonegativePairToPositive([row, column]);

  // layer is zero-based, positive2d is 1-based, need to do a shake of the hips to
  // sort out the proper modulo artithmetic
  return ((positive2d - 1) * numberOfLayers) + 1 + layer;
}
