/**
@description 从有序数组中找出和为给定值的两个数
@author Colbyzn
 */

/**
输入：nums = `[2,7,11,15]`, target = 9
输出：`[2, 7]`
%
 */

/**
📢 参考答案：

### 题解

#### 思路提炼

1. 初始化两个指针，指向数组的头尾
2. 指针从头尾开始查找，若目标值大于头尾元素之和，则头指针向右移动
3. 若目标值小于头尾元素之和，则尾指针向左移动
3. 若目标值等于头尾元素之和，则返回当前头尾指针所指向的元素

#### 边界处理/注意点

- 该函数接受两个参数：数组和目标值，返回一个包含两个元素，且相加为给定值的数组
- 该方法是双指针法，不是严格意义上的二分法，因为每次迭代并没有砍半搜索
- 该双指针法只适用于递增排列的数组，若是递减元素，则需要稍微修改一下代码

#### 算法复杂度

- 时间复杂度为 O(n)
  每次迭代移动 1 个指针，所以执行次数与数组长度线性相关
- 空间复杂度为 O(1)
  虽然新增了数组 res，但是数组内的元素永远就两个，不会随着传入数组大小而改变

#### 代码
 */

function twoSum(arr, target) {
  const res = []
  if (arr.length === 0) return res

  let start = 0
  let end = arr.length - 1

  while (start < end) {
    let sum = arr[start] + arr[end]

    if (target > sum) {
      start++
      /**
       * 若为递减数组，则 end--
       */
    } else if (target < sum) {
      end--
      /**
       * 若为递减数组，则 start++
       */
      
    } else {
      res.push(arr[start], arr[end])
      return res
    }

  }

  return res
}

// 测试用例
console.log(twoSum([2, 7, 11, 15], 9))
console.log(twoSum([2, 3, 5, 7, 11, 15], 9))
// console.log(twoSum([15, 11, 7, 5, 3, 2], 9))