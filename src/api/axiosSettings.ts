import { Middleware } from 'redux';
import axios from './axios';
import { setLoading } from '../store/loadingSlice';
import snackbarUtils from '../utils/snackbarUtils';


export const axiosMiddleware: Middleware = (store) => {
  let isInterceptorsSet = false;
  return (next) => (action) => {
    if (!isInterceptorsSet) {
      setInterceptors(store);
      isInterceptorsSet = true;
    }
    return next(action);
  };
};


export const setInterceptors = (store: any) => {
  if (!store) {
    return;
  }

  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      store.dispatch(setLoading(true));
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      store.dispatch(setLoading(false));
      return response;
    },
    function (error) {
      console.log(error);
      store.dispatch(setLoading(false));
      snackbarUtils.error(error.response.data.error);

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );
};
