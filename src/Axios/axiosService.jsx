//importing required component
import AxiosInstance from './axios';

//A function which takes two parameters 'URL & body' for sending post request to server.
export const AxiosPost = async (URL, body) => {
  try {
    return await AxiosInstance.post(URL, body);
  } catch (error) {
    return error.data && error.response.data.message ? error.response.data.message : error.message;
  }
};

//A function which takes two parameters 'URL & body' for sending put request to server.
export const AxiosPut = async (URL, body) => {
  try {
    return await AxiosInstance.put(URL, body);
  } catch (error) {
    return error;
  }
};

//A function which takes one parameter 'URL' for sending get request to server.
export const AxiosGet = async (URL) => {
  try {
    return await AxiosInstance.get(URL);
  } catch (error) {
    return error;
  }
};

//A function which takes two parameters 'URL & body' for sending delete request to server.
export const AxiosDelete = async (URL) => {
  try {
    return await AxiosInstance.delete(URL);
  } catch (error) {
    return error;
  }
};

//A function which takes two parameters 'URL & body' for sending delete request to server.
export const AxiosPatch = async (URL, body) => {
  try {
    return await AxiosInstance.patch(URL, body);
  } catch (error) {
    return error;
  }
};