const { kInitValue, kDataLength, createMark } = require('../benchmark_setup');

let {begin, end} = createMark(__filename);

let dummy;

begin();

dummy = kInitValue.reduce((p, v)=>p^v);

end();
