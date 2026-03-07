export const Zero = 0;
export const One = 1;

export type NonnegativePair = [x: number, y: number];

export const isNonnegativePair = (pair: NonnegativePair): pair is NonnegativePair =>
  pair.every( (n) => n >= 0 && n === Math.floor(n) );

export type NonnegativeTriplet = [...NonnegativePair, z: number];

/**
 * 
 * A generator decorator that limits another generator to a maximum number of elements.
 * 
 * @param maximumNumberOfElements the maximum number of elements to generate
 * @param source The source generator being decorated
 * @returns 
 */
export function * take<T>(maximumNumberOfElements:  number, source: Generator<T>) {
  let i = 1;

  for (const element of source) {
    if (i++ > maximumNumberOfElements) return;

    yield element;
  }
}

/**
 * An "Alphabet" is:
 *
 * 1. An non-empty array;
 * 2. Containing an even number;
 * 3. Of symbols of length 1;
 * 4. That are unique.
 *
 * Consecutive pairs of symbols represent the Xs and Ys of
 * the Dyck language. e.g. for Alphabet `['(', ')', '[', ']']`,
 * the pairs are `(, )` and `[, ]`.
 */

export type Alphabet = [string, ...string[]];

export const isAlphabet = (alphabet: Alphabet): alphabet is Alphabet =>
  (alphabet.length % 2 === 0) &&
  alphabet.every(({ length }) => length === 1) &&
  alphabet.length === (new Set(alphabet)).size;
