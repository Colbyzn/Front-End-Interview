# Front-End-Interview::11-Webpack

## Webpack 是什么？

<!-- notecardId: 1705812832929 -->

📢 参考答案：

### 定义

- webpack 是一个用于现代 JavaScript 应用程序的**静态模块打包工具**

### 作用

- 可以**自动化编译代码、转译代码、压缩代码、合并代码、处理浏览器兼容性**等

  > 注：
  >
  > 1. 编译代码指的是**将高级语言转换成计算机可以执行的机器语言**
  > 2. 转译代码指的是**将一种高级语言转换为另一种高级语言或者低级语言**，比如：将 ES6 及以上版本的 JavaScript 代码转换成兼容性更好的 ES5 版本，将 TypeSript 转换为 JavaScript

### 基本原理

- 当 Webpack 处理应用程序时，它会**从应用程序的入口文件开始，递归地分析各个模块之间的依赖关系，构建出一个依赖关系图**，这个依赖图包含着应用程序中所需的每个模块，然后**将所有模块打包为一个或多个 bundle，供浏览器加载**

  > 注：bundle 是**一个或多个部署到生产环境中的最终静态资源文件**，通常是 JavaScript 文件，**包含了整个应用程序的代码，以及应用中使用到的相关资源**，例如样式表、图片、字体等

## Webpack 常用的配置项有哪些？

<!-- notecardId: 1705812832941 -->

📢 参考答案：

### 1. mode

#### 作用

- 告诉 Webpack **以何种模式进行打包构建**

#### 语法格式

```javascript
mode: 'none' | 'development' | 'production';
```

> 注：
>
> 1. mode 的**默认值**为 **production**
> 2. development 模式下，打包**速度快**，但是**代码不会压缩**，打包后**文件体积较大**，适合在**开发阶段**使用，方便调试
> 3. production 模式下，打包**速度慢**，但是**代码会压缩**，打包后**文件体积较小**，适合在**生产阶段**使用

#### 示例代码

```javascript
// webpack.development.config.js
module.exports = {
  mode: 'development',
};
```

```javascript
// webpack.production.config.js
module.exports = {
  mode: 'production',
};
```

### 2. entry

#### 作用

- 告诉 Webpack 打包应用程序的**入口文件位置**

#### 语法格式

```javascript
entry: 字符串 | 字符串数组 | 对象;
```

> 注：
>
> 1. **单页面应用**只需指定**一个入口文件**，所以**传入一个字符串**
> 2. **多页面应用**需要指定**多个入口文件**，所以**传入一个字符串数组，或者一个对象**

#### 示例代码

```javascript
const path = require('path');

module.exports = {
  //...
  entry: path.join(__dirname, 'src/main.js'), // 指定入口文件为 src 下的 main.js 文件
};
```

> 注：
>
> 1. 属性 **`__dirname`** 的值为一串表示**当前文件所在目录的字符串**
> 2. 若不配置该属性，则 webpack **默认**会去找 **src → index.js** 文件进行打包构建

### 3. output

#### 作用

- 告诉 Webpack **如何输出打包后的静态资源**

#### 语法格式

```javascript
output: 对象;
```

> 注：
>
> 1. 对象内的常用配置属性为 **filename** 和 **path**
> 2. filename 用于**指定生成的 bundle 文件名**，path 用于**指定生成文件放置于哪个文件夹**

#### 示例代码

```javascript
const path = require('path');

module.exports = {
  //...
  output: {
    filename: 'bundle.[contenthash:8].js', // 为生成文件名添加内容 hash
    path: path.join(__dirname, 'dist'), // 指定生成文件的存放路径为 dist 文件夹
  },
};
```

### 4. module.rules

#### 作用

- 用于**配置模块的规则**，告诉 Webpack 处理不同类型的模块**使用何种加载器**（loader）

#### 语法格式

```javascript
module: {
  rules: 数组;
}
```

> 注：
>
> 1. 数组内，每个对象代表一个规则，每个规则常用的属性为 **test、use 和 exclude**
> 2. test 用于**指定要匹配哪种模块文件**，use 用于**指定所匹配的模块文件使用什么加载器来处理**，exclude 用于**指定哪些文件或目录不应用该规则**

#### 示例代码

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配以 .js 结尾的文件
        exclude: /node_modules/, // 不要处理 node_modules 目录下的任何 .js文件
        use: {
          loader: 'babel-loader', // 使用 babel 加载器进行转译
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // loader 执行顺序：从后往前
      },
    ],
  },
};
```

> 注：若指定多个 loader，则调用顺序是**从后往前调用**

### 5. plugins

#### 作用

- **扩展 Webpack 的功能**，让开发者可以根据项目需求，在构建过程的不同阶段**执行各种自定义任务**

  > 注：例如，使用了 HtmlWebpackPlugin 插件来生成 HTML 文件，使用了 UglifyJsPlugin 插件来压缩 JavaScript 代码

#### 语法格式

```javascript
plugins: 数组;
```

> 注：数组内，每个实例对象代表一个插件

#### 示例代码

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new UglifyJsPlugin(),
  ],
};
```

### 6. devServe

#### 作用

- 用来**配置 webpack-dev-server 这个第三方包**，开发者可以自定义监听的端口、打包后是否自动开启浏览器、是否启用 https、代理设置、路由处理等功能

  > 注：
  >
  > 1. webpack-dev-server 的作用是只需运行一次命令，之后会**自动监听源代码的变化，一旦变化，就自动重新打包构建**，省去每次手动打包构建的操作
  > 2. 运行命令 **`npm run dev`** 时，会**调用 webpack-dev-server 包进行打包构建**

  ```json
  // package.json
  {
    "scripts": {
      "dev": "webpack-dev-server --config build-optimization/webpack.dev.js",
      "build": "webpack --config build-optimization/webpack.prod.js"
    }
  }
  ```

#### 语法格式

```javascript
devServe: 对象;
```

