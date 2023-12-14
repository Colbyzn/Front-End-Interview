# Front-End-Interview::03-JavaScript

## typeof 能判断哪些类型？

<!-- notecardId: 1702310824318 -->

🔍 所考察的知识点：数据类型、数据类型判断

📢 参考答案：

1. 识别出**除 null 以外**的所有值类型：number string blooean undefind symbol
2. 识别函数：funtion
3. 识别引用类型：object (到此为止，**无法再进一步区分**出是数组、对象还是 null)

> 注：**null** 被视为一个**特殊的值类型**。虽然 null 在概念上被认为是一个对象类型，当使用 typeof 运算符检查 null 时，会返回 "object"，但是这是由于历史原因导致的。

## 发生隐式类型转换的情况有哪些？

<!-- notecardId: 1702310824324 -->

🔍 所考察的知识点：隐式类型转换

📢 参考答案：

定义：隐式类型转换是指对**不同类型数据**进行运算时，编译器会**自动**将一个数据类型转换为另一个数据类型，以使运算能够顺利进行

按照转换类型分类：

1. 转换为 string 类型

   - 🔹 **字符串拼接**
     当使用运算符 **+**，并且其**两侧存在 string 类型数据**时，则编译器内部会自动**将两侧非 string 类型转换为 string 类型**，再拼接

     ```javascript
     console.log(123 + "1"); // 1231
     ```

2. 转换为 boolean 类型

   - 🔹 **if 判断**
     编译器内部会自动**将小括号内非 boolean 类型的表达式转换为 boolean 类型**，再进行判断

     ```javascript
     if (2)
     // 2 会被转换为 true
     ```

   - 🔹 **逻辑运算(&& || !)**
     编译器内部会自动**将逻辑运算符两侧非 boolean 类型的表达式转换为 boolean 类型**，再进行运算

     ```javascript
     console.log(10 && 0); // 0
     // 内部做了 boolean 类型转换(10 转换为 true，0 转换为 false)，但实际上返回的是原始操作数的值 0
     ```

3. 转换为 number 类型

   - 🔹 **自增和自减运算符(++/--)**
     若进行自增/自减的变量为非 number 类型，则编译器内部会自动**将变量转换为 number 类型**，再运算

     ```javascript
     let num = "10";
     num++;
     console.log(num); // 11
     ```

   - 🔹 **算数运算符(+ - \* / %)**
     编译器内部会自动将算数运算符两侧非 number 类型的数据转换为 number 类型

     ```javascript
     console.log(true + 1); // 2
     console.log("12" / 4); // 3
     ```

     > 注：对于 **+** 运算符，**只要两侧存在 string 类型的数据**，则**不会**将其隐式转换为 number 类型

   - 🔹 **比较运算符(>, <, <=, >=, ==, !=)**
     编译器内部会自动**将比较运算符两侧非 number 类型的数据转换为 number 类型**

     ```javascript
     console.log("5" > 1); // true
     console.log("12" == 12); // true
     ```

     > 注：当**将 == 应用于 null 或 undefined 时**，它们**不会被隐式转换为 number**，且 **null 只等于 null 或 undefined**，不等于其他任何值，示例代码如下：

     ```javascript
     null == 0; // false, null 不会被隐式转换为 0
     null == null; // true
     undefined == undefined; // true
     null == undefined; // true
     undefined == 0; // false, undefined 不会被隐式转换为 0
     ```

## 何时使用 === 何时使用 ==？

<!-- notecardId: 1702310824328 -->

🔍 所考察的知识点：比较运算符、隐式类型转换

📢 参考答案：

除了判断是否等于 null 之外，一律用三等

> 注：判等运算符(==)，在进行比较前，会先转换成相同类型，再比较

## if (obj.a == null) 相当于什么？

<!-- notecardId: 1702310824332 -->

相当于：

```javascript
if (obj.a === null || obj.a === undefined)
```

> 注：实际开发中，常用 `if (obj.a == null)` 来简化写法

## 值类型和引用类型的区别？

<!-- notecardId: 1702310824335 -->

在 JavaScript 中，值类型和引用类型的区别主要体现在存储、复制和比较这三个方面：

