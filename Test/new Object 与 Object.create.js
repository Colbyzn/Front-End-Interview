obj1 = {
  a: 1,
  b: 2
}

/* new Object() */
const obj2 = new Object()
const obj3 = new Object(obj1)
console.log(obj2) // 空对象 {}，其原型为 Object.prototype
console.log(obj3) // { a: 1, b: 2}，其原型为 Object.prototype
console.log(obj3 === obj1)  // true (obj3 与 obj1 的引用地址一样)

/* Object.create() */
const obj4 = Object.create(null)
const obj5 = Object.create(obj1)
console.log(obj4) // 空对象 {}，其原型为 null，即没有
console.log(obj5) // 空对象{}，其原型为 { a: 1, b: 2}
console.log(obj5 === obj1)  // false
console.log(obj5.__proto__ === obj1)  // true (obj5 的原型为 obj1)