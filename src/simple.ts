/**
 *
 * Constructive demonstration that the simple (one type of parentheses)
 * balanced parentheses language can be placed into a 1:1 correspondence
 * with the integers, and then generated in sequence.
 *
 */

import { Zero } from "./base";
import { mapPositiveToNonnegativePair } from "./number.maps";

/**
 * 
 * Maps a positive number to a Dyck word by mapping that integer to a pair of nonnegatives,
 * which in turn map to empty or another pair and so on down to `1`, the base case.
 * The basis of the mapping is XxYy where X and Y are the symbols in a simple Dyck language,
 * and x and y are either empty or another valid word in the Dyck language.
 * 
 * We use the diagonalization path:
 * 
 *      |  0 |  1 |  2 |  3 |  …
 *      |----|----|----|----|---
 * |  0 |  1 |  4 |  5 | 16 | 17
 * |  1 |  2 |  3 |  6 | 15 | 18
 * |  2 |  9 |  8 |  7 | 14 | 19
 * |  3 | 10 | 11 | 12 | 13 | 20
 * |  … | 25 | 24 | 23 | 22 | 21
 * 
 * The row and column indices now map to the "parent" dyck words in order,
 * `XrowYcolumn`. In the case of balanced parentheses:
 * 
 *          |        | ()       | (())       |
 *          |--------|----------|----------- |
 * |        | ()     | ()()     | ()(())     |
 * | ()     | (())   | (())()   | (())(())   |
 * | (())   | ((())) | ((()))() | ((()))(()) |
 *
 * @param X the first symbol of the pair
 * @param Y the second symbol of the pair
 * @param nonnegative a positive or counting number 
 * @returns a string
 */
export function mapNonnegativeToDyckWord(X: string, Y: string, nonnegative: number): string {

  // See mapPositiveToNonnegativePair for general comments about the agorithm for determening the x and y coördinates

  // erroneous inputs
  if (nonnegative < Zero) throw new RangeError();
  if (nonnegative != Math.floor(nonnegative)) throw new RangeError();

  // degenerate case
  if (nonnegative === 0) return '';

  // recursive case
  const [rowIndex, y] = mapPositiveToNonnegativePair(nonnegative);

  return `${X}${mapNonnegativeToDyckWord(X, Y, rowIndex)}${Y}${mapNonnegativeToDyckWord(X, Y, y)}`;
}

export function * dyckWords(X: string, Y: string) {
  let n = 0;

  while (true) {
    yield mapNonnegativeToDyckWord(X, Y, n++);
  }
}
