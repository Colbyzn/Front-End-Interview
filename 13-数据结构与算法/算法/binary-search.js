/**
二分查找
 */

/**
> 注：虽然算法复杂度的数量级都一样，但是二分查找的非递归比递归性能会好一点，因为函数调用是有性能开销的，非递归只是调用一次函数，而递归会调用多次函数
 */

/**
### 题解 1（非递归）

#### 思路提炼

1. 从数组中间元素开始查找，若目标元素大于中间元素，则将搜索范围缩小到数组的右半边
2. 若目标元素小于中间元素，则将搜索范围缩小到数组的左半边
3. 若目标元素等于中间元素，则搜索结束，返回中间索引
4. 重复上述 1-3 的步骤，直至找到元素，或者未找到

#### 边界处理/注意点

1. 该函数接收两个参数：有序数组、目标值，返回目标元素的索引，若未找到，则返回 -1
2. 若传入一个空数组，则直接返回 -1
3. 计算中间索引时，要使用 `Math.floor()` 向下取整，因为 `(start + end) / 2` 可能除不尽

#### 代码
 */

function binarySearch1(arr, target) {
  const length = arr.length

  // 数组为空，直接返回 -1
  if (length === 0) return -1

  // 初始化搜索范围
  let start = 0
  let end = length - 1

  // 不断缩小搜索范围
  while (start <= end) {
    const mid = Math.floor((start + end) / 2)
    const midValue = arr[mid]
    if (target > midValue) {
      start = mid + 1
    } else if (target < midValue) {
      end = mid - 1
    } else {
      return mid
    }
  }

  return -1
}

/**
#### 算法复杂度

- 时间复杂度为 O(lon(n))
  因为每次比较都将搜索范围缩小一半
- 空间复杂度为 O(1)
  因为所新增的变量都是存放基本数据类型
*/

// 测试用例
console.log(binarySearch1([], 2))
console.log(binarySearch1([1, 2, 5, 6, 8], 2))

/**
### 题解 2（递归）

#### 思路提炼

- 与题解 1 相同

#### 边界处理/注意点

1. 与非递归不同，该函数接收四个个参数：有序数组、目标值、开始索引、结束索引
2. 递归调用函数时，记得在函数前加 return
3. 要添加递归结束的条件

#### 代码
 */

function binarySearch2(arr, target, start, end) {
  const length = arr.length

  // 数组为空，直接返回 -1
  if (length === 0) return -1

  // 初始化搜索范围
  if(start == null) start = 0
  if(end == null) end = length - 1

  // 递归结束条件
  if (start > end) return -1

  // 不断缩小搜索范围
    const mid = Math.floor((start + end) / 2)
    const midValue = arr[mid]
    if (target > midValue) {
      start = mid + 1
      return binarySearch2(arr, target, start, end)
    } else if (target < midValue) {
      end = mid - 1
      return binarySearch2(arr, target, start, end)
    } else {
      return mid
    }
}

/**
#### 算法复杂度

- 与题解 1 相同
*/

// 测试用例
console.log(binarySearch2([], 2))
console.log(binarySearch2([1, 2, 5, 6, 8], 2))

