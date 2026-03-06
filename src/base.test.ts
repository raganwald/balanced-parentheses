import { isAlphabet, take } from "./base";

const elementsOf = <T>(array: T[]) =>
  function * () { yield * array; }()

test("take", () => {
  expect([...take<number>(10, elementsOf<number>([]))]).toEqual([]);
  expect([...take<number>(10, elementsOf<number>([1, 2, 3]))]).toEqual([1, 2, 3]);
  expect([...take<number>(10, elementsOf<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]))]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("isAlphabet", () => {
  //@ts-expect-error "empty alphabet should be caught by the type system"
  isAlphabet([]);

  //@ts-expect-error "only string members: anything else should be caught by the type system"
  isAlphabet([1]);

  // single characters only
  expect(isAlphabet(["foo", "bar"])).toBe(false);

  // unique characters only
  expect(isAlphabet(["a", "b", "c", "b"])).toBe(false);

  // otherwise, fine?
  expect(isAlphabet(["(", ")"])).toBe(true);
  expect(isAlphabet(["(", ")", "[", "]"])).toBe(true);
});
