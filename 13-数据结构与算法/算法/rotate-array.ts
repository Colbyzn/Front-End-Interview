/**
 * 将一个数组旋转 k 步
 * 
 * 输入输出示例：
 * - 输入一个数组 `[1,2,3,4,5,6,7]`
 * - k=3，即旋转 3 步
 * - 输出 `[5,6,7,1,2,3,4]`
 */

/**
### 思路 1

#### 思路提炼

- 每次迭代，使用 `pop()` 取出数组的最后一个元素，然后使用 `unshift()` 添加到数组的最前面

#### 边界处理/注意点

1. 函数接受两个参数，分别是 arr 和 k，返回一个数组
2. 若 `arr = []` 或者 `k = 0`，则不处理，直接返回 arr
3. 若 `k < 0`，则取绝对值
4. 若 `k > 数组长度`，则对数组长度取余
   > 注：取余是为了避免不必要的运算，例如，数组长度为 3，k 为 5，则经过前三次旋转后的数组元素排列没变，所以只有后面两次有用
5. TypeScript 语言通过在变量或表达式后面添加非空断言 ! 符号，来告诉编译器该变量/表达式一定不会是 null 或 undefined
 */

export function rotateArray1(arr: number[], k: number): number[] {
  const length = arr.length
  if (!k || length === 0) return arr
  if (k < 0) {
    k = Math.abs(k)
  }
  if (k > length) {
    k = k % length
  }
  for (let i = 0; i < k; i++) {
    arr.unshift(arr.pop()!)
  }

  return arr
}

// 测试用例
// console.log(rotateArray1([1, 2, 3, 4, 5, 6, 7], 100))

/**
### 思路 2

#### 思路提炼

- 根据旋转步数，使用 `slice()` 将数组拆分为两部分，再通过 `concat()` 重新拼接

#### 边界处理/注意点

- 与思路 1 一致
 */

export function rotateArray2(arr: number[], k: number): number[] {
  const length = arr.length

  if (!k || length === 0) return arr
  if (k < 0) {
    k = Math.abs(k)
  }
  if (k > length) {
    k = k % length
  }

  const partOne = arr.slice(0, length - k)
  const partTwo = arr.slice(-k)

  const result = partTwo.concat(partOne)

  return result
}

// 测试示例
// console.log(rotateArray2([1, 2, 3, 4, 5, 6, 7], 100))