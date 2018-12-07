# array-sorter

[![build status](https://travis-ci.org/croweman/array-sorter.svg)](https://travis-ci.org/croweman/array-sorter) [![npm version](https://badge.fury.io/js/array-sorter.svg)](https://www.npmjs.com/package/array-sorter)

Node module for sorting an array of objects by one or more properties in any order. Multiple properties and custom comparison functions can be used.

## Installation

With [npm](http://npmjs.org)

```bash
$ npm install array-sorter --save
```

## Usage

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

## Cache - cache-memory object

Object is used to create cacher instances, default configuration variables and scheduled object cleanup.

## create

```js
let cacher = require('cache-memory')
    .create([options]);
```

Creates a new cacher instance.

### options
 - `clone`: (default: `true`) Defines whether objects should be cloned when set in and retrieved from cache.
 - `id`: The id of the cacher (string value).
 - `storeUndefinedObjects`: (default: false) Defines whether undefined objects should be stored in memory.
 - `ttl`: (default: `0`) Defines in seconds how long an object should be stored in memory.
   `0` = Forever
 - `hit`: Function called §every time an object is retrieved from cache.
 - `miss`: Function called every time an object is not from cache.
 - `added`: Function called every time an object is added to cache.
 - `removed`: Function called every time an object is removed from cache.
 - `count`: Function called every time an object is added or removed from cache.

** hit, miss, added, removed functions are all called with the following object structure.

```js
{
  id: 'some-id',
  key: 'some-key'
}
```

** count function is called with the following object structure.

```js
{
  id: 'some-id',
  count: 123
}
```

## clone

```js
require('cache-memory')
    .clone(false);
```

Turns off object cloning (default `true`).

## storeUndefinedObjects

```js
require('cache-memory')
    .storeUndefinedItems(true);
```

Allows undefined objects to be stored in cache (default `false`).

## cleanup

```js
require('cache-memory')
    .cleanup(60);
```

Forces expired objects to be removed from cache every `60` seconds.  By default `no cleanup` is performed.

## clear

```js
require('cache-memory')
  .clear();
```

Clears the in memory cache of all active cache instances.

## cachers

```js
let cachers = require('cache-memory').cachers();
```

Gets all active cache instances.

## cacher

```js
let cacher = require('cache-memory').cacher('snacks');
```

Gets an active cacher by it's id.

## stats

```js
let stats = require('cache-memory').stats();
```

Gets an array of stats across all active cachers.

```js
[
  {
    id: '1',
    stats: {
      count: 5,
      hits: 17123,
      misses: 57,
      hitRate: 0.9966821885913854
    }
  }
]
```

## dispose

```js
require('cache-memory').dispose();
```

Clears all in memory cacher instances and also clears the cleanup task if defined using the `cleanup` function.


## Cache - created cache-memory instance

It's functions are defined below.

## get

```js
let obj = cache.get(key, [options]);
```

Gets an object from cache, undefined will be returned if object does not exist.

### options
 - `clone`: (default: `true`) Defines whether objects should be cloned when set in and retrieved from cache.
 - `id`: The id of the cacher (string value).
 - `storeUndefinedObjects`: (default: `false`) Defines whether undefined objects should be stored in memory.
 - `ttl`: (default: `0`) Defines in seconds how long an object should be stored in memory.
   `0` = Forever
 - `hit`: Function called every time an object is retrieved from cache.
 - `miss`: Function called every time an object is not from cache.
 - `added`: Function called every time an object is added to cache.
 - `removed`: Function called every time an object is removed from cache.
 - `count`: Function called every time an object is added or removed from cache.

** hit, miss, added, removed functions are all called with the following object structure.

```js
{
  id: 'some-id',
  key: 'some-key'
}
```

** count function is called with the following object structure.

```js
{
  id: 'some-id',
  count: 123
}
```

## getExpiry

```js
let expiry = cache.getExpiry(key);
```

Gets the expiry DateTime of an object in cache, undefined is returned if object is not found.

## set

```js
cache.set(key, value, [options]);
```

Stores an object in cache.

## options
 - `storeUndefinedObjects`: (default: global or instance level definition) Defines whether undefined objects should be stored in memory.
 - `ttl`: (default: global or instance level definition) Defines in seconds how long an object should be stored in memory.
   `0` = Forever

If 'storeUndefinedObjects' is false. undefined, null and objects with an IsNull function that returns true will not be stored.

## getAndSet v2.*

Version 2.* of the modules getAndSet function is an `async` function

### async getAndSet

```js
async function getter() {
  return 'hello-world-' + Math.random(0, 100);
}

await cache.getAndSet(key, getter, [options]);
```

Gets and sets an object in cache.  The getAndSet function is a `generator` function so should be yielded or Promisified etc.

### options
 - `storeUndefinedObjects`: (default: global or instance level definition) Defines whether undefined objects should be stored in memory.
 - `ttl`: (default: global or instance level definition) Defines in seconds how long an object should be stored in memory.
   `0` = Forever

## getAndSet v1.*

Version 1.* of the modules getAndSet function is a `generator` function

### * getAndSet

```js
yield* cache.getAndSet(key, [options]);
```

Gets and sets an object in cache.  The getAndSet function is a `generator` function so should be yielded or Promisified etc.

### options
 - `generator`: A generator function that will be yielded to return the object value to store in cache.
 - `storeUndefinedObjects`: (default: global or instance level definition) Defines whether undefined objects should be stored in memory.
 - `ttl`: (default: global or instance level definition) Defines in seconds how long an object should be stored in memory.
   `0` = Forever

## clear

```js
cache.clear();
```

Removes all objects from the cache instance.

## remove

```js
cache.remove(key);
```

Remove the object from cache.

## stats

```js
let stats = cache.stats();
```

Gets the stats for the cache instance.

Example return value:

```js
{
  count: 5,
  hits: 17123,
  misses: 57,
  hitRate: 0.9966821885913854
}
```

## keys

```js
let keys = cache.keys();
```

Gets all keys for objects stored in the cache instance.

## options

```js
let options = cache.options();
```

Gets all configured options for a cache instance.

Example return value:

```js
{
  ttl: 60,
  clone: true,
  storeUndefinedObjects: false
}
```

## License

(MIT)

Copyright (c) 2017 Lee Crowe

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