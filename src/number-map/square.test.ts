import { positiveOf, pairOf } from "./square";

/*
 * 
 * We uniformly represent the mapping as an array of arrays,
 * accesed as [row][column]
 *
 */
test("mapPositiveToNonnegativePair: path", () => {
  const pathIn2d: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  for (let i = 1; i <= 25; i++) {
    const [row, column] = pairOf(i);

    (pathIn2d[row] || [])[column] = i;
  }

  expect(pathIn2d).toEqual([
    [1, 4, 5, 16, 17],
    [2, 3, 6, 15, 18],
    [9, 8, 7, 14, 19],
    [10, 11, 12, 13, 20],
    [25, 24, 23, 22, 21]
  ]);
});

test("mapPositiveToNonnegativePair", () => {
  expect(pairOf(1)).toEqual([0, 0]); // [row, column]
  expect(pairOf(2)).toEqual([1, 0]);
  expect(pairOf(3)).toEqual([1, 1]);
  expect(pairOf(4)).toEqual([0, 1]);

  expect(pairOf(5)).toEqual([0, 2]);
  expect(pairOf(6)).toEqual([1, 2]);
  expect(pairOf(7)).toEqual([2, 2]);
  expect(pairOf(8)).toEqual([2, 1]);
  expect(pairOf(9)).toEqual([2, 0]);
});

test("mapNonegativePairToPositive", () => {
  expect(positiveOf([0, 0])).toEqual(1); // [row, column]
  expect(positiveOf([1, 0])).toEqual(2);
  expect(positiveOf([1, 1])).toEqual(3);
  expect(positiveOf([0, 1])).toEqual(4);

  expect(positiveOf([0, 2])).toEqual(5);
  expect(positiveOf([1, 2])).toEqual(6);
  expect(positiveOf([2, 2])).toEqual(7);
  expect(positiveOf([2, 1])).toEqual(8);
  expect(positiveOf([2, 0])).toEqual(9);
});
