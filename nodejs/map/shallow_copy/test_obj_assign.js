const { kInitObjValue, createMark, verdict } = require('./benchmark_setup');

let { begin, end } = createMark(__filename);

begin();

let target = Object.assign({}, kInitObjValue);

end();

//verdict(target);
