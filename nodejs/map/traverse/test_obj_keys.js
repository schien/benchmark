const { kInitObjValue, kDataLength, kDataSource, createMark } = require('./benchmark_setup');

let { begin, end } = createMark(__filename);

let dummy = 0;

begin();

const keys = Object.keys(kInitObjValue);

for (let i = 0; i < kDataLength; ++i) {
  dummy ^= kInitObjValue[keys[i]];
}

end();
