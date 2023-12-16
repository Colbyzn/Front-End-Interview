/**
 * 手写 call 方法
 */

/**
思路：
1. 往构造函数 Function 的原型对象上添加 myCall 方法
    注：以便所有函数可以公用该方法
2. 获取所传入的 this 对象：若未传入，则取值为 Window 对象
3. 将调用 myCall 方法的函数（即 this）添加到所传入的 this 对象的 fn 属性上
4. 获取剩余参数（除了第一项之外的参数）
5. 使用所传递的 this 对象来调用 fn 函数，并传入剩余参数
    注：这样函数 fn 中的 this 就会指向调用它的对象，即所传入的 this 对象
6. 删除新添加的 fn 属性
    注：避免污染所传入的 this 对象
7. 返回函数调用后的结果
 */

Function.prototype.myCall = function (context) {
  context = context || window;

  context.fn = this;

  const args = [...arguments].slice(1);

  const result = context.fn(...args);

  delete context.fn;

  return result;
}

function greet(number) {
  console.log(`Hello, ${this.name}!, 学号 ${number}`);
}

const person = {
  name: 'John'
}

greet.myCall(person, 2015112560) // 输出：Hello, John!, 学号 2015112560
greet.call(person, 2015112560)