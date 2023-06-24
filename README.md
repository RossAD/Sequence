# String Permutations into English Words

## Description

Simple function to take an input of a string of letters and output a list of all possible
english words that can be made out of it.

## Getting Started

### Dependencies

* Node v18.16.0
* NPM v9.5.1

### Installing
NOTE: Dependencies are not strictly needed, but I took the liberty of adding the ability
      to install and use an english language dictionary for pulling words from the letter
      permutations.

* [Optional] `npm install` or `npm i`
* If you choose NOT to install the dependencies simply comment out lines 1 - 9

### Executing program

* Option 1 : You may import the function as a module
```
import { wordsFromStringPermRecurse } from "charStrParse.js";

const words = [
  'go',   'do',   'goo',
  'dog',  'god',  'odd',
  'dodo', 'good'
];

wordsFromStringPermRecurse("oogd", words);

// Or you may use the supplied dictionary and omit the optional word array.

wordsFromStringPermRecurse("oogd");

```
* Option 2 : Update the variables at lines 65 and 66 and run directly from the command line.
             Again, you may omit the optional second argument of a reference array of words and the installed
             dictionary will be used to generate resulting list of english words from the string
             permutations.
```
node charStrParse.js
```
### Run unit tests

* I have included some simple unit tests that may be run using Test Runner includded with Node.JS
```
npm test
```
or
```
node --test
```

## Authors

Ross A Davis
