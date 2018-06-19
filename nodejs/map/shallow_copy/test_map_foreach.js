const { kInitValue, createMark, verdict } = require('./benchmark_setup');

let { begin, end } = createMark(__filename);

begin();

let target = new Map();

kInitValue.forEach((v, k)=>target.set(k, v));

end();

//verdict(target);
