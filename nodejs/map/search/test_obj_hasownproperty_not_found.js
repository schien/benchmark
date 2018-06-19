const { kInitObjValue, kDataLength, kNotFoundKey, createMark } = require('./benchmark_setup');

let { begin, end } = createMark(__filename);

let dummy = false;

begin();

for (let i = 0; i < kDataLength; ++i) {
  dummy |= kInitObjValue.hasOwnProperty(kNotFoundKey[i][0]);
}

end();
