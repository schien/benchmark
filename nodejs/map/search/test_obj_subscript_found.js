const { kInitObjValue, kDataLength, kDataSource, createMark } = require('../benchmark_setup');

let { begin, end } = createMark(__filename);

let dummy = true;

begin();

for (let i = 0; i < kDataLength; ++i) {
  dummy &= (undefined != kInitObjValue[kDataSource[i][0]]);
}

end();
