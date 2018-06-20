const { kDataLength, kDataSource, createMark, verdict } = require('../benchmark_setup');

let { begin, end } = createMark(__filename);

begin();

let target = new Map();

for (let i = 0; i < kDataLength; ++i) {
  const entry = kDataSource[i];
  target.set(entry[0], entry[1]);
}

end();

//verdict(target);
