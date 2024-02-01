/**
@description 实现 new 关键字
@author Colbyzn
 */

/**
### 思路提炼

1. 创建一个空对象
2. 将空对象指向构造函数的原型对象
3. 执行构造函数，并将 this 指向该空对象
4. 返回该新对象

### 边界处理/注意点

### 代码
 */

function myNew(constructor, ...args) {
  const obj = {}

  obj.__proto__ = constructor.prototype

  constructor.apply(obj, args)

  return obj
}

// 测试用例
function Person(name, age) {
  this.name = name
  this.age = age
}

const xialuo = myNew(Person, '夏洛', 20)
console.log(xialuo)
