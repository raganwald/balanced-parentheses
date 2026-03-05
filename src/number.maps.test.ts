import { NonnegativeTriplet } from "./base";
import { mapPositiveToNonnegativePair } from "./number.maps";
import { mapPositiveToNonnegativeTriplet } from "./typed";

test("dyck words: mapPositiveToNonnegativePair", () => {
  const pathIn2d: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  for (let i = 1; i <= 25; i++) {
    const [x, y] = mapPositiveToNonnegativePair(i);

    (pathIn2d[x] || [])[y] = i;
  }

  expect(pathIn2d).toEqual([
    [1, 4, 5, 16, 17],
    [2, 3, 6, 15, 18],
    [9, 8, 7, 14, 19],
    [10, 11, 12, 13, 20],
    [25, 24, 23, 22, 21]
  ]);
});

test("dyck words: mapPositiveToNonnegativeTriplet", () => {
  const pathIn3d: NonnegativeTriplet[][] = [
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  ];

  for (let i = 1; i <= 27; i++) {
    const [x, y, z] = mapPositiveToNonnegativeTriplet(i, 3);

    ((pathIn3d[x] || [])[y] || [])[z] = i;
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
test("dyck words: degenerate path in 3d", () => {
  const pathIn3d: number[][][] = [
    [[0], [0], [0]],
    [[0], [0], [0]],
    [[0], [0], [0]]
  ];

  for (let i = 1; i <= 9; i++) {
    const [x, y, z] = mapPositiveToNonnegativeTriplet(i, 1);

    ((pathIn3d[x] || [])[y] || [])[z] = i;
  }

  expect(pathIn3d).toEqual([
    [[1], [4], [5]],
    [[2], [3], [6]],
    [[9], [8], [7]]
  ]);
});

