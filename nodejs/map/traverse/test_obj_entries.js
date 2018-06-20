const { kInitObjValue, kDataLength, kDataSource, createMark } = require('../benchmark_setup');

let { begin, end } = createMark(__filename);

let dummy = 0;

begin();

const entries = Object.entries(kInitObjValue);
for (let i = 0; i < kDataLength; ++i) {
  dummy ^= entries[i][1];
}

end();
