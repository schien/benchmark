# traverse 1,000,000 value items
Here is the result on my Macbook Pro, ordered by execution time.

| script | time (in ms) |
| --- | --- |
| test_map_foreach | 11.071756 |
| test_map_values | 11.642918 |
| test_map_for_of | 18.033668 |
| test_map_entries | 18.770328 |
| test_obj_values | 69.435737 |
| test_obj_keys | 144.864891 |
| test_obj_for_in | 149.673955 |
| test_map_keys | 191.752183 |
| test_obj_entries | 608.860165 |

Test result can be generate by executing `./run_tests.sh`.

## for..of loop on Map, Map.forEach(), Map.values(), Map.entries()
`Map.forEach()` is the fastest way to traverse Map.
`Map.values()` has comparable performance, however the performance is not as stead as `Map.forEach()`.
I couldn't figure out root cause from the profiling result.
`for..of` loop is slower than `Map.forEach()`, I guess the overhead of iterator is slightly larger than function callback.
`Map.entries()` is surprisingly fast, comparing to `Map.keys()` and `Object.entries()`.
- test_map_foreach : 11.071756
- test_map_values : 11.642918
- test_map_for_of : 18.033668
- test_map_entries : 18.770328
```javascript
// kInitValue is a Map

for (let e of kInitValue) {
  dummy ^= e[1];
}

kInitValue.forEach((v)=>dummy^=v);

for (let v of kInitValue.values()) {
  dummy ^= v;
}

for (let e of kInitValue.entries()) {
  dummy ^= e[1];
}
```

## for..in loop on Object, Object.keys(), Object.values(), Map.keys()
In general, Object operation is slower than Map. However `Map.keys()` is slower than `Object.keys()`.
From the profiling result, it shows that `Map.get()` spend more time running built-in JS function `FindOrderedHashMapEntry` in V8 engine
and subscript operator is mostly implemented in native code.
- test_obj_values : 69.435737
- test_obj_keys : 144.864891
- test_obj_for_in : 149.673955
- test_map_keys : 191.752183
```javascript
// kInitObjValue is an Object and kDataLength is the number of entries

for (let key in kInitObjValue) {
  dummy ^= kInitObjValue[key];
}

const keys = Object.keys(kInitObjValue);
for (let i = 0; i < kDataLength; ++i) {
  dummy ^= kInitObjValue[keys[i]];
}

const values = Object.values(kInitObjValue);
for (let i = 0; i < kDataLength; ++i) {
  dummy ^= values[i];
}

for (let k of kInitValue.keys()) {
  dummy ^= kInitValue.get(k);
}
```

## Object.entries()
Object.entries will copy all the key-value pairs into a new array.
It will spend more time on memory alloc&copy, in addition, GC also kicks in because of the memory pressure.
In comparison, `for..in` loop only do property filtering without any memory alloc&copy.
- test_obj_entries : 608.860165
```javascript
const entries = Object.entries(kInitObjValue);
for (let i = 0; i < kDataLength; ++i) {
  dummy ^= entries[i][1];
}
```
