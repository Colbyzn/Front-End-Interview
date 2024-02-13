/**
@description 快速排序（递增）
@author Colbyzn
 */

/**
📢 参考答案：

### 题解

#### 思路提炼

1. 创建两个子数组 left、right
2. 获取数组的中间元素 midValue，作为比较的基准值
3. 遍历数组内的元素，若元素大于基准值，则将其放到子数组 right，否则放到子数组 left
5. 返回拼接后的结果数组，即 `[left, midValue, right]`
4. 递归地对子数组 left 和 right 进行步骤 1-4 的操作

#### 边界处理/注意点

- 该函数接受一个数组，返回一个排序后的数组
- 递归终止的条件是数组长度为 0，若为 1，会导致无法处理 left 或 right 为空的情况，从而导致栈溢出
- 遍历数组，比较时，要避开基础值，因为自己不能跟自己比较，否则基础值会被推入 left 或者 right，导致left 或者 right 永远无法为空，从而导致栈溢出

#### 算法复杂度

- 时间复杂度为 O(nlogn)
  因为有单层循环，且内部嵌套一个二分
- 空间复杂度为 O(n)
  因为返回的结果数组的大小与传入数组的大小线性相关
#### 代码
 */

function quickSort(arr) {
  const length = arr.length;
  // 数组长度为 0，再返回
  if (length === 0) return arr;

  const left = [];
  const right = [];

  const midIndex = Math.floor(length / 2);
  const midValue = arr[midIndex];

  for (let i = 0; i < length; i++) {
    // 要避开基准值
    if (i !== midIndex) {
      const cur = arr[i];
      if (cur < midValue) {
        left.push(cur);
      } else {
        right.push(cur);
      }
    }
  }

  return [...quickSort(left), midValue, ...quickSort(right)];
}

// 测试用例
const arr1 = [1, 6, 2, 7, 3, 8, 4, 9, 5]
// const arr1 = [2, 4, 5, 3, 8]
console.log(quickSort(arr1))