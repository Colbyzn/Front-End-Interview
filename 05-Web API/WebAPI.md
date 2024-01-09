# Front-End-Interview::05-Web API

## 请介绍一下 DOM

从 DOM 的定义、作用、本质方面介绍
%

📢 参考答案：

### DOM 的定义

- DOM（Document Object Model **文档对象模型**）是处理可扩展标记语言（HTML 或者 XML）的**标准编程接口**

### DOM 的作用

- 为 js 提供接口，**实现对页面上的各种元素进行操作**（比如：大小、位置、颜色等）

### DOM 的本质/结构

- DOM 本质是「**树**」，一种树的数据结构，浏览器会把 HTML 文件内容解析成为一个浏览器可识别且 js 可操作的树模型
- 结构示意图：
  ![](../Media/DOM%20%E6%A0%91%E7%BB%93%E6%9E%84.png)

## DOM 操作的常用 API 有哪些？

<!-- notecardId: 1703258775963 -->

🔍 所考察的知识点：DOM 常用 API

📢 参考答案：

### 获取 DOM 元素

```javascript
// 根据 id 获取
const div1 = document.getElementById('div1'); // 元素

// 根据标签名获取
const divList = document.getElementsByTagName('div'); // 动态集合

// 根据类名获取
const itemList = document.getElementsByClassName('item'); // 动态集合

// 通过 CSS 选择器获取
const list = document.querySelectorAll('.red'); // 静态集合
```

> 注：**静态集合**指的是之后对**文档对象模型的任何改动都不会影响集合的内容**，而**动态集合**，会实时更新的，也就是说**文档对象模型发生改变时，它会自动更新**

### 操作 DOM 元素属性

- 对于 attribute 属性，通过 **HTML 标签的属性直接设置**，也可以通过 API 方法 **setAttribute()、getAttribute()** 来操作

  - 示例代码：

    ```html
    <div id="myDiv" class="example"></div>
    <!-- 其中的 id 和 class 就是 Attribute 属性 -->
    ```

    ```javascript
    var element = document.getElementById('myDiv');
    element.getAttribute('class'); // example
    element.setAttribute('class', 'newClass');
    ```

- 对于 property 属性，通过**访问 DOM 对象的属性来获取和修改的**

  - 示例代码：

    ```html
    <div id="myDiv" class="example"></div>
    ```

    ```javascript
    var element = document.getElementById('myDiv');
    // 获取属性
    console.log(element.id);
    // 修改属性值
    element.id = 'newId';
    ```

### 操作 DOM 结构

```javascript
// 创建节点
document.creatElement(element);

// 插入/移动节点
目标元素.appendChild(所创建的元素); // 插入
目标元素.appendChild(现有的元素); // 移动

// 删除节点
父元素.removeChild(要删除的子元素);

// 获取父元素
子元素.parentNode;

// 获取子元素列表
父元素.children; // 动态集合
```

## attribute 和 property 之间有什么区别？

<!-- notecardId: 1703258775971 -->

📢 参考答案：

两者的区别体现在定义位置、设置方式、属性值同步这三个方面：

1. **定义位置**

   - Attribute 是在 HTML 中定义的，**是 HTML 元素的属性**
   - property 是在 DOM 上定义的，**是 DOM 对象的属性**

2. **设置方式**

   - Attribute 通过 **HTML 标签的属性直接设置**，也可以通过 API 方法 **setAttribute()、getAttribute()** 来操作

     - 示例代码：

       ```html
       <div id="myDiv" class="example"></div>
       <!-- 其中的 id 和 class 就是 Attribute 属性 -->
       ```

       ```javascript
       var element = document.getElementById('myDiv');
       element.getAttribute('class'); // example
       element.setAttribute('class', 'newClass');
       ```

   - property 是通过**访问 DOM 对象的属性来获取和修改的**

     - 示例代码：

       ```html
       <div id="myDiv" class="example"></div>
       ```

       ```javascript
       var element = document.getElementById('myDiv');
       // 获取属性
       console.log(element.id);
       // 修改属性值
       element.id = 'newId';
       ```

