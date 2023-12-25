# Front-End-Interview::03-JavaScript

## typeof 能判断哪些类型？

<!-- notecardId: 1702310824318 -->

🔍 所考察的知识点：数据类型、数据类型判断

📢 参考答案：

1. 识别**除 null 以外**的所有值类型：number string blooean undefind symbol
2. 识别函数：function
3. 识别引用类型：object (到此为止，**无法再进一步区分**出是数组、对象还是 null)

> 注：虽然 null 在概念上被认为是一个对象类型，当使用 typeof 运算符检查 null 时，会返回 "object"，但是**null** 被视为一个**特殊的值类型**，这是由于历史原因导致的。

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

- 实例化对象在调用属性/方法时，会**先从自身内查找**，**若没有**，通过 **`__proto__`** 属性**逐级向上查找**，直到找到该属性/方法或者到达原型链的顶端（Object.prototype）为止

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

- 指的是一个变量在**当前作用域内没有定义，也不是形参，但是被使用了**

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

- 指的是**变量在什么范围内起作用**

### 作用域的作用

- 提高程序的可靠性，**减少命名冲突**
  > 注：之所以可以减少命名冲突，是因为当**同一变量**的**作用域不同**，即使它们被赋予了不同的值，也**互不影响**

### 作用域的分类

- 按照作用范围大小，可以分为以下几类：
- 1. **全局作用域**
     - 定义：指的是整个 script 标签或者 js 文件，当然包括里面的函数
- 2. **局部作用域**（也称为函数作用域）
     - 指的是函数内部区域
