/**
@description 翻转二叉树
@author Colbyzn
 */

/**
输入：给定一棵二叉树的根节点 root
输出：左右翻转后的二叉树的根节点
%
 */

/**
📢 参考答案：

### 题解 1（递归）

#### 思路提炼

1. 使用递归方式对二叉树进行前序遍历
2. 在递归地对左右子树进行前序遍历之前，交换左右子树
   > 注：实际上就是在递归版前序遍历的基础上，增加交换左右子树的操作

#### 边界处理/注意点

- 该函数接受一个二叉树根节点，返回翻转后的二叉树根节点

#### 算法复杂度

- 时间复杂度为 O(n)
  因为需要遍历二叉树的所有节点
- 空间复杂度为 O(n)
  因为最坏的情况下，二叉树为单链，则递归需要的栈空间大小与节点数量线性相关

#### 代码
 */

function mirrorTree1(root) {
  if (root == null) return null

  // 交换左右子树
  const temp = root.left
  root.left = root.right
  root.right = temp

  mirrorTree1(root.left)
  mirrorTree1(root.right)

  return root
}

// 测试用例
const tree = require('./binary-tree.js')
console.log(mirrorTree1(tree));

/**
📢 参考答案：

### 题解 2（非递归）

#### 思路提炼

1. 使用栈的方式对二叉树进行前序遍历
2. 在将左右子树推入栈之前，交换左右子树
   > 注：实际上就是在非递归版前序遍历的基础上，增加交换左右子树的操作

#### 边界处理/注意点

- 该函数接受一个二叉树根节点，返回翻转后的二叉树根节点
- 为了先打印左子树，再打印右子树，所以得先将右子树入栈，再将左子树入栈

#### 算法复杂度

- 时间复杂度为 O(n)
  因为需要遍历二叉树的所有节点
- 空间复杂度为 O(n)
  因为最坏的情况下，二叉树为单链，则递归需要的栈空间大小与节点数量线性相关

#### 代码
 */

function mirrorTree2(root) {
  if (root == null) return null

  const stack = [root]
  while (stack.length) {
    const stackTop = stack.pop()

    // 交换左右子树
    const temp = stackTop.left
    stackTop.left = stackTop.right
    stack.right = temp

    // 入栈顺序先右子树后左子树
    if (stackTop.right) stack.push(stackTop.right)
    if (stackTop.left) stack.push(stackTop.left)
  }

  return root
}

// 测试用例
console.log(mirrorTree2(tree));

