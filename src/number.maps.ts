import { NonnegativePair, One, Zero } from "./base";

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
 * Each cell represents a pair marked by the horizontal and vertical labels. For example,
 * square 11 has a vertical label of 3 and a horizontal label of 1.
 *
 * @param positive a positive integer
 * @returns a tuple of nonnegative integers
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

  // This value is important, as it is at least one
  // of the two integers in the pair: The index lies upon that
  // column, that row, or both.
  // Given index = 6, boundingSquareSideLength will be 3.
  //
  //      |  0 |  1 |  2 |  3 |  …
  //      |----|----|----|----|---
  // |  0 |    |    |  5 |    | 
  // |  1 |    |    |  6 |    | 
  // |  2 |  9 |  8 |  7 |    | 
  // |  3 |    |    |    |    | 
  // |  … |    |    |    |    | 
  // 
  // Compute the distance of the index along the track:
  const innerArea = Math.pow(boundingSquareSideLength - 1, 2);
  const distanceAlongOuterBoxSides = positive - innerArea;

  // Now for number fiddling to derive the pair from the indices
  // of the poaitive along the track.
  //
  // The numbers can run down and then left,
  // or right and then up, they alternate with each
  // row and column.
  //
  // Whichever way they start, the first half will be in ascending order
  // of rows or columns, up to and including the corner. The second
  // half will be descending order of rowns and colums.
  const isInFirstHalfOfTrack = distanceAlongOuterBoxSides <= boundingSquareSideLength;

  // now we can compute the indices of the index. We still don't know
  // which way the numbers run, but since it's symmetrical, we can sort
  // that out afterwards.
  const boundingBoxArea = Math.pow(boundingSquareSideLength, 2);
  const boundiingBoxColumnOrRowIndex = boundingSquareSideLength - 1;

  const indices: NonnegativePair = isInFirstHalfOfTrack
    ? [distanceAlongOuterBoxSides - 1, boundiingBoxColumnOrRowIndex]
    : [boundiingBoxColumnOrRowIndex, boundingBoxArea - positive];

  // Now we work out the direction:
  const downAndThenLeft = boundingSquareSideLength % 2 === 1;

  // And return the pair, oriented according to the direction needed.
  return downAndThenLeft
    ? indices
    : indices.toReversed() as NonnegativePair;
}
