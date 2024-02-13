# Front-End-Interview::14-TypeScript

## 请介绍一下 TypeScript

<!-- notecardId: 1707821825881 -->

📢 参考答案：

### 定义

- TypeScript 是 JavaScript 的**超集**
- 它在 JavaScript 的基础上，**添加了类型支持**

### 为什么需要

- 因为它可以**在调试前（即编写代码的同时）就检查代码**，从而**提早发现问题**，而不需要等到调试后，再来查找代码的问题所在，这**大大减少了找 bug、改 bug 的时间，提高了开发效率**

  ![](../Media/JS%20vs%20TS.png)

  > 注：上图中，使用 JS 编写代码，只能等到运行代码时，才会给出错误提示，而使用 TS，在你编写代码的同时，若变量所赋的值与声明时所指定的类型不符时，就会通过波浪线提示开发者

### 基本使用

### 使用注意

## 请介绍一下 ts 中的数据类型

<!-- notecardId: 1707821825885 -->

📢 参考答案：

ts 是 js 的超集，所以对于 js 的数据类型，ts 都支持

1. 基本数据类型：
   例如，**number、string、boolean、undefined、null、symbol**
2. 引用数据类型：
   例如，**function、object、array**
3. ts 新增数据类型：
   例如，**联合类型、类型别名、接口、元组、字面量类型、枚举、void、any、unknown、never**

## 请介绍一下 ts 中 any 类型

<!-- notecardId: 1707821825889 -->

📢 参考答案：

### 定义

- any 类型是一种特殊类型
- 被指定为 any 类型的变量可以**被任意数据类型所赋值**，也可以**将它赋值给其他任意类型的变量**
- 相当于**放弃了 ts 的类型检查**，即使存在错误，也不会报错

### 为什么需要

- 因为有些场景下，**可能无法知道变量具体的数据类型，例如，来自用户的输入或者第三方库等**，这种情况下，我们希望**绕过 TypeScript 的静态类型检查**

### 基本使用

- 只需在声明变量时，将其类型指定为 any 即可

  ```typescript
  let variable: any;
  let other: string;

  variable = 5; // 可以赋值为数字
  variable = 'hello'; // 也可以赋值为字符串
  variable = true; // 也可以赋值为布尔值
  // ...

  other = variable; // 可以赋值给其他任意类型的变量
  ```

### 使用注意

- 实际开发中，**尽可能避免使用 any 类型**，使用过多会失去 ts 类型检查的优势
- 使用 any 类型时，**最好添加相关注释来说明为什么要使用 any 类型**，以便团队成员理解

## 请介绍一下 ts 中的 unknown 类型

<!-- notecardId: 1707821825893 -->

📢 参考答案：

### 定义

- unknown 类型用于**表示值的类型是未知的**
- 被指定为 any 类型的变量可以**被任意数据类型所赋值**，但是**不能随意将它赋值给其他任意类型的变量**
- 要将 unknown 类型的数据赋值给其他类型的变量，**必须先**进行**类型判断**或者**类型断言**，然后再赋值给其他类型的变量

### 为什么需要

- 因为**对于类型是未知的情况**，使用 **any 类型会完全失去 ts 类型检查**，所以引入 **unknown 类型**，目的是为了**提供更严格的类型检查**

### 基本使用

- 只需在声明变量时，将其类型指定为 any 即可

```typescript
let userInput: unknown;
let userName: string;

userInput = 5; // 可以赋值为数字
userInput = 'Hello'; // 也可以赋值为字符串
// ...

// 将其赋值给其他变量前，要先进行类型判断
if (typeof userInput === 'string') {
  userName = userInput; // 判断后，才可以安全地将 unknown 类型转换为 string 类型
}

// 或者将其赋值给其他变量前，先进行类型断言
userName = userInput as string;
```

### 使用注意

- 在**处理未知类型**时，**优先考虑使用 unknown 类型**，而不是 any 类型
- 要将 unknown 类型的数据赋值给其他类型的变量前，**优先使用类型判断**，而不是类型断言

## ts 中 unknown 和 any 的区别

<!-- notecardId: 1707821825897 -->

📢 参考答案：

unknown 和 any **都可以用于处理未知类型**，但它们之间有关键的区别：

- 从类型安全性来讲：
  **unknown 比 any 更加安全**，对于 any 类型，**ts 不会进行任何类型检查**，而对于 unknown 类型，ts 要求**在使用之前必须进行类型判断或类型断言**，才能将 unknown 类型转换为其他类型

## 请介绍一下 ts 中的接口类型 interface

<!-- notecardId: 1707821825901 -->

📢 参考答案：

### 定义

- interface 接口用于**描述对象结构**
- 它定义了**对象可以拥有哪些属性和方法，以及它们的类型**

### 为什么需要

- 因为通过定义接口，可以**明确地指定对象的结构**，在提高可读性的同时，还方便维护和**多处复用**

### 基本使用

1. 定义接口

```typescript
// 定义一个接口
interface Person {
  name: string;
  age: number;
  greet: () => void;
}

// 正确使用接口
const person: Person = {
  name: 'Alice',
  age: 30,
  greet: () => {
    console.log(`Hello, my name is ${person.name}.`);
  },
};

// 错误使用接口 --- 缺少 age 属性
const person: Person = {
  name: 'Alice',
  greet: () => {
    console.log(`Hello, my name is ${person.name}.`);
  },
};
```

2. 继承接口

```typescript
// 定义一个基础接口
interface Person {
  name: string;
}

// 定义一个继承自 Person 接口的子接口
interface Student extends Person {
  age: number;
}

// 使用 Student 接口
const xialuo: Student = {
  name: '夏洛',
  age: 22,
};

console.log(xialuo); // 输出：{ name: '夏洛', age: 22 }
```

> 注：由于 Student 接口继承了 Person 接口，所以在创建 Student 类型的对象时，**还需要提供 name 属性**

### 使用注意

- 接口**只能定义对象类型**，不能定义其他任何类型，例如，基本数据类型、联合类型、交叉类型等等
- 定义接口时，自定义名称后面**没有等号**，且其内的属性方法之间**使用分号隔开**，而不是逗号
- 接口可以继承其他接口
- 多个**相同名称**的接口会**自动合并**为一个接口

## 请介绍一下 ts 中的 type 类型别名

<!-- notecardId: 1707821825904 -->

📢 参考答案：

### 定义

- 类型别名指的是使用 type 关键字**为一个类型起别名**
- 它**不是创建新类型**，而是**创建一个新名字**来**引用**那个类型

### 为什么需要

1. 为复杂类型**取一个有意义的名称，方便阅读和理解**
2. 可以进行**多处复用**
3. 非常适合**多种现有类型组合成一个新类型**的场景

### 基本使用

1. 对象的类型别名

```typescript
// 定义一个对象的类型别名
type Point = {
  x: number;
  y: number;
};

// 使用对象的类型别名
const point: Point = {
  x: 10,
  y: 20,
};
```

2. 其他类型的类型别名

```typescript
// 定义一个联合类型和类型别名
type Result = number | string;

function getResult(): Result {
  return Math.random() > 0.5 ? 'success' : 404;
}

const result: Result = getResult();
console.log(result);
```

### 使用注意

- 定义类型别名时，自定义名称后面**有等号**
- 类型别名 type 可以**为任何类型提供一个名称**，包括对象类型、基本数据类型、联合类型、元组等，而接口类型 interface 只能定义对象类型
- 类型别名 type **无法继承**，而接口类型 interface 可以继承
- 类型别名 type **不能重复声明多个相同名称**，而接口类型 interface 可以
