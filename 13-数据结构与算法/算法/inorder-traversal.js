/**
@description 二叉树中序遍历
@author Colbyzn
 */

/**
输入：二叉树的根节点 root
输出：一个包含所有节点值的数组元素，其内元素按照中序遍历的顺序排列
 */

/**
### 题解 1（递归）

#### 思路提炼

1. 递归调用函数，遍历左子树
2. 访问根节点
3. 递归调用函数，遍历右子树

#### 边界处理/注意点

- 存储节点值的数组 res 要作为形参，不能在函数内作为变量来声明，否则只能存储单个节点值，无法存储所有的节点值
- 记得在最后 return res

#### 代码
 */

function inorderTraversal1(root) {
  const res = []

  const dsf = (root) => {
    if (root == null) return

    dsf(root.left);
    res.push(root.value);
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
console.log(inorderTraversal1(tree));

/**
### 题解 2（非递归）

#### 思路提炼

1. 创建一个栈，模拟递归调用系统栈的过程
2. 将所有左子树挨个入栈
   通过每次迭代更新指针来实现
3. 访问最尽头左子树的根节点，即栈顶元素的值
4. 将栈顶元素的右子树入栈
5. 重复 2-4，直至栈为空且指针为空

#### 边界处理/注意点

- 只有当栈且指针都为空时，才能结束循环

#### 代码
 */

function inorderTraversal2(root) {
  const res = []
  if (root == null) return res

  const stack = []

  let p = root
  while (stack.length || p) {
    // 将所有左子树入栈
    while (p) {
      stack.push(p)
      p = p.left
    }
    // 访问最尽头左子的根节点
    const stackTop = stack.pop()
    res.push(stackTop.value)
    // 将栈顶元素的右子树入栈
    p = stackTop.right
  }

  return res
}

/**
#### 算法复杂度

- 时间复杂度为 O(n)
  虽然有两个 while 循环，但是内层循环对于每个节点只进行了常数次的操作（进栈和出栈），而不是进行 n 次操作，所以时间复杂度并不是 O(n^2)
- 空间复杂度为 O(n)
  因为 res 的大小与节点数量线性相关，且 stack 在最坏情况下，即单链时，其大小也与节点数量线性相关，所以总体空间复杂度为 O(n)

 */

// 测试用例
console.log(inorderTraversal2(tree));