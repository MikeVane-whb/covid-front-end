"use strict";

import Vue from 'vue';
import axios from "axios";
import router from "@/router";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


let config = {
  baseURL: 'http://localhost:12345',
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const request = axios.create(config);

request.interceptors.request.use(config =>{
    let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    config.headers['Context-Type'] = 'application/json;charset=utf-8';
    if(user != null){
        config.headers['token'] = user.token
    }
    config.withCredentials = true
    return config
    },error => {
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(
    response =>{
      let res = response.data;
      //未登录检测
        if(res.code === "4001" || res.code === "4002"){
            Vue.prototype.$message.error(res.msg)
            router.push("/")
            return
        }
        // 如果是返回的文件
      if (response.config.responseType == 'blob'){
        return res
      }
      // 兼容服务器返回的字符串数据
      if(typeof res == 'string'){
        res = res ? JSON.parse(res) : res
      }
      return res;
    },
    error =>{
      console.log('error' + error);
      return Promise.reject(error)
    }
);
export default request;
