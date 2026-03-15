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

import { Alphabet, Identity, isAlphabet, Zero, zeroUpTo } from "./base";
import { mapNonnegativeTripletToPositive, mapPositiveToNonnegativeTriplet } from "./number-map/square";

type MaybeNumber = number | undefined;
type NonnegativeWithCursor = [nonnegative: number, cursor: number];

function pairsOf(alphabet: Alphabet) {
  if (!isAlphabet(alphabet)) throw new RangeError();

  return (layer: number): [string, string] => alphabet.slice(layer * 2, (layer * 2) + 2) as [string, string];
}

function closingSymbolsOf(...alphabet: Alphabet) {

  if (!isAlphabet(alphabet)) throw new RangeError();

  const numberOfTypes = alphabet.length / 2;
  const pairOf = pairsOf(alphabet);
  const pairs = zeroUpTo(numberOfTypes - 1).map((layer: number) => pairOf(layer)); // .filter(Identity);

  return new Map<string, string>(pairs);
}

/**
 * 
 * Maps a positive number to a typed Dyck word by mapping that integer to a triplet,
 * which in turn maps to a specific pair of symbols and empty or another pair and so
 * on recursively down to one of the base cases.
 *
 * @param X the first symbol of the pair
 * @param Y the second symbol of the pair
 * @param nonnegative a positive or counting number  
 * @returns a string
 */
export function nonnegativeToTypedDyckWordMapper(...alphabet: Alphabet) {

  if (!isAlphabet(alphabet)) throw new RangeError();

  const numberOfTypes = alphabet.length / 2;

  const pairFor = pairsOf(alphabet);

  return function mapper(nonnegative: number): string {
    if (nonnegative < Zero) throw new RangeError();
    if (nonnegative != Math.floor(nonnegative)) throw new RangeError();

    // degenerate case
    if (nonnegative === 0) return '';

    // recursive case
    const [row, column, layer] = mapPositiveToNonnegativeTriplet(nonnegative, numberOfTypes);

    const [X, Y] = pairFor(layer);

    if (X == undefined) throw new RangeError();
    if (Y == undefined) throw new RangeError();

    return `${X}${mapper(row)}${Y}${mapper(column)}`;
  };
}

/**
 * Given an Alphabet, generates all the finite Dyck words with that alphabet, in finite fime.
 * 
 * @param alphabet The alphabet of this Dyck language, spread across the parameters,
 *                 e.g. typedDickWords("(", ")", "[", "]", "{", "}")
 */
export function * typedDyckWords(...alphabet: Alphabet) {
  if (!isAlphabet(alphabet)) throw new RangeError();

  const mapper = nonnegativeToTypedDyckWordMapper(...alphabet);
  let n = 0;

  while (true) {
    yield mapper(n++);
  }
}

/**
 * 
 * Given an alphabet, returns a function that maps from a string in the
 * Dyck languyage defined by the alphabet to a nonnegative number, representing
 * the order in which typedDyckWords will yield the supplied word.
 * 
 * @param alphabet 
 * @returns A nonnegative order, or throws RangeError is not a valid Dyck Word
 */
export function typedDyckWordToNonnegativeMapper(...alphabet: Alphabet) {

  if (!isAlphabet(alphabet)) throw new RangeError();

  const numberOfLayers = alphabet.length / 2;

  const closingSymbolDictionary = closingSymbolsOf(...alphabet);
  const closingSymbolFor = (symbol: string) => closingSymbolDictionary.get(symbol);
  const notOpeningSymbol = (symbol: string) => closingSymbolFor(symbol) === undefined;
  const layerOf = (openingSymbol: string) => alphabet.indexOf(openingSymbol) / 2;

  return function mapperWrapper(word: string): MaybeNumber {
    const isEmpty = (cursor: number) => word[cursor] === undefined;

    const [nonnegative, followingCursor] = mapper();

    if (isEmpty(followingCursor)) {
      return nonnegative;
    }
    else throw new RangeError();

    /**
     * 
     * e.g. (()())() looks like this:
     * 
     *      ( xCursor, xSymbol, xlayer derived
     *      ( \
     *      ) | - recursively parsed row word
     *      ( |
     *      ) /
     *      ) yCursor, ySymbol
     *      ( \
     *          - recursively parsed column word
     *      ) /
     *      ?   - nextCursor
     * 
     * @param xCursor the location of a word to match
     * @returns the nonnegative that mps to and is mapped from this word
     */
    function mapper(xCursor: number = 0): NonnegativeWithCursor {
      // --- degenerate case: nothing to parse

      if (isEmpty(xCursor)) return [Zero, xCursor]; // match nothing

      // --- Is this a word?
      //
      // It could be a word if it starts with an opening symbol

      const xSymbol = word[xCursor] as string;

      if (notOpeningSymbol(xSymbol)) return [Zero, xCursor]; // match nothing

      const xyLayer = layerOf(xSymbol);
      const ySymbol = closingSymbolFor(xSymbol);

      // --- get rowNonNegative
      const rowWordCursor = xCursor + 1;
      const [rowNonNegative, yCursor] = mapper(rowWordCursor);

      if (word[yCursor] !== ySymbol) {
        throw new RangeError(`unexpected ${word[yCursor]}, looking for ${ySymbol}`);
      }

      // --- get columnNonNegative
      const columnCursor = yCursor + 1;

      const [columnNonNegative, nextCursor] =
        isEmpty(columnCursor)
          ? [Zero, columnCursor]
          : mapper(columnCursor);

      const compoundNonnegative = mapNonnegativeTripletToPositive([rowNonNegative, columnNonNegative, xyLayer], numberOfLayers);

      return [compoundNonnegative, nextCursor];
    }
  }
}

export function typedDyckWordRecognizer(...alphabet: Alphabet) {
  return (candidate: string) => {
    try {
      typedDyckWordToNonnegativeMapper(...alphabet)(candidate);
      return true;
    }
    catch (r) {
      return false;
    }
  }
}
