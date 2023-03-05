"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: 'http://localhost:8080',
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(config =>{
  config.headers['Context-Type'] = 'application/json;charset=utf-8';
  return config
},error => {
  return Promise.reject(error);
});

// Add a response interceptor
_axios.interceptors.response.use(
    response =>{
      let res = response.data;
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

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
