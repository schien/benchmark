const { performance, PerformanceObserver } = require('perf_hooks');
const path = require('path');

const DatasetEnum = Object.freeze({
  S: Symbol('S'),
  M: Symbol('M'),
  L: Symbol('L'),
  convert: function _convert(str) {
    switch (str) {
      case 'small': return DatasetEnum.S;
      case 'mid': return DatasetEnum.M;
      case 'large': return DatasetEnum.L;
      default: return undefined;
    }
  },
});

const kSelectedDataset =
  DatasetEnum.convert(process.env.DATASIZE) || DatasetEnum.L;

const obs = new PerformanceObserver((items)=>{
  const entry = items.getEntries()[0];
  console.log(`${entry.name} : ${entry.duration}`);
});
obs.observe({ entryTypes: ['measure']});

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

module.exports = {
  createMark: createMark,
  kSelectedDataset: kSelectedDataset,
  DatasetEnum: DatasetEnum,
};
