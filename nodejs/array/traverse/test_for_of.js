const { kInitValue, kDataLength, createMark } = require('../benchmark_setup');

let {begin, end} = createMark(__filename);

var dummy = 0;
begin();
for (let v of kInitValue) {
  dummy ^= v;
}
end();
