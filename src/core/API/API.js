import axios from 'axios';

//==============================
// INSTANCES
//==============================

// JSON PLACEHOLDER
const JSON_PLACEHOLDER_INSTANCE = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

JSON_PLACEHOLDER_INSTANCE.interceptors.request.use(
  (config) => {
    const authToken = sessionStorage.getItem('authTokenReactDemo') || localStorage.getItem('authTokenReactDemo');

    config.headers['Authorization'] = `Bearer ${authToken}`;
    // config.url = `${config.url}?authKey=${localStorage.getItem('authTokenReactDemo')}`

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// MOCKY
export const MOCKY_INSTANCE = axios.create({
  baseURL: 'http://www.mocky.io/v2/',
});


//==============================
// ENDPOINTS
//==============================

export const ENDPOINTS = {
  blog: {
    categories: '5bb20b802e00009015927389/',
    posts: 'posts/',
  },
  contactForm: {
    favoriteColors: '5bbb65983100004d00149011/',
  },
  auth: {
    login: '5bd312b23400002a00cfe028/',
    register: '5bd311fc3400006f00cfe021/',
  }
};

export default JSON_PLACEHOLDER_INSTANCE;
