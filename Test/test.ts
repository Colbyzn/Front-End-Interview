let userInput: unknown

userInput = 5
userInput = true

let userName: string

if (typeof userInput === 'string') {
  userName = userInput
}
userName = userInput as string


let variable: any;
let other: string;

variable = 5; // 可以赋值为数字
variable = 'hello'; // 也可以赋值为字符串
variable = true; // 也可以赋值为布尔值
// ...

other = variable; // 可以赋值给其他任意类型的变量

type one = {
  name: string
}

type one = {
  name: string
}
