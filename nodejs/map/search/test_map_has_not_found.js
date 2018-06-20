const { kInitValue, kDataLength, kNotFoundKey, createMark } = require('../benchmark_setup');

let { begin, end } = createMark(__filename);

let dummy = false;

begin();

for (let i = 0; i < kDataLength; ++i) {
  dummy |= kInitValue.has(kNotFoundKey[i][0]);
}

end();
