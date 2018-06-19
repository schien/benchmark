const { performance, PerformanceObserver } = require('perf_hooks');
const path = require('path');

const [kDataLength, kDataSource, kNotFoundKey] = require('../random_map_source_large.json');

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

function verdictMap(target) {
  if (target === kInitValue) {
    console.error('not a copy');
    return;
  }
  if (target.size !== kDataLength) {
    console.error(`length not the same: ${target.size}`);
    return;
  }
  for (let i = 0 ; i < kDataLength; ++i) {
    let entry = kDataSource[i];
    if (target.get(entry[0]) !== entry[1]) {
      console.error(`data not the same at ${entry[0]}`);
      return;
    }
  }
}

function verdictObject(target) {
  if (target === kInitObjValue) {
    console.error('not a copy');
    return;
  }
  let length
  if ((length = Object.keys(target).length) !== kDataLength) {
    console.error(`length not the same: ${length}`);
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

function verdict(target) {
  switch(target.constructor) {
    case Map:
      verdictMap(target);
      return;
    case Object:
      verdictObject(target);
      return;
    default:
      console.error('not an Object or a Map');
      return;
  }
}

module.exports = {
  kDataSource: kDataSource,
  kInitValue: kInitValue,
  kInitObjValue: kInitObjValue,
  kNotFoundKey: kNotFoundKey,
  kDataLength: kDataLength,
  createMark: createMark,
  verdict: verdict,
};
