/**
 * 手写 Promise
 */

/**
思路：
1. 使用 class 声明一个名为 MyPromise 的类
2. 在类中
   - 定义状态管理的相关属性，分别是 state、value、reason、onFulfilledCallback、onRejectedCallback
     > 注：
     > state → 存储当前 Promise 状态值
     > value → 存储 Promise 成功状态的结果值
     > reason → 存储 Promise 失败状态的结果值
     > onFulfilledCallback → 数组，存储 Promise 成功状态下要执行的回调函数
     > onRejectedCallback → 数组，存储 Promise 失败状态下要执行的回调函数
3. 在构造函数 constructor 内：
   1. 接受一个函数 fn 作为参数
   2. 在 try catch 中调用 fn，同时传入两个函数参数 resolve 和 reject
   3. 声明函数 resolve，在该函数内：
      - 当状态值为 pending 时，修改状态值为 fulfilled、修改结果值为所传入的值，以及执行所有成功回调函数
   4. 声明函数 reject，在该函数内：
      - 当状态值为 pending 时，修改状态值为 rejected、修改结果值为所传入的值，以及执行所有失败回调函数
4. 声明一个公有方法 then，在该方法内：
   1. 接受两个可选参数 onFulfilled 和 onRejected
   2. 判断两个参数是否为函数类型，若不是，则使用默认函数替换
   3. 返回一个新的 Promise 对象，在该对象内：
      1. 若状态值为 fulfilled，则执行 onFulfilled 函数，并传入当前 Promise 成功状态的结果值，以获取返回值，然后调用 resolve 函数，并将返回值传入，从而修改所返回新 Promise 对象的状态值和结果值
      2. 若状态值为 rejected，则执行onRejected，并传入当前 Promise 失败状态的结果值，以获取返回值，然后调用 reject 函数，并将返回值传入，从而修改所返回新 Promise 对象的状态值和结果值
      3. 若状态值为 pending，则将状态值为 fulfilled 和 rejected 所对应的执行代码封装到函数内，并添加到相应的回调数组中，等待执行
      > 注：上述的状态值指的是调用 then 方法的 Promise 对象的状态值
5. 定义一个公有方法 catch，在该方法内：
   1. 接受一个参数 onRejected
   2. 将所传入的参数 onRejected 交给 then 方法处理，并返回处理后的结果
 */

class MyPromise {
  // 公有属性
  state = "pending";
  value = undefined;
  reason = undefined;
  onFulfilledCallback = [];
  onRejectedCallback = [];

  // 构造函数
  constructor(fn) {
    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallback.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallback.forEach((fn) => fn());
      }
    };

    try {
      fn(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // then 方法
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function" ? onRejected : (reason) => reason;

    return new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        try {
          const newValue = onFulfilled(this.value);
          resolve(newValue);
        } catch (error) {
          reject(error);
        }
      }
      if (this.state === "rejected") {
        try {
          const newReason = onRejected(this.reason);
          reject(newReason);
        } catch (error) {
          reject(error);
        }
      }
      if (this.state === "pending") {
        this.onFulfilledCallback.push(() => {
          try {
            const newValue = onFulfilled(this.value);
            resolve(newValue);
          } catch (error) {
            reject(error);
          }
        });
        this.onRejectedCallback.push(() => {
          try {
            const newReason = onRejected(this.reason);
            resolve(newReason);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }

  // catch 方法
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

/* 测试用例 */

const p1 = new MyPromise((resolve, reject) => {
  resolve(100)
})
console.log(p1)

const p2 = new MyPromise((resolve, reject) => {
  reject(p1)
})
console.log(p2)

const p13 = new Promise((resolve, reject) => {
  reject(p1)
})
console.log(p13)

const p3 = new MyPromise((resolve, reject) => {
})
console.log(p3)

const p4 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(200)
  }, 1000);
})
console.log(p4)

const p5 = p1.then((value) => {
  return value + 1
})
console.log(p5)

const p6 = p2.then((value) => {
  return value + 1
}, (reason) => {
  console.log(reason)
})
console.log(p6)

const p7 = Promise.reject('错误').then((value) => {
  return value + 1
}, (reason) => {
  console.log(reason)
})
console.log(p7)

const p8 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

p8.then(value => {
  console.log(value); // 一秒后输出 'Success!' 
}, reason => {
  console.error(reason);
});

const p9 = p1.then(5)
console.log(p9)

const p10 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject('Error!');
  }, 1000);
});

p10
  .then(value => {
    console.log(value);
  }, reason => {
    console.error(reason);
  })

// const p11 = p10.then(value => {
//   console.log(value);
// })
// console.log(p11)
// p11.catch(reason => {
//   console.log(reason); // 输出 'Error!' 一秒后
// });

const p12 = Promise.reject('hahaha').then((value) => {
  console.log(value)
})
console.log(p12)
p12.catch(reason => {
  console.log(reason); // 一秒后输出 'hahaha'
});