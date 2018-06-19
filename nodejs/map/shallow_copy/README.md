# shallow copy a hashtable with 1,000,000 key-value pairs
Here is the result on my Macbook Pro, ordered by execution time.

| script | time (in ms) |
| --- | --- |
| test_map_for_loop | 292.511465 |
| test_map_foreach | 363.019234 |
| test_map_ctor_with_array | 377.141649 |
| test_map_ctor_with_map | 432.097287 |
| test_obj_for_loop | 914.825277 |
| test_obj_assign | 1073.927964 |
| test_obj_create | 2871.676087 |
| test_obj_defineproperties | 2914.497246 |

Test result can be generate by executing `./run_tests.sh`.

## for loop on source array, Map.forEach() on source Map
Traversing the source data structure with the fastest way is to copy the value to a new Map.
Unfortunately there is no way in current version of ECMA script to specify the capacity beforehand to reduce the overhead of rehash.
- test_map_for_loop : 292.511465
- test_map_foreach : 363.019234
```javascript
// kInitValue is a Map with generated key-value pairs
// kDataSource is an array contains all the key-value pairs
// KDataLength is the size of the array

let target = new Map();

for (let i = 0; i < kDataLength; ++i) {
  const entry = kDataSource[i];
  target.set(entry[0], entry[1]);
}

kInitValue.forEach((v, k)=>target.set(k, v));
```

## new Map()
Map constructor accepts an array or iterable object.
It uses iterator to traverse the source data structure, so you'll see additional overhead.
- test_map_ctor_with_array : 377.141649
- test_map_ctor_with_map : 432.097287
```javascript
// kInitValue is a Map with generated key-value pairs
// kDataSource is an array contains all the key-value pairs

let target;

target = new Map(kDataSource);

target = new Map(kInitValue);
```

## for loop on source array, Object.assign()
Copying an `Object` is slower than copying a `Map` because of the traversing performance.
Loop through an array is slightly faster than iterate through enumerable properties of an `Object`.
- test_obj_for_loop : 914.825277
- test_obj_assign : 1073.927964
```javascript
// kInitObjValue is an Object with generated key-value pairs
// kDataSource is an array contains all the key-value pairs
// KDataLength is the size of the array

let target = {};

for (let i = 0; i < kDataLength; ++i) {
  const entry = kDataSource[i];
  target[entry[0]] = entry[1];
}

target = Object.assign({}, kInitObjValue);
```

## Object.create(), Object.defineProperties()
Copying an `Object` as an `Object` is much slower than treat it as a hash table.
- test_obj_create : 2871.676087
- test_obj_defineproperties : 2914.497246
```javascript
// kInitObjValue is an Object with generated key-value pairs

let target;

target = Object.create(Object.prototype, Object.getOwnPropertyDescriptors(kInitObjValue));

target = {};
Object.defineProperties(target, Object.getOwnPropertyDescriptors(kInitObjValue));
```