3. **属性值同步**

   - 访问 attribute 所获得的值是**始终**是 HTML 元素在**初始状态下的属性值**，而访问 property 所获得的值是**当前状态下的属性值**

     - 示例代码：
       假设我们在 HTML 中有一个文本框：

       ```html
       <input type="text" value="Hello" />
       ```

       ```javascript
       // 初始状态下
       const input = document.querySelector('input');
       console.log(input.getAttribute('value')); // Hello
       console.log(input.value); // Hello
       ```

       ```javascript
       // 但是在文本框中键入 World! 后:
       console.log(input.getAttribute('value')); // Hello
       console.log(input.value); // Hello World!
       ```

## 如何减少 DOM 操作？

<!-- notecardId: 1703258775978 -->

🔍 所考察的知识点：DOM 性能优化

📢 参考答案：

可以从如下两个方面来减少 DOM 操作：

1. **对 DOM 查询结果做缓存**

   - 示例代码：

     ```javascript
     // 不缓存 DOM 查询结果
     for (let i = 0; i < document.getElementsByTagName('p').length; i++) {
       // 每次循环，都会查询一次 DOM，并计算一次 length，造成频繁的 DOM 查询
     }

     // 缓存 DOM 查询结果
     const pList = document.getElementsByTagName('p');
     const length = pList.length;
     for (let i = 0; i < length; i++) {
       // 缓存 length，只进行一次 DOM 查询
     }
     ```

2. **将频繁的 DOM 操作改为一次性操作**

   - 创建一个**空白的文档片段**作为中转站，**临时储存**频繁的 DOM 操作，然后一次性插入 DOM 树中

   - 示例代码：

     ```javascript
     const listNode = document.getElementById('list');

     // 创建一个文档片段，此时还没有插入到 DOM 树中
     const frag = document.createDocumentFragment();

     // 执行插入
     for (let x = 0; x < 10; x++) {
       const li = document.createElement('li');
       li.innerHTML = 'List item ' + x;
       frag.appendChild(li);
     }

     // 都完成之后，再插入到D0M树中
     listNode.appendChild(frag);
     ```

## 如何识别浏览器的类型

<!-- notecardId: 1703258775986 -->

🔍 所考察的知识点：BOM 相关 API

📢 参考答案：

在前端开发中，可以使用不同的方法来识别浏览器的类型。以下是几种常用的方法：

1. **使用 `navigator.userAgent` 属性**

   - 该属性返回**浏览器的用户代理字符串**。使用正则表达式在字符串内匹配常见浏览器的关键字（如 Chrome、Firefox 等）来判断浏览器的类型。

     ```javascript
     const userAgent = navigator.userAgent;

     if (userAgent.match(/Chrome/i)) {
       // 当前浏览器是 Chrome
     } else if (userAgent.match(/Firefox/i)) {
       // 当前浏览器是 Firefox
     } else if (userAgent.match(/Safari/i)) {
       // 当前浏览器是 Safari
     } else {
       // 其他浏览器
     }
     ```

2. **使用 `navigator.appVersion` 属性**

   - 该属性返回**包含浏览器的版本信息的字符串**。使用正则表达式在字符串内匹配常见浏览器的关键字（如 Chrome、Firefox 等）来判断浏览器的类型。

     ```javascript
     const appVersion = navigator.appVersion;

     if (appVersion.includes('Chrome')) {
       // 当前浏览器是 Chrome
     } else if (appVersion.includes('Firefox')) {
       // 当前浏览器是 Firefox
     } else if (appVersion.includes('Safari')) {
       // 当前浏览器是 Safari
     } else {
       // 其他浏览器
     }
     ```

3. **使用 `navigator.vendor` 属性**

   - 该属性返回**包含浏览器的供应商信息的字符串**。使用正则表达式在字符串内匹配常见浏览器的关键字（如 Chrome、Firefox 等）来判断浏览器的类型。

     ```javascript
     const vendor = navigator.vendor;

     if (vendor.includes('Google')) {
       // 当前浏览器是 Chrome
     } else if (vendor.includes('Mozilla')) {
       // 当前浏览器是 Firefox
     } else if (vendor.includes('Apple')) {
       // 当前浏览器是 Safari
     } else {
       // 其他浏览器
     }
     ```

> 注：需要注意的是，以上示例是介绍判断浏览器类型的思路，**具体的匹配检查方案需要查阅各个浏览器的官方文档**

## 如何获取 url 的各个部分？

<!-- notecardId: 1703258775993 -->

