import axios from 'axios';

const api = axios.create({
  baseURL: 'https://demo.zalameh.app/backend',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor لإضافة lang لكل body
api.interceptors.request.use(
  (config) => {
    const lang = localStorage.getItem('language') || 'ar';

    // لو في body (POST, PUT...) ضيف lang
    if (config.data && typeof config.data === 'object') {
      config.data = { lang, ...config.data };
    }

    // لو GET request ممكن تبعته كـ query param
    if (config.method === 'get') {
      config.params = { lang, ...(config.params || {}) };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
