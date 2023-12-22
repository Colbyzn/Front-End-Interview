# Front-End-Interview::05-Web API

## 请介绍一下 DOM

从 DOM 的定义、作用、本质、结构介绍
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
const div1 = document.getElementById("div1"); // 元素

// 根据标签名获取
const divList = document.getElementsByTagName("div"); // 动态集合

// 根据类名获取
const itemList = document.getElementsByClassName("item"); // 动态集合

// 通过 CSS 选择器获取
const list = document.querySelectorAll(".red"); // 静态集合
```

> 注：静态集合指的是之后对文档对象模型的任何改动都不会影响集合的内容，而动态集合，会实时更新的，也就是说文档对象模型发生改变时，它会自动更新

### 操作 DOM 元素属性

- 对于 attribute 属性，通过 **HTML 标签的属性直接设置**，也可以通过 API 方法 **setAttribute()、getAttribute()**来操作

  - 示例代码：

    ```html
    <div id="myDiv" class="example"></div>
    <!-- 其中的 id 和 class 就是 Attribute 属性 -->
    ```

    ```javascript
    var element = document.getElementById("myDiv");
    element.getAttribute("class"); // example
    element.setAttribute("class", "newClass");
    ```

- 对于 property 属性，通过**访问 DOM 对象的属性来获取和修改的**

  - 示例代码：

    ```html
    <div id="myDiv" class="example"></div>
    ```

    ```javascript
    var element = document.getElementById("myDiv");
    // 获取属性
    console.log(element.id);
    // 修改属性值
    element.id = "newId";
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

   - Attribute 通过 **HTML 标签的属性直接设置**，也可以通过 API 方法 **setAttribute()、getAttribute()**来操作

     - 示例代码：

       ```html
       <div id="myDiv" class="example"></div>
       <!-- 其中的 id 和 class 就是 Attribute 属性 -->
       ```

       ```javascript
       var element = document.getElementById("myDiv");
       element.getAttribute("class"); // example
       element.setAttribute("class", "newClass");
       ```

   - property 是通过**访问 DOM 对象的属性来获取和修改的**

     - 示例代码：

       ```html
       <div id="myDiv" class="example"></div>
       ```

       ```javascript
       var element = document.getElementById("myDiv");
       // 获取属性
       console.log(element.id);
       // 修改属性值
       element.id = "newId";
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
    const input = document.querySelector("input");
    console.log(input.getAttribute("value")); // Hello
    console.log(input.value); // Hello
    ```

    ```javascript
    // 但是在文本框中键入 World! 后:
    console.log(input.getAttribute("value")); // Hello
    console.log(input.value); // Hello World!
    ```

## 如何减少 DOM 操作？

<!-- notecardId: 1703258775978 -->

🔍 所考察的知识点：DOM 性能优化

📢 参考答案：

可以从如下两个方面来减少 DOM 操作：

1. 对 DOM 查询结果做缓存

   - 示例代码：

     ```javascript
     // 不缓存 DOM 查询结果
     for (let i = 0; i < document.getElementsByTagName("p").length; i++) {
       // 每次循环，都会查询一次 DOM，并计算一次 length，造成频繁的 DOM 查询
     }

     // 缓存 DOM 查询结果
     const pList = document.getElementsByTagName("p");
     const length = pList.length;
     for (let i = 0; i < length; i++) {
       // 缓存 length，只进行一次 DOM 查询
     }
     ```

2. 将频繁的 DOM 操作改为一次性操作

   - 创建一个**空白的文档片段**作为中转站，**临时储存**频繁的 DOM 操作，然后一次性插入 DOM 树中

   - 示例代码：

     ```javascript
     const listNode = document.getElementById("list");

     // 创建一个文档片段，此时还没有插入到 DOM 树中
     const frag = document.createDocumentFragment();

     // 执行插入
     for (let x = 0; x < 10; x++) {
       const li = document.createElement("li");
       li.innerHTML = "List item " + x;
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

1. 使用 `navigator.userAgent` 属性：

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

2. 使用 `navigator.appVersion` 属性：

   - 该属性返回**包含浏览器的版本信息的字符串**。使用正则表达式在字符串内匹配常见浏览器的关键字（如 Chrome、Firefox 等）来判断浏览器的类型。

     ```javascript
     const appVersion = navigator.appVersion;

     if (appVersion.includes("Chrome")) {
       // 当前浏览器是 Chrome
     } else if (appVersion.includes("Firefox")) {
       // 当前浏览器是 Firefox
     } else if (appVersion.includes("Safari")) {
       // 当前浏览器是 Safari
     } else {
       // 其他浏览器
     }
     ```

3. 使用 `navigator.vendor` 属性：

   - 该属性返回包含浏览器的供应商信息的字符串。使用正则表达式在字符串内匹配常见浏览器的关键字（如 Chrome、Firefox 等）来判断浏览器的类型。

     ```javascript
     const vendor = navigator.vendor;

     if (vendor.includes("Google")) {
       // 当前浏览器是 Chrome
     } else if (vendor.includes("Mozilla")) {
       // 当前浏览器是 Firefox
     } else if (vendor.includes("Apple")) {
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

在前端开发中，可以通过该 location 对象的属性来获取 URL 的各个部分。

- `location.href`：获取完整的 URL，包括协议、域名、端口、路径和查询参数。
- `location.protocol`：获取协议部分，例如 "http:" 或 "https:"。
- `location.host`：获取域名和端口号部分，例如 "example.com:8080"。
- `location.hostname`：获取域名部分，例如 "example.com"。
- `location.port`：获取端口号部分，例如 "8080"。
- `location.pathname`：获取路径部分，例如 "/path/to/file.html"。
- `location.search`：获取查询参数部分，例如 "?key=value"。
- `location.hash`：获取 URL 中的哈希部分，例如 "#section1"。
