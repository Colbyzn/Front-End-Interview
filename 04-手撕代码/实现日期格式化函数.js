/**
@description 实现日期格式化函数
@author Colbyzn
 */

/**
输入：date = new Date(), formatString = 'YYYY-MM-DD'
输出：例如，2024-02-07

%
 */

/**
📢 参考答案：

### 题解

#### 思路提炼

1. 使用 Date 对象的 getFullYear() 获取年份
2. 使用 Date 对象的 getMonth() 获取月份
3. 使用 Date 对象的 getDate() 获取日期
4. 最后使用横杆符拼接年份、月份和日期，并返回

#### 边界处理/注意点

- 该函数接受两个参数：Date 对象、日期格式化字符串，返回一个格式化后的字符串
- 月份和日期小于 10 的，需要在前面补上 0
- getMonth() 返回的是一个 0 到 11 的整数值，转换为实际月份需要加 1

#### 代码
 */

function formatDate(date, formatString) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  res = formatString.replace('YYYY', year).replace('MM', month).replace('DD', day);
  return res;
}

// 测试用例
const currentDate = new Date();
const formattedDate = formatDate(currentDate, 'YYYY-MM-DD');
console.log(formattedDate);