> 注：
>
> 1. 对象内的常用配置属性为 **port、static、open、compress、proxy**
> 2. port 用于设置**监听的端口号**，static 用于设置**托管本地静态资源供服务器访问的路径**、open 用于设置**打包后是否自动开启浏览器**、compress 用于设置**是否启动 gzip 压缩**、proxy 用于设置**代理服务器，将请求代理到其他服务器，解决跨域请求的问题**

#### 示例代码

```javascript
module.exports = {
  // ...
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true, // 自动打开浏览器
    compress: true, // 启动 gzip 压缩

    // 设置代理
    proxy: {
      // 当前配置的端口号为 8080，为处理跨域问题，将本地 /api/xxx 代理到 localhost:3000/api/xxx
      '/api': 'http://localhost:3000',

      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      '/api2': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api2': '',
        },
      },
    },
  },
};
```

## Webpack 常用的 loader 有哪些？

<!-- notecardId: 1705812832946 -->

📢 参考答案：

loader 用于**处理不同类型的文件或代码**，使其能够被正确打包和加载

| Loader                 | 作用                                                                                          |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `babel-loader`         | 将 **ES6 及以上版本**的代码**转换成 ES5**                                                     |
| `ts-loader`            | 将 **TypeScript** 代码编译成 JavaScript                                                       |
| `sass-loader`          | 将 **SASS/SCSS** 文件**编译成 CSS**                                                           |
| `less-loader`          | 将 **LESS** 文件**编译成 CSS**                                                                |
| `css-loader`           | **解析 CSS 文件**，并将其**转换为 JavaScript 对象**，以便通过 JavaScript 控制样式的加载和应用 |
| `style-loader`         | 将处理后的 CSS 代码**插入到页面的 style 标签中**，使样式生效                                  |
| `file-loader`          | **处理项目中的文件资源，如字体和图片**，将文件输出到指定文件夹                                |
| `url-loader`           | 与 `file-loader` 类似，但可以**设置文件大小阈值**，将小于阈值的**较小文件转换为 base64 格式** |
| `vue-loader`           | **处理 Vue 的单文件组件（.vue 文件）**，包括解析模板、处理样式和脚本                          |
| `image-loader`         | **将图片文件转换成可被项目引用的 URL**                                                        |
| `image-webpack-loader` | **优化和压缩图片文件**                                                                        |
| `eslint-loader`        | 在打包构建过程中，对 JavaScript 代码**进行 eslint 检查**                                      |
| `postcss-loader`       | 为一些有兼容性问题的 CSS，**自动添加浏览器前缀**，提高兼容性                                  |

## Webpack 常用的 plugin 有哪些？

<!-- notecardId: 1705812832951 -->

📢 参考答案：

plugin 用于**扩展 Webpack 的功能**，让开发者可以根据项目需求，在构建过程的不同阶段**执行各种自定义任务**

| 分类       | Plugin 名称                          | 作用                                                                                                                                 |
| ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| 第三方插件 | `html-webpack-plugin`                | **生成 HTML 文件**，并**将打包构建输出的 js 文件**通过 `<script>` 标签的 src 属性**自动引入到 HTML 文件中**                          |
|            | `clean-webpack-plugin`               | 在每次打包**构建前，清理输出目录**，防止旧的构建文件残留，省去每次手动删除的操作                                                     |
|            | `mini-css-extract-plugin`            | 将样式从打包构建输出的 js 文件中分离出来，**生成独立的 CSS 文件**                                                                    |
|            | `optimize-css-assets-webpack-plugin` | 用于**对 CSS 代码进行压缩和去重**                                                                                                    |
|            | `ParallelUglifyPlugin`               | 通过开启多进程的方式来拥有多个线程，**多个线程并行运行 UglifyJS 压缩工具**，从而加快压缩速度                                         |
|            | `HappyPack`                          | 通过开启多进程的方式来拥有多个线程，**多个线程并行处理模块**，从而加快打包速度                                                       |
| 内置插件   | `IgnorePlugin`                       | 通过**不导入**指定模块的方式来**避免引入无用的模块**                                                                                 |
|            | `HotModuleReplacementPlugin`         | **启用热模块替换**，允许在应用运行时替换、添加或删除模块，实现热更新                                                                 |
|            | `DllPlugin`                          | 动态链接库**生成**插件，用于**提前对一些不经常变化的第三方库或者框架单独打包编译**，生成 dll 文件和 manifest.json 文件               |
|            | `DllReferencePlugin`                 | 动态链接库**引用**插件，在应用程序打包构建时，**引用 DllPlugin 插件打包好的的 dll 文件**，从而减少重复构建的时间，提高打包构建的速度 |

## Webpack 如何配置单入口和多入口？

<!-- notecardId: 1705812832956 -->

📢 参考答案：

**单页面应用** (SPA) 只需要**指定一个入口文件**，**多页面应用** (MPA) 需要**指定多个入口文件**

### 1. 配置单入口

场景：src 文件夹下有**一个入口文件** index.js，**一个 HTML 页面** index.html

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 1. 配置打包的入口文件
  entry: path.join(__dirname, 'src/index.js'),
  // 2. 配置打包构建的输出目录，即生成文件的存放路径
  output: {
    filename: 'bundle.[contenthash:8].js', // 为生成文件名添加内容 hash
    path: path.join(__dirname, 'dist'),
  },
  // 3. 配置 HtmlWebpackPlugin 插件，生成一个 HTML 文件，并自动将打包后的资源引入到该 HTML 文件中
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'), // 指定要复制哪个页面
      filename: 'index.html', // 指定复制后的文件名
    }),
  ],
};
```

### 2. 配置多入口

场景：src 文件夹下有**两个入口文件** index.js 和 other.js，有**两个 HTML 页面** index.html 和 other.html

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 1. 配置打包的入口文件
  entry: {
    index: path.join(__dirname, 'src/index.js'),
    other: path.join(__dirname, 'src/other.js'),
  },
  // 2. 配置打包构建的输出目录，即生成文件的存放路径
  output: {
    filename: '[name].[contenthash:8].js', // 为生成文件名添加内容 hash
    path: path.join(__dirname, 'dist'),
  },
  // 3. 配置多个 HtmlWebpackPlugin 插件，生成多个 HTML 文件，并自动将打包后的资源引入到 HTML 文件中
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'), // 复制 src → index.html 页面
      filename: 'index.html', // 指定复制后的文件名
      chunks: ['index'], // 只引用打包入口文件 index.js 所生成的 js 文件
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/other.html'), // 复制 src → other.html 页面
      filename: 'other.html', // 指定复制后的文件名
      chunks: ['other'], // 只引用打包入口文件 other.js 所生成的 js 文件
    }),
  ],
};
```

