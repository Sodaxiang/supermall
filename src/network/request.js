import axios from 'axios';

export function request(config) {

    //1. 创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/w6',
        timeout: 5000,
    });

    //2. axios拦截器
    //2.1 axios请求拦截
    instance.interceptors.request.use(config => {
        // 一定要返回
        return config;
    }, err => {
        console.log(err);
    });

    // 2.2 axios响应拦截
    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {
        console.log(err);
    });

    // 3.发送真正的网络请求
    return instance(config);

} 