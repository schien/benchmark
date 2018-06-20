const { kInitValue, kDataLength, createMark } = require('../benchmark_setup');

let {begin, end} = createMark(__filename);

var dummy = 0;
begin();
for (let k of kInitValue.keys()) {
  dummy ^= kInitValue[k];
}
end();