🔍 所考察的知识点：BOM 相关 API

📢 参考答案：

在前端开发中，可以**通过该 location 对象的属性**来获取 URL 的各个部分

| 属性                    | 描述                                                     |
| ----------------------- | -------------------------------------------------------- |
| **`location.href`**     | 获取**完整的 URL**，包括协议、域名、端口、路径和查询参数 |
| **`location.protocol`** | 获取**协议**部分，例如 "http:" 或 "https:"               |
| **`location.host`**     | 获取**域名和端口号**部分，例如 "example.com:8080"        |
| **`location.hostname`** | 获取**域名**部分，例如 "example.com"                     |
| **`location.port`**     | 获取**端口号**部分，例如 "8080"                          |
| **`location.pathname`** | 获取**路径**部分，例如 "/path/to/file.html"              |
| **`location.search`**   | 获取**查询参数**部分，例如 "?key=value"                  |
| **`location.hash`**     | 获取 URL 中的**哈希**部分，例如 "#section1"              |

## 请介绍一下事件绑定以及事件解绑？

<!-- notecardId: 1703347457844 -->

🔍 所考察的知识点：事件绑定和事件解绑

📢 参考答案：

### 事件绑定和解绑的定义

- 事件绑定是指**将一个特定的事件处理函数绑定到 DOM 元素上**，以便在事件触发时执行相应的操作
- 事件解绑是指**从 DOM 元素上移除之前绑定的事件处理函数**，停止对事件的响应

### 事件绑定的方法

1. **在 HTML 标签上直接添加事件属性**

   - 示例代码：

     ```html
     <button onclick="handleClick()">Click</button>
     ```

     > 注：这种方式适用于简单的事件处理，但不适合复杂的逻辑和多个事件处理函数的情况

2. **使用 DOM 对象的事件属性来绑定事件处理函数**

   - 示例代码：

     ```javascript
     element.onclick = handleClick;
     ```

     > 注：这种方式只能为**同一事件源**的**同一事件类型**绑定一个事件处理函数，**若绑定多个**事件处理程序，则**只能执行最后**添加的事件处理程序

3. **使用 addEventListener 方法**

   - 示例代码：

     ```javascript
     element.addEventListener('click', handleClick);
     ```

     > 注：这种方式可以为**同一事件源**的**同一事件类型**绑定**一个或者多个**事件处理函数，**按照事件的绑定顺序执行所有**的事件处理程序

### 事件解绑的方法

1. **在 HTML 标签上直接移除事件属性**

   - 示例代码：

     ```html
     <button>Click</button>
     ```

     > 注：这种方式适用于简单的事件解绑，但不适合复杂的逻辑和多个事件处理函数的情况

2. **将 DOM 对象的事件属性设置为 null 或 undefined**

   - 示例代码：

     ```javascript
     element.onclick = null;
     ```

     > 注：该语句的放置位置为要解绑的目标事件类型对应的事件处理函数内

3. **使用 removeEventListener 方法**

   - 示例代码：

     ```javascript
     element.removeEventListener('click', handleClick);
     ```

     > 注：
     >
     > 1. 使用时，第二个参数需要**与之前绑定的事件处理函数名一致**，否则无法正确解绑；
     > 2. 该语句的放置位置为要解绑的目标事件类型对应的事件处理函数内

## 请介绍一下 DOM 事件流

从定义、作用、分类、示意图方面介绍
%

<!-- notecardId: 1703347457848 -->

📢 参考答案：

### DOM 事件流的定义

- 指的是事件触发后，**事件类型在元素节点之间的传播顺序**

### DOM 事件流的作用

- 决定绑定了**同一事件类型**的**不同事件源**的**执行顺序**

### DOM 事件流的分类

1. **捕获阶段**
   - 定义
     - 指的是事件发生后，事件类型**从最顶层 document 开始，沿着 DOM 树逐层向下传播，直至事件发生的位置**
   - 设置方式
     - 使用 **addEventListener** 方法绑定事件，并将小括号内的**第三个参数设为 true**
