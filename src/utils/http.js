//导入axios
import axios from 'axios'

import store from '../store/index'

import jsonbigint from 'json-bigint'

const instance = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        try {
            return jsonbigint.parse(data)
        } catch (error) {
            return data;
        }

    }],

});
const instance2 = axios.create()



// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config)
    let user = store.state.userInfo

    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, async function (error) {
    console.dir(error.response.status)
    let user = store.state.userInfo
    if (error.response.status === 401) {
        let res = await instance2({
            url: "http://ttapi.research.itcast.cn/app/v1_0/authorizations",
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${user.refresh_token}`
            }
        })
        console.log(res)
        let newToken = res.data.data
        user.token = newToken.token
        store.commit('saveUser', user)

        return instance(error.config)
    }
    return Promise.reject(error);
});

export { instance } 