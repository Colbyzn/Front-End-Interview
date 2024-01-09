# Front-End-Interview::10-Vue

## Vue 常用的指令都有哪些？并且说明其作用

<!-- notecardId: 1704646192398 -->

🔍 所考察的知识点：Vue 指令

📢 参考答案：

| 指令                 | 描述                                                                                                                                                                   | 示例                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **`v-model`**        | 实现**数据双向绑定**                                                                                                                                                   | `<input v-model="message">`                                    |
| **`v-for`**          | 遍历给定数据，**循环渲染元素**                                                                                                                                         | `<li v-for="item in data" :key="item.id">{{ item.name }}</li>` |
| **`v-bind`**         | **动态绑定属性** <br> 注：v-bind: 可以简写为 **:**                                                                                                                     | `<div :class="{ active: isActive }"></div>`                    |
| **`v-on`**           | **绑定事件** <br> 注：v-on: 可以简写为 **@**                                                                                                                           | `<button @click="doSomething">点击</button>`                   |
| **`v-show`**         | **条件显示** <br> 注：通过**修改样式 display 的值**来控制显示与隐藏                                                                                                    | `<p v-show="seen">显示</p>`                                    |
| **`v-if`, `v-else`** | **条件渲染** <br> 注：通过**创建和移除**来控制显示与隐藏                                                                                                               | `<p v-if="seen">创建/p><p v-else>移除</p>`                     |
| **`v-once`**         | 只渲染元素和组件**一次**                                                                                                                                               | `<p v-once>仅渲染一次</p>`                                     |
| **`v-html`**         | 将内容直接**作为普通 HTML 插入** <br> 注：1. 它会**覆盖元素内的现有内容** 2. 容易**导致 XSS 攻击**，所以只对可信内容使用 HTML 插值，**绝不要**将用户提供的内容作为插值 | `<p v-html="rawHtml"></p>`                                     |
| **`v-text`**         | 将内容**作为纯文本插入**，等同于使用插值表达式 <br> 注：它会**覆盖元素内的现有内容**                                                                                   | `<p v-text="message"></p>`                                     |

## Vue 常见的修饰符有哪些？

<!-- notecardId: 1704646192402 -->

🔍 所考察的知识点：Vue 修饰符

📢 参考答案：

修饰符**用于扩展指令的行为**，使其具有更灵活的功能

| 类型      | 修饰符         | 描述                                                                 | 示例                                                  |
| --------- | -------------- | -------------------------------------------------------------------- | ----------------------------------------------------- |
| `v-model` | **`.number`**  | 自动将用户输入内容**转换为数字**                                     | `<input v-model.number="age" type="number">`          |
|           | **`.trim`**    | 自动**去除**用户输入内容的**首尾空格**                               | `<input v-model.trim="message">`                      |
|           | **`.lazy`**    | 延迟更新绑定数据，即**当输入框失去焦点后才更新**，而是每次输入都更新 | `<input v-model.lazy="message">`                      |
| `v-on`    | **`.enter`**   | **当按下按键 enter 时**，执行处理函数                                | `<input v-on:keyup.enter="submit">`                   |
|           | **`.stop`**    | **阻止事件冒泡**                                                     | `<button v-on:click.stop="doSomething">点击</button>` |
|           | **`.prevent`** | **阻止事件的默认行为**                                               | `<form v-on:submit.prevent="onSubmit">提交</form>`    |
|           | **`.self`**    | **只有当触发事件的元素为本身时**，才执行处理函数                     | `<div v-on:click.self="doSomething">点击</div>`       |
|           | **`.once`**    | **事件只触发一次**                                                   | `<button v-on:click.once="doSomething">点击</button>` |
|           | **`.capture`** | 将事件监听行为**从冒泡阶段改为捕获阶段**，在捕获阶段，执行处理函数   | `<div v-on:click.capture="doSomething">点击</div>`    |

> 注：修饰符可以**链式调用**，比如：`<a v-on:click.stop.prevent="doSomething">点击</a>`

## v-if 和 v-show 的区别？

<!-- notecardId: 1704646192407 -->

🔍 所考察的知识点：Vue 指令

📢 参考答案：

v-if 和 v-show **都是用来显示和隐藏元素**，但是它们在**实现原理**和**应用场景**上有些不同，具体如下：

