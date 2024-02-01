/**
@description 求二叉树的最大深度
@author Colbyzn
 */

/**
输入：给定一个二叉树
输出：从根节点到最远叶子节点的最长路径上的节点数，即二叉树的最大层级
 */

/**
### 题解

#### 思路提炼

1. 使用递归的方式进行深度优先遍历
2. 先计算左子树的最大深度
3. 计算右子树的最大深度
4. 比较左右子树的最大深度，取最大值，并加上 1 后返回

#### 边界处理/注意点

- 该函数接受一个二叉树根节点，返回一个表示最大深度的数字
- 若二叉树为空，则返回 0，表示二叉树没有深度

#### 代码
 */

function maxDepth (root) {
  if (root == null) return 0

  const leftDepth = maxDepth(root.left)
  const rightDepth = maxDepth(root.right)

  return Math.max(leftDepth, rightDepth) + 1
}

/**
#### 算法复杂度

- 时间复杂度为 O(n)
  因为每个节点都会遍历一次，所以执行次数与二叉树的节点数线性相关
- 空间复杂度为 O(n)
  因为递归调用会使用系统栈，最坏情况下，二叉树是单链，其节点数就等于最大深度
      
 */

// 测试用例
const tree = require('./binary-tree')
console.log(maxDepth(tree))
// console.log(maxDepth())