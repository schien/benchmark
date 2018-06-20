const { kInitValue, kDataLength, createMark } = require('../benchmark_setup');

let {begin, end} = createMark(__filename);

var dummy = 0;
begin();
dummy = kInitValue.reduceRight((a,v)=>a^v);
end();
