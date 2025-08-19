import axios from 'axios';

const api = axios.create({
  baseURL: 'https://demo.zalameh.app/backend',
  headers: {
    'Content-Type': 'application/json',
    // يمكن إضافة Authorization هنا لاحقًا
  },
});

// Interceptors للـ requests/response لو حبيت تضيف معالجة موحدة
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // معالجة الأخطاء بشكل موحد
    return Promise.reject(error);
  }
);

export default api;