> 注：
>
> 1. entry 对象内的**键是 chunk 的名称，可自定义，值描述了 chunk 的入口点**
> 2. output 对象内，filename 属性值中的 **name 为 entry 对象内的键**，即 chunk 的名称，作用是**确保打包生成的文件不重名**
> 3. HtmlWebpackPlugin 插件内，chunks 用于**指定当前 HTML 文件可以引入哪些打包后的 js 文件**，若**不设置 chunks 属性，则默认**会在 HTML 文件中**引入所有入口文件打包后的 js 文件**

## Webpack 如何抽离和压缩 CSS？

<!-- notecardId: 1705812832960 -->

📢 参考答案：

### 为什么要抽离和压缩 CSS

- **压缩 CSS** 是为了**减少资源的体积**，提高资源的加载速度
- **抽离 CSS** 是为了**在 HTML 文件的 `<head>` 标签内引入 CSS 文件**，在页面内容渲染之前，完成 CCS 的加载和解析，避免不必要的重复渲染，提高渲染速度
  > 注：
  >
  > 1. **生产环境必须抽离和压缩 CSS 代码，但是开发环境不需要**，因为抽离和压缩需要时间，而且压缩后的代码不方便调试
  > 2. 若**不抽离 CSS 代码**，则 CSS 代码**默认是放在打包生成的 js 文件内**的，**需要等待执行 js 文件后，才能动态生成 `<style>` 标签，并将 CSS 代码插入**，而且打包生成的 js 代码一般会在 `<body>` 末尾通过 `<script>` 标签的 src 属性引入，所以就会造成在页面内容渲染之前，无法完成 CCS 的加载和解析

### 具体配置

1. 抽离 CSS

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 提取 CSS 文件
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css', // 指定提取的 CSS 文件名及存放路径
    }),
  ],
};
```

> 注：
>
> 1. **若 entry 的值为字符串或者字符串数组**，则 MiniCssExtractPlugin 插件对象内的 filename 属性值中的 **name 为 main**，即 chunk 会被命名为 main
> 2. 若**不抽离 CSS**，则将 module.rules.use 内的 MiniCssExtractPlugin.loader **替换成 'style-loder'**

2. 压缩 CSS

```javascript
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  // ...
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}), // 优化（压缩和去重）提取的 CSS 文件
    ],
  },
};
```

> 注：`optimization.minimizer` 允许你**提供一个插件来覆盖默认压缩工具**（minimizer）

## Webpack 如何抽离公共代码？

<!-- notecardId: 1705812832966 -->

📢 参考答案：

### 定义

- 指的是**多页面应用**中，将**多个入口文件内的共用模块**抽离出来，形成一个单独的文件

  > 注：共用模块的类型包括**第三方模块**和**自定义模块**这两种

### 为什么要抽离公共代码

1. **避免重复打包相同代码**，减少最终生成的资源体积

   > 注：例如，一个共用模块被多个入口文件导入，**若不抽离共用模块，则对每个入口文件进行打包时，都会打包一次该共用模块**，造成重复打包相同代码的情况

2. 有利于**命中浏览器缓存**，减少不必要的重复下载

   > 注：
   >
   > 1. 共用模块中的**第三方模块基本不会被修改**，而共用模块中的**自定义模块一般是封装好的复用代码，被修改的频率也低**
   > 2. 若将它们**单独抽离**成一个文件，那么打包生成的文件 **hash 基本不会变**，在多个页面引用时，**很容易命中浏览器缓存**
   > 3. 若**不抽离**，跟自己写的业务代码混在一块，那么**即使共用模块内容不变，但是由于业务代码经常被修改，导致打包生成的文件 hash 经常变**，这样就**很难命中浏览器缓存**

### 具体配置

场景：例如，有多个入口文件，分别是 main.js、page1.js 和 page2.js，它们都导入了第三方模块和自定义模块，初始配置如下：

```javascript
// 未配置抽离共用模块
const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js',
    page1: './src/page1.js',
    page2: './src/page2.js',
  },

  output: {
    filename: '[name].[contenthash:8].js',
    path: path.join(__dirname, 'dist'),
  },
};
```

对三个入口文件的公共代码进行抽离，配置如下：

```javascript
const path = require('path');

module.exports = {
  // ...
  optimization: {
    // ...
    // 配置抽离公共代码的规则，即分割代码块的规则
    splitChunks: {
      chunks: 'all',
      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor', // chunk 名称，即抽离出的公共代码文件的名称
          priority: 1, // 数字越大，优先级越高，即优先抽离，重要！！！
          test: /node_modules/, // 只从 node_modules 目录内抽离
          minSize: 2048, // 设置模块最小体积，小于该值，则不抽离，单位 bytes
          minChunks: 1, // 设置模块被复用的次数，小于该值则不抽离
        },
        // 自定义模块
        common: {
          name: 'common',
          priority: 0,
          minSize: 1024,
          minChunks: 2,
        },
      },
    },
  },
};
```

> 注：
>
> 1. chunks 的值有 **initial、async、all** 这三种，其中，initial 表示**只对直接导入的模块**做抽离，async 表示**只对异步导入的模块**做抽离，all 表示**对所有的模块**做抽离
> 2. 分割代码块后，需要**为每个代码块取个名字**，所以**通过 name 属性来指定**
> 3. minSize 要根据实际情况合理地设置，例如，**有些模块就几行代码，体积非常小**，若将其抽离成单独文件打包，就显得没有必要，因为该文件打包后会引入到 HTML 中，**多引入一个文件，就会多一次请求**，虽然再次请求会命中缓存，但是会增加页面**首次请求**的次数
> 4. minChunks 一般将第三方模块设置为 1，而将自定义模块设置为 2，因为通常情况下，第三方模块**体积较大**，所以**只要复用 1 次，就抽离**，而自定义模块**体积较小**，可以放宽点条件，**复用 2 次，再抽离**

## Webpack 如何实现懒加载（即按需加载），以及什么是神奇注释？

<!-- notecardId: 1705939832515 -->

📢 参考答案：

### 实现懒加载

- 通过 **`import()`** 函数来实现懒加载，该函数**接受一个模块路径作为参数**，**返回一个 Promise 对象**

### 神奇注释

- 指的是**在 `import()` 内添加的一些注释**，如定义该 chunk 的名称等，这类带有特殊功能的注释被称为神器注释

### 示例代码

```javascript
// main.js

