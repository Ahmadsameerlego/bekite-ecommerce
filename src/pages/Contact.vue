<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-900 text-center">تواصل معنا</h1>
        <p class="text-gray-600 text-center mt-2">نحن هنا لمساعدتك في أي استفسار</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <div class=" mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">أرسل لنا رسالة</h2>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">الاسم الأول</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">الاسم الأخير</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  style="direction: rtl;"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                <select
                  v-model="form.subject"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">اختر الموضوع</option>
                  <option value="general">استفسار عام</option>
                  <option value="order">مشكلة في الطلب</option>
                  <option value="delivery">مشكلة في التوصيل</option>
                  <option value="payment">مشكلة في الدفع</option>
                  <option value="suggestion">اقتراح</option>
                  <option value="complaint">شكوى</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="اكتب رسالتك هنا..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                class="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-dark transition duration-300"
              >
               <span v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
               <div v-else>إرسال الرسالة</div>
              </button>
            </form>
          </div>

                      <!-- Contact Information -->
            <div class="space-y-8">
              <!-- Contact Info -->
              <div class="bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">معلومات التواصل</h2>
                <div class="space-y-4">
                  <div class="flex items-center space-x-4 space-x-reverse">
                    <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">الهاتف</h3>
                      <p class="text-gray-600"> {{  setting?.phone  }} </p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-4 space-x-reverse">
                    <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">البريد الإلكتروني</h3>
                      <p class="text-gray-600">{{ setting?.email }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-4 space-x-reverse">
                    <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">العنوان</h3>
                      <p class="text-gray-600">{{ setting?.address }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Social Media -->
              <div class="bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">وسائل التواصل الاجتماعي</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <!-- Facebook -->
                  <a :href="setting?.facebook" target="_blank" class="flex items-center space-x-3 space-x-reverse p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">Facebook</h3>
                      <p class="text-sm text-gray-600">تابعنا على فيسبوك</p>
                    </div>
                  </a>
                  
                  <!-- Instagram -->
                  <a :href="setting?.instagram" target="_blank" class="flex items-center space-x-3 space-x-reverse p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-colors">
                    <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">Instagram</h3>
                      <p class="text-sm text-gray-600">تابعنا على انستغرام</p>
                    </div>
                  </a>
                  
                  <!-- WhatsApp -->
                  <a :href="setting?.phone" target="_blank" class="flex items-center space-x-3 space-x-reverse p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div class="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">WhatsApp</h3>
                      <p class="text-sm text-gray-600">تواصل معنا عبر واتساب</p>
                    </div>
                  </a>
                  
                  <!-- Twitter/X -->
                  <a :href="setting?.twitter" target="_blank" class="flex items-center space-x-3 space-x-reverse p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div class="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">Twitter</h3>
                      <p class="text-sm text-gray-600">تابعنا على تويتر</p>
                    </div>
                  </a>
                  
                  <!-- TikTok -->
                  <a :href="setting?.tiktok" target="_blank"  class="flex items-center space-x-3 space-x-reverse p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div class="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">TikTok</h3>
                      <p class="text-sm text-gray-600">تابعنا على تيك توك</p>
                    </div>
                  </a>
                  
                  <!-- YouTube -->
                  <a :href="setting?.youtube" target="_blank" class="flex items-center space-x-3 space-x-reverse p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    <div class="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">YouTube</h3>
                      <p class="text-sm text-gray-600">تابعنا على يوتيوب</p>
                    </div>
                  </a>
                </div>
              </div>

            <!-- Business Hours -->
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">ساعات العمل</h2>
              <div v-html="setting?.desc" class="space-y-3">
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   <!-- Toast -->
    <Toast 
      v-if="toast.visible"
      :message="toast.message"
      :type="toast.type"
      :visible="toast.visible"
    />
</template>


<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/http'
import Toast from '@/components/Toast.vue'

// Toast state
const toast = ref({
  visible: false,
  message: '',
  type: 'success'
})

const showToast = (msg, type = 'success') => {
  toast.value = { visible: true, message: msg, type }
  setTimeout(() => (toast.value.visible = false), 3000)
}


// نموذج البيانات
const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
})

const isLoading = ref(false)

const submitForm = async () => {
  if (isLoading.value) return
  isLoading.value = true

  try {
    const response = await api.post("/api/contact-us", {
      lang: "ar",
      name: form.value.firstName + " " + form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      title: subjectMapper(form.value.subject), // تحويل subject لقيمة نصية مناسبة
      message: form.value.message,
    })

    if (response.data.key === 1) {
      showToast(response.data.msg || "تم الإرسال بنجاح")
      resetForm()
    } else {
      showToast(response.data.msg || "حدث خطأ أثناء الإرسال", "error")
    }
  } catch (err) {
    console.error(err)
    showToast("تعذر الاتصال بالسيرفر", "error")
  } finally {
    isLoading.value = false
  }
}


// تحويل قيمة الـ select لعربية (لو API عاوز نص عربي)
const subjectMapper = (val) => {
  switch (val) {
    case "general": return "استفسار عام"
    case "order": return "مشكلة في الطلب"
    case "delivery": return "مشكلة في التوصيل"
    case "payment": return "مشكلة في الدفع"
    case "suggestion": return "اقتراح"
    case "complaint": return "شكوى"
    default: return val
  }
}

// تفريغ الفورم بعد النجاح
const resetForm = () => {
  form.value = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  }
}


const user = JSON.parse(localStorage.getItem("user") || "{}");
const setting = ref(null);
// ✅ جلب بيانات المستخدم
const getData = async () => {
  
  try {
    const response = await api.post("/api/page", {
      lang: "ar",
      user_id: user.id,
      title:'condition'
    });

    if (response.data.key === 1) {
      const data = response.data;
      setting.value = data;
      console.log("page data:", setting.value);
    } else {
    }
  } catch (error) {
    console.error("show-user error:", error);
  } 
};

onMounted(() => {
  getData();
});
 </script> 