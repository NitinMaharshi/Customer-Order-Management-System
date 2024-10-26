
import { toast } from 'react-hot-toast';
import axios from 'axios';

//importing required component
import { getToken } from '../Authorisation/index';

//Creating instance of axios by passing baseURL taken from an env file, to create method of axios.
const instance = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL });

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = getToken();
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(response => {

  if (response && response.status === 200 || response.status === 201 || response.status === 204) {
    return { ...response.data, };
  } else {
    if (response && response.status === 401 || response.status === 408) {
      toast.error('Session Expire.');
      setTimeout(() => {
        window.location.replace('/');
        window.localStorage.clear();
      }, 1000);
    } else if (response && response.status >= 500) {
      toast.error('Internal Server Error.', { id: 'error', duration: 2000 });
      setTimeout(() => {
        Window.location.replace('/');
        Window.localStorage.clear();
      }, 1000);
    } else {
      toast.error(response.message, {
        id: 'response_data', duration: 2000
      });
    }
  }
},

  function (error) {
    if (error.response?.data) {
      if (error.response.data?.statusCode === 401 || error.response.data?.statusCode === 408) {
        toast.error(error.response.data?.message, { id: 'nodata', duration: 1000 });
        setTimeout(() => {
          doLogout();
          window?.location?.replace('/');
        }, 1000);
      } else if (error.response.data?.statusCode === 404) {
        if (!toast.isActive('nodata')) {
          toast.error(error.response.data?.message, { id: 'nodata', duration: 1000 });
        } else {
          toast.update('nodata', { duration: 2000, render: error.response.data?.message, type: toast.TYPE.ERROR });
        }
      } else {
        toast.error(error.response?.data?.message, { id: 'error_response', duration: 2000 });
      }
    } else {
      return Promise.reject(error.response);
    }
  });


export default instance;