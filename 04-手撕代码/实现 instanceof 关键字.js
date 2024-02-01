/**
@description 实现 instanceof 关键字 
@author Colbyzn
 */

/**
📢 参考答案：

### 题解

#### 思路提炼

1. 创建一个指针 p，初始化为当前实例对象
2. 判断当前实例对象的隐式原型是否等于构造函数的显示原型
3. 若是，则返回 true
4. 若不是，则更新指针 p 为当前实例对象的隐式原型
5. 重复 2-4，直至找到匹配，或者直至指针 p 为 null，表示未找到，返回 false

#### 边界处理/注意点

- 该函数接受两个参数：实例对象、构造函数，返回一个布尔值
- 若传入的实例对象为值类型（包括 null），则直接返回 false

#### 代码
 */

function myInstanceof(obj, constructor) {
  // 若为值类型（包括 null），直接返回 false
  if (typeof obj !== 'object' && typeof obj !== 'function' || obj == null) return false

  let p = obj
  while (p) {
    if (p.__proto__ === constructor.prototype) {
      return true
    }
    p = p.__proto__
  }
  return false
}

// 测试用例
console.info(myInstanceof({}, Object))
console.info(myInstanceof([], Object))
console.info(myInstanceof([], Array))
console.info(myInstanceof({}, Array))
console.info(myInstanceof('abc', String))
console.info(myInstanceof(() => { }, Function))
console.info(myInstanceof(null, Function))