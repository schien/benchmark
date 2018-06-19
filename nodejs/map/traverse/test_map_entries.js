const { kInitValue, kDataLength, kDataSource, createMark } = require('./benchmark_setup');

let { begin, end } = createMark(__filename);

let dummy = 0;

begin();

for (let e of kInitValue.entries()) {
  dummy ^= e[1];
}

end();