1. **存储**：

   - 值类型：值类型的变量直接在栈中存储**实际的数据**。
     > 例如，如果你有一个变量`let a = 10;`，那么`a`就直接存储了数值`10`。
   - 引用类型：引用类型的变量存储的是**数据的引用**（也就是内存地址），而实际数据存放在堆中。
     > 例如，如果你有一个对象`let obj = {name: 'John'};`，那么`obj`存储的是这个对象在内存中的地址。

2. **复制**：

   - 值类型：当一个值类型的变量被赋值给另一个变量时，实际上是把值复制了一份给新的变量。
     > 例如，`let b = a;`，此时`b`会得到`a`的值`10`，`a`和`b`在内存中是**独立**的，**修改其中一个不会影响另一个**。
   - 引用类型：当一个引用类型的变量被赋值给另一个变量时，复制的是引用，因此两个变量指向内存中的同一个对象。
     > 例如，`let obj2 = obj;`，此时`obj2`和`obj`都**指向同一个对象**，**修改其中一个会影响另一个**。

3. **比较**：
   - 值类型：值类型之间比较的是它们的**实际值**。
     > 例如，`let a = 10; let b = 10;`，`a`和`b`是相等的，因为它们的值都是`10`。
   - 引用类型：引用类型之间比较的是它们的**引用地址**。若两个对象引用地址不一样，即使它们的内容完全相同，它们也不相等。
     > 例如，`let obj1 = {name: 'John'}; let obj2 = {name: 'John'};`，尽管`obj1`和`obj2`的内容相同，但它们是不相等的，因为它们在内存中是两个不同的对象。

## 如何判断一个变量是不是数组？

<!-- notecardId: 1702481634301 -->

使用 instanceof 运算符来判断，语法格式：**变量 instanceof Array**

## 为什么 instanceof 可以用来判断变量是否为数组？

<!-- notecardId: 1702481634306 -->

🔍 所考察的知识点：instanceof 运算符、原型链

📢 参考答案：

instanceof 运算符作用：

用于检测**构造函数的原型对象** prototype **是否出现**在某个实例对象的**原型链上**

也就是说，实例对象通过 `__proto__` 属性顺着原型链往上查找，能不能找到该构造函数对应的原型对象，若能，返回 true，否则返回 false

所以**若对象为数组**，则它的原型链上肯定存在**构造函数 Array** 所对应的原型对象 **Array.prototype**，反之，则没有

## 谈一下你对 class 理解？

从**概念、本质、声明、继承**四个方面回答
%

<!-- notecardId: 1702481634310 -->

🔍 所考察的知识点：ES6 的 class 类

📢 参考答案：

### 概念

- class 是 ES6 的语法，可以看作是原先在 ES5 中，使用构造函数与原型方法实现面向对象编程的**语法糖**，它参考了 java 语言，定义了一个类的概念，让对象原型写法更加清晰、更像面向对象编程。

### 本质

- class 的本质仍然是 **function（函数）**

### 声明

- 语法格式如下：

  ```javascript
  /* 封装类名 */
  class 类名 {
    constructor(形参1, 形参2, ...){
      this.属性名 = 形参1;
      ...
    }
    方法名([形参]){
      // 具体代码
    }
    ...
  }
  /*创建对象*/
  声明变量的关键字 变量名 = new 类名(实参1, 实参2, ...);

  /* 调用方法 */
  变量名.方法名([实参])
  ```

  > 注：
  >
  > 1. 写在构造函数 constructor **之外**的方法会**被添加到构造函数的原型对象 prototype 上**；
  > 2. 之所以要将方法添加到构造函数的原型对象 prototype 上，是为了**避免浪费内存资源**，若将方法（即引用类型）写在 constructor 内，那么每实例化一个对象，就会在堆中开辟空间存放该函数，这显然是没有必要的。

### 继承

- 使用关键字 **extends** 来**继承父类**，使用关键字 **super** 来**调用父类的构造函数**，示例代码如下：

  ```javascript
  // 父类
  class People {
    constructor(name) {
      this.name = name;
    }
    eat() {
      console.log(`${this.name} eat something`);
    }
  }

  // 子类
  class Student extends People {
    constructor(name, number) {
      super(name);
      this.number = number;
    }
    sayHi() {
      console.log(`姓名 ${this.name} 学号 ${this.number}`);
    }
  }

  // 子类
  class Teacher extends People {
    constructor(name, major) {
      super(name);
      this.major = major;
    }
    teach() {
      console.log(`${this.name} 教授 ${this.major}`);
    }
  }

  // 实例
  const xialuo = new Student("夏洛", 100);
  console.log(xialuo.name);
  console.log(xialuo.number);
  xialuo.sayHi();
  xialuo.eat();

  // 实例
  const wanglaoshi = new Teacher("王老师", "语文");
  console.log(wanglaoshi.name);
  console.log(wanglaoshi.major);
  wanglaoshi.teach();
  wanglaoshi.eat();
  ```

