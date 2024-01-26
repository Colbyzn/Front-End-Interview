/**
用两个栈实现一个队列
 */

/**
### 思路

#### 思路提炼

1. 准备两个栈 stack1 和 stack2
2. 入队时，只需使用 push 方法往 stack1 入栈即可
3. 出队时，分为 3 步
   1. 将 stack1 内的元素出栈，并往 stack2 内入栈，直至 stack1 为空
      > 注：与原 stack1 相比，这时的 stack2 的元素排列刚好相反，头变尾，尾变头
   2. 将 stack2 的栈顶元素出栈
      > 注：此时的栈顶元素刚好就是 stack1 内的栈底元素，即要出队的元素
   3. 将 stack2 内的剩余元素出栈，并往 stack1 内入栈，直至 stack2 为空

#### 边界处理/注意点

1. 在 MyQueue 类中，private 是 TypeScript 语言用来声明私有属性/方法的，表示该属性/方法只能在类中被访问，其实例对象无法访问
2. `get length() {}` 是使用 get 关键字声明的 getter 方法，它允许你像访问属性一样访问其值

#### 代码
 */

export class MyQueue {
    // 准备两个栈
    private stack1: number[] = []
    private stack2: number[] = []

    // 入队
    add(n: number) {
        this.stack1.push(n)
    }

    // 出队
    delete(): number | null {
        let res

        while (this.stack1.length) {
            const stackTop = this.stack1.pop()
            if (stackTop != null) {
                this.stack2.push(stackTop)
            }
        }

        // res 可能为 undefined
        res = this.stack2.pop()

        while (this.stack2.length) {
            const stackTop = this.stack2.pop()
            if (stackTop != null) {
                this.stack1.push(stackTop)
            }
        }

        // 若 res 为 undefined，则直接返回 null
        return res || null
    }

    // 获取 stack1 的长度
    get length(): number {
        return this.stack1.length
    }
}

/**
#### 算法复杂度

##### 1. add 方法
- 时间复杂度为 O(1)
  因为不管传入的数多大，每次都只是执行一次
- 空间复杂度为 O(n)
  因为数组 stack1 的大小与输入数据量线性相关，输入量越多，stack1 存储的量就越多

##### 2. delete 方法
- 时间复杂度为 O(n)
  因为有两个单层循环，实际时间复杂度为 O(2n)，但是大 O 表示法会忽略常数因子，所以也就是 O(n)
- 空间复杂度为 O(n)
  因为数组 stack1 和 stack2 的总大小与输入数据量线性相关，输入量越多，stack1 和 stack2 存储的量就越多
 */

// 测试用例
// const q = new MyQueue()

// q.add(100)
// q.add(200)
// q.add(300)

// console.info(q.length)
// console.info(q.delete())
// console.info(q.length)