2. **冒泡阶段**
   - 定义
     - 指的是事件发生后，事件类型**从事件发生的位置开始，沿着 DOM 树逐层向上传播，直至最顶层 document**
   - 设置方式
     1. 使用**传统方式绑定事件**（因为传统方式默认只有冒泡阶段）
     2. 使用 **addEventListener** 方法绑定事件，并将小括号内的**第三个参数设为空或者 false**
   - 应用
     - **事件代理**是基于冒泡机制而产生的
   - 无冒泡阶段的事件类型：
     - **onblur、onfocus、onmouseenter、onmouseleave**

### DOM 事件流的示意图

![](../Media/DOM%20%E4%BA%8B%E4%BB%B6%E6%B5%81.png)

## 当点击子元素 son 时，请描述以下代码的执行结果（1）

```html
<div class="father">
  <div class="son"></div>
</div>

<script>
  var son = document.querySelector('.son');
  son.addEventListener(
    'click',
    function () {
      console.log('我是son');
    },
    true
  );

  var father = document.querySelector('.father');
  father.addEventListener(
    'click',
    function () {
      console.log('我是father');
    },
    true
  );

  var bodyElement = document.body;
  bodyElement.addEventListener(
    'click',
    function () {
      console.log('我是body');
    },
    true
  );
</script>
```

补充：若将上述代码 addEventListener()方法中的第三个参数改为 false 或者空，则执行结果是什么？
%

🔍 所考察的知识点：DOM 事件流（捕获和冒泡）

📢 参考答案：

结果：

- 我是 body、我是 father、我是 son

若将上述代码 addEventListener()方法中的第三个参数改为 false 或者空，则执行结果：

- 我是 son、我是 father、我是 body

## 请介绍一下事件委托（即事件代理）

从定义、好处、实现步骤方面介绍
%

📢 参考答案：

### 事件委托的定义

- 指的是将原先要绑定到子元素上的事件类型绑定到父元素上，**利用事件冒泡会向上传播事件类型的机制**，使得子元素上发生的事件冒泡到父元素上，**由父元素统一来处理**

### 使用事件委托的好处

1. **减少代码量**，使得代码更简洁
2. **减少了 DOM 操作**
3. **减少内存占用**
   > 注：**若不使用事件委托，则需要为每个子元素绑定事件**，不仅麻烦，而且会增加代码量、DOM 操作次数和内存占用，延长整个页面的交互就绪时间

### 事件委托的实现步骤

1. **选择**需要监听子元素的**目标父元素**，使用 addEventListener 方法为其**绑定事件**

2. 在事件处理函数中，通过事件对象的 target 属性**获取触发事件的具体元素**

3. **判断触发事件的具体元素是否为需要监听的子元素**，编写相应的逻辑处理代码

   示例代码：

   ```html
   <ul id="parent">
     <li>Item 1</li>
     <li>Item 2</li>
     <li>Item 3</li>
   </ul>
   ```

   ```javascript
   const parent = document.getElementById('parent');

   parent.addEventListener('click', function (event) {
     if (event.target.nodeName === 'LI') {
       console.log('点击项：', event.target.innerHTML);
     }
   });
   ```

   > 注：在上面的示例中，子元素 li 上的点击事件，会冒泡到父元素上，由父元素 ul 统一处理

## 无限下拉图片列表，如何监听每个图片的点击

<!-- notecardId: 1703347457859 -->

🔍 所考察的知识点：事件委托

📢 参考答案：

对于无限下拉图片列表，可以使用**事件委托（事件代理）的方式**来监听每个图片的点击事件。

在事件处理函数内：

- 使用 event.target **获取触发事件的元素**
- 使用 matchs 方法来**判断点击的元素是否是图片元素**，若是，则执行相关代码即可

示例代码：

```html
<div id="image-container">
  <img src="image1.jpg" alt="Image 1" />
  <img src="image2.jpg" alt="Image 2" />
  <img src="image3.jpg" alt="Image 3" />
  <!-- 更多的图片 -->
</div>

<script>
  const container = document.getElementById('image-container');

  // 监听图片的点击事件
  container.addEventListener('click', function (event) {
    const target = event.target;

    // 判断点击的是否是图片元素
    if (target.matchs('img')) {
      // 处理图片的点击事件
      console.log('点击了图片：', target.src);
    }
  });
</script>
```

## 请介绍一下 XMLHttpRequest 对象

从定义、作用、所能获取的数据类型、相关属性、相关方法、相关事件方面介绍
%

<!-- notecardId: 1703432965636 -->

