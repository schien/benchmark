# traverse 1,000,000 elements
`[]` operator is the fastest way to iterate though the entire array, I guess VM can calculate the memory location by adding offset.
- test_subscript : 2.021002

This group demonstrates the additional function call overhead on each element.
- test_some : 10.213871
- test_every : 10.827099
- test_reduce : 11.252225
- test_foreach : 11.302998

This group demonstrates the overhead of iterator
- test_keys : 14.667186
- test_for_of : 15.023864
- test_entries : 31.973179

Computer have an assumption that a program will access a consecutive memory from the beginning to the end.
Not doing so will cause cache miss and you'll hit the wall of accessing memory.
- test_reduce_right : 47.00332
