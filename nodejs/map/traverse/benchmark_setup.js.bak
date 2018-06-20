const { performance, PerformanceObserver } = require('perf_hooks');
const path = require('path');

const [kDataLength, kDataSource] = require('../random_map_source_large.json');

const obs = new PerformanceObserver((items)=>{
  const entry = items.getEntries()[0];
  console.log(`${entry.name} : ${entry.duration}`);
});
obs.observe({ entryTypes: ['measure']});

const kInitValue = new Map(kDataSource);
const kInitObjValue = {};

for (let i = 0; i < kDataLength; ++i) {
  const entry = kDataSource[i];
  kInitObjValue[entry[0]] = entry[1];
}

function createMark(filename) {
  const operation = path.parse(filename).name;
  const beginMark = `${operation} : begin`;
  const endMark = `${operation} : end`;
  return {
    begin: function() {
      performance.mark(beginMark);
    },
    end: function() {
      performance.mark(endMark);
      performance.measure(operation, beginMark, endMark);
    },
  }
}

function verdict(target) {
  if (target === kInitValue) {
    console.error('not a copy');
  }
  if (target.size != kDataLength) {
    console.error('length not the same');
    return;
  }
  for (let i = 0 ; i < kDataLength; ++i) {
    let entry = kDataSource[i];
    if (target[entry[0]] !== entry[1]) {
      console.error(`data not the same at ${entry[0]}`);
      return;
    }
  }
}

module.exports = {
  kDataSource: kDataSource,
  kInitValue: kInitValue,
  kInitObjValue: kInitObjValue,
  kDataLength: kDataLength,
  createMark: createMark,
  verdict: verdict,
};
