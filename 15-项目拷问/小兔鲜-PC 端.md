# Front-End-Interview::15-项目拷问::小兔鲜-PC 端

## 小兔鲜 PC 端项目中，如何对首屏进行优化？

📢 参考答案：

该项目采用**路由懒加载**和**图片懒加载**这两种方式对首屏进行优化

1. 路由懒加载
   使用 **import()** 语法来导入与首页无关的路由组件，实现路由懒加载
2. 图片懒加载
   **封装自定义指令** v-img-lazy，其内部逻辑是使用 VueUse 插件内的 **useIntersectionObserver()** 方法来**监听目标元素是否出现在可视区内**，当出现在可视区内时，就**将真实 url 赋值给图片元素的 src 属性**

## 回答项目难点的模版/套路

📢 参考答案：

1. 描述问题:
   例如，**什么背景 + 什么现象 + 造成什么影响**
2. 问题如何被解决：
   例如，**分析思路 + 解决方案**
3. 自己的成长：
   **学到了什么 + 以后如何避免**

示例如下：

- 问题：编辑器只能回显 JSON 格式，而不支持老版本的 HTML 格式
- 解决：将 HTML 转换为 JSON 数据，即可解决这个问题
- 成长：要考虑完整的输入输出 + 考虑旧版本用户 + 参考其他产品

## 项目中遇到过哪些难点，如何解决的？

📢 参考答案：

1. 封装图片懒加载指令逻辑代码时，忘记调用 stop() 方法暂停监听元素
   在将真实 url 赋值给图片元素的 src 属性后，就应该暂定调用 useIntersectionObserver() 方法来监听目标元素，**否则目标元素在可视区内的每次滚动都会触发该方法，造成不必要的性能开销**

   ```javascript
   import { useIntersectionObserver } from '@vueuse/core';

   const directivePlugin = {
     install(app) {
       app.directive('img-lazy', {
         mounted(el, binding) {
           const { stop } = useIntersectionObserver(
             el,
             ([{ isIntersecting }]) => {
               if (isIntersecting) {
                 el.src = binding.value;
                 // 调用 stop()，暂定监听
                 stop();
               }
             }
           );
         },
       });
     },
   };

   export default directivePlugin;
   ```
