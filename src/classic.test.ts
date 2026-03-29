
function untypedRecognizerWithStack (word: string): boolean {   
  const parens: string[] = [];

  for (let cursor = 0; cursor < word.length; ++cursor) {
    const paren = word[cursor];
    if (paren === '(') {
      parens.push(paren);
    }
    else if (paren === ')' && parens.length === 0) {
      return false;
    }
    else {
      parens.pop();
    }
  }

  return parens.length === 0;
}

function untypedRecognizerWithCounter (candidate: string): boolean {   
  let openCount: number = 0;

  for (let cursor = 0; cursor < candidate.length; ++cursor) {
    if (openCount < 0) {
      return false;
    }
    else if (candidate[cursor] === '(') {
      openCount++;
    }
    else if (candidate[cursor] === ')') {
			openCount--;
    }
    else return false;
  }

  return openCount === 0;
}

function untypedRecognizerWithRemove (candidate: string): boolean {
  let wip = candidate;
  let lastLength;

  do {
    lastLength = wip.length;
    wip = wip.replaceAll('()', '');
  }
  while(wip.length < lastLength);

  return wip === '';
}

test("recognizers", () => {
  for (const recognizer of [untypedRecognizerWithStack, untypedRecognizerWithCounter, untypedRecognizerWithRemove]) {
    expect(recognizer('')).toEqual(true);
    expect(recognizer('(')).toEqual(false);
    expect(recognizer(')')).toEqual(false);
    expect(recognizer('()')).toEqual(true);
    expect(recognizer('(()')).toEqual(false);
    expect(recognizer('())')).toEqual(false);
    expect(recognizer('()))')).toEqual(false);
    expect(recognizer('(())')).toEqual(true);
    expect(recognizer('(())(')).toEqual(false);
    expect(recognizer('(())()')).toEqual(true);
  }
});

const isBalanced = untypedRecognizerWithRemove;

function insertBalancedWord (insertion: string, index: number, word: string) {
  if (!isBalanced(insertion)) throw new RangeError();
  if (index < 0 || index > word.length) throw new RangeError();
  if (!isBalanced(word)) throw new RangeError();

  return `${word.slice(0, index)}${insertion}${word.slice(index)}`;
}

test("insertBalancedWord", () => {
  expect(() => insertBalancedWord('()', -1, '')).toThrow(RangeError);
  expect(() => insertBalancedWord('()', 5, '()()')).toThrow(RangeError);
  expect(() => insertBalancedWord('()', 0, ')()')).toThrow(RangeError);

  expect(insertBalancedWord('()', 0, '()')).toBe('()()');
  expect(insertBalancedWord('()', 1, '()')).toBe('(())');
  expect(insertBalancedWord('()', 2, '()')).toBe('()()');
  expect(insertBalancedWord('()()', 1, `()()`)).toBe(`(()())()`);
  expect(insertBalancedWord('(()())', 2, `()`)).toBe(`()(()())`); 
});

function removeBalancedWord (removeable: string, index: number, word: string) {
  if (!isBalanced(removeable)) throw new RangeError();
  if (index < 0 || index > word.length) throw new RangeError();
  if (!isBalanced(word)) throw new RangeError();
  if (word.slice(index, index + removeable.length) != removeable) throw new RangeError(`${word}: ${word.slice(index, index + removeable.length)} !== ${removeable}`);

  return `${word.slice(0, index)}${word.slice(index + removeable.length)}`;
}

test("removeBalancedWord", () => {
  expect(() => removeBalancedWord('()()', 0, '')).toThrow(RangeError);
  expect(() => removeBalancedWord('()()', 0, '(()())()')).toThrow(RangeError);
  expect(() => removeBalancedWord(')(', 2, '(()())()')).toThrow(RangeError);

  expect(removeBalancedWord('()()', 0, '()()')).toBe('');
  expect(removeBalancedWord('()()', 1, '(()())()')).toBe('()()');
  expect(removeBalancedWord('(()())()', 0, '(()())()')).toBe('');
  expect(removeBalancedWord('()', 6, '(()())()')).toBe('(()())');
});

const ε = '';

