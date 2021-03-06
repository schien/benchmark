const { kInitValue, kDataLength, kDataSource, createMark } = require('../benchmark_setup');

let { begin, end } = createMark(__filename);

let dummy = 0;

begin();

for (let k of kInitValue.keys()) {
  dummy ^= kInitValue.get(k);
}

end();
