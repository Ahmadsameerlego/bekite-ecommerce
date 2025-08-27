<template>
  <div dir="rtl" class="bg-gray-50 text-right min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto text-center">
        <!-- Success Icon -->
        <div class="mb-8">
          <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        <!-- Success Message -->
        <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 class="text-3xl font-bold text-green-600 mb-4">شكراً لك!</h1>
          <p class="text-xl text-gray-700 mb-6">تم تأكيد طلبك بنجاح</p>
          
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 class="text-lg font-semibold mb-4">تفاصيل الطلب</h2>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">رقم الطلب:</span>
                <span class="font-semibold">#{{ orderNumber }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">تاريخ الطلب:</span>
                <span class="font-semibold">{{ order_data?.order_date_time }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">طريقة الدفع:</span>
                <span class="font-semibold">{{  order_data?.payment_method_f  }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">إجمالي الطلب:</span>
                <span class="font-semibold text-primary">{{ order_data?.total_after_promo }} د.أ</span>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border-r-4 border-blue-400 p-4 mb-6">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-blue-600 mt-0.5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div class="text-right">
                <p class="text-blue-800 font-medium">سيتم التواصل معك قريباً</p>
                <p class="text-blue-600 text-sm">سيتصل بك مندوب التوصيل لتأكيد موعد التوصيل</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-4">
          <router-link 
            to="/"
            class="block w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
          >
            العودة للصفحة الرئيسية
          </router-link>
          
          <button 
            @click="trackOrder"
            class="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            تتبع طلبك
          </button>
        </div>

        <!-- Additional Info -->
        <div class="mt-8 text-center text-gray-500">
          <p>هل لديك أسئلة؟</p>
          <p class="text-primary font-medium">اتصل بنا: 050-123-4567</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Generate random order number and date
const orderNumber = ref('')
const orderDate = ref('')
const totalAmount = ref('0.00')
const order_data = ref(JSON.parse(localStorage.getItem('order_data') || '{}') )
onMounted(() => {
  // Generate random order number
  orderNumber.value = Math.random().toString(36).substr(2, 8).toUpperCase()
  
  // Set current date
  const now = new Date()
  orderDate.value = now.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  
  // Get total from cart (if available)
  // For now, we'll use a placeholder
  totalAmount.value = '25.50'
})

function trackOrder() {
  // This would typically navigate to an order tracking page
  alert('سيتم إضافة صفحة تتبع الطلبات قريباً')
}
</script>

<style scoped>
/* Add some animation for the success icon */
.w-24 {
  animation: bounce 1s ease-in-out;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style> 