📢 参考答案：

### XMLHttpRequest 对象的定义

- 指的是**由构造函数 XMLHttpRequest() 实例化的对象**

### XMLHttpRequest 对象的作用

- 在**不刷新网页的前提下**，通过 URL **请求服务器，获取相关数据**

### XMLHttpRequest 对象的所能获取的数据类型

- 可以用于获取**任意数据类型**，不仅仅是 XML

### XMLHttpRequest 对象的相关属性

1. readyState

   - 作用
     - **返回**一个表示当前 AJAX **请求状态**的数字
   - 取值
     | 值 | 状态 | 描述 |
     | --- | --- | --- |
     | 0 | UNSENT | 代理被创建，但尚未调用 open() 方法。 |
     | 1 | OPENED | open() 方法已经被调用。 |
     | 2 | HEADERS_RECEIVED | send() 方法已经被调用，并且头部和状态已经可获得。 |
     | 3 | LOADING | **下载中**，responseText 属性已经包含部分数据。 |
     | 4 | DONE | 下载操作**已完成**。 |
     > 注：数字 4 表示 AJAX 请求操作已完成，其对应两种情况：
     >
     > 1. 数据传输**成功完成**
     > 2. 数据传输**超时失败**
     >
     > 因此，不管数据是否成功完成传输，readyState 最终都会返回数字 4

2. stauts
   - 作用
     - 返回一个表示 HTTP **响应状态码**
   - 常见状态码
     - 200（成功）、301（永久重定向）、302（临时重定向）、304（资源未改变）、401（未进行身份验证）、403（禁止访问，权限不够）、404（未找到资源）、500（服务器内部发生未知错误）
3. responseText
   - 获取**服务端返回的纯文本值**

### XMLHttpRequest 对象的相关方法

1. open()

   - 作用
     - **创建一个新请求**
   - 语法格式

     ```javascript
     XMLHttpRequest对象.open(请求方法, url 地址, 是否异步);
     ```

     > 注：第三个参数**默认为 true**，即**异步**操作

2. send()

   - 作用
     - **发送 HTTP 请求**
   - 语法格式

     ```javascript
     XMLHttpRequest对象.send([请求体数据]);
     ```

     > 注：
     >
     > 1. 若为 **GET** 请求，则**不设置参数或者设置为 null**；
     > 2. 若为 **POST** 请求，则**需要设置参数**，其类型为**字符串、FormData 对象、ArrayBuffer、Blob 等类型**

3. setRequestHeader()

   - 作用
     - **设置 HTTP 请求头部**
   - 语法格式

     ```javascript
     XMLHttpRequest对象.setRequestHeader(请求头名称, 值);
     ```

   - 使用场景

     - **当需要发送请求体数据时（如 POST 请求），需要设置请求头**，比如：

       ```javascript
       XMLHttpRequest对象.setRequestHeader('Content-Type', 'application/json');
       // 表示告诉服务端，将要发送给你的数据是什么格式
       ```

   - 调用位置
     - **必须在调用 send() 方法之前**，否则设置的请求头部信息将不会生效；

### XMLHttpRequest 对象的相关事件

1. onreadystatechange
   - 作用
     - **在 readyState 属性发生改变时触发**

## 请介绍一下同源和同源策略

<!-- notecardId: 1703522069043 -->

📢 参考答案：

### 同源

- 定义
  - 当多个网页之间的**协议、域名和端口完全相同**，就称这些网页同源
    > 注：任意一项不相同，都视为非同源
- 示例网址
  1. <https://www.example.com/api/banner> 和 <http://www.example.com/> 非同源，它们协议不同
  2. <https://www.example.com/api/banner> 和 <https://www.example.net/api/banner> 非同源，它们域名不同
  3. <https://www.example.com/api/> 和 <https://www.example.com:8080/> 非同源，它们端口号不同
  4. <https://www.example.com/api/banner> 和 <https://www.example.com/> 同源，它们协议、域名、端口号完全相同

### 同源策略

- 定义
  - 是浏览器提供的**一种安全机制**，指的是使用 **AJAX** 发起请求时，**浏览器**要求**所请求的地址必须与当前网页同源**，否则，响应数据会被浏览器拦截，无法使用，示意图如下：
    ![](../Media/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8B%A6%E6%88%AA%E8%B7%A8%E5%9F%9F%E8%AF%B7%E6%B1%82%E7%A4%BA%E6%84%8F%E5%9B%BE.png)
