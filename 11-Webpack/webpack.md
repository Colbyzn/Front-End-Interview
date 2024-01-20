# Front-End-Interview::11-Webpack

## Webpack 是什么？

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

## 常用的 loader 有哪些？

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

## 常用的 plugin 有哪些？

📢 参考答案：

plugin 用于**扩展 Webpack 的功能**，让开发者可以根据项目需求，在构建过程的不同阶段**执行各种自定义任务**

| 分类       | Plugin 名称                          | 作用                                                                                                                           |
| ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| 第三方插件 | `html-webpack-plugin`                | 生成 HTML 文件，并将打包构建输出的 js 文件通过 `<script>` 标签的 src 属性自动引入到 HTML 文件中                                |
|            | `mini-css-extract-plugin`            | 将样式从打包构建输出的 js 文件中分离出来，生成独立的 CSS 文件                                                                  |
|            | `clean-webpack-plugin`               | 在每次打包构建前，清理输出目录，防止旧的构建文件残留，省去每次手动删除的操作                                                   |
|            | `optimize-css-assets-webpack-plugin` | 用于优化 CSS 代码，包括压缩和去重                                                                                              |
|            | `terser-webpack-plugin`              | 用于优化 js 代码，包括压缩和混淆 <br> 注：混淆指的是将变量名、函数名等重命名为更短的名称，减小代码体积的同时，提高代码的安全性 |
| 内置插件   | `DefinePlugin`                       | 允许在代码中定义全局常量，用于区分开发环境和生产环境等                                                                         |
|            | `HotModuleReplacementPlugin`         | 启用热模块替换，允许在应用运行时替换、添加或删除模块，实现热更新                                                               |
|            | CopyWebpackPlugin                    | 用于复制静态资源文件（如图片、字体等）到构建目录                                                                               |
|            | UglifyJsPlugin                       | 对 JavaScript 代码进行压缩和混淆，减小文件体积                                                                                 |
|            | TerserWebpackPlugin                  | 用于替代 UglifyJsPlugin，支持更新的 ES6+ 语法，同时也能进行代码压缩和混淆                                                      |
|            | ExtractTextWebpackPlugin             | 将样式文件提取为单独的文件，支持在 webpack 4 之前的版本                                                                        |
|            | ProvidePlugin                        | 自动加载模块，无需 import 或 require，可以在全局范围内使用某些模块                                                             |
|            | BundleAnalyzerPlugin                 | 用于分析构建输出的文件大小和依赖关系，帮助优化项目性能                                                                         |

## 如何配置单入口和多入口

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

## 抽离和压缩 CSS

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

> 注：**若 entry 的值为字符串或者字符串数组**，则 MiniCssExtractPlugin 插件对象内的 filename 属性值中的 **name 为 main**，即 chunk 会被命名为 main

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
