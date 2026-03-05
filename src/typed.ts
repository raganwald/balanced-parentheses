/**
 *
 * Constructive demonstration that any (with one or more types)
 * balanced parentheses language can be placed into a 1:1 correspondence
 * with the integers, and then generated in sequence.
 * 
 * We will work along the same lines as the simple balanced parentheses,
 * but introduce a third integer to represent the type of parentheses.
 *
 */

import { NonnegativeTriplet, One, NonnegativePair, Zero } from "./base";
import { mapPositiveToNonnegativePair } from "./number.maps";

export type Alphabet = string[]; 

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
 * Each cell represents a pair marked by the horizontal and vertical labels. For example,
 * square 11 has a vertical label of 3 and a horizontal label of 1.
 * 
 * But what if, instead of adding a third dimension
 * 
 * @param positive a positive integer
 * @param numberOfLayers the number of layers
 * @returns a triple of nonnegative integers, two of which are any finite integer,
 *          and the third of which is in a fixed range of 0..numberOfTypes-1
 *          and where numberOfTypes >= 1.
 * 
 */
export function mapPositiveToNonnegativeTriplet(positive: number, numberOfLayers: number): NonnegativeTriplet {

  // erroneous inputs
  if (positive < One) throw new RangeError();
  if (numberOfLayers < One) throw new RangeError();
  if (positive != Math.floor(positive)) throw new RangeError();
  if (numberOfLayers != Math.floor(numberOfLayers)) throw new RangeError();

  const positiveZeroBased = positive - 1;
  const positive2d = Math.floor(positiveZeroBased / numberOfLayers) + 1;
  const z = positiveZeroBased % numberOfLayers;

  const indices2d: NonnegativePair = mapPositiveToNonnegativePair(positive2d);

  return [...indices2d, z];
}

/**
 * 
 * Maps a positive number to a typed Dyck word by mapping that integer to a triplet,
 * which in turn maps to a specific pair of symbols and empty or another pair and so
 * on down to one of the base cases.
 *
 * @param X the first symbol of the pair
 * @param Y the second symbol of the pair
 * @param nonnegative a positive or counting number  
 * @returns a string
 */
export function mapNonnegativeToTypedDyckWord(nonnegative: number, ...alphabet: Alphabet): string {

  // See mapPositiveToNonnegativePair for general comments about the agorithm for determening the x and y coördinates

  // erroneous inputs
  if (nonnegative < Zero) throw new RangeError();
  if (nonnegative != Math.floor(nonnegative)) throw new RangeError();

  if (alphabet.length === 0) throw new RangeError();
  if (alphabet.length % 2 === 1) throw new RangeError();
  if (alphabet.length !== (new Set(alphabet)).size) throw new RangeError();

  // degenerate case
  if (nonnegative === 0) return '';

  const numberOfTypes = alphabet.length / 2;

  // recursive case
  const [x, y, z] = mapPositiveToNonnegativeTriplet(nonnegative, numberOfTypes);

  const X = alphabet[z * 2];
  const Y = alphabet[z * 2 + 1];

  if (X == undefined) throw new RangeError();
  if (Y == undefined) throw new RangeError();

  return `${X}${mapNonnegativeToTypedDyckWord(x, ...alphabet)}${Y}${mapNonnegativeToTypedDyckWord(y, ...alphabet)}`;
}

export function * typedDyckWords(...alphabet: Alphabet) {
  let n = 0;

  while (true) {
    yield mapNonnegativeToTypedDyckWord(n++, ...alphabet);
  }
}
