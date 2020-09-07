import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 1\配置基础路径和超时限制
const instance = axios.create({
  baseURL: '/api',  //请求路径当中公共的路径
  timeout: 20000,
});

// 2\添加进度条信息  nprogress
//请求拦截器 ： 1、可以在请求时候添加功能  2、我们可以对请求报文进行处理
instance.interceptors.request.use(config => {
  //config就是你的请求报文对象，可以这么理解
  //1、可以在请求时候添加功能 
  NProgress.start() //添加进度条功能
  //2、我们可以对请求报文进行处理
  // config.headers.token = '1211242354'
  return config;
});

//和响应拦截器 ： 1、可以添加功能  2、可以处理响应报文信息
// 3\返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
instance.interceptors.response.use(
  response => {
    // 3\返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
    NProgress.done()
    return response.data;
  }, 
  error => {
    // 4\统一处理请求错误, 具体请求也可以选择处理或不处理
    NProgress.done()
    alert('发送ajax请求失败' + error.message || '未知错误')
    //错误了之后可以选择今后可以继续处理这个错误，也可以选择今后不能处理这个错误
    return new Promise(() => {}) //返回一个pending状态的promise中断promise链
    // return Promise.reject(error); //返回失败的promise,是可以让后续继续处理这个错误的
  }
);


export default instance







