const API_URL_AUTH = import.meta.env.VITE_APP_API_URL + '/api';

//Creating an object which contains all server endpoints to fetch & send necessary data to/from the server using get,post & put method.
export const API_URLS = {
  AUTH: {
    LOGIN: `${API_URL_AUTH}/users/login`,
    SIGNUP: `${API_URL_AUTH}/users/add`,

  },
  COLOR: {
    COLOR_LIST: `${API_URL_AUTH}/colors`,
    COLOR_ADD: `${API_URL_AUTH}/colors/add`,
    COLOR_UPDATE: `${API_URL_AUTH}/colors`,
    COLOR_DETAILS: `${API_URL_AUTH}/colors`,
    COLOR_DELETE: `${API_URL_AUTH}/colors`,
    COLOR_UPDATE_STATUS: `${API_URL_AUTH}/colors/status-update`,
  },
  ORDER: {
    ORDER_LIST: `${API_URL_AUTH}/orders`,
    ORDER_ADD: `${API_URL_AUTH}/orders/add`,
    ORDER_UPDATE: `${API_URL_AUTH}/orders`,
    ORDER_DETAILS: `${API_URL_AUTH}/orders`,
    ORDER_DELETE: `${API_URL_AUTH}/orders`,
    ORDER_UPDATE_STATUS: `${API_URL_AUTH}/orders/status`,
    OWNED_ORDER: `${API_URL_AUTH}/orders/owned/orders`,
  },
  PRODUCT: {
    PRODUCT_LIST: `${API_URL_AUTH}/products`,
    PRODUCT_ADD: `${API_URL_AUTH}/products/add`,
    PRODUCT_UPDATE: `${API_URL_AUTH}/products`,
    PRODUCT_DETAILS: `${API_URL_AUTH}/products`,
    PRODUCT_DELETE: `${API_URL_AUTH}/products`,
    PRODUCT_UPDATE_STATUS: `${API_URL_AUTH}/products/status-update`,
  },

}
