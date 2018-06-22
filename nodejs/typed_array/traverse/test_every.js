const { kInitValue, kDataLength, createMark } = require('../benchmark_setup');

let {begin, end} = createMark(__filename);

let dummy = 0;

begin();

kInitValue.every(v=>{ dummy ^= v; return true; });

end();