- 3. **块级作用域**

     - 指的是由一对花括号{}包裹的区域（**不包括函数的花括号**）

       > 注：块级作用域**只对 let 和 const 声明有效，对 var 声明无效**，示例代码如下：

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
    globalFunction(); // 在全局作用域中找到 globalFunction 函数
  }

  outerFunction();
  ```

## 函数内 this 的指向？

<!-- notecardId: 1702742355748 -->

🔍 所考察的知识点：this 指向

📢 参考答案：

### this 指向的确认时机

- this 在被调用的时候确定，即 this 取什么值，是**在函数调用的时候确认**的，**不是在函数定义的时候确认的**

### this 在不同场景下的指向

1. **全局作用域中的`this`**

   - 在全局作用域（非函数内部）中，**不管你是否开启严格模式**，`this`都指向浏览器全局对象`window`。

     ```javascript
     console.log(this); // window 对象
     ```

2. **普通函数调用中的`this`**

   - 若一个普通函数被直接调用，而不是作为对象的方法或构造函数，则`this`在**非严格模式**下指向全局对象`window`，而在**严格模式**下，指向`undefined`。

     ```javascript
     // 非严格模式下
     function fn() {
       console.log(this); // Window 对象
     }
     fn();
     ```

     ```javascript
     // 严格模式下
     function fn() {
       "use strict"; // 开启严格模式
       console.log(this); // undefined
     }
     fn();
     ```

3. **方法调用中的`this`**

   - 若一个函数作为对象的方法被调用时，则`this`**指向调用该方法的对象**。

     ```javascript
     const zhangsan = {
       name: "zhangsan",
       sayHi() {
         console.log(this); // zhangsan 对象
       },
     };
     zhangsan.sayHi();
     ```

4. **构造函数中的`this`**

   - 若一个函数被作为构造函数使用（使用`new`关键字）时，则`this`**指向所创建的实例对象**。

     ```javascript
     function Student(name) {
       this.name = name;
       console.log(this); // xialuo 对象
     }
     const xialuo = new Student("夏洛");
     ```

5. **事件处理函数中的`this`**

   - 若一个函数被作为事件处理函数使用，则`this`**指向事件源**，即触发事件的元素。

     ```javascript
     button.addEventListener("click", function () {
       console.log(this); // 绑定 click 事件的 button 元素
     });
     ```

6. **箭头函数中的`this`**

   - 箭头函数不绑定`this`，它的`this`值**继承自箭头函数所在作用域的上一级作用域中的 this**。

     ```javascript
     const obj = {
       method() {
         console.log(this); // obj 对象

         const arrowFunc = () => {
           console.log(this); // obj 对象
         };
         arrowFunc();
       },
     };
     obj.method();
     ```

7. **`call`、`apply`、`bind`调用中的`this`**

   - 若一个函数（**非箭头函数**）使用`call`、`apply`或`bind`方法来调用，则该函数内的`this`**指向所给定的对象**。

     > 注：箭头函数**无法使用** call、apply、bind 来改变 this 指向

     ```javascript
     function fn() {
       console.log(this); // 指向 {x:1}，而不是指向 Window 对象
     }
     fn.call({ x: 1 });
     ```

## 描述以下代码中 this 的指向

```javascript
const zhangsan = {
  name: "zhangsan",
  sayHi() {
    console.log(this);
  },
  wait() {
    setTimeout(function () {
      console.log(this);
    }, 1000);
  },
  todo() {
    setTimeout(() => {
      console.log(this);
    }, 1000);
  },
};
zhangsan.sayHi();
zhangsan.wait();
zhangsan.todo();
```

%

<!-- notecardId: 1702742355752 -->

🔍 所考察的知识点：this 指向

📢 参考答案：

打印结果：zhangsan 对象、Window 对象、zhangsan 对象

分析：

- 第一个 this 所在的函数 sayHi **作为对象的方法被调用**，所以**指向调用该方法的对象**，即 zhangsan 对象；
- 第二个 this 所在的函数`function () {}`**作为普通函数被调用**，且**在非严格模式下**，所以**指向全局对象 Window**；
- 第三个 this 所在的函数`() => {}`为**箭头函数**，它的 this **继承其上级作用域的 this**，即 todo 方法内的 this，而 todo 方法是对象的方法，它指向调用的对象 zhangsan，所以第三个 this 也指向 zhangsan 对象；

## 介绍一下 call、apply、bind 之间的区别？

<!-- notecardId: 1702742355757 -->

🔍 所考察的知识点：call、apply、bind 的应用

📢 参考答案：

1. 语法

   - call 方法：`function.call(this 的指向对象, [arg1, arg2, ...])`
   - apply 方法：`function.apply(this 的指向对象, [[argsArray]])`
   - bind 方法：`function.bind(this 的指向对象, [arg1, arg2, ...])`
     > 注：包裹参数的中括号 [] 表示**可选参数**

2. 作用

   - call 方法和 apply 方法**既可以立即调用函数，又可以修改 this 指向**，而 bind 方法**只修改 this 指向，不立即调用函数**，要调用得在其后面再加上小括号；

3. 返回值

   - call 方法和 apply 方法返回的是**调用函数的返回值**，而 bind 方法返回的是一个修改 this 指向和初始化参数后的**新函数**；

4. 可选参数

   - call 方法和 bind 方法的可选参数是使用**参数列表，一个个传递**，而 apply 方法是使用**参数数组/伪数组来传递**；

## 实际开发中闭包的应用场景，举例说明

<!-- notecardId: 1702742355760 -->

🔍 所考察的知识点：闭包的应用

📢 参考答案：

1. **封装私有变量**

   - 闭包所创建的**私有变量只能通过函数内部进行访问，外部是无法直接访问的**，从而提高数据的安全性和隐藏实现细节。
     示例代码：

     ```javascript
     function counter() {
       let count = 0;

       return {
         increment: function () {
           count++;
         },
         decrement: function () {
           count--;
         },
         getCount: function () {
           return count;
         },
       };
     }

     const myCounter = counter();
     myCounter.increment();
     myCounter.increment();
     console.log(myCounter.getCount()); // 输出：2
     ```

     > 注：上述示例代码中的 count 变量为私有变量，外部无法直接访问，只能调用函数内部所提供的 API 进行获取和修改

2. **缓存数据**

   - 使用闭包在函数内部存储数据，一方面，**隐藏数据，不被外界直接访问**，提高数据安全性；另一方面，**实现数据缓存，以避免重复计算或请求相同的数据**，从而提高性能和减少不必要的网络请求。
     示例代码：

     ```javascript
     function createCache() {
       const data = {};
       return {
         set: function (key, val) {
           data[key] = val;
         },
         get: function (key) {
           return data[key];
         },
       };
     }

     const c = createCache();
     c.set("a", 100);
     console.log(c.get("a"));
     ```

     > 注：上述示例代码中的 data 内存储的数据，外部无法直接访问，只能调用函数内部所提供的 API 进行获取和修改

## 请描述以下代码的执行结果，并给出改正方法

```javascript
let i, a;
for (i = 0; i < 10; i++) {
  a = document.createElement("a");
  a.innerHTML = i + "<br>";
  a.addEventListener("click", function (e) {
    e.preventDefault();
    alert(i);
  });
  document.body.appendChild(a);
}
```

%

<!-- notecardId: 1702742355764 -->

🔍 所考察的知识点：作用域和闭包

📢 参考答案：

结果：

- 点击任意 a 标签，**都会弹出 10**

分析：

- 当**执行完 for 语句**，为每个 a 标签绑定点击事件处理函数后，**全局变量 i 从 0 变为了 10**，当发生点击事件时，事件处理函数内的**自由变量 i 会沿着作用域往上查找，找到了离它最近的全局变量 i**，因此，弹出了 10。

改正方法：

1. 使用立即调用函数表达式

   - 使用立即调用函数表达式来为点击事件**创建一个独立作用域**，**将每次循环中的 i 通过立即调用函数的形参传递到其内的事件处理程序**，这样 i 就不是自由变量，而是形参
     示例代码：

     ```javascript
     let i, a;
     for (i = 0; i < 10; i++) {
       a = document.createElement("a");
       a.innerHTML = i + "<br>";
       // 立即调用函数
       (function (i) {
         a.addEventListener("click", function (e) {
           e.preventDefault();
           alert(i);
         });
       })(i);
       document.body.appendChild(a);
     }
     ```

2. 修改变量 i 的作用域

   - 将变量 i 的作用域**修改为块级作用域**
     示例代码：

     ```javascript
     let a;
     // 在 for 语句中，使用 let 来将 i 修改为块级作用域
     for (let i = 0; i < 10; i++) {
       a = document.createElement("a");
       a.innerHTML = i + "<br>";
       a.addEventListener("click", function (e) {
         e.preventDefault();
         alert(i);
       });
       document.body.appendChild(a);
     }
     ```

## 单线程是什么，为什么 JavaScript 是单线程语言？

<!-- notecardId: 1702829193833 -->

🔍 所考察的知识点：单线程

📢 参考答案：

### 单线程的定义

- 单线程指的是**一次只能执行一个任务**，无法同时执行多个任务

### JavaScript 是单线程语言的理由

- 因为 JavaScript 是为了处理页面中用户交互以及操作 DOM 而设计的，**若 JS 是多线程，那么当两个线程操作同一个 DOM 元素时，一个线程在 DOM 节点上添加内容，另一个线程删除了这个节点，这时就会出现浏览器不知道以哪个线程为准的问题**，所以 JavaScript 就被设计成单线程，这样所有的 DOM 操作都是按照顺序执行的，确保了操作的一致性和可预测性

## 请介绍一下同步和异步，以及它们之间的区别？

<!-- notecardId: 1702829193839 -->

🔍 所考察的知识点：同步和异步

📢 参考答案：

在 JavaScript 中，**同步和异步是两种不同的代码执行方式**，它们处理任务的时间机制不同。

### 同步

- 定义：
  - 同步是指代码**按顺序一步一步执行**，**每一步都必须等待前一步完成**后才能开始执行下一步。
- 缺点：
  - 当上一个任务需要执行的时间较长，则下一个任务就会一直等待，那么就会**导致页面加载阻塞、渲染不连贯的问题**。
- 示例代码：

  ```javascript
  console.log("开始");

  function doSomething() {
    console.log("同步操作");
  }

  doSomething();

  console.log("结束");
  // 依次输出：开始 同步操作 结束
  ```

### 异步

- 定义：
  - 异步指的是**在等待异步操作**（比如：定时器任务、网络请求等）**完成的同时，可以继续执行其他代码**。
    > 注：异步操作完成指的是**定时器到时间了**、**网络请求返回响应数据了**、**用户触发事件了**等等这些情况
- 为什么需要异步：
  - 之所以需要异步，是为了**避免在执行定时器任务、网络请求等需要等待的任务时，出现一直等待任务完成，造成页面加载阻塞、渲染不连贯的情况**。
- 异步的实现方式：
  - 异步通常通过**回调函数、Promises 或 async/await** 来实现。
- 示例代码：

  ```javascript
  console.log("开始");

  function doSomethingAsync(callback) {
    //使用 setTimeout 模拟异步操作
    setTimeout(() => {
      console.log("异步操作");
      callback();
    }, 1000);
  }

  doSomethingAsync(() => {
    console.log("回调执行");
  });

  console.log("结束");
  // 依次输出：开始 结束 异步操作 回调执行
  ```

### 同步与异步的区别

- 同步操作**会阻塞**代码的继续执行，异步操作**不会阻塞**代码的继续执行

## 异步的应用场景有哪些？

<!-- notecardId: 1702829193844 -->

🔍 所考察的知识点：异步应用场景

📢 参考答案：

异步主要用于处理那些**耗时**的操作，以及**需要等待外部资源或事件完成后再执行**的情况。以下是一些常见的异步应用场景：

1. **网络请求**：例如 AJAX 请求、图片加载

2. **定时器操作**：例如使用 setTimeout 或 setInterval 执行动画效果

3. **事件处理**：例如用户点击按钮触发事件，调用事件处理函数来处理。

## 什么是回调地狱（Callback Hell），以及如何解决？

<!-- notecardId: 1702829193848 -->

📢 参考答案：

### 回调地狱

- **在 ES6 之前**，JavaScript 是通过 **Callback（回调函数）的方式**来实现异步操作的，**当回调嵌套很多时，代码就会不断地缩进**，使得代码看起来非常繁琐，导致难以维护，这就是回调地狱的现象，如下图所示：
  ![](../Media/%E5%9B%9E%E8%B0%83%E5%9C%B0%E7%8B%B1.png)

### 解决措施

- ES6 推出了 **Promise** 来解决异步编程中回调地狱的问题。

## 请描述 event loop（事件循环/事件轮询）的执行机制？

<!-- notecardId: 1702915016925 -->

🔍 所考察的知识点：event loop

📢 参考答案：

event loop 执行过程如下：

![](../Media/event%20loop%20%E8%AF%A6%E7%BB%86%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

1. 遇到**同步任务**，将其**放入调用栈**（Call Stack）中立即执行，执行完毕后，清出调用栈
2. 遇到**异步任务中的宏任务**，将其**交给浏览器的 APIs 处理**（Web APIs），**一旦宏任务完成**，就将其对应的回调函数**放入回调队列**（Callback Queue）中，等待执行
3. 遇到**异步任务中的微任务**，等待时机，**一旦 Promise 有结果（成功/失败）**，就将所调用方法（例如 then、catch 等）的回调函数**放入微任务队列**（Micro Task Queue）中，等待执行
4. **一旦调用栈为空**，即同步任务执行完毕，就会**开启事件循环**（event loop）
5. **不断循环以下过程**：
   - 1、去微任务队列中**读取微任务**，若有微任务，就放入调用栈中立即执行，**连续执行所有微任务，直到队列为空**
   - 2、若 DOM 结构有更新，则**尝试 DOM 渲染**
   - 3、去回调队列中**读取宏任务**，若有宏任务，就放入调用栈中立即执行

> 注：
> 宏任务完成，比如：
>
> 1. **网络请求返回响应数据了**，就将网络请求中的回调函数放入回调队列中，等待调用栈读取；
> 2. **定时时间到了**，就将定时函数中的回调函数放入回调队列中，等待调用栈读取；
> 3. **DOM 事件被触发了**，就将事件处理函数放入回调队列中， 等待调用栈读取；

## 请介绍一下 Promise 对象

从定义、为何存在、语法格式、状态值、实例方法（then、catch）方面介绍
%

<!-- notecardId: 1702915016934 -->

🔍 所考察的知识点：Promise 对象

📢 参考答案：

### Promise 对象的定义

- 指的是**构造函数 Promise 实例化所得的对象**

### Promise 对象为何存在

- Promise 对象的诞生就是为了**解决异步编程中回调地狱的问题**

### Promise 对象的语法格式

- `声明变量关键字 变量名 = new Promise(函数)`
  > 注：
  >
  > 1. 构造函数 Promise 的形参是一个函数，**该函数有两个形参，分别是 resolve 与 reject**，前者表示异步操作成功后的回调函数，后者表示异步操作失败后的回调函数；
  > 2. resolve 回调函数用于将 Promise 对象的初始状态值**由 pending 修改为 fulfilled**，而 reject 回调函数用于将 Promise 对象的初始状态值**由 pending 修改为 rejected**；

### Promise 对象的状态值

- pending、fulfilled、rejected
  > 注：
  >
  > 1. pending 是**待定状态**，fulfilled 是**操作成功状态**，rejected 是**操作失败状态**；
  > 2. Promise 对象必然处于上述三个状态中的一种；
  > 3. 状态变化具有**不可逆性**，只能是 pending→fulfilled 或者 pending→rejected，不可能是 fulfilled→rejected 或者 rejected→fulfilled；
  > 4. 状态值为 **fulfilled** 的 Promise 对象会**调用 then 方法内的成功回调函数**，而状态值为 **rejected** 的 Promise 对象会**调用 catch 方法**内的回调函数**或者 then 方法内的失败回调函数**；

### then 方法

- 语法格式
  - `Promise 对象.then(成功时的回调函数, [失败时的回调函数])`
- 回调函数中参数的传递
  - 成功回调函数内的形参，其取值为**调用 then 方法且状态值为 fulfilled 的 Promise 对象内的结果值**
    ![](../Media/then%20%E6%96%B9%E6%B3%95%E5%86%85%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E4%BC%A0%E9%80%92.png)
  - 失败回调函数内的形参，其取值为**调用 then 方法且状态值为 rejected 的 Promise 对象内的结果值**
    ![](../Media/then%20%E6%96%B9%E6%B3%95%E5%86%85%E5%A4%B1%E8%B4%A5%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E4%BC%A0%E9%80%92.png)
- 返回值
  - then 方法会**返回一个新 Promise 对象**，其状态值（PromiseState）和结果值（PromiseResult）取决于成功/失败回调函数内 return 的值，具体规则如下：
    - 若成功/失败回调函数内**没有 return 任何值**，则新 Promise 对象的状态值为 fulfilled，结果值为 undefined
    - 若成功/失败回调函数内 **return 一个非 Promise 对象**，则新 Promise 对象的状态值为 fulfilled，结果值为这个非 Promise 对象
    - 若成功/失败回调函数内 **return 一个 Promise 对象**，则新 Promise 对象的状态值与该 Promise 对象的状态值一致（可能是 pending 或 fulfilled 或 rejected），结果值与该 Promise 对象的结果值一致（可能是任何值或错误对象）
    - 若成功/失败回调函数内**抛出一个错误**，则新 Promise 对象的状态值为 rejected，结果值为 throw new Error() 小括号内的错误值

### catch 方法

- 语法格式
  - `Promise对象.catch(失败时的回调函数)`
- 回调函数中参数的传递
  - 失败回调函数内的形参，其取值为**链式调用中，状态值为 rejected 的 Promise 对象内的结果值**
    ![](../Media/catch%20%E6%96%B9%E6%B3%95%E5%86%85%E5%A4%B1%E8%B4%A5%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E4%BC%A0%E9%80%92.png)
- 返回值
  - catch 方法会**返回一个新 Promise 对象**，其状态值（PromiseState）和结果值（PromiseResult）取决于失败回调函数内 return 的值，具体规则与 then 方法相同

## 请描述以下代码的执行结果（1）

```javascript
Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .catch(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });
```

%

🔍 所考察的知识点：Promise

📢 参考答案：

结果：

- 1 3

分析：

- `Promise.resolve()`会返回一个 fulfilled 状态的 Promise 对象，它会调用紧跟的 then 方法内的成功回调函数，由于成功回调函数没有任何返回值，所以 then 方法返回一个状态值为 fulfilled 的 Promise 对象，因此，不会调用 catch 方法，而是调用其后的 then 方法

## 请描述以下代码的执行结果（2）

```javascript
Promise.resolve()
  .then(() => {
    console.log(1);
    throw new Error("erro1");
  })
  .catch(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });
