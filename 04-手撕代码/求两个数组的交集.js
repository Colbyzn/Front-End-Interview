/**
@description 求两个数组的交集（交集是指两个数组共同拥有的元素）
@author Colbyzn
 */

/**
### 题解

#### 思路提炼

1. 使用集合 Set 对其中一个数组进行去重
2. 遍历去重后的数组，在未去重的数组中查找是否也存在该元素
3. 若存在，则添加到结果数组中
4. 遍历结束后，返回结果数组

#### 边界处理/注意点

- 该函数接受两个数组，返回一个只有交集的数组
- 不能对未去重的数组进行遍历，在去重后的数组内查找，否则返回的结果数组会出现重复的元素，还得再去重，麻烦

#### 代码
 */

function findIntersection(arr1, arr2) {
  const set1 = new Set(arr1)

  const intersection = [...set1].filter(item => arr2.includes(item))

  return intersection
}

/**
#### 算法复杂度

- 时间复杂度为 O(n)

- 空间复杂度为 O(n)
      
 */

// 测试用例
const arr1 = [1, 2, 2, 1, 5];
const arr2 = [4, 2, 6, 2, 5];
console.log(findIntersection(arr1, arr2));
