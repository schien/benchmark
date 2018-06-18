const { kInitValue, kDataLength, createMark } = require('./benchmark_setup');

let {begin, end} = createMark(__filename);

var dummy = 0;
begin();
for (let entry of kInitValue.entries()) {
  dummy ^= entry.value;
}
end();
