/**
 * 统一配置axios
 * 使用qs.stringify解决axios跨域问题
 * 配置axios请求类型为post时，使用qs.stringify来实现跨域访问，以及每次请求携带token
 * 配置请求成功后res，实现诸如登录失败，登录超时，账户密码错误和请求错误等拦截器
 */
import axios from 'axios'
import qs from 'qs'

// import * as types from './store/types'

// axios 配置
var baseUrl = 'http://demo.bridge.kingchannels.cn/transfer';
var bridgePlatformName = 'kezhidemo_web';
axios.defaults.timeout = 60000;
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.withCredentials = true //axios跨域携带cookie的配置

// http request 拦截器

axios.interceptors.request.use(
    config => {
        let deviceToken = 'f6cf2cd8-3e59-7641-67bc-c361f78c5df3';
        if (config.method === 'post') {
            if (!config.data.ApiName) {
                let urlArr = config.url.split(baseUrl);
                config.data.ApiName = urlArr[1];
                config.baseURL = urlArr[0];
                // config.url = baseUrl; // 此设置可将请求连接中的接口名隐藏了
            }
            config.data.DeviceToken = deviceToken;
            config.data.random = Math.random();
            // config.data.AccessToken = 'zSLRTZ8INEccXtwGp16ko6LpPq3G_aX5';//手动添加 测试用
            config.data = qs.stringify(Object.assign({}, config.data, {
                BridgePlatformName: bridgePlatformName
            }));
        } else if (config.method === 'get') {
            if (config.params && !config.params.ApiName) {
                let urlArr = config.url.split(baseUrl)
                config.params.ApiName = urlArr[1];
                config.baseURL = urlArr[0];
                // config.url = baseUrl; // 此设置可将请求连接中的接口名隐藏了
            }
            config.params.DeviceToken = deviceToken;
            try {
                config.params.random = Math.random();
                // config.params.AccessToken = 'zSLRTZ8INEccXtwGp16ko6LpPq3G_aX5';//手动添加 测试用
            } catch (error) {
                alert(error.message);
            }
            config.params = Object.assign({}, config.params, {
                BridgePlatformName: bridgePlatformName
            })
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
export default axios;
