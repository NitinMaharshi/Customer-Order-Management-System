import CryptoJS from 'crypto-js';

// Check if the user is logged in
export const isLoggedIn = () => {
  let data = localStorage.getItem('data');
  if (data != null) return true;
  else return false;
};

// Encrypt and store user data in local storage
export const doLogin = (data) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_APP_SECRET_KEY).toString();
  localStorage.setItem('data', encrypted);
};

// Get current user details
export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    return decryptData('data');
  } else {
    return undefined;
  }
};

// Function to decrypt local storage data
const decryptData = (name) => {
  const encrypted = localStorage.getItem(name);
  try {
    const decrypted = encrypted && CryptoJS.AES.decrypt(encrypted, import.meta.env.VITE_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    doLogout();
  }
};

// Get user's token
export const getToken = () => {
  let data = decryptData('data');
  return data?.token;
};

//doLogout => remove from localStorage
export const doLogout = () => {
  localStorage.clear();
  localStorage.removeItem('state');
};


// Set Redux state data in local storage
export const setReduxState = (data) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_APP_SECRET_KEY).toString();
  localStorage.setItem('state', encrypted);
};

// Function to decrypt local storage Redux state data
export const getReduxState = (name) => {
  const encrypted = localStorage.getItem(name);
  try {
    const decrypted = encrypted && CryptoJS.AES.decrypt(encrypted, import.meta.env.VITE_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    // If no state is found, return undefined
    if (decrypted === null) return undefined;
    return JSON.parse(decrypted);
  } catch (error) {
    doLogout();
  }
};
