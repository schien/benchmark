const { kInitObjValue, kDataLength, kDataSource, createMark } = require('./benchmark_setup');

let { begin, end } = createMark(__filename);

let dummy = 0;

begin();

for (let key in kInitObjValue) {
  dummy ^= kInitObjValue[key];
}

end();