|          | v-if                                                                               | v-show                                                                                                 |
| -------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 实现原理 | 通过**创建和移除**来控制显示与隐藏，被隐藏元素**不存在**于 HTML 结构中             | 通过**修改样式 display 的值**来控制显示与隐藏，被隐藏元素**存在**于 HTML 结构中                        |
| 应用场景 | 当**需要频繁切换**显示与隐藏元素时，比如：鼠标经过/离开导航栏，显示/隐藏子菜单元素 | 当**不需要频繁切换**显示与隐藏元素时，比如：用户未登录时的提示【立即登录】元素，登录后，直接移除该元素 |

## 请介绍一下计算属性 computed

<!-- notecardId: 1704729974085 -->

🔍 所考察的知识点：计算属性

📢 参考答案：

### 作用

- **依赖现有数据，自动计算结果**，且只有当数据发生变化时，才自动重新计算结果

### 为什么要使用计算属性

1. **避免插值表达式变臃肿**

   - 若直接使用**一串复杂逻辑的表达式**作为插值表达式，则会**显得非常臃肿**，难以维护

     ```html
     <!-- 目标：统计求和，求得礼物总数 -->
     <p>礼物总数：{{list.reduce((sum, item) => sum + item.num, 0)}}个</p>
     ```

     而使用计算属性，则可以将一串复杂逻辑的表达式封装到自定义的函数里，使用时，**直接使用 `{{ 计算属性名 }}` 显示数据**

2. **减少性能开销**
   - 计算属性具有**缓存特性**，若所依赖的数据未发生改变，则不会重新计算，而是直接使用缓存

### 与 methods 的区别

- 虽然也可以在配置属性 **methods** 中，声明一个函数来封装一串复杂逻辑的表达式，然后使用 `{{方法名()}}` 来显示处理的结果，但是这种方式是**不会缓存计算结果**，即使所依赖的数据没有变化，也会重新计算，而**计算属性具有缓存特性**，且只有当所依赖的数据发生变化时，才会重新计算结果

### 语法格式

1. 只可获取计算属性

   ```javascript
   computed: {

     计算属性名 () {
       // 计算相关代码
       return 结果
     }

   }
   ```

2. 既可获取也可修改计算属性

   ```javascript
   computed: {

     计算属性名: {
       get () {
         // 计算相关代码
         return 结果
       },
       set () {
         // 计算相关代码
         return 结果
       }
     }

   }
   ```

### 使用步骤

