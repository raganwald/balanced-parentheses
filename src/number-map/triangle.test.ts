import { triangleNumberFor, smallestTermStartingFrom, pairOf, positiveOf } from "./triangle";

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
    const [row, column] = pairOf(i);

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
  expect(pairOf( 1)).toEqual([0, 0]);
  expect(pairOf( 2)).toEqual([1, 0]);
  expect(pairOf( 3)).toEqual([0, 1]);
  expect(pairOf( 4)).toEqual([2, 0]);
  expect(pairOf( 5)).toEqual([1, 1]);
  expect(pairOf( 6)).toEqual([0, 2]);
  expect(pairOf( 7)).toEqual([3, 0]);
  expect(pairOf( 8)).toEqual([2, 1]);
  expect(pairOf( 9)).toEqual([1, 2]);
  expect(pairOf(10)).toEqual([0, 3]);
  expect(pairOf(11)).toEqual([4, 0]);
  expect(pairOf(12)).toEqual([3, 1]);
  expect(pairOf(13)).toEqual([2, 2]);
  expect(pairOf(14)).toEqual([1, 3]);
  expect(pairOf(15)).toEqual([0, 4]);
});

test("mapNonegativePairToPositive", () => {
  expect(positiveOf([0, 0])).toEqual( 1);
  expect(positiveOf([1, 0])).toEqual( 2);
  expect(positiveOf([0, 1])).toEqual( 3);
  expect(positiveOf([2, 0])).toEqual( 4);
  expect(positiveOf([1, 1])).toEqual( 5);
  expect(positiveOf([0, 2])).toEqual( 6);
  expect(positiveOf([3, 0])).toEqual( 7);
  expect(positiveOf([2, 1])).toEqual( 8);
  expect(positiveOf([1, 2])).toEqual( 9);
  expect(positiveOf([0, 3])).toEqual(10);
  expect(positiveOf([4, 0])).toEqual(11);
  expect(positiveOf([3, 1])).toEqual(12);
  expect(positiveOf([2, 2])).toEqual(13);
  expect(positiveOf([1, 3])).toEqual(14);
  expect(positiveOf([0, 4])).toEqual(15);
});
