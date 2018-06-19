const { kDataSource, createMark, verdict } = require('./benchmark_setup');

let { begin, end } = createMark(__filename);

begin();

let target = new Map(kDataSource);

end();

//verdict(target);
