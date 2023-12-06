# Front-End-Interview::01-CSS

## 盒子模型宽度如何计算？

![](../Media/%E7%9B%92%E6%A8%A1%E5%9E%8B%E5%AE%BD%E5%BA%A6%E8%AE%A1%E7%AE%97.png)
%

🔍 所考察的知识点：CSS 盒模型

📢 参考答案：

122px

> 解析：offsetWidth = (内容宽度 + 内边距 + 边框)，无外边距

## margin 纵向重叠问题

![](../Media/margin%E7%BA%B5%E5%90%91%E9%87%8D%E5%8F%A0%E9%97%AE%E9%A2%98.png)
%

🔍 所考察的知识点：外边距合并

📢 参考答案：

15px

> 解析：margin 纵向重叠遵循两条规则：
>
> 1. 相邻元素的 margin-top 和 margin-bottom 会发生重叠，以最大值为最后结果；
> 2. 空白内容（即元素没有高度，比如：上图中的`<p></p>`）的也会发生重叠，可以直接忽略不看。

## margin 负值问题

🔍 所考察的知识点：margin 负值

📢 参考答案：

- margin-top 和 margin-left 负值，元素向上、向左移动
- margin-right 负值，右侧元素左移，自身不受影响
  > 比如：左侧元素设置为负值，则右侧元素向左移动；
  > 注意：如果右侧元素设置为负值，则左侧元素不会向左或者向右移动
- margin-bottom 负值，下方元素上移，自身不受影响
  > 比如：上方元素设置为负值，则下方元素向上移动
  > 注意：如果下方元素设置为负值，则上方元素不会向上或者向下移动

## BFC 理解和应用

🔍 所考察的知识点：BFC

📢 参考答案：

一、BFC 的基本概念：

BFC 的英文全称为 Block Formatting Context,即块级格式化上下文。
BFC 可以看作是独立的渲染区域，内部的元素不会在布局上影响到外面的元素。

二、形成 BFC 的常见条件：

- float 不是 none
- display 是 flex、inline-block、table 等
- position 是 absolute 或 fixed
- overflow 不是 visible

三、BFC 的常见应用：

- 清除浮动
  比如：当浮动元素的父容器没有设置高度时，会出现元素浮动后，无法撑开父容器的现象，从而影响其下方其他布局，为此，只需为父容器添加触发 BFC 的 css 代码即可解决问题，示例代码如下：

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
      <style type="text/css">
        .container {
          background-color: #f1f1f1;
        }
        .left {
          float: left;
        }
        .bfc {
          overflow: hidden; /* 触发元素 BFC */
        }
      </style>
    </head>
    <body>
      <div class="container bfc">
        <img
          src="https://www.imooc.com/static/img/index/logo.png"
          class="left"
          style="margin-right: 10px;"
        />
        <p class="bfc">某一段文字……</p>
      </div>
    </body>
  </html>
  ```

## 如何实现圣杯布局和双飞翼布局？

先理解圣杯布局和双飞翼布局的目的，以及两者在实现上的技术区别，再用代码实现布局
%

🔍 所考察的知识点：float 布局、margin 负值

📢 参考答案：

一、目的：

- 三栏布局，中间一栏最先加载和渲染，即 HTML 结构的顺序是中间内容区域、左侧栏、右侧栏，（因为内容最重要）
- 两侧内容固定，中间内容随着宽度自适应
- 一般用于 PC 网页

二、技术异同点：

相同点：

- 都是使用 float 来布局
- HTML 结构的顺序都是中间内容区域、左侧栏、右侧栏
  > 注：这样做的目的是为了确保中间栏内容能够在页面上先行加载渲染，以提高页面的可访问性和用户体验

不同点：

- 额外元素包裹中间栏内容：圣杯布局没有，而双飞翼布局有；
- 左右两侧留出空白：圣杯布局使用 padding-left 和 padding-right，而双飞翼布局使用 margin-left 和 margin-right；
- 调整左右两侧位置：圣杯布局使用负 margin-left 和相对定位 relative 调整左侧栏，使用负 margin-right 调整右侧栏，而双飞翼布局只使用负 margin-left 来调整

三、实现圣杯布局代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        min-width: 550px;
      }

      #header {
        background-color: red;
      }

      #container {
        /* 使用 padding 进行为左右两侧留白 */
        padding-left: 200px;
        padding-right: 150px;
      }

      .column {
        float: left;
      }

      #center {
        width: 100%;
        background-color: orange;
      }

      #left {
        position: relative;
        width: 200px;
        background-color: skyblue;
        /* 使用 margin-left 负值和相对定位的 right 调整左侧位置 */
        margin-left: -100%;
        right: 200px;
      }

      #right {
        width: 150px;
        background-color: lightgreen;
        /* 使用 margin-right 负值调整右侧位置 */
        margin-right: -150px;
      }

      #footer {
        background-color: gray;
      }

      /* 清除浮动 */
      .clearfix::after {
        content: "";
        display: table;
        clear: both;
      }
    </style>
  </head>

  <body>
    <div id="header">this is header</div>
    <div id="container" class="clearfix">
      <!-- 中间区域与左右两侧同级，没有再使用额外元素包裹 -->
      <div id="center" class="column">this is center</div>
      <div id="left" class="column">this is left</div>
      <div id="right" class="column">this is right</div>
    </div>
    <div id="footer">this is footer</div>
  </body>
</html>
```

四、实现双飞翼布局代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        min-width: 550px;
      }

      .column {
        float: left;
      }

      #main {
        /* 给 id 为 main 的额外元素设置 100%，而不是给center */
        width: 100%;
      }

      #center {
        /* 使用 margin 来为左右两侧留白 */
        margin-left: 200px;
        margin-right: 150px;
        background-color: orange;
      }

      #left {
        width: 200px;
        background-color: skyblue;
        /* 使用 margin-left 负值调整左侧位置 */
        margin-left: -100%;
      }

      #right {
        width: 150px;
        background-color: lightgreen;
        /* 使用 margin-left 负值调整右侧位置 */
        margin-left: -150px;
      }
    </style>
  </head>

  <body>
    <div id="container">
      <div id="main" class="column">
        <!-- 中心区域使用 id 为 main 额外元素包裹 -->
        <div id="center">this is center</div>
      </div>
      <div id="left" class="column">this is left</div>
      <div id="right" class="column">this is right</div>
    </div>
  </body>
</html>
```

## 手写 clearfix


