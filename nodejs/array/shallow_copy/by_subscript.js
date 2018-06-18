const { kInitValue, kDataLength, createMark, verdict } = require('./benchmark_setup');

let {begin, end} = createMark(__filename);

let target;
begin();
target = [];
for (let i = 0; i < kDataLength; ++i) {
  target[i] = kInitValue[i];
}
end();
verdict(target);
