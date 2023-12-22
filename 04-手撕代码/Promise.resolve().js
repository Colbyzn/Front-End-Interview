/**
 * 手写 Promise.resolve()
 */

/**
思路：
1. 往构造函数 Promise 上添加静态方法 MyResolve
2. 在该方法内：
   - 1、接受一个参数 value
   - 2、判断参数 value 的类型
      - 1）若为 Promise 对象，则直接返回
      - 2）若为 非 Promise 对象，则返回一个状态值为 fulfilled，结果值为该非 Promise 对象的 Promise 对象
 */

Promise.MyPromise = (value) => {
  if (value instanceof Promise) {
    return value
  }

  return new Promise((resolve, reject) => {
    resolve(value)
  })
}