import { NonnegativeTriplet } from "./base";
import { mapNonegativePairToPositive, mapPositiveToNonnegativePair } from "./number.maps";
import { mapPositiveToNonnegativeTriplet } from "./number.maps";

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
  let i = 0;

  while (++i < 100) {
    const index = i;
    const pair = mapPositiveToNonnegativePair(index);
    const indexPrime = mapNonegativePairToPositive(pair);

    // console.log(`index: ${index}, pair: [${pair[0]}, ${pair[1]}], indexPrime: ${indexPrime}`);

    expect(indexPrime).toBe(index);
  }
});

test("mapPositiveToNonnegativeTriplet", () => {
  const pathIn3d: NonnegativeTriplet[][] = [
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  ];

  for (let i = 1; i <= 27; i++) {
    const [row, column, layer] = mapPositiveToNonnegativeTriplet(i, 3);

    ((pathIn3d[row] || [])[column] || [])[layer] = i; // Too many responsibilities
  }

  expect(pathIn3d).toEqual([
    [[1, 2, 3], [10, 11, 12], [13, 14, 15]],
    [[4, 5, 6], [7, 8, 9], [16, 17, 18]],
    [[25, 26, 27], [22, 23, 24], [19, 20, 21]]
  ]);
});
/**
 *
 * The generate case for the 3d path is where there
 * is only one level. If all is correct, it will behave
 * very much like our simple map above, albeit with
 * a slightly different data structure.
 */
test("degenerate path in 3d", () => {
  const pathIn3d: number[][][] = [
    [[0], [0], [0]],
    [[0], [0], [0]],
    [[0], [0], [0]]
  ];

  for (let i = 1; i <= 9; i++) {
    const [row, column, layer] = mapPositiveToNonnegativeTriplet(i, 1);

    ((pathIn3d[row] || [])[column] || [])[layer] = i;
  }

  expect(pathIn3d).toEqual([
    [[1], [4], [5]],
    [[2], [3], [6]],
    [[9], [8], [7]]
  ]);
});
