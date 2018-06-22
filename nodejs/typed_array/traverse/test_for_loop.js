const { kInitValue, kDataLength, createMark } = require('../benchmark_setup');

let {begin, end} = createMark(__filename);

let dummy = 0;

begin();

for (let i = 0; i < kDataLength; ++i) {
  dummy ^= kInitValue[i];
}

end();
