import { NonnegativeTriplet } from "./base";
import { mapNonegativePairToPositive, mapPositiveToNonnegativePair } from "./number.maps";
import { mapPositiveToNonnegativeTriplet, mapNonnegativeTripletToPositive } from "./number.maps";

/*
 * 
 * We uniformly represent the mapping as an array of arrays,
 * accesed as [row][column]
 *
 */
test("mapPositiveToNonnegativePair", () => {
  const pathIn2d: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  for (let i = 1; i <= 25; i++) {
    const [row, column] = mapPositiveToNonnegativePair(i);

    (pathIn2d[row] || [])[column] = i;
  }

  expect(pathIn2d).toEqual([
    [1, 4, 5, 16, 17],
    [2, 3, 6, 15, 18],
    [9, 8, 7, 14, 19],
    [10, 11, 12, 13, 20],
    [25, 24, 23, 22, 21]
  ]);

  expect(mapPositiveToNonnegativePair(1)).toEqual([0, 0]); // [row, column]
  expect(mapPositiveToNonnegativePair(2)).toEqual([1, 0]);
  expect(mapPositiveToNonnegativePair(3)).toEqual([1, 1]);
  expect(mapPositiveToNonnegativePair(4)).toEqual([0, 1]);

  expect(mapPositiveToNonnegativePair(5)).toEqual([0, 2]);
  expect(mapPositiveToNonnegativePair(6)).toEqual([1, 2]);
  expect(mapPositiveToNonnegativePair(7)).toEqual([2, 2]);
  expect(mapPositiveToNonnegativePair(8)).toEqual([2, 1]);
  expect(mapPositiveToNonnegativePair(9)).toEqual([2, 0]);
});

test("mapNonegativePairToPositive", () => {
  expect(mapNonegativePairToPositive([0, 0])).toEqual(1); // [row, column]
  expect(mapNonegativePairToPositive([1, 0])).toEqual(2);
  expect(mapNonegativePairToPositive([1, 1])).toEqual(3);
  expect(mapNonegativePairToPositive([0, 1])).toEqual(4);

  expect(mapNonegativePairToPositive([0, 2])).toEqual(5);
  expect(mapNonegativePairToPositive([1, 2])).toEqual(6);
  expect(mapNonegativePairToPositive([2, 2])).toEqual(7);
  expect(mapNonegativePairToPositive([2, 1])).toEqual(8);
  expect(mapNonegativePairToPositive([2, 0])).toEqual(9);
});

test("round trip mapPositiveToNonnegativePair -> mapNonegativePairToPositive", () => {
  let notNegative = 0;

  while (++notNegative < 100) {
    const pair = mapPositiveToNonnegativePair(notNegative);
    const notNegativePrime = mapNonegativePairToPositive(pair);

    expect(notNegativePrime).toBe(notNegative);
  }
});

test("mapPositiveToNonnegativeTriplet", () => {
  // normal case
  expect(mapPositiveToNonnegativeTriplet(1, 3)).toEqual([0, 0, 0]);
  expect(mapPositiveToNonnegativeTriplet(2, 3)).toEqual([0, 0, 1]);
  expect(mapPositiveToNonnegativeTriplet(3, 3)).toEqual([0, 0, 2]);

  expect(mapPositiveToNonnegativeTriplet(4, 3)).toEqual([1, 0, 0]);
  expect(mapPositiveToNonnegativeTriplet(5, 3)).toEqual([1, 0, 1]);
  expect(mapPositiveToNonnegativeTriplet(6, 3)).toEqual([1, 0, 2]);

  expect(mapPositiveToNonnegativeTriplet(7, 3)).toEqual([1, 1, 0]);
  expect(mapPositiveToNonnegativeTriplet(8, 3)).toEqual([1, 1, 1]);
  expect(mapPositiveToNonnegativeTriplet(9, 3)).toEqual([1, 1, 2]);

  expect(mapPositiveToNonnegativeTriplet(10, 3)).toEqual([0, 1, 0]);
  expect(mapPositiveToNonnegativeTriplet(11, 3)).toEqual([0, 1, 1]);
  expect(mapPositiveToNonnegativeTriplet(12, 3)).toEqual([0, 1, 2]);

  // degenerate case
  expect(mapPositiveToNonnegativeTriplet(1, 1)).toEqual([0, 0, 0]);
  expect(mapPositiveToNonnegativeTriplet(2, 1)).toEqual([1, 0, 0]);
  expect(mapPositiveToNonnegativeTriplet(3, 1)).toEqual([1, 1, 0]);
  expect(mapPositiveToNonnegativeTriplet(4, 1)).toEqual([0, 1, 0]);
});

test("mapNonnegativeTripletToPositive", () => {
  // normal case
  expect(mapNonnegativeTripletToPositive([0, 0, 0], 3)).toEqual(1);
  expect(mapNonnegativeTripletToPositive([0, 0, 1], 3)).toEqual(2);
  expect(mapNonnegativeTripletToPositive([0, 0, 2], 3)).toEqual(3);

  expect(mapNonnegativeTripletToPositive([1, 0, 0], 3)).toEqual(4);
  expect(mapNonnegativeTripletToPositive([1, 0, 1], 3)).toEqual(5);
  expect(mapNonnegativeTripletToPositive([1, 0, 2], 3)).toEqual(6);

  expect(mapNonnegativeTripletToPositive([1, 1, 0], 3)).toEqual(7);
  expect(mapNonnegativeTripletToPositive([1, 1, 1], 3)).toEqual(8);
  expect(mapNonnegativeTripletToPositive([1, 1, 2], 3)).toEqual(9);

  expect(mapNonnegativeTripletToPositive([0, 1, 0], 3)).toEqual(10);
  expect(mapNonnegativeTripletToPositive([0, 1, 1], 3)).toEqual(11);
  expect(mapNonnegativeTripletToPositive([0, 1, 2], 3)).toEqual(12);

  // degenerate case
  expect(mapNonnegativeTripletToPositive([0, 0, 0], 1)).toEqual(1);
  expect(mapNonnegativeTripletToPositive([1, 0, 0], 1)).toEqual(2);
  expect(mapNonnegativeTripletToPositive([1, 1, 0], 1)).toEqual(3);
  expect(mapNonnegativeTripletToPositive([0, 1, 0], 1)).toEqual(4);
});
