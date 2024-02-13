/**
@description 二叉树前序遍历
@author Colbyzn
 */

/**
输入：二叉树的根节点 root
输出：一个包含所有节点值的数组元素，其内元素按照前序遍历的顺序排列
 */

/**
### 题解 1（递归）

#### 思路提炼

1. 访问根节点
2. 递归调用函数，遍历左子树
3. 递归调用函数，遍历右子树

#### 边界处理/注意点

1. 存储节点值的数组 res 要作为形参，不能在函数内作为变量来声明，否则只能存储单个节点值，无法存储所有的节点值
2. 记得在最后 return res

#### 代码
 */

function preorderTraversal1(root) {
  const res = []

  const dsf = (root) => {
    if (root == null) return

    res.push(root.value);
    dsf(root.left);
    dsf(root.right);
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
console.log(preorderTraversal1(tree));

/**
### 题解 2（非递归）

#### 思路提炼

1. 创建一个栈来模拟递归过程所使用的系统栈
2. 把根节点入栈
3. 访问根节点
4. 再将右子树入栈，然后是左子树
5. 重复上述 3-4，直至栈为空

#### 边界处理/注意点

1. 为了先打印左子树，再打印右子树，所以得先将右子树入栈，再将左子树入栈
   ![](../Media/%E4%BA%8C%E5%8F%89%E6%A0%91%E5%89%8D%E5%BA%8F%E9%81%8D%E5%8E%86-%E9%9D%9E%E9%80%92%E5%BD%92.png)

#### 代码
 */

function preorderTraversal2(root) {
  const res = []

  if (root == null) return res

  const stack = [root]

  while (stack.length) {
    const stackTop = stack.pop()
    res.push(stackTop.value)
    if (stackTop.right) stack.push(stackTop.right)
    if (stackTop.left) stack.push(stackTop.left)
  }

  return res
}

/**
#### 算法复杂度

- 时间复杂度为 O(n)
  因为有单层循环，且循环的次数与二叉树的节点数线性相关，每个节点都会被遍历一次
- 空间复杂度为 O(n)
  因为使用 res 存储了所有的节点值，其大小与二叉树的节点数线性相关
      
 */

// 测试用例
console.log(preorderTraversal2(tree));
