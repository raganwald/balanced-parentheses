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

import { Alphabet, Zero } from "./base";
import { mapPositiveToNonnegativeTriplet } from "./number.maps";

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

  // See mapPositiveToNonnegativePair for general comments about the agorithm for determining the x and y coördinates

  // erroneous inputs
  if (nonnegative < Zero) throw new RangeError();
  if (nonnegative != Math.floor(nonnegative)) throw new RangeError();

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
