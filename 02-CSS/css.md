# Front-End-Interview::02-CSS

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

<!-- notecardId: 1701876453694 -->

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

<!-- notecardId: 1701876453709 -->

🔍 所考察的知识点：BFC

📢 参考答案：

一、BFC 的基本概念：

BFC 的英文全称为 Block Formatting Context，即块级格式化上下文。
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

先理解圣杯布局和双飞翼布局的目的，以及两者在实现上所用技术的异同点，再用代码实现布局
%

<!-- notecardId: 1701876453725 -->

🔍 所考察的知识点：float 布局、margin 负值

📢 参考答案：

一、目的：

- 实现三栏布局，两侧内容固定，中间内容随着宽度自适应
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
        /* 使用 padding 为左右两侧留白 */
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
        /* 给 id 为 main 的额外元素设置 100%，而不是给 center */
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

<!-- notecardId: 1701876453742 -->

```css
/* 清除浮动 */
.clearfix::after {
  content: "";
  /* 属性值为 block 也行 */
  display: table;
  clear: both;
}
```

## flex 实现一个三点的色子

<!-- notecardId: 1701876453760 -->

🔍 所考察的知识点：flex 弹性布局

📢 参考答案：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #container {
        display: flex;
        /* 两端对齐 */
        justify-content: space-between;

        width: 200px;
        height: 200px;
        border: 5px solid purple;
        border-radius: 10px;
        padding: 25px;
      }

      .item {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: purple;
      }

      .item:nth-child(2) {
        align-self: center;
      }

      .item:nth-child(3) {
        align-self: flex-end;
      }
    </style>
  </head>

  <body>
    <div id="container">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </body>
</html>
```

## absolute 和 relative 分别依据什么定位？

<!-- notecardId: 1701876453775 -->

🔍 所考察的知识点：定位模式

📢 参考答案：

- relative：依据自身原来位置进行定位
- absolute：依据最近一级带有定位模式的祖先元素进行定位，若找不到，则以`<body>`来进行定位

## 居中对齐有哪些实现方式？

<!-- notecardId: 1701876453793 -->

🔍 所考察的知识点：对不同元素居中布局是否熟练

📢 参考答案：

1. 水平居中

   - inline 元素 → text-align: center;
   - inline-block 元素 → text-align: center;
   - block 元素 → margin: auto;（前提是该块级元素设置了宽度）
   - absolute 元素 → left: 50% + margin-left: 负值（元素宽度的一半）；
   - flex 元素 → justify-content: center;

2. 垂直居中

   - inline 元素 → line-height 值等于 height 值
   - inline-block 元素 → 行内块垂直居中较为复杂。
     方法一：给自身添加 vertical-align: middle; （使用前提是必须要有已经垂直居中的文本，因为`vertical-align`是设置行内元素/行内块元素与文字的垂直对齐方式）
     示例代码如下：

     ```html
     <div class="container container-4">
       <img src="./盒模型宽度计算.png" alt="" />
       <span>文字</span>
     </div>
     ```

     ```css
     .container {
       height: 500px;
       border: 1px solid #ccc;
       margin: 10px;
       padding: 10px;
     }

     .container-4 {
       text-align: center;
       /* 先让文本垂直居中 */
       line-height: 500px;
     }

     img {
       /* 再让图片与文字垂直对齐，则图片也就垂直居中了 */
       vertical-align: middle;
     }
     ```

     方法二：使用 Flexbox 或 Grid 布局

   - absolute 元素 → top: 50% + margin-top: 负值（元素高度的一半）；
   - absolute 元素 → transform: translate(-50%,-50%);
   - absolute 元素 → top、right、bottom、left 都设为 0 + margin: auto
   - flex 元素 → align-items: center;

> 注：
> 不需要知道元素宽高但是有兼容性问题的是：
> transform: translate(-50%,-50%);
> justify-content: center; 和 align-items: center;
>
> 无兼容性问题但是需要知道元素宽高的是：
> left: 50% + margin-left: 负值和 top: 50% + margin-top: 负值；
>
> 既无兼容性问题，也不需要知道元素宽度的是：
> top、right、.bottom、left 都设为 0 + margin:auto

## line-height 的继承问题？

<!-- notecardId: 1701876453806 -->

🔍 所考察的知识点：特殊继承

📢 参考答案：

- line-height 为绝对单位：
  比如：父元素的 `line-height: 50px;`，则子元素直接继承 50px
- line-height 为数字：
  比如：父元素的 `line-height:1.5;`，则子元素直接继承父元素的比例 1.5，再计算出自己 line-height = 子元素字体大小 × 1.5
- line-height 为相对单位：
  比如：父元素的 `line-height: 200%;`，则子元素继承的 line-height = 父元素字体大小 x 200%

## rem 是什么？

<!-- notecardId: 1701956975471 -->

🔍 所考察的知识点：rem 单位

📢 参考答案：

定义：rem 是相对长度单位，其相对于`<html>`根元素的字体大小而言，即 1rem = 根元素的字体大小

作用：当页面中的其他元素都使用相对单位 rem，那么就可以通过监测屏幕变化来改变 html 根元素的字体大小，从而实现页面中字体、元素宽高可以随屏幕的变化而变化

## 响应式布局常用方案有哪些？

每种方案从实现原理、优缺点、示例代码三方面回想
%

🔍 所考察的知识点：响应式布局

📢 参考答案：

1. rem + 媒体查询

- 实现原理：
  ① 页面中字体、元素宽高、行高等都使用相对单位 rem；
  ② 使用媒体查询 @media 为不同设备宽度设置不同 `<html>` 根元素的字体大小。

- 优缺点：
  优点：简单易用
  缺点：响应具有阶梯型特性，即难以做到元素尺寸随屏幕尺寸无级调节

- 示例代码：

```css
@media only screen and (max-width: 374px) {
  /* iphone5 或者更小的尺寸，以 iphone5 的宽度（320px）比例设置 font-size */
  html {
    font-size: 86px;
  }
}
@media only screen and (min-width: 375px) and (max-width: 413px) {
  /* iphone6/7/8 和 iphone x */
  html {
    font-size: 100px;
  }
}
@media only screen and (min-width: 414px) {
  /* iphone6p 或者更大的尺寸，以 iphone6p 的宽度（414px）比例设置 font-size */
  html {
    font-size: 110px;
  }
}

