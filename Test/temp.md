# test

## 请介绍一下 ts 中的 interface 接口类型

<!-- notecardId: 1707363109345 -->

📢 参考答案：

### 定义

- interface 接口用于**描述对象结构**
- 它定义了**对象应该具有的属性和方法**

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

// 使用接口
const person: Person = {
  name: 'Alice',
  age: 30,
  greet: () => {
    console.log(
      `Hello, my name is ${person.name} and I am ${person.age} years old.`
    );
  },
};

person.greet(); // 输出：Hello, my name is Alice and I am 30 years old.
```

### 使用注意

- 接口**只能定义对象类型**，不能定义其他任何类型，例如，基本数据类型、联合类型、交叉类型等等
- 