/**
@description 求二叉搜索树的第 k 个最小值
@author Colbyzn
 */

/**
输入：一个二叉搜索树
输出：第 k 个最小值
 */

/**
### 题解（递归）

#### 思路提炼

1. 创建一个数组 res，存放中序遍历后的所有节点
2. 对二叉搜索树进行中序遍历，并将每个节点的值推入 res 中
3. 返回数组 res 的第 k 项值，即 res[k - 1]

#### 边界处理/注意点

#### 算法复杂度

- 时间复杂度为 O(n)
  因为需要每个节点都遍历一遍
- 空间复杂度为 O(n)
  因为创建了一个数组 res，其大小与二叉树节点数量线性相关

#### 代码
 */

function bstKthSmallest1(root, k) {
  const res = []
  const inorderTraversal = (root) => {
    if (root == null) return
    inorderTraversal(root.left)
    res.push(root.value)
    inorderTraversal(root.right)
  }
  inorderTraversal(root)
  return res[k-1]
}

// 测试用例
const bst = require('./binary-search-tree')
console.log(bstKthSmallest1(bst, 5))

/**

### 题解（迭代）

#### 思路提炼

1. 使用迭代方式进行二叉搜索树的中序遍历
2. 每遍历一个节点，k 就减 1
3. 当 k = 0 时，说明当前就是第 k 个节点，直接返回当前节点的值，即此时栈顶元素的值

#### 边界处理/注意点

#### 算法复杂度

- 时间复杂度为 O(n)
  因为最坏情况下，二叉树为单链，k 为二叉树的节点数量，其时间复杂度为 O(n) + O(n)
- 空间复杂度为 O(n)
  因为最坏情况下，二叉树为单链，栈 stack 需要存储所有的节点数量

#### 代码
 */

function bstKthSmallest2(root, k) {
  const stack = []

  let p = root
  while (stack.length || p) {
    while (p) {
      stack.push(p)
      p = p.left
    }

    const stackTop = stack.pop()

    // 每访问一个节点，k 就减 1
    k--
    if (k === 0) {
      return stackTop.value
    }

    p = stackTop.right
  }
}

// 测试用例
console.log(bstKthSmallest2(bst, 5))