// 同步加载
import { func1 } from './module1';

// 异步加载（懒加载）
const loadModule2 = () => import(/* webpackChunkName: "module2" */ './module2');

// 在需要的时候调用异步加载的模块
loadModule2().then((module2) => {
  module2.func2();
});
```

> 注：可以使用注释 `/* webpackChunkName: "module2" */` 来**为生成的 chunk 命名**，以便调式时，可以**从文件名中快速识别出是哪个异步加载的模块**

## Webpack 如何处理 .vue 文件

<!-- notecardId: 1705939832522 -->

📢 参考答案：

### 1. 安装

```bash
npm install -D vue-loader vue-template-compiler
```

> 注：除非您是使用 Vue 模板编译器自己的分支版本的高级用户，否则您应该一起安装 `vue-loader` 和 `vue-template-compiler`

### 配置

```javascript
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  module: {
    rules: [
      // ...
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    // 添加 VueLoaderPlugin 插件，保证正常工作
    new VueLoaderPlugin(),
  ],
};
```

## 在 Webpack 中，module、chunk、bundle 的区别

<!-- notecardId: 1705939832530 -->

📢 参考答案：

1. Module（模块）

   - 在 Webpack 中，**每个文件都可以看作一个模块**
   - 模块**可以是 JavaScript 文件、CSS 文件、图片文件等**

2. Chunk（代码块）

   - 在 Webpack 中，Chunk 是代码分割时所创建的**代码块**
     > 注：**代码分割**是一种优化技术，指的是将代码拆分成不同的块，常见的场景有**按需加载**和**抽离公共模块**
   - 可以在 **entry**（入口）、**import()**（按需加载）、**splitChunks**（抽离公共模块）中定义 chunk
   - **一个 Chunk** 可能**包含一个或多个 Module**，取决于你的配置和应用的代码结构

3. Bundle（捆绑）
   - 在 Webpack 中，Bundle 是打包输出的**最终文件**
   - 最终文件通常是 **JavaScript 文件**，它**包含了经过编译、打包、压缩等处理后的所有模块**，例如 JavaScript、CSS、图片、字体等
   - 通常一个项目只输出一个 Bundle 文件，**若配置了代码分割或异步加载**，则可能会有**多个 Bundle 文件**
   - 通常**一个 chunk 对应一个 bundle 文件**

module、chunk、bundel 之间的关系如下：

![](../Media/module%20chunk%20bundel%E7%9A%84%E5%8C%BA%E5%88%AB.png)

## 自动刷新和热更新的区别？

<!-- notecardId: 1705939832536 -->

📢 参考答案：

1. 从定义上来讲：

   - 自动刷新是通过**刷新整个网页**来使新代码生效
   - 热更新是通过替换被修改模块，在**不刷新整个网页**的情况下使新代码生效

2. 从保持应用状态上来讲：

   - 自动刷新会**丢失所有的状态**，例如，填写好的表单被清空、当前路由被重置为首页路由
   - 热更新会**保留所有状态**

3. 从等待时间上来讲：

   - 自动刷新由于要刷新整个网页，需要重新渲染网页，还有可能请求相关数据，所以**等待时间较长**
   - 热更新不刷新整个网页，**等待时间较短**

4. 从配置上来讲：

   - 自动刷新是 webpack-dev-server 默认的功能，**无需额外配置即可使用**
   - 热更新不仅需要配置 webpack，而且还需要在业务代码中指定哪些模块需要使用热更新，**相对繁琐**

## Webpack 常见性能优化

<!-- notecardId: 1705939832541 -->

📢 参考答案：

可以从以下两个方面入手，分别是**优化打包构建速度**（提高开发效率和体验）、**优化产出代码**（提高产品的性能）

### 一、优化打包构建速度（开发环境和生成环境）

1. **优化 `babel-loader` 来开启缓存**

   - 定义

     `babel-loader` 是将 ES6 及以上版本转换为 ES5 的加载器

   - 为什么要开启缓存

     默认情况下，即使业务内的 ES6 代码没有变，也会重新打包编译，这是没有必要的，因此，可以缓存编译后的 ES5 代码，**若 ES6 代码没有变，则直接使用缓存**，从而提高打包构建速度

   - 配置：

     1. 通过添加 **cacheDirectory** 来**开启缓存**
     2. 通过配置 **include** 来**明确需要编译的文件范围**

        ```javascript
        module.exports = {
          // ...
          rules: [
            {
              test: /\.js$/,
              use: ['babel-loader?cacheDirectory'], //开启缓存
              include: path.join(__dirname, 'src'), //明确范围
              // 排除范围，include 和 exclude 两者选一个即可
              // exclude: path.join(_dirname, 'node_modules')
            },
          ],
        };
        ```

     - 使用注意

       该优化方案**主要用于开发环境**，生成环境也能用，但是意义不大，因为生成环境就正式打包一次

2. **使用 IgnorePlugin 避免引入无用的模块**

   - 定义：

     IgnorePlugin 是 Webpack 的**内置插件**，通过**不导入**指定模块的方式来避免引入无用的模块

     > 注：IgnorePlugin 在**提高构建速度**的同时，还**减少了打包输出文件的体积**

   - 为什么需要 IgnorePlugin：

     引入无用模块，不仅会减低打包构建的速度，而且还会增加打包输出文件的体积，例如，实际项目**只需要支持中文和英文的日期格式**，当我们通过 `import moment from 'moment` 来引入一个处理时间格式的第三方模块时，**默认情况下，会引入所有语言的 js 代码**，从而导致引入了一些没用的模块

   - 配置：

     1. 配置 IgnorePlugin 插件规则，**忽略**掉 moment 内的**所有**语言模块
     2. 再使用 import 来**手动导入指定**的语言模块

        ```javascript
        // webpack.production.js
        module.exports = {
          // ...
          plugins: [
            // 忽略 moment 文件夹下的 /locale 目录内的所有模块
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
          ],
        };
        ```

        ```javascript
        import moment from 'moment';

        import './moment/locale/zh-cn'; // 手动导入中文模块
        import './moment/locale/en-nz'; // 手动导入英文模块
        ```

   - 使用注意

     该优化方案**用于开发环境和生产环境**

