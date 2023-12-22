/**
 * 手写 Promise.reject()
 */

/**
思路：
1. 往构造函数 Promise 上添加静态方法 MyReject
2. 在该方法内：
   - 1、接受一个参数 reason
   - 2、不管 reason 类型是什么，始终返回一个状态值为 rejected，结果值为参数 reason 的 Promise 对象  
 */

Promise.MyReject = (reason) => {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}