# array-sorter

[![build status](https://travis-ci.org/croweman/array-sorter.svg)](https://travis-ci.org/croweman/array-sorter) [![npm version](https://badge.fury.io/js/array-sorter.svg)](https://www.npmjs.com/package/array-sorter)

Node module for sorting an array of objects by one or more properties in any order. Multiple properties and custom comparison functions can be used.

## Installation

With [npm](http://npmjs.org)

```bash
$ npm i array-sorter
```

## Example Usage

```js
const sorter = require('array-sorter');

const array = [ 
  { firstName: 'bob', surname: 'smith', age: 30 },
  { firstName: 'bob', surname: 'adams', age: 31 },
  { firstName: 'adam', surname: 'aardvark', age: 35 },
  { firstName: 'bob', surname: 'adams', age: 25 }
];

sorter(array)
  .orderBy(x => x.firstName)
  .thenBy(x => x.surname)
  .thenByDescending(x => x.age)
  .sort();

console.log(array);

/* output would be:
  [
    { "firstName": "adam", "surname": "aardvark", "age": 35 },
    { "firstName": "bob", "surname": "adams", "age": 31 },
    { "firstName": "bob", "surname": "adams", "age": 25 },
    { "firstName": "bob", "surname": "smith", "age": 30 }
  ]
*/
```

## API

## create

When creating a sorter object you initialise it with the array to sort.

```js
const array = [];
const sorter(array);
```

You can also provide additional optional `locale` and `options` arguments for string comparisons `localCompare`. 

```js
const array = [];
const sorter(array, 'en', { caseFirst: 'lower' });
```

When initially creating the sorter 3 functions will be exposed by it:

- orderBy
- orderByDescending
- sort

## orderBy

Will add an instruction to order objects in ascending order using the given property filter

```js
sorter.orderBy(x => x.firstName);
```

A custom comparison function can also be provided

```js
sorter.orderBy(x => x.firstName, (a, b) => { return a - b; });
```

This function will expose the following 3 functions:

- thenBy
- thenByDescending
- sort

## orderByDescending

Will add an instruction to order objects in descending order using the given property filter

```js
sorter.orderByDescending(x => x.firstName);
```

A custom comparison function can also be provided

```js
sorter.orderByDescending(x => x.firstName, (a, b) => { return a - b; });
```

This function will expose the following 3 functions:

- thenBy
- thenByDescending
- sort

## thenBy

Will add an additional instruction to sort in ascending order using the given property filter

```js
sorter
  .orderBy(x => x.firstName)
  .thenBy(x => x.surname);
```

A custom comparison function can also be provided

```js
sorter
  .orderBy(x => x.firstName)
  .thenBy(x => x.surname, (a, b) => { return a - b; });
```

This function will expose the following 3 functions:

- thenBy
- thenByDescending
- sort

## thenByDescending

Will add an additional instruction to sort in descending order using the given property filter

```js
sorter
  .orderBy(x => x.firstName)
  .thenByDescending(x => x.surname);
```

A custom comparison function can also be provided

```js
sorter
  .orderBy(x => x.firstName)
  .thenByDescending(x => x.surname, (a, b) => { return a - b; });
```

This function will expose the following 3 functions:

- thenBy
- thenByDescending
- sort

## sort

Executing the function will sort the array based on the given instructions.

```js
sorter
  .orderBy(x => x.firstName)
  .sort();
```  

## License

(MIT)

Copyright (c) 2018 Lee Crowe

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.