3. **使用 noParse 避免重复打包**

   - 定义：

     noParse 是 **module 配置项内的属性**，通过**不解析**指定模块的方式来**排除已编译压缩的模块**，避免重复打包

   - 与 IgnorePlugin 的区别

     IgnorePlugin 是**直接不导入模块**，不包含在打包后的文件中，而 noParse 是**导入模块，但是不对其进行打包**

   - 为什么需要 noParse：

     对于已经打包压缩过的模块，再打包编译不仅没有必要，而且会降低打包构建速度，例如，一些以 **`.min.js`** 结尾的第三方模块（如 `vue.min,js`、`react.min.js` 等）

   - 配置：

     通过 **module.noParse** 选项来指定哪些模块不需要解析

     ```javascript
     module.exports = {
       // ...
       module: {
         noParse: /\.min\.js$/, // 不解析所有以 .min.js 结尾的模块
       },
     };
     ```

   - 使用注意

     该优化方案**用于开发环境和生产环境**

4. **使用 HappyPack 进行多进程打包**

   - 定义：

     HappyPack 是**第三方插件**，通过开启多进程的方式来拥有多个线程，**多个线程并行处理模块**，从而加快打包速度

     > 注：**js 是单线程，一个进程只能有一个线程**，所以得通过开启多个进程来拥有多个线程

   - 为什么需要 HappyPack：

     当项目很大很复杂时，往往会出现打包速度较慢的情况，这时可以通过开启多进程来拥有多个线程，**多个线程并行处理模块**，从而加快打包速度

   - 配置：

     ```javascript
     const HappyPack = require('happypack');

     module.exports = {
       // ...
       module: {
         rules: [
           {
             test: /\.js$/,
             exclude: /node_modules/,
             use: 'happypack/loader?id=babel', // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
           },
         ],
       },

       plugins: [
         new HappyPack({
           id: 'babel', // 唯一标识符 id，用于将 loader 与 HappyPack 实例关联
           loaders: ['babel-loader?cacheDirectory'], // 定义用于处理匹配文件的 loader
         }),
       ],
     };
     ```

     > 注：HappyPack 只是开启了多进程，处理不同类型的文件，该使用什么 loader 还是使用什么 loader

   - 使用注意

     1. 该优化方案**只适用于较大的项目**，对于项目较小，打包已经很快了的情况，开启多进程反而会降低打包速度，这是因为进程的创建、销毁和互相通信是开销很大的事情
     2. 该优化方案**用于开发环境和生产环境**

5. **使用 ParallelUglifyPlugin 进行多进程压缩 js**

   - 定义：

     ParallelUglifyPlugin 是**第三方插件**，通过开启多进程的方式来拥有多个线程，**多个线程并行运行 UglifyJS 压缩工具**，从而加快压缩速度

   - 为什么需要 ParallelUglifyPlugin：

     当项目很大很复杂时，往往会出现打包速度较慢的情况，这时可以通过开启多进程来拥有多个线程，**多个线程并行运行 UglifyJS 压缩工具**，从而加快压缩速度

   - 配置：

     ```javascript
     const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

     module.exports = {
       // ...
       plugins: [
         new ParallelUglifyPlugin({
           // UglifyJS 压缩工具已经被集成在 Webpack 内了，故而不需要使用 new UglifyJS() 来配置
           // 配置传递给 UglifyJS 压缩工具的参数
           // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
           uglifyJS: {
             output: {
               beautify: false, // 不保留代码的美化格式，即压缩代码
               comments: false, // 不保留注释，即删除所有的注释
             },
             compress: {
               drop_console: true, // 删除所有的 `console` 语句，可以兼容 ie 浏览器
               collapse_vars: true, // 折叠变量
               reduce_vars: true, // 优化变量，减少变量数量
             },
           },
         }),
       ],
     };
     ```

     > 注：折叠变量和优化变量指的是**通过一些优化手段来减少变量的使用**，示例如下：

     ```javascript
     // 未折叠和优化变量前
     function exampleFunction() {
       var x = 5;
       var y = 10;
       var z = x + y;
       console.log(z);
     }

     exampleFunction();
     ```

     ```javascript
     // 折叠变量后
     function exampleFunction() {
       var z = 5 + 10;
       console.log(z);
     }

     exampleFunction();
     ```

     ```javascript
     // 优化变量后
     function exampleFunction() {
       console.log(15);
     }

     exampleFunction();
     ```

   - 使用注意

     1. 该优化方案**只适用于较大的项目**，对于项目较小，打包已经很快了的情况，开启多进程反而会降低打包压缩的速度，这是因为进程的创建、销毁和互相通信是开销很大的事情
     2. 该优化方案**只用于生产环境**

