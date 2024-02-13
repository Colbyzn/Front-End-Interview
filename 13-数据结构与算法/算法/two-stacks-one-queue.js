/**
用两个栈实现一个队列
 */

/**
### 思路

#### 思路提炼

1. 准备两个栈 stack1 和 stack2
2. 入队时，将新元素压入 stack1 即可
3. 出队时，分为 2 步
   1. 若 stack2 为空，则将 stack1 内的所有元素弹出，并压入 stack2，直至 stack1 为空
      > 注：与原 stack1 相比，这时的 stack2 的元素排列刚好相反，头变尾，尾变头
   2. 将 stack2 的栈顶元素弹出
      > 注：此时的栈顶元素刚好就是 stack1 内的栈底元素，即要出队的元素

#### 边界处理/注意点

- `get length() {}` 是使用 get 关键字声明的 getter 方法，它允许你像访问属性一样访问其值

#### 算法复杂度

##### 1. add 方法
- 时间复杂度为 O(1)
  因为不管传入的数多大，每次都只是执行一次
- 空间复杂度为 O(n)
  因为数组 stack1 的大小与输入数据量线性相关，输入量越多，stack1 存储的量就越多

##### 2. delete 方法
- 时间复杂度为 O(n)
  因为有单层循环，循环次数与 stack1 内的元素线性相关
- 空间复杂度为 O(n)
  因为数组 stack1 和 stack2 的总大小与输入数据量线性相关，输入量越多，stack1 和 stack2 存储的量就越多

#### 代码
 */

export class MyQueue {
    // 准备两个栈
    stack1 = []
    stack2 = []
  
    // 入队
    add(item) {
      this.stack1.push(item)
    }
  
    // 出队
    delete() {
      // 当 stack2 为空时，再将 stack1 的所有元素压入 stack2
      if (this.stack2.length === 0) {
        while (this.stack1.length) {
          this.stack2.push(this.stack1.pop())
        }
      }
  
      let stack2Top = this.stack2.pop()
  
      return stack2Top
    }
  
    // 获取队列的长度
    get length() {
      return this.stack1.length + this.stack2.length
    }
  }
  
  // 测试用例
//   let q = new MyQueue()
  
//   q.add('A')
//   console.log(q.length)  // 1
//   q.add('B')
//   console.log(q.length) // 2
  
//   console.log(q.delete()) // "A"
//   console.log(q.length) // 1
//   q.add('C')
//   console.log(q.delete()) // "B"
//   console.log(q.delete()) // "C"
//   console.log(q.length) // 0
