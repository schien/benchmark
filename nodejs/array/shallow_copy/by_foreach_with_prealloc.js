const { kInitValue, kDataLength, createMark, verdict } = require('./benchmark_setup');

let {begin, end} = createMark(__filename);

let target;
begin();
target = new Array(kDataLength);
kInitValue.forEach((v, i)=>target[i] = v);
end();
verdict(target);