```

%

🔍 所考察的知识点：Promise

📢 参考答案：

结果：

- 1 2 3

分析：

- `Promise.resolve()`会返回一个 fulfilled 状态的 Promise 对象，它会调用紧跟的 then 方法内的成功回调函数，由于成功回调函数抛出了错误，所以 then 方法返回一个状态值为 rejected 的 Promise 对象，因此，会调用 catch 方法，由于 catch 方法内的回调函数没有返回任何值，所以 catch 方法会返回一个状态值为 fulfilled 的 Promies 对象，因而，会继续调用其后的 then 方法

## 请描述以下代码的执行结果（3）

```javascript
Promise.resolve()
  .then(() => {
    console.log(1);
    throw new Error("erro1");
  })
  .catch(() => {
    console.log(2);
  })
  .catch(() => {
    console.log(3);
  });
```

%

🔍 所考察的知识点：Promise

📢 参考答案：

结果：

- 1 2

分析：

- `Promise.resolve()`会返回一个 fulfilled 状态的 Promise 对象，它会调用紧跟的 then 方法内的成功回调函数，由于成功回调函数抛出了错误，所以 then 方法返回一个状态值为 rejected 的 Promise 对象，因此，会调用 catch 方法，由于 catch 方法内的回调函数没有返回任何值，所以 catch 方法会返回一个状态值为 fulfilled 的 Promies 对象，因而，不会继续调用其后的 catch 方法

## 请介绍一下 async/await

<!-- notecardId: 1703003133052 -->

### async/await 是什么

- async/await 是**使用同步代码编写异步**的**语法糖**，它**省去 promise 链式调用的繁琐写法**，使得处理基于 Promise 的异步任务写法更简洁

### async/await 与 Promise 的关系

- **async/await 中依然会使用 Promise 对象**，只是写法比 Promise 的链式调用更加简洁，所以 async/await 与 Promise 两者**并不互斥**，是**相辅相成**的关系

### async

- 语法格式

  ```javascript
  async function 函数名() {
    //相关代码
  }
  ```

  > 注：async 函数中可以不使用 await，但是 **await 只能在 async 函数中使用**；

- 返回值

  - async 函数会**返回一个新 Promise 对象**，其状态值（PromiseState）和结果值（PromiseResult）取决于 async 函数内 return 的值，具体规则与 then 方法相同，如下所示：

    | async 函数内的 return 值       | 新 Promise 对象的状态值         | 新 Promise 对象的结果值            |
    | ------------------------------ | ------------------------------- | ---------------------------------- |
    | **没有 return 任何值**         | fulfilled                       | undefined                          |
    | **return 一个非 Promise 对象** | fulfilled                       | 返回的非 Promise 对象              |
    | **return 一个 Promise 对象**   | 与返回的 Promise 对象的状态一致 | 与返回 的 Promise 对象的结果一致   |
    | **抛出一个错误**               | rejected                        | throw new Error() 小括号内的错误值 |

### await

- 语法格式
  - `await 表达式`
- await 如何处理其后的表达式
  - 1、若表达式为**非 Promise 对象**，则 await 将其**先转换**为状态值为 fulfilled，结果值为该非 Promise 对象的 Promise 对象，然后**返回其结果值**；
  - 2、若表达式为**成功状态的 Promise 对象**，则**返回其结果值**；
  - 3、若表达式为**失败状态的 Promise 对象**，则需要使用以下两种方法来捕获错误：**① 使用 try...catch 语法来捕获错误**；**② 在表达式后, 使用 catch()方法来捕获错误**；具体示例代码如下：
    ![](../Media/async%E4%B8%AD%E6%8D%95%E8%8E%B7%E5%A4%B1%E8%B4%A5%E7%8A%B6%E6%80%81%E7%9A%84Promise%E5%AF%B9%E8%B1%A1%E7%9A%84%E9%94%99%E8%AF%AF.png)
- 返回值
  - 返回**成功状态**的 Promise 对象的**结果值**
- await 对代码执行的影响
  - 1、每当碰到 await 时，**先执行其后的表达式**；
  - 2、**当表达式有结果了**（即成功/失败的 Promise 对象），就**将该 promise 微任务放入微任务队列**中，并**暂停整个 async 函数的进程**；
  - 3、**执行完 async 函数之外的所有同步任务**；
  - 4、去微任务队列中读取微任务，将其放入调用栈中执行，**同时恢复整个 async 函数的进程**；

## 请描述以下代码的执行结果（4）

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");
async1();
console.log("script end");
```

