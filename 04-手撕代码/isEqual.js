/**
 * 手写深度比较
 */

/**
思路：
1. 声明一个名为 isEqual 函数
2. 该函数接受两个参数：obj1、obj2
3. 在函数内：
   1. 判断所传入参数的类型
      1. 若传入的任意一个参数不是对象或者是 null，则直接比较
      2. 若传入的参数引用地址一样，则直接返回 true
   2. 分别获取对象 obj1 和 obj2 的所有键
      > 注：Object.keys() 方法返回一个包含给定对象所有「键/索引」的数组
   3. 判断键数量是否相等
      1. 若键数量不相等，则没必要再比较，直接返回 false
   4. 遍历包含对象 obj1 所有键的数组，在循环体内：
      1. 判断 obj2 和 obj1 的当前键和值
         1. 若 obj2 内没有 obj1 的当前键，或者有 obj1 的当前键，但是递归调用 isEqual 函数比较当前值的结果为 false，则直接返回 false
   5. 返回 true
      > 注：执行到这步，说明执行以上代码未触发条件，即未 return false
 */

function isEqual(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) {
    return obj1 === obj2
  }

  if (obj1 === obj2) {
    return true
  }

  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)

  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }

  for (const key of obj1Keys) {
    if (!obj2Keys.includes(key) || !isEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}

/* 测试用例 - 对象 */
const obj1 = {
  a: 100,
  b: {
    x: 100,
    y: 200
  },
  c: [1, 2, 3]
}
const obj2 = {
  a: 100,
  b: {
    x: 100,
    y: 200
  },
  c: [1, 2, 3]
}
// console.log( obj1 === obj2 )
console.log(isEqual(obj1, obj2))

/* 测试用例 - 数组 */
const arr1 = [1, 2, 3]
const arr2 = [1, 2, 3, 4]
console.log(isEqual(arr1, arr2))