## 谈一下你对原型和原型链的理解？

<!-- notecardId: 1702481634313 -->

🔍 所考察的知识点：原型和原型链

📢 参考答案：

### 原型

#### 作用

- 原型主要用于实现**继承**，以及实现**对象之间共享属性和方法**
  > 注：之所以可以共享属性/方法，是因为对象的**公共属性/方法会存放在原型对象上**

#### 分类

- 在 JavaScript 中，原型分为两种：**显式原型**和**隐式原型**

- 1. 显式原型
     - 定义：指的是**每个构造函数**内的 **prototype** 属性
     - 作用：指向原型对象
- 2. 隐式原型
     - 定义：指的是**每个对象**都拥有的 **`__proto__`** 属性
     - 作用：内部**自动指向**原型对象

  > 注：
  >
  > 1. `__proto__` 属性为**非标准属性**，实际开发中，**不可以直接使用该属性**；
  > 2. **`实例对象.prototype === 实例对象.__proto__`** 为 **true**，即它们**指向同一对象**；
  > 3. 构造函数、实例化对象、原型对象三者之间的关系示意图如下：
  >    ![](../Media/%E5%8E%9F%E5%9E%8B.png)

### 原型链

#### 原型链的定义

- 指的是实例化对象通过 **`__proto__`** 属性串联起来的一条**对象查找机制**

#### 原型链示意图

![](../Media/%E5%8E%9F%E5%9E%8B%E9%93%BE.png)

#### 对象查找机制

- 实例化对象在调用属性/方法时，会**先从自身内查找**，**若没有**，通过 **`__proto__`** 属性**逐级向上查找**，直到找到该属性或者到达原型链的顶端（Object.prototype）为止

## 手写一个简易的 jQuery，考虑扩展性

<!-- notecardId: 1702566301216 -->

🔍 所考察的知识点：class 与继承、原型和原型链

📢 参考答案：

示例代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <p>段落1</p>
    <p>段落2</p>
    <p>段落3</p>

    <script>
      /* 手写简易的 jQuery */
      class jQuery {
        constructor(selector) {
          const result = document.querySelectorAll(selector);
          const len = result.length;
          for (let i = 0; i < len; i++) {
            this[i] = result[i];
          }
          this.length = len;
          this.selector = selector;
        }
        // 获取指定索引的元素
        get(index) {
          return this[index];
        }
        // 遍历数组
        each(fn) {
          for (let i = 0; i < this.length; i++) {
            const element = this[i];
            fn(element);
          }
        }
        // 事件监听
        on(type, fn) {
          return this.each((element) => {
            element.addEventListener(type, fn, false);
          });
        }
      }

      const p = new jQuery("p");

      console.log(p); // jQuery {0: p, 1: p, 2: p, length: 3, selector: 'p'}
      console.log(p.get(2)); // <p>段落3</p>
      p.each((element) => {
        console.log(element.innerHTML); // 段落1 段落2 段落3
      });
      p.on("click", (e) => {
        console.log(e.target);
      });

      // 扩展：往 jQuery 内添加新的 API
      jQuery.prototype.dialog = function (info) {
        alert(info);
      };
      p.dialog("弹出警告框");

      // 造轮子：以 jQuery 为基础，开发新的东西
      class NewjQuery extends jQuery {
        constructor(selector) {
          super(selector);
        }
        // 扩展自己的方法
        addClass(className) {
          // 具体代码
        }
        style(data) {
          // 具体代码
        }
      }
    </script>
  </body>
