/**
@description 找出英文句子中最长的单词，考虑特殊字符
@author Colbyzn
 */

/**
输入："Hello, world! JavaScript is amazing."
输出："JavaScript"
%
 */

/**
📢 参考答案：

### 题解

#### 思路提炼

1. 使用正则表达式匹配出所有单词
2. 遍历每个单词，比较当前单词与上一个单词的长度，取最长的那个单词
3. 遍历结束，返回最长的那个单词

#### 边界处理/注意点

- `/\b\w+\b/g` 这个正则表达式会过滤掉特殊字符，只匹配由字母、数字或下划线组成的完整单词

#### 代码
 */

function findLongestWord(sentence) {
  if (sentence.length === 0) return null

  // 使用正则表达式匹配单词，并去除特殊字符
  const words = sentence.match(/\b\w+\b/g);

  if (!words) {
    // 如果没有匹配到单词，返回空
    return null;
  }

  // 找到最长的单词
  const longestWord = words.reduce((acc, cur) => {
    return cur.length > acc.length ? cur : acc;
  }, '');

  return longestWord;
}

// 测试用例
const exampleSentence = "Hello, world! JavaScript is amazing.";
const longestWord = findLongestWord(exampleSentence);

console.log("最长的单词是:", longestWord);
