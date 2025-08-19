// توحيد التعامل مع response والأخطاء
export function handleApiResponse(response) {
  // هنا ممكن تعمل معالجة موحدة للـ response
  return response.data;
}

export function handleApiError(error) {
  // معالجة الأخطاء بشكل موحد
  if (error.response) {
    // السيرفر رد بكود خطأ
    return error.response.data;
  } else if (error.request) {
    // لم يتم الرد من السيرفر
    return { message: 'No response from server', error };
  } else {
    // خطأ في الإعدادات
    return { message: error.message };
  }
}
