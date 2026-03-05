# balanced-parentheses

*Exploring the generation of words in Dyck Languages*

### unstated constraints

- bijection, which means no duplicates
- finite number for every finite pair or triple, which rules out certain mappings

### potential exercises

- prove that this generation can never produce two words with the same rendering but different composition.
  - discover that `ww*` is not helpful for generating a unique mapping
- prove that a nested for loop cannot work
- parse a dyck word/validate a dick word using the construction
- every non-empty dyck word has an intial word of the form `X...Y` followed by empty or another dyck word this should facilitate parsing.
- mapping pairs to positives, the reverse mapping
- dyck languages with depth limits


### bibliography

> “In the theory of formal languages of computer science, mathematics, and linguistics, a Dyck word is a balanced string of brackets. The set of Dyck words forms a Dyck language. The simplest, Dyck-1, uses just two matching brackets, e.g. ( and ).”
--[Wikipedia][dyck]

[dyck]: https://en.wikipedia.org/wiki/Dyck_language

> “In days of yore, it was common to ask junior programmers a ‘fizzbuzz’ question to test extremely basic ability to write code.” One such question was,  “Write a function that takes as its argument a string, and returns whether the string contains balanced parentheses.”
--[Alice and Bobbie and Sharleen and Dyck]

[Alice and Bobbie and Sharleen and Dyck]: https://raganwald.com/2018/11/14/dyck-joke.html

> “The relationship between the types of machines that recognize valid expressions in a language, classes of computation, and classes of language grammars is extremely interesting, even if the some of the essays written about it are brutal.”
--[A Brutal Look at Balanced Parentheses, Computing Machines, and Pushdown Automata]

[A Brutal Look at Balanced Parentheses, Computing Machines, and Pushdown Automata]: https://raganwald.com/2019/02/14/i-love-programming-and-programmers.html

> "Pattern Matching and Recursion" approaches balanced parentheses from the perspective recursively defining words in the language
--[Pattern Matching and Recursion]

[Pattern Matching and Recursion]: https://raganwald.com/2018/10/17/recursive-pattern-matching.html
