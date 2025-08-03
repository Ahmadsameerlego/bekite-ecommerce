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
      <div class="max-w-4xl mx-auto">
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
                إرسال الرسالة
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
                    <p class="text-gray-600">+966 50 123 4567</p>
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
                    <p class="text-gray-600">info@be-kite.com</p>
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
                    <p class="text-gray-600">شارع الملك فهد، الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Business Hours -->
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">ساعات العمل</h2>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">الأحد - الخميس</span>
                  <span class="font-semibold">8:00 ص - 10:00 م</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">الجمعة</span>
                  <span class="font-semibold">2:00 م - 11:00 م</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">السبت</span>
                  <span class="font-semibold">9:00 ص - 11:00 م</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Handle form submission
      console.log('Form submitted:', this.form)
      // Here you would typically send the data to your backend
      alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.')
      this.resetForm()
    },
    resetForm() {
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script> 