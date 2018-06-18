# shallow copy 1,000,000 elements

These two operations are fastest because VM can allocate larger buffer and copy large chuck of memory.
- by_slice : 4.386172
- by_concat : 4.927724

Allocate enough buffer size (via `new Array(buffer_size)` will save about 16 ms in this case, comparing to the empty array initialization.
- by_subscript_with_prealloc : 6.72031
- by_foreach_with_prealloc : 16.992311

Using forEach is slightly slower that using subscribe to traverse the array because of the additional function call overhead.
Using for..of loop is a bit more slower because of the iterator overhead.
- by_subscript : 22.08576
- by_push : 22.675969
- by_foreach : 31.326695
- by_for_of : 34.98356

`Array.from` might be implemented by map, with buffer allocation optimization.
- by_from : 112.166318
- by_map : 121.315835

This is how badly you can do by inserting element in front of the array.
It will trigger copying of entire array each time you call unshift.
- by_unshift : 375417.257914
