/**
@description 数字每千分位用逗号隔开
@author Colbyzn
 */

/**
输入：12345678
输出："12,345,678"
解释：

%
 */

/**
📢 参考答案：

### 题解

#### 思路提炼

1. 将数字转换为字符串
2. 定义一个计数器 count，用于判断何时添加逗号
3. 倒序遍历字符串，依次拼接，每数到三位就在结果字符串的前面添加一个逗号
4. 遍历结束，返回结果字符串

#### 边界处理/注意点

- 该函数接受一个数字参数，返回一个千分位格式化后的字符串
- 当数字总个数刚好为 3 的倍速，例如，123 → ",123"，为了避免在开头添加逗号，需要增加判断条件 `i !== 0`
- 拼接字符串时，顺序别写反了，必须是逗号、当前字符串 str[i] 在前，结果字符串 res 在后
- 记得重置计数器

#### 代码
 */

function formatNumber(num) {
  let res = ''
  let count = 0

  const str = num.toString()

  const length = str.length
  for (let i = length - 1; i >= 0; i--) {
    const s = str[i];
    // 拼接时，必须 s 在前，res 在后
    res = s + res
    count++

    // 增加判断条件 `i !== 0`，避免在开头添加逗号
    if (count === 3 && i !== 0) {
      // 拼接时，必须逗号在前，res 在后
      res = ',' + res
      // 记得重置计数器
      count = 0
    }
  }

  return res
}

// 测试用例
console.log(formatNumber(1)); // 输出: "12,345,678"
console.log(formatNumber(12)); // 输出: "12,345,678"
console.log(formatNumber(123)); // 输出: "12,345,678"
console.log(formatNumber(12345678)); // 输出: "12,345,678"