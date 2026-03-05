export const Zero = 0;
export const One = 1;

export type NonnegativePair = [x: number, y: number];
export type NonnegativeTriplet = [...NonnegativePair, z: number];

export function * take<T>(n:  number, source: Generator<T>) {
  let i = 1;

  for (const element of source) {
    if (i++ > n) return;

    yield element;
  }
}
