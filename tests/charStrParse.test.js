import { wordsFromStringPermRecurse } from "../charStrParse.js";
import { test } from "node:test";
import assert from "node:assert/strict";

test('Single string input, no array of words', async () => {
  const str = "oogd";
  const expectedResult = ['do','dog','go','god','goo','good'];
  const result = await wordsFromStringPermRecurse(str);
  assert.deepStrictEqual(result, new Set(expectedResult));
});

test('String input plus reference input array of words.', async () => {
  const str = "oogd";
  const refWords = ['do','dog','go','god','goo','good','dodo','goofy'];
  const expectedResult = ['do','dog','go','god','goo','good'];
  const result = await wordsFromStringPermRecurse(str, refWords);
  assert.deepStrictEqual(result, new Set(expectedResult));

});

test('Bad input, data type other than string', async () => {
  assert.notDeepStrictEqual(async () => await wordsFromStringPermRecurse(1234), Error);
});

test('Bad input, correct 1st argument of string, bad 2nd argument not an array.', async () => {
  const badRefWords = "I am not an array";
  assert.notDeepStrictEqual(async () => await wordsFromStringPermRecurse('goosd', badRefWords), Error);
});
