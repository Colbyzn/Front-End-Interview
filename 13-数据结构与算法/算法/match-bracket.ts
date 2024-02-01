/**
判断一个字符串是否括号匹配

- 字符串 `(a{b}c)` 是括号匹配
- 字符串 `{a(b}c)` 不是括号匹配
 
%
 */



/**
### 思路

#### 思路提炼

1. 遍历字符串，碰到左括号 (、[、{ 就入栈
2. 碰到右括号 )、]、} 就判断是否与栈内的元素匹配，若匹配就出栈，否则直接返回 false
3. 遍历结束后，若栈为空，则括号匹配，返回 true，否则返回 false

#### 边界处理/注意点

1. 函数接受一个字符串参数 str，返回一个布尔值
2. 若字符串长度为 0，则直接返回 true，不处理
3. 定义数组 stack 时，要明确指定它包含哪种类型的元素，否则会将 stack 的类型推断为包含 never 类型的数组，在 push 新元素时，会提示不能将类型 string 分配给类型 never
4. 获取栈顶元素时，使用 arr.[数组长度 - 1] 获取，但是记得要重新获取数组长度，不要使用已缓存的长度
5. 记得碰到右括号，若与栈内元素不匹配，直接返回 false，否则像 (a{b]}c) 会返回 true
6. 在判断是否与栈内元素匹配时，要注意栈顶只有左括号，没有右括号

#### 代码
 */

export function matchBracket(str: string): boolean {
  const length = str.length;

  if (length === 0) return true;

  const stack: string[] = [];

  const leftSymbol = '([{';
  const rightSymbol = ')]}';

  for (let i = 0; i < length; i++) {
    const s = str[i];

    if (leftSymbol.includes(s)) {
      stack.push(s);
    } else if (rightSymbol.includes(s)) {
      const stackTop = stack[stack.length - 1];

      if (
        (stackTop === '(' && s === ')') ||
        (stackTop === '[' && s === ']') ||
        (stackTop === '{' && s === '}')
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}


/**
#### 算法复杂度

- 时间复杂度为 O(n)
  因为有单层循环，且其循环次数与输入字符串的长度线性相关
  > 注：虽然 leftSymbol 和 rightSymbol 处的 includes 方法的时间复杂度为 O(n)，但是它与输入字符串没有关系
- 空间复杂度为 O(n)
  因为所新增的数组 stack 与输入字符串的长度线性相关，最坏的情况下，即输入字符串全为左括号，那么输入字符串越长，数组就越大
 */


console.log(matchBracket('(a{b}c)'))
console.log(matchBracket('{a(b}c)'))