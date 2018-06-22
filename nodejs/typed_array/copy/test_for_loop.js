const { kInitValue, kDataLength, createMark, verdict } = require('../benchmark_setup');

let {begin, end} = createMark(__filename);

let target;

begin();

target = new Uint32Array(kDataLength);
for (let i = 0; i < kDataLength; ++i) {
  target[i] = kInitValue[i];
}

end();

verdict(target);
