/**
@description 实现观察者模式
@author Colbyzn
 */

/**
📢 参考答案：

### 题解

#### 思路提炼

1. 声明两个类 Subject（主题，即被观察者）、Observer（观察者）
2. 在类 Subject 中，维护一组观察者列表，并声明一系列方法，例如，添加观察者、删除观察者、通知观察者
3. 在类 Observer 中，声明一个更新消息的方法
4. 使用时，实例化被观察者对象 subject、观察者对象 observer，然后调用添加观察者方法，将 observer 添加到 subject 内所维护的列表
5. 调用通知观察者方法，实现所有观察者都会收到更新消息

#### 边界处理/注意点

#### 代码
 */

class Subject {
  constructor() {
    this.observers = []
  }

  addObserver(observer) {
    // 将观察者添加到列表 observer 内
    this.observers.push(observer)
  }

  removeObserver(observer) {
    // 从列表内移除观察者
    this.observers = this.observers.filter(item => item !== observer)
  }

  notifyObserver(message) {
    this.observers.forEach(item => {
      // 调用观察者自己的更新消息方法，并传入要通知的消息
      item.update(message)
    })
  }
}

class Observer {
  constructor(name) {
    this.name = name
  }

  update(message) {
    console.log(`${this.name} 收到消息：${message}`)
  }
}

// 测试用例
// 创建主题对象，即被观察对象
const subject = new Subject()

// 创建观察者对象
const observer1 = new Observer('observer1')
const observer2 = new Observer('observer2')

// 添加观察者
subject.addObserver(observer1)
subject.addObserver(observer2)

// 通知观察者
subject.notifyObserver('Hello World!')




