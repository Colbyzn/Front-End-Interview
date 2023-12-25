/**
 * 手写一个简易的 ajax
 */

/**
思路：
1. 声明一个名为 myAjax 的函数
2. 该函数接受一个对象参数 options
3. 实例化一个 XMLHttpRequest 对象
4. 监听 onreadystatechange 事件，在事件处理函数内：
   1. 判断此次请求操作是否完成
      - 若已完成（即所返回的请求状态值为 4），则再判断是否此次请求是否成功
        - 若成功（即响应状态码为 200），则调用所传入对象参数 options 的 success 方法对响应数据进行相关处理
5. 判断请求方法
   - 若为 GET 请求或者未设置，则
     1. 调用 XMLHttpRequest 对象 open() 方法，并传入请求方法 POST 和请求地址两个参数，创建一个新请求
     2. 调用 XMLHttpRequest 对象 send() 方法，发起 HTTP 请求
   - 若为 POST 请求，则
     1. 调用 XMLHttpRequest 对象 open() 方法，并传入请求方法 POST 和请求地址两个参数，创建一个新请求
     2. 设置请求头，指定请求体的数据类型，比如：JSON 数据类型
     3. 调用 XMLHttpRequest 对象 send() 方法，，将请求体数据转换为 JSON 字符串，并传入，发起 HTTP 请求
 */

function myAjax(options) {
  const xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const result = JSON.parse(this.responseText)
        options.success(result)
      }
    }
  }

  if (options.method.toUpperCase() === 'GET' || options.method == null) {
    xhr.open('GET', options.url, true)
    xhr.send(null)
  }

  if (options.method.toUpperCase() === 'POST') {
    xhr.open('POST', options.url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(options.data))
  }
}

ajax({
  method: 'GET',
  url: 'http://example.com/api',
  success: function (response) {
    console.log(response)
  }
})