1. 在配置属性 computed 内，**声明一个计算属性对应的函数**，在该函数内编写相关计算代码
2. 直接使用 **`{{ 计算属性名 }}`** 显示数据

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Vue Computed Property Example</title>
       <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
     </head>
     <body>
       <div id="app">
         <!-- 显示折扣后的价格 -->
         <p>折扣后价格: {{ discountedPrice }} 元</p>
       </div>

       <script>
         new Vue({
           el: '#app',
           data: {
             price: 100, // 原始价格
             discount: 0.1, // 折扣比例
           },
           computed: {
             // 计算属性，根据原始价格和折扣计算折扣后的价格
             discountedPrice() {
               return this.price * (1 - this.discount);
             },
           },
         });
       </script>
     </body>
   </html>
   ```

## 请介绍一下侦听器 watch

<!-- notecardId: 1704729974093 -->

🔍 所考察的知识点：侦听器

📢 参考答案：

### 作用

- **监听数据变化**，一旦所监听的数据发生改变，就自动调用侦听属性所对应的方法

### 语法格式

1. **监听简单数据类型的属性**

   ```javascript
   watch: {
     // 监听首层简单数据类型的属性
     属性名 (newValue, oldValue) {
       // 处理逻辑
     },
     // 监听深层简单数据类型的属性
     '对象名.属性名' (newValue, oldValue) {
       // 处理逻辑
     },
   }
   ```

   > 注：监听深层简单数据类型的属性时，必须用**引号包裹**

2. **监听复杂数据类型的属性**

   ```javascript
   watch: {
     // 监听整个对象
     对象名: {
       handler (newValue) {
         // 处理逻辑
       },
       deep: true, // 深度监听，会监听对象内部属性的变化
     },
   }
   ```

   > 注：
   >
   > 1. 方法名**必须叫 handler，不能自定义**
   > 2. 只有 newValue，**拿不到 oldValue**，因为引用类型修改内容不会改变引用地址
   > 3. 若想在监听开启之后（初始化时），立即执行一次 handler 方法，则需要添加 **`immediate: true`**

### 使用场景

- 当需要在数据变化时，执行**异步操作**（如网络请求）或执行**开销较大的操作**时

## 请介绍一下 Vue 中的样式操作

<!-- notecardId: 1704729974096 -->

🔍 所考察的知识点：样式操作

📢 参考答案：

Vue 框架中，可以**使用动态绑定属性的方式**来进行样式操作

1. **行内样式操作**

   - 语法格式

     ```javascript
     :style="{ 样式属性1: 属性值, 样式属性2: 属性值, ... }"
     // 或者
     :style="样式对象"
     ```

     > 注：样式属性**少**，用**第一种**语法，样式属性**多**，用**第二种**语法

   - 何时使用

     - 只是修改元素的某些具体样式属性，**不需要切换类名或者添加多个类名时**

   - 示例代码

     ```html
     <template>
       <!-- 样式属性少时 -->
       <div :style="{ color: textColor }">Hello World!</div>
     </template>

     <script>
       export default {
         data() {
           return {
             textColor: 'red',
           };
         },
       };
     </script>
     ```

     ```html
     <template>
       <!-- 样式属性多时 -->
       <div :style="styleObject">Hello World!</div>
     </template>

     <script>
       export default {
         data() {
           return {
             // 样式对象
             styleObject: {
               color: 'red',
               fontSize: '16px',
               backgroundColor: '#ccc',
             },
           };
         },
       };
     </script>
     ```

2. **类名样式操作**

   - 语法格式

     ```javascript
     :class="{ 类名1: 布尔值/表达式, 类名2: 布尔值/表达式, ... }"
     // 或者
     :class="[ '类名1', '类名2', ... ]"
     ```

     > 注：**切换类名**，用**第一种**语法，**添加多个类名**，用**第二种**语法

   - 何时使用

     - 当需要**切换类名**或者**添加多个类名**时

   - 示例代码

     ```html
     <template>
       <!-- 切换类名时 -->
       <div :class="{ active: isActive, 'text-bold': isBold }">
         Hello World!
       </div>
     </template>

     <script>
       export default {
         data() {
           return {
             isActive: true,
             isBold: false,
           };
         },
       };
     </script>
     ```

     ```html
     <template>
       <!-- 添加多个类名 -->
       <div :class="['active', 'text-bold']">Hello World!</div>
     </template>

     <script>
       export default {
         data() {
           return {};
         },
       };
     </script>
     ```

## 请介绍一下 v-for 指令

<!-- notecardId: 1704729974100 -->

🔍 所考察的知识点：v-for 指令

📢 参考答案：

### 作用

- 用于**渲染列表**，通过遍历指定的数据，搭配插值，**重复生成**多个插值**内容不同**的**相同列表项**

### 可遍历的数据类型

- **数组、对象和整数**

### 语法格式

1. **数组**

   ```javascript
   v-for="(item, index) in 数组"
   ```

   > 注：参数 item 为**数组元素**，index 为**数组索引**

2. **对象**

   ```javascript
   v-for="(value, key, index) in 对象"
   ```

   > 注：参数 value 为**对象属性值**，key 为**对象属性**，index 为**当前项的位置索引**

3. **整数**

   ```javascript
   v-for="n in 整数"
   ```

   > 注：参数 n 取值为 **[1, 整数]**，而**不是从 0 开始**

### 常搭配的属性 key

- 作用

  - 为每个列表项绑定一个**唯一的标识**，便于 Vue 跟踪每个列表项

- 为什么要使用 key

  - 之所以要使用 key，是为了通过给每个列表项绑定一个唯一标识的方式，**让 Vue 可以跟踪每个列表项**，这样当数据发生更新后，它会**基于 key 的变化，来重用元素或者移除元素或者重新排列元素顺序，从而实现以最小的 DOM 操作来更新列表，提高渲染性能**，示例如下：
    ![](../Media/%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E4%BD%BF%E7%94%A8%20key.png)

- 语法格式

  ```javascript
  :key="值"
  ```

  > 注：key 的值必须是**字符串或者数字**，且**唯一**，不重复

### 示例代码

1. **数组**

   ```html
   <template>
     <div v-for="(item, index) in items" :key="item.id">
       {{ index }}. {{ item.text }}
     </div>
   </template>
   ```

2. **对象**

   ```html
   <template>
     <div v-for="(value, key, index) in object" :key="index">
       {{ index }}. {{ key }}: {{ value }}
     </div>
   </template>
   ```

3. **整数**

   ```html
   <template>
     <div v-for="n in 10" :key="n">{{ n }}</div>
   </template>
   ```

## v-for 和 v-if 为什么不能一起使用？

<!-- notecardId: 1704768620659 -->

🔍 所考察的知识点：指令的使用细节

📢 参考答案：

若放在一起使用会**增加性能开销，影响渲染效率**

之所以这样，是因为 **v-for 比 v-if 优先级高**，当它们放在同一个元素上一起使用时，v-for 会先执行，然后才是 v-if。**这意味着即使 v-if 条件为假，Vue 也会先遍历整个列表，然后对每个元素执行 v-if 判断，这会造成不必要的性能开销**

## 事件触发时，如何传递 event 参数和自定义参数

<!-- notecardId: 1704768620663 -->

🔍 所考察的知识点：事件参数传递

📢 参考答案：

1. **不传递自定义参数**

   ```html
   <template>
     <div>
       <p>{{ num }}</p>
       <button @click="increment">加1</button>
     </div>
   </template>

   <script>
     export default {
       data() {
         return {
           num: 0,
         };
       },
       methods: {
         increment(event) {
           // 默认传递事件参数，使用自定义形参 event 接受
           const target = event.target;
           this.num++;
         },
       },
     };
   </script>
   ```

2. **传递自定义参数**

   ```html
   <template>
     <div>
       <p>{{ num }}</p>
       <button @click="increment(2)">加2</button>
     </div>
   </template>

   <script>
     export default {
       data() {
         return {
           num: 0,
         };
       },
       methods: {
         increment(value) {
           // 使用自定义形参 value 接受传入的参数
           this.num = this.num + value;
         },
       },
     };
   </script>
   ```

3. **既传递自定义参数，也传递 event 参数**

   ```html
   <template>
     <div>
       <p>{{ num }}</p>
       <!-- $ 符号不要漏了 -->
       <button @click="increment(3, $event)">加3</button>
     </div>
   </template>

   <script>
     export default {
       data() {
         return {
           num: 0,
         };
       },
       methods: {
         increment(value, event) {
           // 使用自定义形参 event 接受传递事件参数
           const target = event.target;
           // 使用自定义形参 value 接受传入的参数
           this.num = this.num + value;
         },
       },
     };
   </script>
   ```

## Vue 框架中，事件触发时，事件对象是什么，以及事件被绑定到哪里？

<!-- notecardId: 1704768620666 -->

🔍 所考察的知识点：对事件的深度理解

📢 参考答案：

### 事件对象是什么

- 事件对象是 JavaScript 的**原生事件对象**，例如：鼠标事件对象（**MouseEvent**）、键盘事件对象（**KeyboardEvent**）、触摸事件对象（**TouchEvent**）

### 事件被绑定到哪里

- 事件被绑定到**绑定事件的元素**，例如：事件代理中，事件被绑定到父元素，则父元素就是事件被绑定的位置，总之，事件被添加到哪个元素，就表示事件被绑定到哪个元素，使用 **event.currentTarget 或者 this** 可以获取绑定事件的元素
  > 注：event.target 是**获取触发事件的元素**，而**不是**获取绑定事件的元素

## 请介绍一下组件通信

<!-- notecardId: 1704814900114 -->

🔍 所考察的知识点：组件通信

📢 参考答案：

1. **父子通信**

   - 父传子

     1. 在父组件内，给子组件标签**添加自定义属性**，并**将要传递的数据动态赋值给该属性**
     2. 在子组件 export default 对象内，**使用 props 属性来接收**，其值为一个包含自定义的属性名的**数组或者对象**（若要校验数据类型，则取值为对象）
     3. 在子组件的 template 标签内使用 props 属性接收到的值
        ![](../Media/%E7%88%B6%E5%AD%90%E9%80%9A%E4%BF%A1-%E7%88%B6%E4%BC%A0%E5%AD%90.png)

   - 子传父

     1. 在子组件的 methods 属性下，定义事件处理函数，在其内**使用 $emit() 方法触发自定义事件，并携带要传递给父组件的值**
     2. 在父组件中的子组件标签内**监听该自定义事件**
     3. 当父组件监听到子组件触发的自定义事件后，**调用对应的事件处理函数**进行处理
        ![](../Media/%E7%88%B6%E5%AD%90%E9%80%9A%E4%BF%A1-%E5%AD%90%E4%BC%A0%E7%88%B6.png)

        > 注：
        >
        > 1. $emit() 方法的语法格式为 `VueComponent组件实例对象.$emit('自定义事件名', [携带参数])`，其中 携带参数为**可选**，表示要传递给父组件的值，**该值会自动传给父组件内监听该自定义事件的处理函数的形参**，比如：上图中 $emit() 方法携带的'传智教育'会自动传递给监听自定义事件 modifyTitle 的处理函数 handleChange 的形参 value 中

2. **兄弟通信**

   1. 在 utils 文件夹内，创建 EventBus.js 文件，并在其内**创建一个空 Vue 实例对象，并导出**

      ```javascript
        import Vue from 'vue
        const Bus = new Vue()
        export default Bus
      ```

   2. 在接收方组件，导入 EventBus.js 文件，并使用 **`Bus.$on('自定义事件名', 事件处理函数)`**，**监听自定义事件**

      ```javascript
      Bus.$on('sendMsg', (msg) => {
        this.msg = msg;
      });
      ```

   3. 在发送方组件，导入 EventBus.js 文件，并使用 **`Bus.$emit('自定义事件名', 要传递的值)`**，**触发自定义事件**，将值传递给接收方

      ```javascript
      Bus.$emit('sendMsg', '这是一个消息');
      ```

3. **跨层级通信**

   - 定义
     - 指的是不依次传递数据，直接**越级传递**，比如：爷传孙
   - 步骤

     1. 在祖先组件内的 export default 内，使用 **provide() 函数**来提供数据

        ```javascript
        export default {
          provide() {
            return {
              //普通类型【非响应式】
              color: this.color,
              //复杂类型【响应式】
              userInfo: this.userInfo,
            };
          },
        };
        ```

        > 注：**只有**祖先组件内 provide()函数提供的数据类型为**复杂数据**，后代组件 inject 属性接收的数据才能**随着祖先组件的更新而自动更新**，若为**简单数据**，则**不会自动更新**

     2. 在后代组件内的 export default 内，使用 **inject 属性**来接收数据

        ```javascript
        export default {
          inject: ['color', 'userInfo'],
          created() {
            console.log(this.color, this.userInfo);
          },
        };
        ```

## 请介绍一下生命周期

<!-- notecardId: 1704814900121 -->

🔍 所考察的知识点：生命周期

📢 参考答案：

### 定义

- 指的是 Vue 实例化对象**从创建到销毁**的整个过程

### 四个阶段

- **创建阶段**、**挂载阶段**、**更新阶段**、**销毁阶段**

### 钩子函数

- 定义

  - 指的是**挂载到生命周期不同阶段**上的 **Vue 内置函数**，当经历到特定阶段，会**自动调用执行**

- 作用
  - 方便开发者在生命周期的不同阶段运行**自定义代码**
- 分类
  - 生命周期上总共提供了**8 个钩子函数**，具体钩子函数名及位置示意图如下：
    ![](../Media/%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0.png)

### 书写位置

- 与数据属性 data、方法 methods 等同级

## vue 生命周期中，钩子函数 mounted 和 created 的区别是什么

<!-- notecardId: 1704814900126 -->

🔍 所考察的知识点：钩子函数

📢 参考答案：

- mounted 阶段 **DOM 元素已经创建完成**，而 created 阶段只是创建了组件实例，**DOM 元素还没有被创建**
- mounted 阶段一般**进行一些 DOM 操作**，而 created 阶段一般会**发起 ajax 请求获取初始化数据**

## 钩子函数在父子组件中的执行顺序

<!-- notecardId: 1704814900129 -->

🔍 所考察的知识点：钩子函数

📢 参考答案：

- created 阶段：先父后子
- mounted 阶段：**先子后父**
- beforeUpadate 阶段：先父后子
- upadated 阶段：**先子后父**
- beforeDestory 阶段：先父后子
- destroyed 阶段：**先子后父**

  > 注：挂载、更新、销毁肯定等子组件先完成，之后父组件才能说自己也完成

## 如何简化父子通信的写法

<!-- notecardId: 1704814900133 -->

🔍 所考察的知识点：v-model 的使用

📢 参考答案：

实际开发中，可以通过 v-model 来简化父子通信的写法

### 简化前

- 父组件

  ```html
  <template>
    <div>
      <!-- 向子组件传递数据 data，以及监听自定义事件 upadate -->
      <ChildComponent :data="content" @update="updateContent" />
    </div>
  </template>

  <script>
    import ChildComponent from './ChildComponent.vue';

    export default {
      components: {
        ChildComponent,
      },
      data() {
        return {
          content: '',
        };
      },
      methods: {
        updateContent(newValue) {
          this.content = newValue;
        },
      },
    };
  </script>
  ```

- 子组件

  ```html
  <template>
    <div>
      <input :value="data" @input="updateValue($event.target.value)" />
    </div>
  </template>

  <script>
    export default {
      props: {
        // 接受父组件传来的数据
        data: String,
      },
      methods: {
        updateValue(newValue) {
          // 触发自定义事件，并传递数据给父组件
          this.$emit('update', newValue);
        },
      },
    };
  </script>
  ```

### 简化后

1. 方法一：不使用 model 对象

   - 父组件

     ```html
     <template>
       <div>
         <!-- 向子组件传递数据 data，以及监听自定义事件 upadate -->
         <!-- <ChildComponent :data="content" @update="updateContent" /> -->
         <ChildComponent v-model="content" />
       </div>
     </template>

     <script>
       import ChildComponent from './ChildComponent.vue';

       export default {
         components: {
           ChildComponent,
         },
         data() {
           return {
             content: '',
           };
         },
         // methods: {
         //   updateContent(newValue) {
         //     this.content = newValue;
         //   }
         // }
       };
     </script>
     ```

   - 子组件

     ```html
     <template>
       <div>
         <!-- <input :value="data" @input="updateValue($event.target.value)" /> -->
         <input :value="value" @input="updateValue($event.target.value)" />
       </div>
     </template>

     <script>
       export default {
         props: {
           // 接受父组件传来的数据
           // data: String
           value: String,
         },
         methods: {
           updateValue(newValue) {
             // 触发自定义事件，并传递数据给父组件
             // this.$emit('update', newValue);
             this.$emit('input', newValue);
           },
         },
       };
     </script>
     ```

     > 注：该方法**无法自定义**子组件内接受数据的属性名和触发事件名

2. 方法二：使用 model 对象

   - 父组件

     ```html
     <template>
       <div>
         <!-- 向子组件传递数据 data，以及监听自定义事件 upadate -->
         <!-- <ChildComponent :data="content" @update="updateContent" /> -->
         <ChildComponent v-model="content" />
       </div>
     </template>

     <script>
       import ChildComponent from './ChildComponent.vue';

       export default {
         components: {
           ChildComponent,
         },
         data() {
           return {
             content: '',
           };
         },
         // methods: {
         //   updateContent(newValue) {
         //     this.content = newValue;
         //   }
         // }
       };
     </script>
     ```

   - 子组件

     ```html
     <template>
       <div>
         <!-- <input :value="data" @input="updateValue($event.target.value)" /> -->
         <!-- <input :value="value" @input="updateValue($event.target.value)" /> -->
         <input :value="data" @input="updateValue($event.target.value)" />
       </div>
     </template>

     <script>
       export default {
         // 通过 model 对象来配置自定义数据属性名和触发事件名
         model: {
           prop: 'data',
           event: 'update',
         },
         props: {
           // 接受父组件传来的数据
           // data: String
           // value: String
           data: String,
         },
         methods: {
           updateValue(newValue) {
             // 触发自定义事件，并传递数据给父组件
             // this.$emit('update', newValue);
             // this.$emit('input', newValue);
             this.$emit('update', newValue);
           },
         },
       };
     </script>
     ```

     > 注：该方法可以**自定义**子组件内接受数据的属性名和触发事件名
