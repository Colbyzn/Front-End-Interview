/**
 * 手写 bind 方法
 */

/**
思路：
1. 往构造函数 Function 的原型对象上添加 myBind 方法
    注：以便所有函数都可以公用该方法
2. 获取所传入的 this 对象：若未传入，则取值为 Window 对象
3. 获取调用 myBind 方法的函数
4. 获取剩余参数（除了第一项之外的参数）
5. 返回一个新函数
6. 在新函数内，将所传入的 this 对象和参数交给 apply 函数来处理，并返回处理后的结果
 */

Function.prototype.myBind = function (context) {
  context = context || window;

  const _this = this;

  const argsArr = [...arguments].slice(1);

  return function () {
    return _this.apply(context, argsArr)
  }
}

function greet(number) {
  console.log(`Hello, ${this.name}!, 学号 ${number}`);
}

const person = {
  name: 'John'
}

// greet.myBind(person)() // 输出：Hello, John!, 学号 undefined
// greet.bind(person)()

greet.myBind(person, 2015112560)() // 输出：Hello, John!, 学号 2015112560
greet.bind(person, 2015112560)()