# traverse 1,000,000 elements
Here is the result on my Macbook Pro, ordered by execution time.

| script | time (in ms) |
| --- | --- |
| test_subscript| 2.021002 |
| test_some | 10.213871 |
| test_every | 10.827099 |
| test_reduce | 11.252225 |
| test_foreach | 11.302998 |
| test_keys | 14.667186 |
| test_for_of | 15.023864 |
| test_entries | 31.973179 |
| test_reduce_right | 47.00332 |

Test result can be generate by executing `./run_tests.sh`.

## subscript operator []
`[]` operator is the fastest way to iterate though the entire array, I guess VM can calculate the memory location by adding offset.
- test_subscript : 2.021002
```javascript
var dummy = 0;

for (let i = 0; i < kDataLength; ++i) {
  dummy ^= kInitValue[i];
}
```

## Array.forEach(), Array.reduce(), Array.some(), Array.every()
This group demonstrates the additional function call overhead on each element.
- test_some : 10.213871
- test_every : 10.827099
- test_reduce : 11.252225
- test_foreach : 11.302998
```javascript
var dummy = 0;

kInitValue.forEach((v)=>dummy^=v);

dummy = kInitValue.reduce((a,v)=>a^v);

kInitValue.some((v)=>{dummy^=v; return false});

kInitValue.every((v)=>{dummy^=v; return true});
```

## for..of loop, Array.keys, Array.entries
This group demonstrates the overhead of iterator.
P.S. NodeJS doesn't support Array.values() but I guess it'll have very similar result as `for..of` loop.
- test_keys : 14.667186
- test_for_of : 15.023864
- test_entries : 31.973179
```javascript
var dummy = 0;

for (let v of kInitValue) {
  dummy ^= v;
}

for (let k of kInitValue.keys()) {
  dummy ^= kInitValue[k];
}

for (let entry of kInitValue.entries()) {
  dummy ^= entry.value;
}
```

## Array.reduceRight()
Computer have an assumption that a program will access a consecutive memory from the beginning to the end.
Not doing so will cause cache miss and you'll hit the wall of accessing memory.
- test_reduce_right : 47.00332
```javascript
var dummy = 0;

dummy = kInitValue.reduceRight((a,v)=>a^v);
```