6. **启动热更新**

   - 定义：

     热更新是通过**替换被修改模块**的方式，在**不刷新整个网页**的情况下，使得新代码生效的一种技术

   - 为什么需要热更新：

     在开发调试过程中，有时候需要保留保持应用状态，以避免因为刷新带来的状态丢失，给调试带来不便，例如，**填写好的表单被清空**、**当前路由被重置为首页路由**

   - 配置：

     ```javascript
     // webpack.development.js
     module.exports = {
       // ...
       plugins: [
         new webpack.HotModuleReplacementPlugin(), // 启动热更新插件
       ],
       devServer: {
         // ...
         hot: true, // 启用 Webpack-Dev-Server 的热更新特性
       },
     };
     ```

     ```javascript
     // 入口文件，例如，index.js
     // ...
     if (module.hot) {
       // 例如，监听 math.js 模块，当该模块内容发生变化时，执行回调函数
       module.hot.accept([
         './math.js',
         () => {
           // 相关执行逻辑
         },
       ]);
     }
     ```

   - 使用注意

     1. **若没有保留保持应用状态的需求，推荐不要开启热更新**，虽然热更新的 webpack 配置简单，但是它还需要你在入口文件内**手动添加相关代码**来指定哪个模块需要热更新，以及监听到模块内容变化时，对应回调函数的执行逻辑，这就**比较繁琐**
     2. 该优化方案**只能用于开发环境**，不可以用于生产环境

7. **使用 DllPlugin 和 DllReferencePlugin 来减少重复构建的时间**

   - 定义：

     - DllPlugin 和 DllReferencePlugin 是 Webpack 的**内置插件**
     - DllPlugin 的作用是**提前对一些不经常变化的第三方库或者框架单独打包编译**，生成 dll 文件和 manifest.json 文件
       > 注：manifest.json 文件，记录了每个模块的标识和映射信息
     - DllReferencePlugin 的作用是在应用程序打包构建时，**直接引用已经打包好的的 dll 文件**，从而减少重复构建的时间，提高打包构建的速度

   - 为什么需要使用 DllPlugin 和 DllReferencePlugin：

     通常第三方库和前端框架（Vue、React）**体积都比较大**，另外，它们都比较稳定，在项目开发中，不会经常升级版本，若不使用 DllPlugin 和 DllReferencePlugin，则**每次打包构建都要编译第三方库和前端框架，这会降低打包构建的速度**

   - 配置：

     1. 配置 DllPlugin（动态链接库**生成**插件）

        ```javascript
        // webpack.dll.js
        const path = require('path');

        module.exports = {
          // 配置模式
          mode: 'development', // 开发环境
          // 指定入口文件，这里包含了一些不经常变化的第三方库或者框架
          entry: {
            react: ['react', 'react-dom'], // 举例：React、React DOM 等
          },
          // 指定输出文件的路径和名称
          output: {
            path: path.join(__dirname, 'dll'), // 输出到项目根目录下的 dll 文件夹
            filename: '[name].dll.js', // 指定输出的动态链接库文件名，name 代表当前动态链接库的名称，也就是 entry 中配置的 react
            library: '_dll_[name]', // 将动态链接库的名称暴露为全局变量，之所以在前面加上 _dll_ 是为了防止全局变量 react 冲突
          },
          plugins: [
            // 使用 DllPlugin 插件生成 manifest.json 文件
            new webpack.DllPlugin({
              name: '_dll_[name]', // 与 output.library 的值保持一致，例如，生成的 react.manifest.json 中就有 "name": "_dll_react"
              path: path.join(__dirname, 'dll', '[name].manifest.json'), // manifest.json 文件输出位置和名称
            }),
          ],
        };
        ```

     2. 配置 DllReferencePlugin（动态链接库**引用**插件）

        ```javascript
        // webpack.development.js
        const path = require('path');

        module.exports = {
          // ...
          plugins: [
            // 使用 DllReferencePlugin 插件引用生成的 manifest.json 文件
            new webpack.DllReferencePlugin({
              manifest: require(path.join(
                __dirname,
                'dll',
                'react.manifest.json'
              )), // 引用 dll 文件夹内的 manifest.json 文件，告诉 Webpack 在构建过程中使用预先打包好的依赖
            }),
          ],
        };
        ```

     3. 在应用程序的 HTML 页面中引入 dll 文件

        ```html
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Your App</title>
          </head>
          <body>
            <div id="app"></div>

            <!-- 引用生成的 DLL 文件 -->
            <script src="vendor.dll.js"></script>

            <!-- 引用应用程序的主要入口文件 -->
            <script src="bundle.js"></script>
          </body>
        </html>
        ```

   - 使用注意：

     该方案**只用于开发环境**，不用于生成环境

### 二、优化产出代码（生产环境）

1. **小图片使用 base64 格式输出**

   - 为什么小图片要使用 base64 格式输出:

     小图片体积小，**使用 base64 格式不用通过 http 请求获取**，直接使用，从而节省请求的时间，**提高页面加载的速度**，优化用户体验

     > 注：**base64 格式的图片比原始图片大**，所以**只适合对小图片使用 base64 格式**，若对大图片使用，会造成反向优化

   - 配置：

     ```javascript
     // webpack.production.js
     module.exports = {
       // ...
       module: {
         rules: [
           // 图片 - 考虑 base64 编码的情况
           {
             test: /\.(png|jpg|jpeg|gif)$/,
             use: {
               loader: 'url-loader',
               options: {
                 // 小于 5kb 的图片用 base64 格式产出
                 // 否则，依然延用 file-loader 的形式，产出 url 格式
                 limit: 5 * 1024,

                 // 打包到 img 目录下
                 outputPath: '/img1/',
               },
             },
           },
         ],
       },
     };
     ```

2. **输出的 bundle 文件名添加内容 hash**

   - 为什么输出的 bundle 文件名要添加内容 hash：

     为了**提高浏览器命中缓存**，因为内容 hash 是根据文件内容计算而来，**文件内容不变，则 hash 不变，url 也不变**，这样客户端请求时，**服务器端会返回 304**，这样客户端就会**直接使用本地缓存**，节省了资源传输的时间，从而提高页面加载的速度，优化用户的体验

   - 配置：

     ```javascript
     // webpack.production.js
     module.exports = {
       // ...
       output: {
         filename: 'bundle.[contenthash:8].js', // 打包输出文件时，会自动添加内容 hash
         // ...
       },
     };
     ```

