import { take } from "./base";
import { typedDyckWords } from "./typed";

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
