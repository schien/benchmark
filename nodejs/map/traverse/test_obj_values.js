const { kInitObjValue, kDataLength, kDataSource, createMark } = require('../benchmark_setup');

let { begin, end } = createMark(__filename);

let dummy = 0;

begin();

const values = Object.values(kInitObjValue);

for (let i = 0; i < kDataLength; ++i) {
  dummy ^= values[i];
}

end();
