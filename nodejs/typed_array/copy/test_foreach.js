const { kInitValue, kDataLength, createMark, verdict } = require('../benchmark_setup');

let {begin, end} = createMark(__filename);

let target;

begin();

target = new Uint32Array(kDataLength);
kInitValue.forEach((v, idx)=>target[idx] = v);

end();

verdict(target);