- 作用
  - **限制非同源网页之间的资源交互行为，从而隔离潜在的恶意文件**，比如：
    1. 网站 A 无法获取非同源网站 B 的 localStorage、cookie；
    2. 网站 A 无法操作非同源网站 B 的 DOM；
    3. 网站 A 向非同源网站 B 发送 AJAX 请求，无法获取资源；
- 哪些受制于同源策略
  - **使用 AJAX 请求**非同源地址
- 哪些无视同源策略
  1. **使用 `<link>` 标签**请求非同源的 CSS 文件地址
  2. **使用 `<img>` 标签**请求非同源的图片文件地址
  3. **使用 `<audio>`、`<video>` 标签**请求非同源的音频、视频文件地址
  4. **使用 `<script>` 标签**请求非同源的 js 文件地址

## 请介绍一下跨域及其解决方案

<!-- notecardId: 1703522069048 -->

📢 参考答案：

### 跨域的定义

- 指的是从一个网页**请求非同源网页的资源**

### 为什么需要跨域

- **由于受到浏览器同源策略的限制，无法直接访问非同源地址的资源**，而有时候**确实又需要跨域访问非同源地址的资源**，所以就需要跨域

### 跨域解决方案

- 绕过浏览器同源策略的限制，实现跨域访问的解决方案如下：

  1. **JSONP**（JSON with Padding）

     - 实现原理

       - **利用 `<script>` 标签不受同源限制的特性**，通过其 src 属性，跨域请求非同源地址，**服务器会将响应数据放到请求地址中查询参数 callback 所指定的回调函数内**，并以字符串的形式返回，之后，浏览器会自动执行该回调函数，从而获取到数据。示例代码如下：

         ```javascript
         function handleResponse(data) {
           // 处理服务器返回的数据
           console.log(data);
         }

         var script = document.createElement('script');
         script.src = 'http://example.com/api?callback=handleResponse'; // 返回 'handleResponse(响应数据)'
         document.body.appendChild(script);
         ```

     - 支持的请求类型
       - **只支持 get 请求**，不支持 post 请求
     - 实际开发中的应用

       - 实际开发中，使用的是已经封装的 API，比如**使用 jQuery 的 ajax() 方法实现 JSONP**

         ```javascript
         $.ajax({
           url: 'http://example.com/api',
           dataType: 'jsonp',
           success: function (data) {
             // 处理服务器返回的数据
             console.log(data);
           },
         });
         ```

         > 注：
         >
         > 1. 使用 jQuery 发起的 JSONP 请求，会**自动生成一个随机回调函数**，名为 jQueryxxx，并**以「callback=随机生成的函数名」的形式追加到 url 地址上**，不需要自己追加；
         > 2. 使用 jQuery 发起的 JSONP 请求时，会**动态添加 script 标签**，当**请求结束时**，会**自动删除 script 标签**；

  2. **CORS**（Cross-Origin Resource Sharing）

     - 实现原理
       - 通过**在服务器端设置响应头中的 `Access-Control-Allow-Origin` 字段，来指定哪些来源网站可以访问该服务器资源**，该方法是在服务器端进行配置，**客户端浏览器无须做任何额外的配置**，即可请求已开启 CORS 的服务端非同源地址接口
     - 支持的请求类型
       - 若服务器未设置 `Access-Control-Allow-Methods` 响应头，则浏览器会**默认允许 GET、POST 和 HEAD 请求**

## 发起 ajax 网络请求的常用工具有哪些，以及它们的优缺点

<!-- notecardId: 1703522069052 -->

📢 参考答案：

以下是一些封装了 XMLHttpRequest 对象的操作，简化了代码编写的常用工具：

1. **jQuery.ajax**

   - 优点
     - 使用简单、易于理解、兼容性好
   - 缺点
     1. **需要引入整个 jQuery 库**，如果只是使用 ajax 功能可能显得过于臃肿
     2. **不支持链式调用**

2. **Axios**

   - 优点
     - 使用简单、功能丰富、**支持链式调用和 async/await 语法来处理异步操作**、**支持浏览器和 Node.js 环境**

