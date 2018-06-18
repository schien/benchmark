const { kInitValue, kDataLength, createMark, verdict } = require('./benchmark_setup');

let {begin, end} = createMark(__filename);

let target;
begin();
target = [];
for (let v of kInitValue) {
  target.push(v);
}
end();

verdict(target);
