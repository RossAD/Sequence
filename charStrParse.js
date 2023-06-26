import * as fs from 'node:fs';
import { createRequire } from 'module'
const require = createRequire(import.meta.url);

const Nodehun = require('nodehun');
const affix = fs.readFileSync('./node_modules/dictionary-en/index.aff');
const dictionary = fs.readFileSync('./node_modules/dictionary-en/index.dic');

const nodehun = new Nodehun(affix, dictionary);

async function wordsFromStringPermRecurse(str, wordArray = null) {
  try {
    // Simple type check for input arguments.
    if (typeof str !== "string") {
      throw new Error("1st argument must be a string.");
    }
    if (wordArray && !Array.isArray(wordArray)) {
      throw new Error("[optional] If 2nd argument provided, must be an array of strings.");
    }
    console.time("permPerformance");
    // Used a set so only unique words are stored in the result.
    let result = new Set();
    // Some english dictionaries contain single letters outside of spoken english
    // this array is used to remove any other single letter returns. 
    const validSingleChar = ["a", "i"];
    // Recursive function to find all combinations of letters.
    function nextLetter(stringArray, stringLength, key, used) {
      //Once a particular path of permutations has reached the length of the original string,
      //stop the particular recursion path.
      if(key.length === stringLength){
        return;
      }
      for(let i = 0; i < stringLength; i++) {
        // Check by index value if character has been used, add permutation to results.
        if(used.indexOf("" + i) < 0) {
          result.add(key + stringArray[i]);
          nextLetter(stringArray, stringLength, key + stringArray[i], used + i);
        }
      }
    }
    let stringArray = str.split("");
    let stringLength = stringArray.length;
    // Iterate though each letter, add to result set and start recursive permutations for each.
    for (let i = 0; i < stringLength; i++) {
      result.add(stringArray[i]);
      nextLetter(stringArray, stringLength, stringArray[i], "" + i);
    }
    // Check permutations against installed dictionary or supplied array of valid words,
    // remove invalid permutations.
    if (wordArray) {
      for (const word of result) {
        if (!wordArray.includes(word)) {
          result.delete(word);
        }
      } 
    } else {
      for (const word of result) {
        if (!(await nodehun.spell(word)) || (word.length < 2 && !validSingleChar.includes(word))) {
          result.delete(word);
        }
      }
    }
    console.timeEnd("permPerformance");
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    console.log('String permutation function complete.');
  }
}
const str = "oogdasd";

wordsFromStringPermRecurse(str);

// Optionally you may supply your own array of reference words which will be
// used instead of the supplied english dictionary dependency. In that case,
// comment out line 77 and uncomment line 82 - 87.

// const words = [
//   'go',   'do',   'goo',
//   'dog',  'god',  'odd',
//   'dodo', 'good'
// ];
// wordsFromStringPermRecurse(str, words);

export { wordsFromStringPermRecurse };
