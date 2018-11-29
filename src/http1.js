import fly from 'flyio'


fly.config = {
    baseURL: "http://bridge.keledge.com/transfer", //请求基地址
    timeout: 10000,//超时时间，为0时则无超时限制
    //是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true    
    parseJson: true,
    // params: {}, //默认公共的url get参数     
    // withCredentials: false //跨域时是否发送cookie
    headers: {
        'Content-Type': "application/x-www-form-urlencoded"
    }
}
// 添加请求拦截器
fly.interceptors.request.use((request) => {
    // 给所有请求添加自定义header,也可在外统一配置
    // request.headers["X-Tag"] = "flyio";
    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    if (request.method == "POST"){
        request.body = Object.assign({},request.body,{
            DeviceToken: 'ea804adf-407c-2f2a-fd0c-7900af80e4a8',
            ApiName: request.url,
            BridgePlatformName: 'kezhi_web',
            AppId: 7,
        });
    }
    return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
// fly.interceptors.response.use(
//     (response) => {
//         //只将请求结果的data字段返回
//         return response.data
//     },
//     (err) => {
//         //发生网络错误后会走到这里
//         //return Promise.resolve("ssss")
//     }
// )

export default fly;