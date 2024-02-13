/**
@description 将数组转为嵌套对象
@author Colbyzn
 */

/**
输入：['a', 'b', 'c']
输出：{ a: { b: { c: null } } }
%
 */

/**
📢 参考答案：

### 题解 1（递归）

#### 思路提炼

1. 对数组进行解构赋值，分成第一个值和剩余值组成的数组
2. 返回一个对象，其内以第一个值作为键，其值为递归调用函数，并传入剩余值组成的数组所返回的结果

#### 边界处理/注意点

- 该函数接受一个数组参数，返回一个对象
- 为递归添加终止条件，即数组长度为 0 时，返回 null

#### 代码
 */

function arrayToObject1(arr) {
  if (arr.length === 0) return null

  const [head, ...args] = arr

  return {
    [head]: arrayToObject1(args)
  }
}

// 测试用例
const inputArray1 = ['a', 'b', 'c'];

console.log(arrayToObject1(inputArray1));

/**

### 题解 2（迭代）

#### 思路提炼

1. 使用 reduceRight() 方法，从右到左遍历数组，初始值设为 null
2. 每次迭代，返回一个对象，该对象以当前元素为键，以上一步的返回值（即累加值）为值

#### 边界处理/注意点

- 将 reduceRight() 的初始值参数设置为 null

#### 代码
 */

function arrayToObject2(arr) {
  return arr.reduceRight((acc, item) => ({ [item]: acc }), null)
}

// 测试用例
const inputArray2 = ['a', 'b', 'c'];

console.log(arrayToObject2(inputArray2));