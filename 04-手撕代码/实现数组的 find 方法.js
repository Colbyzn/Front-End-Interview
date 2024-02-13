/**
@description 实现数组的 find 方法
@author Colbyzn
 */

/**
输入：`[2, 5, 11, 3, 1].find(element => element > 2)`
输出：5

补充：那 findIndex 方法如何实现

%
 */

/**
📢 参考答案：

### 题解

#### 思路提炼

1. 遍历数组，获取当前元素
2. 执行回调函数，并传入当前元素、当前索引、当前数组
3. 若执行回调函数的返回结果为 true，则返回当前元素
4. 循环结束后，若没有找到，则返回 undefined

#### 边界处理/注意点

- 该函数接受一个回调函数，返回满足回调函数的第一个元素
- findIndex 方法是接受一个回调函数，返回满足回调函数的第一个元素的索引，若没找到，返回 -1

#### 代码
 */

Array.prototype.myFind = function (fn) {
  const length = this.length

  for (let i = 0; i < length; i++) {
    const item = this[i];

    if (fn(item, i, this)) {
      return item
      /**
       * 若是 findIndex 方法，则
       * return i
       */
    }
  }

  return undefined
  /**
   * 若是 findIndex 方法，则
   * return -1
   */
}

// 测试用例
const array = [2, 5, 11, 3, 1];
const found = array.myFind(element => element > 3);
console.log(found); // 输出：5