3. **使用懒加载**

   - 定义：

     懒加载指的是**按需加载组件**，而不是一次性加载所有组件

   - 为什么要使用懒加载：

     对于**大型组件和首页加载无关的组件**，若不使用懒加载，则**降低应用程序首屏加载的速度**，影响用户体验

   - 配置：

     ```javascript
     // main.js

     // 同步加载
     import { func1 } from './module1';

     // 异步加载（懒加载）
     const loadModule2 = () =>
       import(/* webpackChunkName: "module2" */ './module2');

     // 在需要的时候调用异步加载的模块
     loadModule2().then((module2) => {
       module2.func2();
     });
     ```

     > 注：可以使用注释 `/* webpackChunkName: "module2" */` 来**为生成的 chunk 命名**，以便调式时，可以**从文件名中快速识别出是哪个异步加载的模块**

4. **抽离公共代码**

   - 定义:

     指的是**多页面应用**中，将**多个入口文件内的共用模块**抽离出来，形成一个单独的文件

     > 注：共用模块的类型包括**第三方模块**和**自定义模块**这两种

   - 为什么要抽离公共代码:

     1. **避免重复打包相同代码**，减少最终生成的资源体积

        > 注：例如，一个共用模块被多个入口文件导入，**若不抽离共用模块，则对每个入口文件进行打包时，都会打包一次该共用模块**，造成重复打包相同代码的情况

     2. 有利于**命中浏览器缓存**，减少不必要的重复下载

        > 注：
        >
        > 1. 共用模块中的**第三方模块基本不会被修改**，而共用模块中的**自定义模块一般是封装好的复用代码，被修改的频率也低**
        > 2. 若将它们**单独抽离**成一个文件，那么打包生成的文件 **hash 基本不会变**，在多个页面引用时，**很容易命中浏览器缓存**
        > 3. 若**不抽离**，跟自己写的业务代码混在一块，那么**即使共用模块内容不变，但是由于业务代码经常被修改，导致打包生成的文件 hash 经常变**，这样就**很难命中浏览器缓存**

   - 配置:

     例如，有多个入口文件，分别是 main.js、page1.js 和 page2.js，它们都导入了第三方模块和自定义模块，初始配置如下：

     ```javascript
     // 未配置抽离共用模块
     const path = require('path');

     module.exports = {
       entry: {
         main: './src/main.js',
         page1: './src/page1.js',
         page2: './src/page2.js',
       },

       output: {
         filename: '[name].[contenthash:8].js',
         path: path.join(__dirname, 'dist'),
       },
     };
     ```

     对三个入口文件的公共代码进行抽离，配置如下：

     ```javascript
     const path = require('path');

     module.exports = {
       // ...
       optimization: {
         // ...
         // 配置抽离公共代码的规则，即分割代码块的规则
         splitChunks: {
           chunks: 'all',
           // 缓存分组
           cacheGroups: {
             // 第三方模块
             vendor: {
               name: 'vendor', // chunk 名称，即抽离出的公共代码文件的名称
               priority: 1, // 数字越大，优先级越高，即优先抽离，重要！！！
               test: /node_modules/, // 只从 node_modules 目录内抽离
               minSize: 2048, // 设置模块最小体积，小于该值，则不抽离，单位 bytes
               minChunks: 1, // 设置模块被复用的次数，小于该值则不抽离
             },
             // 自定义模块
             common: {
               name: 'common',
               priority: 0,
               minSize: 1024,
               minChunks: 2,
             },
           },
         },
       },
     };
     ```

     > 注：
     >
     > 1. chunks 的值有 **initial、async、all** 这三种，其中，initial 表示**只对直接导入的模块**做抽离，async 表示**只对异步导入的模块**做抽离，all 表示**对所有的模块**做抽离
     > 2. 分割代码块后，需要**为每个代码块取个名字**，所以**通过 name 属性来指定**
     > 3. minSize 要根据实际情况合理地设置，例如，**有些模块就几行代码，体积非常小**，若将其抽离成单独文件打包，就显得没有必要，因为该文件打包后会引入到 HTML 中，**多引入一个文件，就会多一次请求**，虽然再次请求会命中缓存，但是会增加页面**首次请求**的次数
     > 4. minChunks 一般将第三方模块设置为 1，而将自定义模块设置为 2，因为通常情况下，第三方模块**体积较大**，所以**只要复用 1 次，就抽离**，而自定义模块**体积较小**，可以放宽点条件，**复用 2 次，再抽离**

   - 使用注意：
     **不用于开发环境**，是因为**将代码抽离成多个文件会导致构建时间变长**

5. **使用 IgnorePlugin 避免引入无用的模块**

   具体见「优化构建速度 → 使用 IgnorePlugin 避免引入无用的模块」

6. **使用 CDN 加速**

   - 定义：

     指的是**在将打包输出的静态资源引入 HTML 页面时，统一添加 CDN 域名前缀**

     > 注：打包生成的静态资源有 js 文件、css 文件（若配置了抽离 css）、图片等

     ```html
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta
           name="viewport"
           content="width=device-width, initial-scale=1.0"
         />
         <meta http-equiv="X-UA-Compatible" content="ie=edge" />
         <title>webpack demo</title>
         <!-- 统一添加 CDN 域名 http://cdn.example.com/ -->
         <link
           href="http://cdn.example.com/css/main.28b49fd4.css"
           rel="stylesheet"
         />
       </head>

       <body>
         <p>webpack demo</p>
         <input type="text" />
         <script
           type="text/javascript"
           src="http://cdn.example.com/common.6dce68f2.js"
         ></script>
         <script
           type="text/javascript"
           src="http://cdn.example.com/index.3b28a401.js"
         ></script>
       </body>
     </html>
     ```

   - 为什么要使用 CDN 加速：

     CDN 全称为 Content Delivery Network（内容分发网络），可以根据用户所在的区域**请求离他们最近的服务器**获取网站资源，从而减少资源加载时间，提高用户体验

   - 配置：

     ```javascript
     // webpack.production.js
     module.exports = {
       // ...
       output: {
         // ...
         publicPath: 'https://your-cdn-domain.com/', // 设置 CDN 域名
       },
     };
     ```

     > 注：在 Webpack 内配置后，你还需要**将 dist 文件夹内的资源上传到你的 CDN 域名对应的服务器上**才能使得资源可以被正常加载

