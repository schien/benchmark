const { kInitValue, kDataLength, createMark, verdict } = require('../benchmark_setup');

let {begin, end} = createMark(__filename);

let target;

begin();

target = new Uint32Array(kDataLength);

let i = 0;
for (const v of kInitValue) {
  target[i++] = v;
}

end();

verdict(target);
