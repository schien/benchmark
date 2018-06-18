# shallow copy 1,000,000 elements
Here is the result on my Macbook Pro, ordered by execution time.

| script | time (in ms) |
| --- | --- |
| by_slice | 4.386172 |
| by_concat | 4.927724 |
| by_subscript_with_prealloc | 6.72031 |
| by_foreach_with_prealloc | 16.992311 |
| by_subscript | 22.08576 |
| by_push | 22.675969 |
| by_foreach | 31.326695 |
| by_for_of | 34.98356 |
| by_from | 112.166318 |
| by_map | 121.315835 |
| by_unshift | 375417.257914 |

Test result can be generate by executing `./run_tests.sh`.

## Array.slice(), Array.concat()
These two operations are fastest because VM can allocate larger buffer and copy large chuck of memory.
- by_slice : 4.386172
- by_concat : 4.927724
```javascript
// kInitValue is the source array

target = kInitValue.slice(0);

target = kInitValue.concat();
```

## new Array(size) and []
Allocate enough buffer size (via `new Array(buffer_size)` will save about 16 ms in this case, comparing to the empty array initialization.
- by_subscript_with_prealloc : 6.72031
- by_foreach_with_prealloc : 16.992311
```javascript
// kDataLength is the size of the source array
target = new Array(kDataLength);

for (let i = 0; i < kDataLength; ++i) {
  target[i] = kInitValue[i];
}

kInitValue.forEach((v, i)=>target[i] = v);
```

## subscript operator [], Array.push()
Using forEach is slightly slower that using subscribe to traverse the array because of the additional function call overhead.
Using for..of loop is a bit more slower because of the iterator overhead.
- by_subscript : 22.08576
- by_push : 22.675969
- by_foreach : 31.326695
- by_for_of : 34.98356
```javascript
target = [];

for (let i = 0; i < kDataLength; ++i) {
  target[i] = kInitValue[i];
}

for (let i = 0; i < kDataLength; ++i) {
  target.push(kInitValue[i]);
}

kInitValue.forEach((v, i)=>target[i] = v);

for (let v of kInitValue) {
  target.push(v);
}
```

## Array.from(), Array.map()
`Array.from` might be implemented by map, with buffer allocation optimization.
- by_from : 112.166318
- by_map : 121.315835
```javascript
target = Array.from(kInitValue);

target = kInitValue.map(x => x);
```

## Array.unshift()
This is how badly you can do by inserting element in front of the array.
It will trigger copying of entire array each time you call unshift.
- by_unshift : 375417.257914
```javascript
target = [];

for (let i = kDataLength-1; i >= 0 ; --i) {
  target.unshift(kInitValue[i]);
}
```