3. **Fetch**
   - 优点
     - 使用简单、功能丰富、**支持链式调用和 async/await 语法来处理异步操作**
   - 缺点
     1. **兼容性相对较差**
     2. fetch 默认**不会自动携带 cookie**，需要添加配置项
     3. fetcht 只对网络请求报错，**对响应状态码 400、500 都当做成功的请求**

## 请介绍一下 cookie

<!-- notecardId: 1703522069056 -->

📢 参考答案：

### cookie 是什么

- 指的是由**服务器发送给浏览器**，并**保存在本地**的一小段以**键值对**形式存储的**字符串**

### cookie 的分类

1. **会话 cookie**

   - 定义
     - 指的是不设置过期时间的 cookie
   - 生命周期
     - 随浏览器的关闭而销毁

2. **持久 cookie**
   - 定义
     - 指的是设置过期时间的 cookie
   - 生命周期
     - 到过期时间才销毁

### cookie 的工作原理

1. 用户访问某个网站时，网站的服务器可以**发送一个或多个 cookie** 到用户的浏览器
2. 浏览器会根据服务器的要求**将 cookie 保存在本地**
3. 当用户再次访问该网站时，浏览器会**自动携带之前保存的 cookie 发送到服务器**，这样服务器就能根据 cookie 信息，识别用户并进行相应的操作

### cookie 的特点

1. 单个 cookie 的大小不超过 4KB
2. **不同域名下的 cookie 各自独立**
3. 请求时自动发送
4. 可设置过期时限
5. 安全性较差
   > 注：之所以安全性较差，是因为 cookie 存储于浏览器中，且浏览器提供了读写 cookie 的 API，因此，**cookie 很容易被伪造**

### cookie 的用途

1. **保持用户登录状态**
   - 用户首次登录后，服务器会发送一个包含用户身份验证信息的 cookie 给客户端，以便用户下次访问网站时，可以自动登录
2. **记录用户的偏好设置**，如语言选择、主题等
3. **跟踪用户的行为和浏览习惯**

## 描述 cookie、localStorage、sessionStorage 之间的区别

<!-- notecardId: 1703522069060 -->

🔍 所考察的知识点：存储

📢 参考答案：

区别主要体现在以下几个方面：

1. 是否随 HTTP 请求发出
   - cookie 在每次 HTTP 请求时，都**会**自动附加到请求头中，而 localStorage 和 sessionStorage **不会**自动发送到服务器，仅在本地保存
2. 生命周期
   - 会话 cookie 在**浏览器关闭**后失效，而持久 cookie **直到过期时间**才被清除
   - localStorage **除非手动删除**，否则**永久存在**
   - sessionStorage **当前页面关闭**就会被清除
3. 大小限制
   - 每个 cookie 的大小不超过 **4KB**，而 localStorage 和 sessionStorage 最大可以存储 **5MB** 左右
4. 数据共享范围
   - cookie 和 localStorage 在**所有同源页面之间**可以共享存储数据，而 sessionStorage **只限于当前页面**，其他页面无法使用当前页面的存储数据，即使同源也不行

## ajax 请求 get 和 post 的区别？

<!-- notecardId: 1704472249200 -->

🔍 所考察的知识点：请求方法

📢 参考答案：

请求方法 get 和 post 的主要区别体现在**操作资源的含义、数据长度、安全性、是否缓存、历史记录、浏览器回退后的行为**这几个方面

| 特性               | GET                                           | POST                                                     |
| ------------------ | --------------------------------------------- | -------------------------------------------------------- |
| 操作资源的含义     | 通常用于**获取**（查询）数据                  | 通常用于**发送**数据                                     |
| 数据长度           | **受限于 URL 的最大长度**（通常是 2048 字符） | 理论上**没有长度限制**，实际上受到服务器设置和浏览器限制 |
| 安全性             | 数据在 URL 中可见，**安全性较低**             | 数据在请求体中，相对更安全                               |
| 是否缓存           | 请求默认**可能被**浏览器缓存                  | 请求默认**不被**浏览器缓存                               |
| 历史记录           | 参数会被**保存**在浏览器历史记录中            | 参数**不会保存**在浏览器历史记录中                       |
| 浏览器回退后的行为 | 回退后，**不会重新发起请求**                  | 回退后，**会重新发起请求**                               |
