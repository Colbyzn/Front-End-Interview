/**
 * 手写字符串 trim 方法，保证浏览器兼容性
 */

/**
思路：
1. 在构造函数 Sting 的原型对象上添加实例方法 myTrim
2. 该方法不接受参数
3. 在该方法内：
   1. 调用字符串的 replace() 方法，传入匹配开头空白字符的正则表达式，将其替换为空字符串
   2. 再链式调用 replace() 方法，传入匹配结尾空白字符的正则表达式，将其替换为空字符串
   3. 返回处理后的字符串
 */

String.prototype.myTrim = function () {
  return this.replace(/^\s+/, '').replace(/\s+$/, '')
}

/* 测试用例 */
let str = '   hello world!   '

console.log(str.myTrim())
console.log(str)