test("ε", () => {
  expect(insertBalancedWord(ε, 0, '(()())()')).toBe('(()())()');
  expect(insertBalancedWord(ε, 3, '(()())()')).toBe('(()())()');
  expect(insertBalancedWord(ε, 6, '(()())()')).toBe('(()())()');
  expect(insertBalancedWord(ε, 8, '(()())()')).toBe('(()())()');

  expect(insertBalancedWord('()', 0, ε)).toBe('()');
  expect(insertBalancedWord('(()())', 0, ε)).toBe('(()())');

  expect(removeBalancedWord(ε, 0, '(()())()')).toBe('(()())()');
  expect(removeBalancedWord(ε, 3, '(()())()')).toBe('(()())()');
  expect(removeBalancedWord(ε, 6, '(()())()')).toBe('(()())()');
  expect(removeBalancedWord(ε, 8, '(()())()')).toBe('(()())()');
});

function balancedPairAt (index: number, word: string) {
  if (index < 0 || index > word.length) throw new RangeError();
  if (!isBalanced(word)) throw new RangeError();
 
  let openCount: number = 0;

  for (let cursor = index; cursor < word.length; ++cursor) {
    if (openCount < 0) {
      return '';
    }
    else if (word[cursor] === '(') {
      openCount++;
    }
    else if (word[cursor] === ')') {
			openCount--;
    }
    else return '';

    if (openCount === 0) return word.slice(index, cursor + 1);
  }

  return '';
}

test("balancedPairAt", () => {
  expect(balancedPairAt(0, '')).toBe('');
  expect(balancedPairAt(0, '()')).toBe('()');
  expect(balancedPairAt(1, '()')).toBe('');
  expect(balancedPairAt(0, '(()())()')).toBe('(()())');
  expect(balancedPairAt(1, '(()())()')).toBe('()');
  expect(balancedPairAt(3, '(()())()')).toBe('()');
  expect(balancedPairAt(6, '(()())()')).toBe('()');
});

function removeBalancedPair (index: number, word: string) {
  if (index < 0 || index > word.length) throw new RangeError();
  if (!isBalanced(word)) throw new RangeError();

  return `${word.slice(0, index)}${word.slice(index + balancedPairAt(index, word).length)}`;
}

test("removeBalancedPair", () => {
  expect(removeBalancedPair(0, '')).toBe('');
  expect(removeBalancedPair(0, '()')).toBe('');
  expect(removeBalancedPair(0, '(()())()')).toBe('()');
  expect(removeBalancedPair(1, '(()())()')).toBe('(())()');
  expect(removeBalancedPair(3, '(()())()')).toBe('(())()');
  expect(removeBalancedPair(6, '(()())()')).toBe('(()())');
});

test("inversions", () => {
  const word = "(()())()";

  expect(insertBalancedWord(balancedPairAt(0, word), 0, removeBalancedPair(0, word))).toBe(word);
  expect(insertBalancedWord(balancedPairAt(1, word), 1, removeBalancedPair(1, word))).toBe(word);
  expect(insertBalancedWord(balancedPairAt(3, word), 3, removeBalancedPair(3, word))).toBe(word);
  expect(insertBalancedWord(balancedPairAt(6, word), 6, removeBalancedPair(6, word))).toBe(word);
});

function insertionsFor (word: string): number[] {
  if (!isBalanced(word)) throw new RangeError();

  const insertions: number[] = [];
  let wordInProgress = word;

  while (wordInProgress !== '') {
    const nextPairIndex = wordInProgress.indexOf('()');

    wordInProgress = removeBalancedPair(nextPairIndex, wordInProgress);
    insertions.unshift(nextPairIndex);
  }

  return insertions;
}

test("insertionsFor", () => {
  expect(insertionsFor('')).toEqual([]);
  expect(insertionsFor('()')).toEqual([0]);
  expect(insertionsFor('()()')).toEqual([0, 0]);
  expect(insertionsFor('(())()')).toEqual([0, 0, 1]);
  expect(insertionsFor('(()())()')).toEqual([0, 0, 1, 1]);
});

function reconstitute (insertions: number[]): string {
  return insertions.reduce(
    (wordInProgress, index) => insertBalancedWord('()', index, wordInProgress),
    ''
  );
}

test("reconstitute", () => {
  expect(reconstitute(insertionsFor(''))).toBe('');
  expect(reconstitute(insertionsFor('()()'))).toBe('()()');
  expect(reconstitute(insertionsFor('(())()'))).toBe('(())()');
  expect(reconstitute(insertionsFor('(()())()'))).toBe('(()())()');
});