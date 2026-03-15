import { NonnegativePair } from "../base";

export type PairOf = (positive: number) => NonnegativePair;
export type PositiveOf = (pair: NonnegativePair) => number;

export type Strategy = {
  readonly pairOf: PairOf,
  readonly positiveOf: PositiveOf
}
