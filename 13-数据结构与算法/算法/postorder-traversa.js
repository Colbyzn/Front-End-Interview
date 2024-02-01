/**
@description 二叉树后序遍历
@author Colbyzn
 */

/**
输入：二叉树的根节点 root
输出：一个包含所有节点值的数组元素，其内元素按照后序遍历的顺序排列
 */

/**
### 题解 1（递归）

#### 思路提炼

1. 递归调用函数，遍历左子树
2. 递归调用函数，遍历右子树
3. 访问根节点

#### 边界处理/注意点

1. 存储节点值的数组 res 要作为形参，不能在函数内作为变量来声明，否则只能存储单个节点值，无法存储所有的节点值
2. 记得在最后 return res

#### 代码
 */

function postorderTraversal1(root) {
  const res = []

  const dsf = (root) => {
    if (root == null) return

    dsf(root.left);
    dsf(root.right);
    res.push(root.value);
  }
  dsf(root)

  return res;
}



/**
 #### 算法复杂度

- 时间复杂度为 O(n)
  因为递归调用的次数，即程序执行的次数与二叉树的节点数线性相关，每个节点都会被遍历一次
- 空间复杂度为 O(n)
  因为使用 res 存储了所有的节点值，其大小与二叉树的节点数线性相关
      
 */

// 测试用例
const tree = require('./binary-tree.js')
console.log(postorderTraversal1(tree));

/**
### 题解 2（非递归）

#### 思路提炼

1. 将前序遍历变成中右左
2. 反转输出的数组，即可得到左右中的后序遍历

#### 边界处理/注意点

- 要实现中右左，则需要先将左子树入栈，再将右子树入栈，这样出栈才会是先右子树再左子树

#### 代码
 */

function postorderTraversal2(root) {
  const res = []
  if (root == null) return res

  const stack = [root]

  while (stack.length) {
    const stackTop = stack.pop()
    res.push(stackTop.value)
    if (stackTop.left) stack.push(stackTop.left) // 相对于前序遍历，调换顺序
    if (stackTop.right) stack.push(stackTop.right)
  }

  // 反转中右左的结果
  return res.reverse()
}

/**
#### 算法复杂度

- 时间复杂度为 O(n)
  因为有单层循环，且循环的次数与二叉树的节点数线性相关，每个节点都会被遍历一次
- 空间复杂度为 O(n)
  因为 res 的大小与节点数量线性相关，且 stack 在最坏情况下，即单链时，其大小也与节点数量线性相关，所以总体空间复杂度为 O(n)
 */

// 测试用例
console.log(postorderTraversal2(tree));
