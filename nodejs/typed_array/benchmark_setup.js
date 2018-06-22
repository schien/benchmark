const { createMark, DatasetEnum, kSelectedDataset } = require('../benchmark_base');

const kDataLength = (()=>{
  switch (kSelectedDataset) {
    case DatasetEnum.S: return 100;
    case DatasetEnum.M: return 10000;
    case DatasetEnum.L: return 1000000;
  }
})();

const kInitValue = new Uint32Array(kDataLength);

for (let i = 0; i < kDataLength; ++i) {
  kInitValue[i] = i;
}

function verdict(target) {
  if (target === kInitValue || target.buffer == kInitValue.buffer) {
    console.error('not a copy');
    return;
  }
  if (target.length != kDataLength) {
    console.error('length not the same');
    return;
  }
  for (let i = 0 ; i < kDataLength; ++i) {
    if (target[i] !== kInitValue[i]) {
      console.error(`data not the same at ${i}`);
      return;
    }
  }
}

module.exports = {
  kInitValue: kInitValue,
  kDataLength: kDataLength,
  createMark: createMark,
  verdict: verdict,
};
