// watch(ref / reactive 对象, (newValue, oldValue) => {
//   // 处理逻辑
// }, {
//   deep: true
// })
// // 监听基本数据类型
// watch(ref 对象, (newValue, oldValue) => {
//   // 处理逻辑
// })

// // 监听对象内的基本数据类型
// watch(() => ref 对象.value.子数据名, (newValue, oldValue) => {
//   // 处理逻辑
// })
// // 或者
// watch(() => reactive 对象.子数据名, (newValue, oldValue) => {
//   // 处理逻辑
// })

// const VDOM = {
//   tag: 'div',
//   props: {
//     id: 'div1',
//     className: 'container'
//   },
//   children: [
//     {
//       tag: 'p',
//       children: 'vdom'
//     },
//     {
//       tag: 'ul',
//       props: {
//         style: 'font-size: 20px'
//       },
//       children: [
//         {
//           tag: 'li',
//           children: 'a'
//         }
//       ]
//     }
//   ]
// }

// import { mapState } from 'vuex';

// export default {
//   computed: {
//     // 原始写法
//     // count() {
//     //   return this.$store.state.count;
//     // },
//     ...mapState(['count']),
//   },
// };

// import { mapGetters } from 'vuex';

// export default {
//   computed: {
//     // 原始写法
//     // doubleCount() {
//     //   return this.$store.getters.doubleCount;
//     // },
//     ...mapGetters(['doubleCount']),
//   },
// };

// import { mapMutations } from 'vuex';

// export default {
//   methods: {
//     // 原始写法
//     // increment() {
//     //   return this.$store.commit('increment');
//     // },
//     ...mapMutations(['increment']),
//   },
// };

// import { mapActions } from 'vuex';

// export default {
//   methods: {
//     // 原始写法
//     // login() {
//     //   return this.$store.dispatch('login');
//     // },
//     ...mapActions(['login']),
//   },
// };

// const data = {}
// const username = 'zhangsan'
// const data = {
//   username: 'zhangsan'
// }

// Object.defineProperty(data, "username", {
//   get: function () {
//     console.log('get')
//     return username
//   },
//   set: function (newValue) {
//     console.log('set')
//     username = newValue
//   }
// })

// // 属性被访问时，就会打印出 get
// data.username

// // 属性被修改时，就会打印出 set
// data.username = 'lisi'


// // 数据
// const data = {
//   nums: [10, 20, 30]
// }

// // 创建一个空对象，其原型为数组的原型对象
// const obj = Object.create(Array.prototype);

// // 在该对象上扩展变异方法，如：push、pop 等
// ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
//   obj[methodName] = function () {
//     // 调用方法时，触发视图更新
//     console.log('视图更新')
//     // 再调用原生的 push、pop 等方法
//     // this 为调用方法的原数组，arguments 为传入的参数
//     Array.prototype[methodName].call(this, ...arguments)
//   }
// })

// // 将数据 data 内数组的原型指向 obj
// // 从而数组会调用 obj 内扩展的变异方法
// data.nums.__proto__ = obj

// data.nums.push(40)

// // 重新定义数组原型
// const oldArrayProperty = Array.prototype
// // 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
// const arrProto = Object.create(oldArrayProperty);
// ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
//     arrProto[methodName] = function () {
//         console.log(arrProto)
//         console.log(this)
//         updateView() // 触发视图更新
//         oldArrayProperty[methodName].call(this, ...arguments)
//         // Array.prototype.push.call(this, ...arguments)
//     }
// })

// if (Array.isArray(target)) {
//   target.__proto__ = arrProto
// }

// data.nums.push(40)


