/**
@description 两个有序数组合并
@author Colbyzn
 */

/**
输入：array1 = [1, 3, 5, 7]，array2 = [2, 4, 6, 8]
输出：[1, 2, 3, 4, 5, 6, 7, 8]

%
 */

/**
📢 参考答案：

### 题解

#### 思路提炼

1. 使用双指针，定义两个指针 i 和 j，i 指向数组 1 中的元素，j 指向数组 2 中的元素
2. 比较两指针所指向的当前元素，将较小的元素添加到结果数组中，并将较小元素对应的指针向右移动
3. 直到遍历完长度较短的数组，将加长数组中还未的比较的元素追加到结果数组中

#### 边界处理/注意点

#### 算法复杂度

- 时间复杂度为 O(n)

- 空间复杂度为 O(n)

#### 代码
 */

function mergeSortedArrays(arr1, arr2) {
  let res = [];
  let i = 0;
  let j = 0;

  // 循环比较两个数组的元素，将较小的元素添加到 res 中
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i]);
      i++;
    } else {
      res.push(arr2[j]);
      j++;
    }
  }

  // 将剩余的元素添加到 res 中
  while (i < arr1.length) {
    res.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    res.push(arr2[j]);
    j++;
  }

  return res;
}

// 测试用例
const array1 = [1, 3, 5, 7];
const array2 = [2, 4, 6, 8];

const res = mergeSortedArrays(array1, array2);
console.log(res); // 输出: [1, 2, 3, 4, 5, 6, 7, 8]