%

<!-- notecardId: 1703003133057 -->

🔍 所考察的知识点：await 对代码执行的影响

📢 参考答案：

结果：

- script start
- async1 start
- async2
- script end
- async1 end

分析：

- 当执行到代码`await async2()`时，先执行其后表达式`async2()`，打印 async2，由于函数 async2 没有 return 任何值，所以函数 async2 会返回一个状态值为 fulfilled，结果值为 undefined 的 Promise 对象，接着 await 处理该 Promise 对象，将其对应的回调函数放入微任务队列中，等待执行，并暂停整个 async1 函数的进程，然后去执行 async1 函数之外的同步代码，当所有同步代码执行完毕，再去读取异步任务，将微任务队列中的 promise 微任务放入调用栈中执行，并恢复整个 async1 函数的进程，继续往下执行，即打印成 async1 end

## 请描述以下代码的执行结果（5）

```javascript
async function fn() {
  return 100;
}

(async function () {
  const a = fn();
  console.log(a);
  const b = await fn();
  console.log(b);
})();
```

%

<!-- notecardId: 1703003133061 -->

🔍 所考察的知识点：async/await

📢 参考答案：

结果：

- Promise {\<fulfilled>: 100}
- 100

## 请描述以下代码的执行结果（6）

```javascript
(async function () {
  console.log("start");
  const a = await 100;
  console.log("a", a);
  const b = await Promise.resolve(200);
  console.log("b", b);
  const c = await Promise.reject(300);
  console.log("c", c);
  console.log("end");
})();
```

