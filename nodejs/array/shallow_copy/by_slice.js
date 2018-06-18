const { kInitValue, kDataLength, createMark, verdict } = require('./benchmark_setup');

let {begin, end} = createMark(__filename);

let target;

begin();

target = kInitValue.slice(0);

end();

verdict(target);
