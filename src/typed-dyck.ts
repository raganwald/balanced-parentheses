/**
 *
 * Constructive demonstration that a typed (any number of pairs of symbols)
 * dyck language can be placed into a 1:1 correspondence
 * with the integers, and then generated in sequence.
 * 
 * We will work along the same lines as the untyped dyck languages,
 * but introduce a third integer to represent the type of pair of symbols.
 *
 */

import { Alphabet, isAlphabet, Zero } from "./base";
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
export function nonnegativeToTypedDyckWordMapper(...alphabet: Alphabet) {

  if (!isAlphabet(alphabet)) throw new RangeError();

  const numberOfTypes = alphabet.length / 2;

  return function mapper(nonnegative: number): string {

    if (nonnegative < Zero) throw new RangeError();
    if (nonnegative != Math.floor(nonnegative)) throw new RangeError();

    // degenerate case
    if (nonnegative === 0) return '';

    // recursive case
    const [row, column, layer] = mapPositiveToNonnegativeTriplet(nonnegative, numberOfTypes);

    const [X, Y] = alphabet.slice(layer * 2, (layer * 2) + 2);

    if (X == undefined) throw new RangeError();
    if (Y == undefined) throw new RangeError();

    return `${X}${mapper(row)}${Y}${mapper(column)}`;
  }
}

export function * typedDyckWords(...alphabet: Alphabet) {

  if (!isAlphabet(alphabet)) throw new RangeError();

  const mapper = nonnegativeToTypedDyckWordMapper(...alphabet);

  let n = 0;

  while (true) {
    yield mapper(n++);
  }
}
