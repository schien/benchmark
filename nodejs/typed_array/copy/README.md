# shallow copy 1,000,000 elements from a Uint32Array
Here is the result on my Macbook Pro, ordered by execution time.

| script | time (in ms) |
| --- | --- |
| test_set | 1.790752 |
| test_slice | 1.834922 |
| test_ctor | 1.97297 |
| test_for_loop | 3.389355 |
| test_map | 13.248185 |
| test_foreach | 14.074787 |
| test_for_of | 17.181246 |
| test_filter | 58.75321 |
| test_from | 74.454372 |

Test result can be generate by executing `./run_tests.sh`.

## new TypedArray(), TypedArray.slice(), TypedArray.set(), subscript operator []
TypedArray has excelent performance on ranged copy operation, 2x faster than Array copy.
Using `operator []` to loop through typed array is efficient, but you should use ranged copy operation if possible.
- test_set : 1.790752
- test_slice : 1.834922
- test_ctor : 1.97297
- test_for_loop : 3.389355
```javascript
// kInitValue is a Uint32Array with generated content
// kDataLength is the size of kInitValue

let target;

target = new Uint32Array(kInitValue);

target = kInitValue.slice(0, kDataLength);

target = new Uint32Array(kDataLength);
target.set(kInitValue);

target = new Uint32Array(kDataLength);
for (let i = 0; i < kDataLength; ++i) {
  target[i] = kInitValue[i];
}
```

## TypedArray.forEach(), TypedArray.map(), for..of loop
Comparing to the performance result of Array, accessing TypedArray is still faster.
However the extra function call overhead will be more significant while traversing a large data set.
The result of `for..of` loop demonstrates the overhead of using iterator is larger than function callback.
- test_map : 13.248185
- test_foreach : 14.074787
- test_for_of : 17.181246
```javascript
// kInitValue is a Uint32Array with generated content
// kDataLength is the size of kInitValue

let target;

target = new Uint32Array(kDataLength);
kInitValue.forEach((v, idx)=>target[idx] = v);

target = kInitValue.map(v=>v);

target = new Uint32Array(kDataLength);
let i = 0;
for (const v of kInitValue) {
  target[i++] = v;
}
```

## TypedArray.filter, TypedArray.from()
`TypedArray.filter` is much slower because the javascript engine cannot predict the size of the result array.
The V8 implementation uses a variable length array to hold the result, then copy it to a new TypedArray.
`TypedArray.from` is designed to copy from arbitrary iterable data structure.
Therefore, the benefit of using TypedArray is almost disapeared.
- test_filter : 58.75321
- test_from : 74.454372
```javascript
// kInitValue is a Uint32Array with generated content

let target;

target = kInitValue.filter(()=>true);

target = Uint32Array.from(kInitValue);
```
