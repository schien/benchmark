# traverse 1,000,000 elements in a Uint32Array
Here is the result on my Macbook Pro, ordered by execution time.

| script | time (in ms) |
| --- | --- |
| test_for_loop | 1.775964 |
| test_foreach | 10.334216 |
| test_some | 10.440896 |
| test_reduce_right | 10.731081 |
| test_reduce | 11.222672 |
| test_every | 12.373693 |
| test_keys | 13.532279 |
| test_values | 13.813502 |
| test_for_of | 13.947856 |
| test_entries | 22.72798 |
| test_for_in | 93.659945 |

Test result can be generate by executing `./run_tests.sh`.

## for loop
Using index value to access `TypedArray` is still the fastest way.
- test_for_loop : 1.775964
```javascript
// kInitValue is a Uint32Array with generated content
// kDataLength is the size of kInitValue

let dummy = 0;

for (let i = 0; i < kDataLength; ++i) {
  dummy ^= kInitValue[i];
}
```

## TypedArray.forEach(), TypedArray.every(), TypedArray.some(), TypedArray.reduce(), TypedArray.reduceRight()
This group of functions demonstrates the overhead of the function callback.
Surprisingly `TypedArray.reduceRight()` has competitive performance with others (unlike `Array.reduceRight()`).
- test_foreach : 10.334216
- test_some : 10.440896
- test_reduce_right : 10.731081
- test_reduce : 11.222672
- test_every : 12.373693
```javascript
// kInitValue is a Uint32Array with generated content

let dummy = 0;

kInitValue.forEach(v=>dummy ^= v);

kInitValue.every(v=>{ dummy ^= v; return true; });

kInitValue.some(v=>{ dummy ^= v; return false; });

dummy = kInitValue.reduce((p, v)=>p^v);

dummy = kInitValue.reduceRight((p, v)=>p^v);
```

## for..of loop, TypedArray.keys(), TypedArray.values(), TypedArray.entries()
This group of functions shows that iterator is slightly slower than the callback function
`TypedArray.entries()` is slower than others because an array is created in every iteration.
- test_keys : 13.532279
- test_values : 13.813502
- test_for_of : 13.947856
- test_entries : 22.72798
```javascript
// kInitValue is a Uint32Array with generated content

let dummy = 0;

for (const v of kInitValue) {
  dummy ^= v;
}

for (const k of kInitValue.keys()) {
  dummy ^= kInitValue[k];
}

for (const v of kInitValue.values()) {
  dummy ^= v;
}

for (const [, v] of kInitValue.entries()) {
  dummy ^= v;
}
```

## for..in loop
`for..in` on a `TypedArray` instead of `TypedArray.keys()` has worst performance.
Look into the V8 implementation, an array of string for all the keys will be created in this case.
This creates a huge overhead since number-to-string conversion is applied on all index value.
- test_for_in : 93.659945
```javascript
// kInitValue is a Uint32Array with generated content

let dummy = 0;

for (const v of kInitValue) {
  dummy ^= v;
}
```
