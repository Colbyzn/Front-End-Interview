/**
@description 实现函数柯里化
@author Colbyzn
 */

/**
输入：
输出：
解释：

%
 */

/**
📢 参考答案：

### 题解

#### 思路提炼

1. 定义一个数组 args，用于收集所积累的参数
2. 返回一个新函数
3. 在新函数内，更新所收集的参数
4. 比较目前所收集的参数数量与原始函数 fn 的参数数量，若小于，则说明参数收集不够，仍然返回新函数，否则，调用 fn 返回执行结果

#### 边界处理/注意点

- 该函数接受一个函数，在参数不够时，返回新函数，当参数够时，返回原函数的执行结果
- 获取一个函数有几个参数，通过其 length 属性即可获取，即 `fn.length`

#### 代码
 */

function curry(fn) {
  let args = []

  function calc(...newArgs) {
    // 将每次传入的参数添加到 args 数组内
    args = [...args, ...newArgs]

    if (args.length < fn.length) {
      // 参数收集不够，直接返回新函数
      return calc
    } else {
      // 参数收集够了，返回原始函数 fn 的执行结果
      return fn.apply(this, args)
    }
  }

  return calc
}

// 测试用例
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

// 可以逐个传递参数
console.log(curriedAdd(1)(2)(3)); // 输出 6
也可以一次传递部分参数
console.log(curriedAdd(1, 2)(3)); // 输出 6
// 或者一次性传递所有参数
console.log(curriedAdd(1, 2, 3)); // 输出 6