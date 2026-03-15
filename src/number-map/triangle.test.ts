import { triangleNumberFor, smallestTermStartingFrom, mapPositiveToNonnegativePair } from "./triangle";

test("nthTriangleNumber", () => {
  expect(triangleNumberFor( 0)).toEqual(0);
  expect(triangleNumberFor( 1)).toEqual(1);
  expect(triangleNumberFor( 2)).toEqual(3);
  expect(triangleNumberFor( 3)).toEqual(6);
  expect(triangleNumberFor( 4)).toEqual(10);
  expect(triangleNumberFor( 5)).toEqual(15);
  expect(triangleNumberFor( 6)).toEqual(21);
  expect(triangleNumberFor( 7)).toEqual(28)
  expect(triangleNumberFor( 8)).toEqual(36)
  expect(triangleNumberFor( 9)).toEqual(45)
  expect(triangleNumberFor(10)).toEqual(55);
});

test("nthTriangleNumberLargerThan", () => {
  expect(smallestTermStartingFrom( 0)).toEqual(0);
  expect(smallestTermStartingFrom( 1)).toEqual(1);
  expect(smallestTermStartingFrom( 2)).toEqual(2);
  expect(smallestTermStartingFrom( 3)).toEqual(2);
  expect(smallestTermStartingFrom( 4)).toEqual(3);
  expect(smallestTermStartingFrom( 5)).toEqual(3);
  expect(smallestTermStartingFrom( 6)).toEqual(3);
  expect(smallestTermStartingFrom( 7)).toEqual(4);
  expect(smallestTermStartingFrom( 8)).toEqual(4);
  expect(smallestTermStartingFrom( 9)).toEqual(4);
  expect(smallestTermStartingFrom(10)).toEqual(4);
});

test("mapPositiveToNonnegativePair: path", () => {
  const pathIn2d: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  for (let i = 1; i <= 15; i++) {
    const [row, column] = mapPositiveToNonnegativePair(i);

    (pathIn2d[row] || [])[column] = i;
  }

  expect(pathIn2d).toEqual([
    [ 1,  3,  6, 10, 15],
    [ 2,  5,  9, 14,  0],
    [ 4,  8, 13,  0,  0],
    [ 7, 12,  0,  0,  0],
    [11,  0,  0,  0,  0]
  ]);
});

test("mapPositiveToNonnegativePair", () => {
  expect(mapPositiveToNonnegativePair( 1)).toEqual([0, 0]);
  expect(mapPositiveToNonnegativePair( 2)).toEqual([1, 0]);
  expect(mapPositiveToNonnegativePair( 3)).toEqual([0, 1]);
  expect(mapPositiveToNonnegativePair( 4)).toEqual([2, 0]);
  expect(mapPositiveToNonnegativePair( 5)).toEqual([1, 1]);
  expect(mapPositiveToNonnegativePair( 6)).toEqual([0, 2]);
  expect(mapPositiveToNonnegativePair( 7)).toEqual([3, 0]);
  expect(mapPositiveToNonnegativePair( 8)).toEqual([2, 1]);
  expect(mapPositiveToNonnegativePair( 9)).toEqual([1, 2]);
  expect(mapPositiveToNonnegativePair(10)).toEqual([0, 3]);
  expect(mapPositiveToNonnegativePair(11)).toEqual([4, 0]);
  expect(mapPositiveToNonnegativePair(12)).toEqual([3, 1]);
  expect(mapPositiveToNonnegativePair(13)).toEqual([2, 2]);
  expect(mapPositiveToNonnegativePair(14)).toEqual([1, 3]);
  expect(mapPositiveToNonnegativePair(15)).toEqual([0, 4]);
});
