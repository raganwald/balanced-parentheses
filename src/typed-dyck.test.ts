import { take } from "./base";
import { nonnegativeToTypedDyckWordMapper, typedDyckWordRecognizer, typedDyckWords, typedDyckWordToNonnegativeMapper } from "./typed-dyck";

test("nonnegativeToTypedDyckWordMapper", () => {
  const mapper = nonnegativeToTypedDyckWordMapper("1", "0");

  expect(mapper(0)).toEqual("");
  expect(mapper(1)).toEqual("10");
  expect(mapper(2)).toEqual("1100");
  expect(mapper(3)).toEqual("110010");
  expect(mapper(4)).toEqual("1010");

  expect(mapper(5)).toEqual("101100");
  expect(mapper(6)).toEqual("11001100");
  expect(mapper(7)).toEqual("1110001100");
  expect(mapper(8)).toEqual("11100010");
  expect(mapper(9)).toEqual("111000");
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

test("typedDyckWordToNonnegativeMapper", () => {
  // Dyck-1

  const dyckOneMapper = typedDyckWordToNonnegativeMapper("1", "0");

  expect(dyckOneMapper(""          )).toEqual(0);
  expect(dyckOneMapper("10"        )).toEqual(1);
  expect(dyckOneMapper("1100"      )).toEqual(2);
  expect(dyckOneMapper("110010"    )).toEqual(3);
  expect(dyckOneMapper("1010"      )).toEqual(4);
  expect(dyckOneMapper("101100"    )).toEqual(5);
  expect(dyckOneMapper("11001100"  )).toEqual(6);
  expect(dyckOneMapper("1110001100")).toEqual(7);
  expect(dyckOneMapper("11100010"  )).toEqual(8);
  expect(dyckOneMapper("111000"    )).toEqual(9);

  // invalid strings should throw exceptions

  expect(() => dyckOneMapper("0")).toThrow(RangeError);
  expect(() => dyckOneMapper("1")).toThrow(RangeError);
  expect(() => dyckOneMapper("01")).toThrow(RangeError);

  // Dyck 3

  const dyckThreeMapper = typedDyckWordToNonnegativeMapper("(", ")", "[", "]", "{", "}");

  expect(dyckThreeMapper("")).toEqual(0);
  expect(dyckThreeMapper("()")).toEqual(1);
  expect(dyckThreeMapper("[]")).toEqual(2);
  expect(dyckThreeMapper("{}")).toEqual(3);
  expect(dyckThreeMapper("(())")).toEqual(4);
  expect(dyckThreeMapper("[()]")).toEqual(5);
  expect(dyckThreeMapper("{()}")).toEqual(6);
  expect(dyckThreeMapper("(())()")).toEqual(7);
  expect(dyckThreeMapper("[()]()")).toEqual(8);
  expect(dyckThreeMapper("{()}()")).toEqual(9);
  expect(dyckThreeMapper("()()")).toEqual(10);
  expect(dyckThreeMapper("[]()")).toEqual(11);
  expect(dyckThreeMapper("{}()")).toEqual(12);
  expect(dyckThreeMapper("()[]")).toEqual(13);
  expect(dyckThreeMapper("[][]")).toEqual(14);
  expect(dyckThreeMapper("{}[]")).toEqual(15);
  expect(dyckThreeMapper("(())[]")).toEqual(16);
  expect(dyckThreeMapper("[()][]")).toEqual(17);
  expect(dyckThreeMapper("{()}[]")).toEqual(18);

  // invalid strings should throw exceptions

  expect(() => dyckThreeMapper("{()}[")).toThrow(RangeError);
  expect(() => dyckThreeMapper("][")).toThrow(RangeError);
  expect(() => dyckThreeMapper("[()][")).toThrow(RangeError);
});

test("typedDyckWordRecognizer", () => {
  const r = typedDyckWordRecognizer("(", ")", "[", "]", "{", "}");
  
  expect(r("")).toBe(true);
  expect(r("[()][]")).toBe(true);
  expect(r("[()][")).toBe(false);
  expect(r("][")).toBe(false);
});
