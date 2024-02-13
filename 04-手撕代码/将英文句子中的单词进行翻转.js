/**
@description 将英文句子中的单词进行翻转
@author Colbyzn
 */

/**
输入："Hello World! JavaScript is fun."
输出： "olleH dlroW! tpircSavaJ si nuf."
%
 */

/**
📢 参考答案：

### 题解

#### 思路提炼

1. 使用正则表达式匹配出所有单词
2. 对每个单词进行翻转，即先拆分为数组，再反转，再拼接为字符串

#### 边界处理/注意点

- 由于正则表达式不会匹配特殊字符，如 !、. 等，所以要对字符串进行直接替换操作，再返回结果

#### 代码
 */

function reverseWords(sentence) {
  // 使用正则表达式匹配单词，并使用回调函数进行翻转
  const res = sentence.replace(/\b\w+\b/g, function (word) {
    return word.split('').reverse().join('');
  });

  return res;
}

// 测试用例
const originalSentence = "Hello World! JavaScript is fun.";
const result = reverseWords(originalSentence);

console.log(result);


