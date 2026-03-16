import { take } from "./base";
import { pairOf } from "./number-map/square";
import { untypedDyckWords, untypedDyckWordOf } from "./untyped-dyck";

test("nonnegativeToUntypedDyckWordMapper", () => {
  const binaryLanguage = untypedDyckWordOf(pairOf, "1", "0");

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

test("untypedDyckWords", () => {
  expect([...take(25, untypedDyckWords(pairOf, '(', ')'))]).toEqual([
    "", "()", "(())", "(())()", "()()",
    "()(())", "(())(())", "((()))(())", "((()))()", "((()))",
    "((())())", "((())())()", "((())())(())", "((())())(())()", "((()))(())()",
    "(())(())()", "()(())()", "()()()", "(())()()", "((()))()()",
    "((())())()()", "(()())()()", "(()())(())()", "(()())(())", "(()())()"
  ])
});
