/**
 * 深拷贝
 */

/**
思路：
1. 判断要拷贝的对象类型：若为值类型或者函数，则直接返回该值
2. 声明变量：用于存储所拷贝对象
3. 处理数组：若为数组，则初始化变量为 []，然后遍历数组，对数组内的每个元素调用 deepClone 函数（即递归调用）
4. 处理对象：若为对象，则初始化变量为 {}，然后遍历对象，对对象内的每个自有属性（即非原型上的属性）调用 deepClone 函数（即递归调用）
5. 返回结果
 */

function deepclone(obj) {
  if (typeof obj !== 'object' || obj == null) return obj

  let result

  if (obj instanceof Array) {
    result = []
    for (let i = 0, len = obj.length; i < len; i++) {
      result[i] = deepclone(obj[i])
    }
  }

  if (obj instanceof Object) {
    result = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepclone(obj[key])
      }
    }
  }

  return result
}

const obj1 = {
  name: 'Colbyzn',
  age: 20,
  address: {
    city: 'beijing'
  },
  hobby: ["Swim", "Dance", "Study"]
}

let obj2 = deepclone(obj1)
obj2.age = 23
console.log(obj1.age) // 若为 20，则深拷贝成功