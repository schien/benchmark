const { kInitValue, kDataLength, createMark, verdict } = require('../benchmark_setup');

let {begin, end} = createMark(__filename);

let target;

begin();

target = new Uint32Array(kDataLength);
target.set(kInitValue);

end();

verdict(target);
