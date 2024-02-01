/**
反转单向链表

给你单链表的头节点 head ，返回反转后的链表，例如：

原链表：1 -> 2 -> 3
反转后的链表：3 -> 2 -> 1

%
 */

/**
### 思路

#### 思路提炼

1. 定义三个指针 prevNode（上一个节点）、curNode（当前节点）、nextNode（下一个节点），其中 curNode 初始化为表头，其余初始化为 null
2. 从表头开始遍历链表，直到 curNode 为 null，每次迭代，分为 3 步：
   1. 使用 nextNode 保存下一个节点
      > 注：因为反转指针后将无法访问原来的下一个节点
   2. 反转指针，即将 curNode 的 next 指针指向 prevNode
   3. 整体移动指针，即更新 prevNode 为 curNode、更新 curNode 为 nextNode
3. 遍历结束后，返回反转后的表头 prevNode
   > 注：因为当 curNode 为 null，则 prevNode 就是原链表的最后一个元素

#### 边界处理/注意点

1. 函数接受一个链表 head，返回一个链表
2. 在迭代时，要确保反转指针指向上一个节点前，保存下一个节点，以免导致无法访问下一个节点

#### 代码
 */

export interface ListNode {
  value: number,
  next: ListNode | null
}

export function reverseLinkedList(head: ListNode | null): ListNode | null {
  let prevNode: ListNode | null = null
  let curNode: ListNode | null = head
  let nextNode: ListNode | null = null

  while (curNode != null) {
    nextNode = curNode.next // 保存下一个节点
    curNode.next = prevNode // 反转指针，指向上一个节点
    prevNode = curNode // 移动 prevNode 指针
    curNode = nextNode // 移动 curNode 指针
  }

  return prevNode
}

/**
#### 算法复杂度

- 时间复杂度为 O(n)
  因为有单层循环，且其循环次数与输入链表的长度线性相关
- 空间复杂度为 O(1)
  因为是将输入链表赋值给所新增的三个指针 prevNode、curNode、nextNode，所以都是指向链表的引用地址，而定义变量所使用的空间是固定的，与输入链表的长度无关
 */

// 测试用例
// console.log(reverseLinkedList({value: 100, next: null}))
// const node = {
//   value: 100,
//   next: {
//     value: 200,
//     next: {
//       value: 300,
//       next: {
//         value: 400,
//         next: null
//       }
//     }
//   }
// }
// console.log(reverseLinkedList(node))
// console.log(reverseLinkedList(null))