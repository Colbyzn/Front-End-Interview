/**
@description 求二叉搜索树的第 k 个最小值
@author Colbyzn
 */

/**
输入：一个二叉搜索树
输出：第 k 个最小值
 */

/**
### 题解

#### 思路提炼

1. 创建一个数组 res，存放中序遍历后的所有节点
2. 对二叉搜索树进行中序遍历，并将每个节点的值推入 res 中
3. 返回数组 res 的第 k 项值，即 res[k - 1]

#### 边界处理/注意点

#### 代码
 */

function bstKthSmallest(root, k) {
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

/**
#### 算法复杂度

- 时间复杂度为 O(n)
  因为需要每个节点都遍历一遍
- 空间复杂度为 O(n)
  因为创建了一个数组 res，其大小与二叉树节点数量线性相关
 */

// 测试用例
const bst = require('./binary-search-tree')
console.log(bstKthSmallest(bst, 5))