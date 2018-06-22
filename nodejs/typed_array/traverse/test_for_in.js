const { kInitValue, kDataLength, createMark } = require('../benchmark_setup');

let {begin, end} = createMark(__filename);

let dummy = 0;

begin();

for (const k in kInitValue) {
  dummy ^= kInitValue[k];
}

end();
