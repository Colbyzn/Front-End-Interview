/**
@description 实现 sleep 函数
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

1. 返回一个 Promise 对象
2. 其内使用定时器来控制该 Promise 何时成功

#### 边界处理/注意点

- 将 resolve 作为 setTimeout 的回调函数

#### 代码
 */

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

// 测试用例
console.log('开始睡眠')
sleep(2000).then(() => {
  console.log('结束睡眠')
})