</html>
```

## 请介绍一下自由变量？

<!-- notecardId: 1702566301221 -->

### 自由变量的定义

- 指的是一个变量**在当前作用域内没有定义，但是被使用了**

### 自由变量的执行/查找规则

- 从自由变量所在的**当前作用域**开始，**沿着作用域链**逐层往上查找，根据**就近原则**确定自由变量的最终值，若向上查找至全局作用域，仍然没有找到，则会报错提示：xxx is not defined
  > 注：所有自由变量的查找，都是**在函数定义的地方**，向上级作用域查找，而不是在执行的地方！

## 请介绍一下闭包？

<!-- notecardId: 1702566301226 -->

### 闭包的定义

- 闭包是**函数的一种特殊行为**，指的是函数可以**访问其外部作用域中的变量**的能力，即使该函数是在外部作用域执行完毕之后才被调用的

### 闭包的产生

- 以下三种情况会产生闭包：
- 1. **父函数内定义了子函数**，且子函数引用了父函数的变量，示例代码如下：

  ```javascript
  function father() {
    var a = 10;
    function son() {
      console.log(a); // 10
    }
    son();
  }

  var a = 20;
  father();
  ```

- 2. **子函数作为父函数的返回值**，且子函数引用了父函数的变量，示例代码如下：

  ```javascript
  function father() {
    var a = 10;
    return function son() {
      console.log(a); // 10
    };
  }

  var a = 20;
  father()();
  ```

- 3. **函数作为参数传递**，且该函数引用了外部作用域变量，示例代码如下：

  ```javascript
  function fn1(fn) {
    var a = 10;
    fn();
  }

  var a = 20;
  function fn2() {
    console.log(a); // 20
  }
  fn1(fn2);
  ```

### 闭包的缺点

- 闭包会导致**内存泄漏**问题
  > 注：之所以会导致该问题，是因为闭包允许函数访问外部作用域的变量，从而导致这些变量**无法在其所属函数执行完后立即销毁**，在闭包引用期间，会一直被保留在内存中，不会被垃圾回收器回收，**当闭包持续存在且引用了大量的外部变量时，这些变量会占用大量内存**，导致内存泄漏问题

## 请介绍一下作用域？

<!-- notecardId: 1702566301230 -->

### 作用域的定义

- 指的是变量在什么范围内起作用

### 作用域的作用

- 提高程序的可靠性，减少命名冲突
- > 注：之所以可以减少命名冲突，是因为当同一变量的作用域不同，即使它们被赋予了不同的值，也互不影响

### 作用域的分类

- 按照作用范围大小，可以分为以下几类：
- 1. 全局作用域
     - 定义：指的是整个 script 标签或者 js 文件，当然包括里面的函数
- 2. 局部作用域（也称为函数作用域）
     - 指的是函数内部区域
- 3. 块级作用域

     - 指的是由一对花括号{}包裹的区域（不包括函数的花括号）

       > 注：块级作用域只对 let 和 const 声明有效，对 var 声明无效，示例代码如下：

       ```javascript
       function test() {
         if (true) {
           // 块级作用域
           var x = 1;
           let y = 2;
           const z = 3;
         }
         console.log(x); // 1
         console.log(y); // y is not defined
         console.log(z); // z is not defined
       }
       test();
       ```

## 请介绍一下作用域链？

<!-- notecardId: 1702566301234 -->

### 作用域链的定义

- 指的是在函数的 \[[scope]] 属性中存储**作用域运行期的上下文集合**，它**由函数创建时的作用域和所有父级作用域组成**，由于这个**集合呈链式**连接，因此把这种链式连接叫做作用域链，它是 JavaScript 提供的**一套访问标识符（变量名、函数名等）的机制**

### 作用域链的作用

- 在代码执行中，用于**确定标识符（变量名、函数名等）的值**

### 作用域链的查找/访问规则

- 在确定标识符值（变量名、函数名等）的过程中，**从链首（即当前作用域）开始查找**，若**找不到**，则**沿着作用域链**逐级往上查找，根据**就近原则**确定标识符的最终值。若向上查找至全局作用域，仍然没有找到对应的标识符，则会报错提示：xxx is not defined
  查找变量名和函数名两种情况的示例代码如下：

  ```javascript
  var globalVar = "global";

  function globalFunction() {
    console.log("I am a global function");
  }

  function outerFunction() {
    var outerVar = "outer";

    function innerFunction() {
      var innerVar = "inner";
      console.log(innerVar); // 在当前函数作用域中找到 innerVar
      console.log(outerVar); // 在父级函数作用域中找到 outerVar
      console.log(globalVar); // 在全局作用域中找到 globalVar
    }

    innerFunction(); // 在当前作用域中找到 innerFunction 函数
    globalFunction(); // 在当前作用域中找到 globalFunction 函数
  }

  outerFunction();
  ```
