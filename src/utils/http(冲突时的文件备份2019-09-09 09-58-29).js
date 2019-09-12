import axios from "axios";
import { Message } from 'element-ui';
import router from '@/router';
/** 创建axios实例 **/
const service = axios.create({
    timeout: 10000,
});
/** POST传参序列化(添加请求拦截器) **/
service.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    // Token
    if (localStorage.tsToken) {
        config.headers.Authorization = localStorage.tsToken;
    }
    return config;
}, (err) => {
    //console.log(err);
    Promise.reject(err);
});
/** 返回状态判断(添加响应拦截器) **/
service.interceptors.response.use((response) => {
    //对响应数据做些事
    return response;
}, (err) => {
    let errMsg = '';
    if (err && err.response.status) {
        switch (err.response.status) {
            case 401:
                errMsg = '登录状态失效，请重新登录';
                localStorage.removeItem('tsToken'); // 删除过期的token
                router.push('./login');
                break;
            case 403:
                errMsg = '403，拒绝访问';
                break;
            case 408:
                errMsg = '408，请求超时';
                break;
            case 500:
                errMsg = '500，服务器内部错误';
                break;
            case 501:
                errMsg = '501，服务未实现';
                break;
            case 502:
                errMsg = '502，网关错误';
                break;
            case 503:
                errMsg = '503，服务不可用';
                break;
            case 504:
                errMsg = '504，网关超时';
                break;
            case 505:
                errMsg = '505，HTTP版本不受支持';
                break;
            default:
                errMsg = err.response.data.msg;
                break;
        }
    }
    else {
        errMsg = err;
    }
    Message.error(errMsg);
    return Promise.reject(errMsg);
});
export default service;
//# sourceMappingURL=http.js.map