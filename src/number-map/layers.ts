import { One, NonnegativeTriplet, NonnegativePair, isNonnegativeTriplet } from "../base";
import { PairOf, PositiveOf } from "./types";

/**
 *
 * Given a strategy for mapping positives to nonnegatives pairs and back, we add
 * a third—vertical—index which is from a finite range of numbers.
 *
 * @param positive a positive integer
 * @param numberOfLayers the total number of layers
 * @returns a triple of nonnegative integers, two of which are any finite integer,
 *          and the third of which is in a fixed range of 0..numberOfTypes-1
 *          and where numberOfTypes >= 1.
 *
 */

export function tripletOf(pairOf: PairOf, numberOfLayers: number) {
  if (numberOfLayers < One) throw new RangeError();
  if (numberOfLayers != Math.floor(numberOfLayers)) throw new RangeError();

  return function mapper(positive: number): NonnegativeTriplet {
    // erroneous inputs
    if (positive < One) throw new RangeError();
    if (positive != Math.floor(positive)) throw new RangeError();

    const positiveZeroBased = positive - 1;
    const positive2d = Math.floor(positiveZeroBased / numberOfLayers) + 1;
    const layer = positiveZeroBased % numberOfLayers;

    const [row, column]: NonnegativePair = pairOf(positive2d);

    return [row, column, layer];
  };
}

export function positiveOfTriplet(positiveOf: PositiveOf, numberOfLayers: number) {
  if (numberOfLayers < One) throw new RangeError();
  if (numberOfLayers != Math.floor(numberOfLayers)) throw new RangeError();

  return function mapper([row, column, layer]: NonnegativeTriplet): number {
    if (!isNonnegativeTriplet([row, column, layer], numberOfLayers)) throw new RangeError();

    const positive2d = positiveOf([row, column]);

    // layer is zero-based, positive2d is 1-based, need to do a shake of the hips to
    // sort out the proper modulo artithmetic
    return ((positive2d - 1) * numberOfLayers) + 1 + layer;
  };
}
