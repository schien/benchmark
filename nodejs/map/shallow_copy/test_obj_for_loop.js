const { kDataLength, kDataSource, createMark, verdict } = require('../benchmark_setup');

let { begin, end } = createMark(__filename);

begin();

let target = {};

for (let i = 0; i < kDataLength; ++i) {
  const entry = kDataSource[i];
  target[entry[0]] = entry[1];
}

end();

//verdict(target);
