"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.baseURL = 'https://www.wlink.group:444';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.put['Content-Type'] = 'application/json';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
	// baseURL: 'https://www.wlink.group',
	headers: {
		//'Content-Type': 'application/x-www-form-urlencoded', //[解决跨域问题]http请求报文的头部设置编码格式
		'Access-Control-Allow-Origin': '*',
	},
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
		// 添加请求拦截器，在请求头中加token
		if (localStorage.getItem('Authorization')) {
			config.headers.Authorization = localStorage.getItem('Authorization');
		}
		
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
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
