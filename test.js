Promise.MyRace = (arr) => {
  return new Promise((resolve, reject) => {

    if (!Array.isArray(arr)) {
      return reject(new TypeError('arguments must be array'))
    }

    arr.forEach((item) => {
      Promise.resolve(item)
        .then((value) => {
          resolve(value)
        })
        .catch((error) => {
          reject(error)
        })
    })
  })
}

/* 测试用例 */
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.MyRace([promise1, promise2]).then((value) => {
  console.log(value); // "two"
});