7. **使用 production 模式**

   - 定义：

     指的是**将 mode 选项配置为 production**，即生产环境

   - 为什么需要使用 production 模式：

     1. 在该模式下，不需要额外配置，即可**自动压缩代码**
     2. 在该模式下，会**自动删除前端框架内的调试代码**，如开发环境内的 warning
     3. 在该模式下，会**自动启动 tree-shaking，删除定义了但是没有被使用的代码**，如声明了一个函数，但是没被使用

        > 注：
        >
        > 2. tree-shaking 是**树摇**的意思，即**通过摇晃树木，让枯萎没用的叶子落下**
        > 1. 导入/导出语法**使用 ES6 Module 才能开启 tree-shaking**，而使用 CommonJS 则不行，这是因为 ES6 Module 是**静态导入**，而 CommonJS 是**动态导入**

     4. 在该模式下，会**自动开启 Scope Hosting，将相关模块对应的函数合并为一个函数**，从而**减少代码体积**，减少内存的消耗，提高代码的执行效率
        > 注：不开启 Scope Hosting 时，默认每个模块都会被包装在一个函数内，而**每个作用域都需要存储其内部变量的引用、函数声明等**，因此，当模块很多时，会导致较大的内存消耗

   - 配置：

     ```javascript
     // webpack.production.js
     module.exports = {
       // ...
       mode: 'production',
     };
     ```

## ES6 Module 和 CommonJS 的区别

<!-- notecardId: 1706021538834 -->

📢 参考答案：

1. 从**导入方式**来讲：

   - ES6 Module 是**静态导入**，即编译时导入
   - CommonJS 是**动态导入**，即执行时导入

     ```javascript
     // ES6 Module 导入方式
     import apiList from '../config/api.js';
     if (isDev) {
       // 编译时报错，只能静态引入
       import apiList from '../config/api_dev.js';
     }
     ```

     ```javascript
     // CommonJS 导入方式
     let apiList = require('../config/api.js')
     if (isDev) {
       // 可以动态引入，执行时引入
       apiList require('../config/api dev.js')

     }
     ```

   > 注：总而言是，造成区别的原因是 **ES6 Module 语法不允许导入语法出现在条件判断内**，而 CommonJS 语法允许

2. 从**使用 tree-shaking** 来讲：

   - ES6 Module **能开启 tree-shaking**，因为它是静态导入的，在编译时可以进行分析
   - CommonJS **无法开启 tree-shaking**，因为它是动态导入的，在编译时无法进行分析

## Babel 的 preset-env 是什么？

<!-- notecardId: 1706021538840 -->

📢 参考答案：

`@babel/preset-env` 是**一堆插件的组合**，它把常用的 babel 插件组合在一起，**省去了手动一个个添加插件的操作**

## 前端为何要进行打包和构建？

<!-- notecardId: 1706021538844 -->

📢 参考答案：

- 从产出代码层面：

  1. 可以通过剔除、压缩、合并代码来产出**体积更小**的代码
  2. 可以**编译高级语言**，如 ES6+、TS 等
  3. 可以**处理浏览器兼容性**，如 Polyfill、postcss
  4. 可以**进行错误检查**，如 eslint

- 从研发流程层面：

  1. 统一开发环境、构建流程和产出标准，从而**提高整个团队的开发效率**

## Webpack 中 loader 和 plugin 的区别

<!-- notecardId: 1706021538848 -->

📢 参考答案：

- loader 是**加载器**，主要用于**协助 Webpack 处理非 js 文件以及含有太高级语法的 js 文件**，例如，**`babel-loader` 将 ES6 及以上版本**的代码**转换成 ES5**
- plugin 是**插件**，主要用于**扩展 Webpack 的功能**，例如，**`html-webpack-plugin` 会生成 HTML 文件，并将打包构建输出的 js 文件通过 `<script>` 标签的 src 属性自动引入到 HTML 文件**

## babel 和 webpack 的区别

<!-- notecardId: 1706021538851 -->

📢 参考答案：

- babel 是 **JS 新语法编译工具**，不关心模块化
- webpack 是**打包构建工具**，是多个 loader、plugin 的集合

## 如何产出一个 lib？

<!-- notecardId: 1706021538855 -->

📢 参考答案：

可以通过 **`output.library`** 来配置

```javascript
// webpack.production.js
const path = require('path');

module.exports = {
  // ...
  output: {
    // lib 的文件名
    filename: 'lodash.js',
    // 输出 lib 到 dist 目录下
    path: path.join(__dirname, 'dist'),
    // lib 的全局变量名
    library: 'lodash',
  },
};
```

## babel-polyfill 和 babel-runtime 的区别

<!-- notecardId: 1706021538859 -->

- babel-polyfill **会污染全局**，而 babel-runtime **不会污染全局**
- **开发独立系统**，可以使用 **babel-polyfill**，但是要**开发第三方 lib 给别人用**，必须用 **babel-runtime**

## 为何 Proxy 不能被 Polyfill？

<!-- notecardId: 1706021538863 -->

📢 参考答案：

能被 Polyfill 的情况是可以通过其他方式来模拟实现功能，例如，Class 可以用 function 模拟，Promise 可以用 callback 来模拟，但是 **Proxy 的功能用 Object.defineProperty 无法模拟**，所以 Proxy 不能被 Polyfill

## webpack 的构建流程是什么？从读取配置到输出文件的整个过程，尽量说全

<!-- notecardId: 1706061748170 -->

📢 参考答案：

1. 读取配置文件，**解析其内的配置项**
2. 从**入口文件**开始，**递归地分析**各个模块之间的依赖关系，同时**调用 loader** 将不同类型的文件转换为可被处理的模块，最终**构建出一个依赖关系图**
3. 根据配置中的入口和代码分割策略，**将不同模块组合成一个个 Chunk**
4. **将生成的 Chunk 输出到指定的目录**，形成最终的打包文件