%

<!-- notecardId: 1703003133065 -->

🔍 所考察的知识点：async/await

📢 参考答案：

结果：

- start
- a 100
- b 200

分析:

- 当执行到代码`await Promise.reject(300)`时，由于 **await 无法处理失败状态的 Promise 对象**，会报错，报错后，之后的代码都不会被执行

## 介绍一下宏任务和微任务

<!-- notecardId: 1703003133068 -->

### 宏任务和微任务有哪些

- 宏任务：**setTimeout、setInterval、Ajax、DOM 事件**
- 微任务：**Promise、async/await**

### 宏任务和微任务的存放位置

- **微任务**（如 Promise），**不会**交给 Web APIs 处理，会直接**放入微任务队列（Micro Task Queue）里面**，等待执行
- **宏任务**（如 setTimeout），**会**交给 Web APIs 处理，一旦异步操作完成，就**放入回调队列（Callback Queue）里面**，等待执行

> 注：微任务之所以不会交给 Web APIs 处理，是因为**微任务**是 ES6 语法规定的，是 **ES 规范**，而**宏任务**是由浏览器规定的，是 **W3C 规范**

### 宏任务和微任务的执行时机

- 微任务执行时机**比宏任务要早**
  > 注：之所以这样，是因为**宏任务是在 DOM 渲染后触发，而微任务是在 DOM 渲染前触发**，示例图如下：
  > ![](../Media/event%20loop%20%E8%AF%A6%E7%BB%86%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

## 请描述以下代码的执行结果（7）

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");
```

%

<!-- notecardId: 1703003133072 -->

🔍 所考察的知识点：async/await、宏任务和微任务

📢 参考答案：

结果：

- script start
- async1 start
- async2
- promise1
- script end
- async1 end
- promise2
- setTimeout

## ES6 中的类字段

<!-- notecardId: 1703087769393 -->

### 定义

- 指的是允许你在声明 class 类时，**直接初始化属性，而不是在构造函数中初始化属性**。

### 应用场景

- 对于那些**属性值不依赖于构造函数所传递参数**的属性，可以使用类字段来初始化该属性，即**将其定义在构造函数 constructor 之外**，这样可以使得代码更清晰。
- 示例代码：

  ```javascript
  class Student {
    // 将 state 属性定义在构造函数之外
    state = "pending";

    constructor(name, number) {
      console.log(this.state); // pending
      this.name = name;
      this.number = number;
    }

    sayHi() {
      console.log(this.state); // pending
    }
  }
  new Student("夏洛", 100).sayHi();
  ```

  > 注：
  >
  > 1. 定义在构造函数之外的 state 属性，是**实例对象自身的属性**（可以通过【**实例对象.state**】来访问），不会被添加到原型对象上，因为**它不是引用类型，没必要放到原型对象上**
  > 2. 由于是实例对象自身的属性，所以你可以**在构造函数和方法内通过 this 来访问**
