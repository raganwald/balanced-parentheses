import { NonnegativePair, One, Zero } from "../base";

/**
 * 
 * Returns the triangle number associated with the provided term number
 * 
 * @param termNumber 
 * @returns 
 */
export const triangleNumberFor = (termNumber: number) => (termNumber * (termNumber + 1)) / 2;

/**
 * 
 * @param positive 
 * Returns the 
 * @returns 
 */
export const smallestTermStartingFrom = (positive: number) => Math.ceil((Math.sqrt(8 * positive + 1) - 1) / 2);

/**
 *
 * Maps the positive integers (1..∞) to tuples of nonnegative integers (0..∞, 0..∞).
 * using triangle numbers 
 *
 *      |  0 |  1 |  2 |  3 |  4 …
 *      |----|----|----|----|---
 * |  0 |  1 |  3 |  6 | 10 | 15
 * |  1 |  2 |  5 |  9 | 14 | 20
 * |  2 |  4 |  8 | 13 | 19 | 26
 * |  3 |  7 | 12 | 18 | 25 | 33
 * |  4 | 11 | 17 | 24 | 32 | 41 …
 *
 * Each cell represents a pair marked by the row and column indices. For example,
 * square 12 has a row index of 3 and a column index of 1.
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

  // > 1
  // find the "smallest triangle number bigger than positive"
  const lengthOfDiagonal = smallestTermStartingFrom(positive);
  // row and column are zero-indexed
  const row = triangleNumberFor(lengthOfDiagonal) - positive;
  const column = lengthOfDiagonal - row - 1;

  return [row, column];
}

export function mapNonegativePairToPositive([row, column]: NonnegativePair): number {
  const lengthOfDiagonal = row + column + 1;
  const positive = triangleNumberFor(lengthOfDiagonal) - row;

  return positive;
}