body {
  /* 使用 rem 单位 */
  font-size: 0.16rem;
}
#div1 {
  /* 使用 rem 单位 */
  width: 1rem;
  background-color: #ccc;
}
```

2. vw/vh

- 实现原理：
  ① 页面中字体、元素宽高、行高等都使用相对单位 vw 或 vh；
  ② 只要网页视口尺寸改变，则每单位 vw 或 vh 的取值就会发生改变，从而实现响应式；

> 注：
>
> 1. 1vw、1vh 分别等于 1/100 网页视口宽度、1/100 网页视口高度；
> 2. 网页视口指的是你能看到的网页区域，不包括浏览器上下左右的 UI 栏，如下图所示：
>    ![](../Media/%E7%BD%91%E9%A1%B5%E8%A7%86%E5%8F%A3.png)
> 3. 网页视口宽度、高度可以通过 window.innerWidth 和 window.innerHeight 来获取；

- 优缺点：
  优点：实现元素尺寸随屏幕尺寸无级调节，解决了「rem + 媒体查询」所存在的阶梯型响应的弊端
  缺点：目前不要使用 vw/vh 布局来开发 PC 端，因为兼容性很差；

- 示例代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vw vh test</title>
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      #container {
        background-color: red;
        /* 实际开发中，任选一个做为统一单位，因为屏幕尺寸多样化，无法做到宽高同一比例 */
        width: 10vw;
        height: 5vw;
      }
    </style>
  </head>

  <body>
    <p>vw vh 测试</p>
    <div id="container"></div>

    <script>
      // window.innerHeight === 100vh
      // window.innerWidth === 100vw
    </script>
  </body>
</html>
```
