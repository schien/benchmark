#!/usr/bin/env node

const kSmall = 10;
const kMid = 10000;
const kLarge = 1000000;
const N = kLarge;
let a = new Array(N*9);

for (let i = N; i < N*10; ++i) {
  a[i - N] = i;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

for (let i = 0; i < N*9; ++i) {
  let rnd = getRandomInt(N*9-1-i) + i;
  let temp = a[rnd];
  a[rnd] = a[i];
  a[i] = temp;
}

let data_source = a.splice(0, N).map((v)=>[v.toString(), v]);
let not_found = a.splice(0, N).map((v)=>[v.toString(), v]);

process.stdout.write(JSON.stringify([N, data_source, not_found]));
