/**
@description 求斐波那契数列 F(n) 的值
@author Colbyzn
 */

/**
输入：2
输出：1
解释：F(2) = F(1) + F(0) = 1 + 0 = 1
 */

/**
> 注：求解斐波那契数列的问题可以通过递归、迭代或动态规划的方式解决，其中使用动态规划，并用变量存储中间结果的方式最好
 */

/**
### 题解 1（递归）

#### 思路提炼

1. 将求解 F(n) 拆解为求解 F(n - 1) 和 F(n - 2)
2. 再将两者的结果相加作为最终结果

#### 边界处理/注意点

1. 当 n 为 0 或 1 时，直接返回 n，因为斐波那契数列的定义是 `F(0) = 0` 和 `F(1) = 1`
2. 对于较大的 n 值，递归方式会导致性能问题，因为它会产生大量的重复计算

#### 代码
 */

function fibonacci1(n) {
  if (n === 0 || n === 1) return n

  return fibonacci1(n - 1) + fibonacci1(n - 2)
}

/**
#### 算法复杂度

- 时间复杂度为 O(2^n)
  因为递归方式有重复计算，当输入规模一大，这种重复计算就会很大
  ![](../Media/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0%E5%88%97-%E9%80%92%E5%BD%92.png)
- 空间复杂度为 O(1)
  因为没有新增任何与输入数据 n 相关的变量
      
 */

// 测试用例
console.log(fibonacci1(0))
console.log(fibonacci1(1))
console.log(fibonacci1(2))
console.log(fibonacci1(3))
console.log(fibonacci1(4))

/**
### 题解 2（动态规划-变量存储中间结果）

#### 思路提炼

1. 初始化三个变量 res、cur、prev，分别表示 F(n)、F(n - 1) 和 F(n - 2)
2. 从第二项开始迭代到 n，每次迭代，分为 3 步：
   1. 计算 res 的值
   2. 整体向右移动更新 cur 与 prev 的值
3. 循环结束后，返回 res

#### 边界处理/注意点

1. 该函数接受一个数字参数 n，返回一个第 n 项的值
2. 当 n 为 0 或 1 时，直接返回 n，因为斐波那契数列的定义是 `F(0) = 0` 和 `F(1) = 1`
3. 从第 2 项开始，因为 `n = 0` 和 `n = 1` 情况已提前处理了
4. n 从 0 开始，所以数列的长度是 `n + 1`，所以的遍历时，`i <= n`，不要写成 `i < n`

#### 代码
 */

function fibonacci2(n) {
  /* 若为爬楼梯算法，则修改起始点即可，因为爬楼梯是 1, 1, 2, 3, 5, ...
  if (n === 0 || n === 1) return 1
  */
  if (n === 0 || n === 1) return n

  let res = 0
  let cur = 1
  let prev = 0
  /* 以下是爬楼梯算法
  let prev = 1
  */

  for (let i = 2; i <= n; i++) {
    // 计算 res 的值
    res = cur + prev

    // 整体向右移动更新 cur 与 prev 的值
    prev = cur
    cur = res
  }

  return res
}

/**
#### 算法复杂度

- 时间复杂度为 O(n)
  因为有个单层循环，且循环次数与输入数据 n 线性相关，n 越大，循环次数越多
- 空间复杂度为 O(1)
  因为所新增的变量与输入数据 n 无关，它们使用的空间都是固定的   
 */

// 测试用例
console.log(fibonacci2(0))
console.log(fibonacci2(1))
console.log(fibonacci2(2))
console.log(fibonacci2(3))
console.log(fibonacci2(4))

/**
### 题解 3（动态规划-数组存储中间结果）

#### 思路提炼

1. 创建一个数组 dp，用于存储已计算的斐波那契数列中间结果
2. 初始化 `dp[0] = 0` 和 `dp[1] = 1` 作为斐波那契数列的起始点
3. 从 dp[2] 开始，通过方程 dp[i] = dp[i - 1] + dp[i - 2] 计算斐波那契数列的每一项
4. 最终返回 dp[n]，即第 n 项的值

#### 边界处理/注意点

- 与题解 2 的迭代方式相比，该方法只是将存储中间结果的方式从变量改成了数组而已

#### 代码
 */

function fibonacci3(n) {
  /* 若为爬楼梯算法，则修改起始点即可，因为爬楼梯是 1, 1, 2, 3, 5, ...
  if (n === 0 || n === 1) return 1
  */
  if (n === 0 || n === 1) return n

  // 初始化斐波那契数列的起始点
  const dp = [0, 1]
  /* 以下是爬楼梯算法
  const dp = [1, 1]
  */

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}

/**
#### 算法复杂度

- 时间复杂度为 O(n)
  因为有个单层循环，且循环次数与输入数据 n 线性相关，n 越大，循环次数越多
- 空间复杂度为 O(n)
  因为新增了数组 dp，且每次循环都会往该数组添加新元素，所以其大小与输入数据 n 线性相关
 */

// 测试用例
console.log(fibonacci3(0))
console.log(fibonacci3(1))
console.log(fibonacci3(2))
console.log(fibonacci3(3))
console.log(fibonacci3(4))