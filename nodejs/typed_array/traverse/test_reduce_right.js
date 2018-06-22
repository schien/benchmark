const { kInitValue, kDataLength, createMark } = require('../benchmark_setup');

let {begin, end} = createMark(__filename);

let dummy;

begin();

dummy = kInitValue.reduceRight((p, v)=>p^v);

end();
