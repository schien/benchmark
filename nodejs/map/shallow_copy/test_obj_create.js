const { kInitObjValue, createMark, verdict } = require('./benchmark_setup');

let { begin, end } = createMark(__filename);

begin();

let target = Object.create(Object.prototype, Object.getOwnPropertyDescriptors(kInitObjValue));

end();

//verdict(target);
