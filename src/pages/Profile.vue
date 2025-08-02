<template>
  <div dir="rtl" class="bg-gradient-to-br from-orange-50 to-red-50 text-right min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
        الملف الشخصي
      </h1>
      
      <!-- Tabs -->
      <div class="flex justify-center mb-8">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl">
          <button 
            @click="activeTab = 'profile'"
            class="px-6 py-3 rounded-xl font-semibold transition-all"
            :class="activeTab === 'profile' ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:text-primary'"
          >
            البيانات الشخصية
          </button>
          <button 
            @click="activeTab = 'orders'"
            class="px-6 py-3 rounded-xl font-semibold transition-all"
            :class="activeTab === 'orders' ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:text-primary'"
          >
            طلباتي
          </button>
        </div>
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'" class="max-w-2xl mx-auto">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            البيانات الشخصية
          </h2>
          
          <form @submit.prevent="updateProfile" class="space-y-6">
            <div>
              <label class="block mb-3 font-semibold text-gray-700">الاسم الكامل</label>
              <input 
                v-model="profile.name" 
                type="text" 
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
              />
            </div>
            
            <div>
              <label class="block mb-3 font-semibold text-gray-700">رقم الهاتف</label>
              <input 
                v-model="profile.phone" 
                type="tel" 
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label class="block mb-3 font-semibold text-gray-700">البريد الإلكتروني</label>
              <input 
                v-model="profile.email" 
                type="email" 
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label class="block mb-3 font-semibold text-gray-700">العنوان</label>
              <textarea 
                v-model="profile.address" 
                rows="3"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
            >
              حفظ التغييرات
            </button>
          </form>
        </div>
      </div>

      <!-- Orders Tab -->
      <div v-if="activeTab === 'orders'" class="max-w-4xl mx-auto">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            طلباتي
          </h2>
          
          <div v-if="orders.length" class="space-y-6">
            <div v-for="order in orders" :key="order.id" class="border-2 border-gray-200 rounded-xl p-6 hover:border-primary transition-all">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-semibold">طلب #{{ order.id }}</h3>
                  <p class="text-gray-500">{{ order.date }}</p>
                </div>
                <div class="text-left">
                  <span class="px-3 py-1 rounded-full text-sm font-semibold" :class="getStatusClass(order.status)">
                    {{ getStatusText(order.status) }}
                  </span>
                </div>
              </div>
              
              <div class="space-y-2 mb-4">
                <div v-for="item in order.items" :key="item.id" class="flex justify-between">
                  <span>{{ item.name }} × {{ item.quantity }}</span>
                  <span>{{ item.price }} ر.س</span>
                </div>
              </div>
              
              <div class="border-t border-gray-200 pt-4 flex justify-between items-center">
                <div>
                  <span class="font-semibold">الإجمالي: {{ order.total }} ر.س</span>
                </div>
                <button 
                  @click="trackOrder(order.id)"
                  class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all"
                >
                  تتبع الطلب
                </button>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-12">
            <div class="text-6xl mb-4">📦</div>
            <p class="text-gray-500 text-lg">لا توجد طلبات بعد</p>
            <router-link 
              to="/"
              class="inline-block mt-4 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all"
            >
              تصفح المنتجات
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('profile')

// Profile data
const profile = ref({
  name: 'أحمد محمد',
  phone: '050-123-4567',
  email: 'ahmed@example.com',
  address: 'عمان، الأردن'
})

// Mock orders data
const orders = ref([
  {
    id: 'ORD001',
    date: '2024-01-15',
    status: 'delivered',
    total: '25.50',
    items: [
      { id: 1, name: 'برجر كلاسيك', quantity: 2, price: '15.98' },
      { id: 2, name: 'بطاطس', quantity: 1, price: '9.52' }
    ]
  },
  {
    id: 'ORD002',
    date: '2024-01-10',
    status: 'in_progress',
    total: '18.75',
    items: [
      { id: 3, name: 'بيتزا نباتية', quantity: 1, price: '10.50' },
      { id: 4, name: 'مشروب غازي', quantity: 2, price: '8.25' }
    ]
  },
  {
    id: 'ORD003',
    date: '2024-01-05',
    status: 'cancelled',
    total: '12.00',
    items: [
      { id: 5, name: 'سلطة سيزر', quantity: 1, price: '6.00' },
      { id: 6, name: 'عصير برتقال', quantity: 1, price: '6.00' }
    ]
  }
])

function updateProfile() {
  // Simulate API call
  alert('تم حفظ البيانات بنجاح')
}

function trackOrder(orderId) {
  // Navigate to order tracking page
  alert(`سيتم تتبع الطلب ${orderId}`)
}

function getStatusClass(status) {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'confirmed': return 'bg-blue-100 text-blue-800'
    case 'in_progress': return 'bg-orange-100 text-orange-800'
    case 'in_transit': return 'bg-purple-100 text-purple-800'
    case 'delivered': return 'bg-green-100 text-green-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getStatusText(status) {
  switch (status) {
    case 'pending': return 'في الانتظار'
    case 'confirmed': return 'مؤكد'
    case 'in_progress': return 'قيد التحضير'
    case 'in_transit': return 'في الطريق'
    case 'delivered': return 'تم التوصيل'
    case 'cancelled': return 'ملغي'
    default: return 'غير محدد'
  }
}
</script> 