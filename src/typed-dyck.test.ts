import { take } from "./base";
import { nonnegativeToTypedDyckWordMapper, typedDyckWords } from "./typed-dyck";

test("nonnegativeToTypedDyckWordMapper", () => {
  const binaryLanguage = nonnegativeToTypedDyckWordMapper("1", "0");

  expect(binaryLanguage(0)).toEqual("");
  expect(binaryLanguage(1)).toEqual("10");
  expect(binaryLanguage(2)).toEqual("1100");
  expect(binaryLanguage(3)).toEqual("110010");
  expect(binaryLanguage(4)).toEqual("1010");

  expect(binaryLanguage(5)).toEqual("101100");
  expect(binaryLanguage(6)).toEqual("11001100");
  expect(binaryLanguage(7)).toEqual("1110001100");
  expect(binaryLanguage(8)).toEqual("11100010");
  expect(binaryLanguage(9)).toEqual("111000");
});

/**
 * Tests the degenerate case, when there is just one pair of symbols despite
 * the architecture designing for one or more
 */
test("typed words, degenerate case", () => {
  expect([...take(25, typedDyckWords('(', ')'))]).toEqual([
    "", "()", "(())", "(())()", "()()",
    "()(())", "(())(())", "((()))(())", "((()))()", "((()))",
    "((())())", "((())())()", "((())())(())", "((())())(())()", "((()))(())()",
    "(())(())()", "()(())()", "()()()", "(())()()", "((()))()()",
    "((())())()()", "(()())()()", "(()())(())()", "(()())(())", "(()())()"
  ]);

  // the first four as a sanity check, zero and the first three in position 1.
  expect([...take(4, typedDyckWords('(', ')', '[', ']', '{', '}'))]).toEqual([
    "", // the degenerate case
    "()",
    "[]",
    "{}"
  ]);
});

/**
 * tests the normal case, when there is more than one pair of symbols
 */
test("typed words, normal case", () => {
  expect([...take(19, typedDyckWords('(', ')', '[', ']', '{', '}'))]).toEqual([
    "", // the degenerate case
    "()", "[]", "{}",
    "(())", "[()]", "{()}",
    "(())()", "[()]()", "{()}()",
    "()()", "[]()", "{}()",
    "()[]", "[][]", "{}[]",
    "(())[]", "[()][]", "{()}[]"
  ]);
});
