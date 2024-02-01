/**
@description 求两个数组的并集（并集是指两个数组中所有不重复的元素的集合）
@author Colbyzn
 */

/**
### 题解

#### 思路提炼

1. 使用数组 concat 方法合并两个数组
2. 使用集合 Set 来去重

#### 边界处理/注意点

- 该函数接受两个数组，返回一个包含并集的数组

#### 代码
 */

function findUnion(arr1, arr2) {
  const combinedArr = arr1.concat(arr2)

  return [...new Set(combinedArr)]
}

/**
#### 算法复杂度

- 时间复杂度为 O(n)

- 空间复杂度为 O(n)
      
 */

// 测试用例
const arr1 = [1, 2, 2, 1, 5];
const arr2 = [4, 2, 6, 2, 5];
console.log(findUnion(arr1, arr2));
