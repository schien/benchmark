# check 2,000,000 keys (string, same length, unique), half of them is in the table
Here is the result on my Macbook Pro, ordered by execution time.

| script | time (in ms) |
| --- | --- |
| test_obj_hasownproperty_found | 54.579246 |
| test_obj_hasownproperty_not_found | 54.827294 |
| test_obj_subscript_found | 57.574798 |
| test_obj_subscript_not_found | 60.617426 |
| test_map_has_found | 192.498652 |
| test_map_get_found | 196.870336 |
| test_map_has_not_found | 325.431886 |
| test_map_get_not_found | 341.721516 |

Test result can be generate by executing `./run_tests.sh`.

## Object.hasOwnProperty(), Object subscript operator []
It surprises me that key search in `Object` is faster than `Map` on V8 engine.
From the profiling result the major different is in the javascript built-in function: `ObjectPrototypeHasOwnProperty` v.s. `FindOrderedHashMapEntry`.
My guess is that the Object implementation is highly optimized for looking up string type of key.
Using both `Object.hasOwnProperty()` and `operator []` have similar performance.
However using `operator []` for non-existing key is slightly slower.
- test_obj_hasownproperty_found : 54.579246
- test_obj_hasownproperty_not_found : 54.827294
- test_obj_subscript_found : 57.574798
- test_obj_subscript_not_found : 60.617426
```javascript
// kInitObjValue is the Object with generated key-value pairs
// kDataSource is the array contains all the key-value pairs
// KDataLength is the size of the array

let dummy = true;

for (let i = 0; i < kDataLength; ++i) {
  dummy &= kInitObjValue.hasOwnProperty(kDataSource[i][0]);
}

for (let i = 0; i < kDataLength; ++i) {
  dummy &= (undefined != kInitObjValue[kDataSource[i][0]]);
}
```

## Map.has(), Map.get()
Using `Map.has()` is slightly faster than `Map.get()` because one comparison to undefined is saved.
Also, searching for a non-existing key in a Map is slower.
This is obvious because find is a short-circuit operation.
- test_map_has_found : 192.498652
- test_map_get_found : 196.870336
- test_map_has_not_found : 325.431886
- test_map_get_not_found : 341.721516
```javascript
let dummy = true;

for (let i = 0; i < kDataLength; ++i) {
  dummy &= kInitValue.has(kDataSource[i][0]);
}

for (let i = 0; i < kDataLength; ++i) {
  dummy &= (undefined != kInitValue.get(kDataSource[i][0]));
}
```
