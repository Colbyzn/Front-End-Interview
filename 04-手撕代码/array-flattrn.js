/**
@description 实现数组扁平化，只扁平化一层
@author Colbyzn
 */

/**
输入：`[[1, 2], [3, [4, 5]]]`
输出：`[1, 2, 3, [4, 5]]`

补充：若要深度扁平化，即全部扁平化，要如何处理？
 */

/**
### 题解 1

#### 思路提炼

1. 创建一个空数组 res，存放最终结果
2. 遍历原数组，遇到非数组，则直接推入 res
3. 遇到数组元素，则遍历后，再将其内元素推入 res
4. 返回最终结果 res

#### 边界处理/注意点

- 该函数接受一个数组，返回一个扁平化一层后的新数组

#### 算法复杂度

- 时间复杂度为 O(n)
  不是 o(n^2)，因为外层每次循环，内层循环次数与输入数组的长度无关，与输入数组内的当前元素的长度有关
- 空间复杂度为 O(n)
  因为创建了一个数组 res，其长度与传入数组的长度线性相关

#### 代码
 */

function flattenArray1(arr) {
  const res = []

  arr.forEach(item => {
    if (Array.isArray(item)) {
      item.forEach(value => res.push(value))
      /**
       * 若要全部扁平化，则使用递归
       */
      // res.push(...flattenArray1(item))
    } else {
      res.push(item)
    }
  })

  return res
}

// 测试用例
const arr1 = [1, [2, [3], 4], 5]
console.log(flattenArray1(arr1))

/**
### 题解 2

#### 思路提炼

1. 创建一个空数组 res，存放最终结果
2. 遍历原数组，不管是否为数组元素，都使用 concat 方法连接
3. 返回最终结果 res

#### 边界处理/注意点

- 该函数接受一个数组，返回一个扁平化一层后的新数组

#### 算法复杂度

- 时间复杂度为 O(n)
  因为单层循环，且循环次数与传入数组长度线性相关
- 空间复杂度为 O(n)
  因为创建了一个数组 res，其长度与传入数组的长度线性相关

#### 代码
 */

function flattenArray2(arr) {
  let res = []

  arr.forEach(item => {
    res = res.concat(item)
    /**
     * 若要全部扁平化，则使用递归
     */
    // res = res.concat(Array.isArray(item) ? flattenArray2(item): item)
  })

  return res
}

// 测试用例
// const arr2 = [1, [2, [3], 4], 5]
const arr2 = [1, 2, [10, [100, ['a', [true],'b'], 200], 20], 3]
console.log(flattenArray2(arr2))
