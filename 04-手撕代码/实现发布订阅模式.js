/**
@description 实现发布订阅模式
@author Colbyzn
 */

/**
📢 参考答案：

### 题解

#### 思路提炼

1. 声明一个类 PubSubManager，作用中间层，维护发布者与订阅者的通信
2. 在类中，使用对象来存储主题与订阅者的映射关系，并声明一系列方法，例如，订阅、退订、发布
3. 使用时，调用订阅方法，将订阅者添加到与之映射的主题内，若没有，则创建一个新的主题
4. 调用发布方法，将消息传入对应主题内的订阅者，实现所有订阅者都可以收到消息

#### 边界处理/注意点

- 注意动态添加对象属性，要使用中括号，例如，this.topics[topic] = []，而不是this.topics.topic = []

#### 代码
 */

class PubSubManager {
  constructor() {
    // 用于存储每个自定义事件对应的一个或者多个事件处理函数
    this.topics = {}
  }

  subscribe(topic, listener) {
    // 如果这个主题不存在，则创建一个新的主题
    if (!this.topics[topic]) {
      this.topics[topic] = []
    }

    // 添加订阅者到主题列表中
    this.topics[topic].push(listener)
  }

  unsbucribe(topic, listener) {
    if (this.topics[topic]) {
      this.topics[topic] = this.topics[topic].filter(item => item !== listener)
    }
  }

  publish(topic, data) {
    // 如果这个主题存在订阅者，则逐一调用订阅者的方法
    if (this.topics[topic]) {
      this.topics[topic].forEach(item => {
        item(data)
      })
    }
  }
}

// 测试用例
const manager = new PubSubManager()

function subscriber1(data) {
  console.log(`subscriber1 收到数据：${data}`)
}

function subscriber2(data) {
  console.log(`subscriber2 收到数据：${data}`)
}

manager.subscribe('update', subscriber1)
manager.subscribe('update', subscriber2)

manager.publish('update', '发布了一条新消息')
