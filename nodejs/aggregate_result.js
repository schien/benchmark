const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity
});

let tables = new Map();
let current_table;
let size_list = new Set();
let test_list = new Set();

rl.on('line', (input) => {
  if (input.length == 0) {
    return;
  }

  if (input.startsWith('#')) {
    let re = /#TEST=(.+)\sDATA=(.+)\sREPEAT=(.+)$/g;
    const data_size = re.exec(input)[2];
    if (!(current_table = tables.get(data_size))) {
      current_table = new Map();
      tables.set(data_size, current_table);
      size_list.add(data_size);
    }
    return;
  }

  let re = /\|\s(.+)\s\|\s(.+)\s\|/g;
  let result = re.exec(input);

  const name = result[1];
  const value = parseFloat(result[2]);

  let record;
  if (record = current_table.get(name)) {
    record.push(value);
  } else {
    test_list.add(name);
    current_table.set(name, [value]);
  }
});

function get_medium(arr) {
  const sz = arr.length;
  const mid = sz >> 1;

  arr.sort();
  if (sz & 1) {
    return arr[mid];
  } else {
    return (arr[mid-1] + arr[mid]) / 2;
  }
}

rl.on('close', ()=>{
  const n_names = test_list.size;
  const n_types = size_list.size;
  const names = []; test_list.forEach((v)=>names.push(v));
  const types = []; size_list.forEach((v)=>types.push(v));

  let result_table = new Array(n_names);
  for (let i = 0; i < n_names; ++i) {
    result_table[i] = new Array(n_types);
  }

  for (let j = 0; j < n_types; ++j) {
    const table = tables.get(types[j]);
    for (let i = 0; i < n_names; ++i) {
      result_table[i][j] = get_medium(table.get(names[i]));
    }
  }

  // output
  process.stdout.write(`Test,${types.join(',')}\n`);
  for (let i = 0; i < n_names; ++i) {
    process.stdout.write(`${names[i]},${result_table[i].join(',')}\n`);
  }
});

