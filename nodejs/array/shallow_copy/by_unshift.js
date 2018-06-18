const { kInitValue, kDataLength, createMark, verdict } = require('./benchmark_setup');

let {begin, end} = createMark(__filename);

let target;
begin();
target = [];
for (let i = kDataLength-1; i >= 0 ; --i) {
  target.unshift(kInitValue[i]);
}
end();
verdict(target);
