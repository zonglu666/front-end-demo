// function* foo() {
//   yield 1;
//   yield 2;
//   yield 3;
//   yield 4;
//   yield 5;
// }
// var it = foo();
// console.log(it.next()); // { value:1, done:false }
// console.log(it.next()); // { value:2, done:false }
// console.log(it.next()); // { value:3, done:false }
// console.log(it.next()); // { value:4, done:false }
// console.log(it.next()); // { value:5, done:false }
// // foo没有执行完，还要再一次next
// console.log(it.next()); // { value:undefined,, done:true }

// console.log("==================");
// function* foo() {
//   yield 1;
//   return 2;
// }
// var it = foo();
// console.log(it.next()); // { value:1, done:false }
// console.log(it.next()); // { value:2, done:true }

// function* foo(x) {
//   var y = 2 * (yield x + 1);
//   var z = yield y / 3;
//   return x + y + z;
// }

// var it = foo(5);

// // note: not sending anything into `next()` here
// console.log(it.next()); // { value:6, done:false }
// console.log(it.next(12)); // { value:8, done:false }
// console.log(it.next(13)); // { value:42, done:true }

// function* foo() {
//   yield 1;
//   yield 2;
//   yield 3;
//   yield 4;
//   yield 5;
//   return 6;
// }

// // for (var v of foo()) {
// //   console.log(v);
// // }
// // // 1 2 3 4 5

// // console.log(v); // still `5`, not `6` :(

function* makeRangeIterator(start = 0, end = 100, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

let it = makeRangeIterator(1, 10, 2);

let result = it.next();

while (!result.done) {
  console.log(result.value); // 1 3 5 7 9
  result = it.next();
}

console.log("Iterated over sequence of size: ", result.value);
