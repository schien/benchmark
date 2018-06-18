const { performance, PerformanceObserver } = require('perf_hooks');
const path = require('path');

const obs = new PerformanceObserver((items)=>{
  const entry = items.getEntries()[0];
  console.log(`${entry.name} : ${entry.duration}`);
});
obs.observe({ entryTypes: ['measure']});

const kInitValue = [];
const kDataLength = 1000000;

for (let i = 0; i < kDataLength; ++i) {
  kInitValue.push(i);
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
  if (target.length != kDataLength) {
    console.error('length not the same');
    return;
  }
  for (let i = 0 ; i < kDataLength; ++i) {
    if (target[i] !== kInitValue[i]) {
      console.error(`data not the same at ${i}`);
      return;
    }
  }
}

module.exports = {
  kInitValue: kInitValue,
  kDataLength: kDataLength,
  createMark: createMark,
  verdict: verdict,
};
