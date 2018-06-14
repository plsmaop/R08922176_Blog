import axios from 'axios';
import serverUrl from '../configuration';

const config = {
  baseURL: serverUrl,
  transformRequest: [
    (data) => {
      let ret = '';
      if (data) {
        Object.entries(data).forEach(([key, value]) => {
          ret += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
        });
      }
      // return CryptoJS.AES.encrypt(JSON.stringify(ret), 'suck');
      return ret;
    },
  ],
  /* transformResponse: [
    data => data,
  ], */
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
};

// return data
axios.interceptors.response.use((res) => {
  console.log(res.data);
  return res.data;
});

export const get = url => axios.get(url, config);
export const post = (url, data) => axios.post(url, data, config);
export const del = url => axios.delete(url, config);
export const patch = (url, data) => axios.patch(url, data, config);
