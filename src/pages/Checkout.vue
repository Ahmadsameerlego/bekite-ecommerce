<template>
  <div dir="rtl" class="bg-gray-50 text-right min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">إتمام الطلب</h1>
      
      <div class="grid gap-8 lg:grid-cols-2">
        <!-- Left Column: Forms -->
        <div class="space-y-8">
          <!-- Customer Delivery Info Form -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold mb-6">معلومات التوصيل</h2>
            <form @submit.prevent="submitOrder" class="space-y-4">
              <div>
                <label class="block mb-2 font-medium">الاسم الكامل *</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                  :class="{ 'border-red-500': errors.name }"
                  required 
                />
                <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
              </div>
              
              <div>
                <label class="block mb-2 font-medium">رقم الهاتف *</label>
                <input 
                  v-model="form.phone" 
                  type="tel" 
                  class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  :class="{ 'border-red-500': errors.phone }"
                  required 
                />
                <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
              </div>
              
              <div>
                <label class="block mb-2 font-medium">العنوان *</label>
                <textarea 
                  v-model="form.address" 
                  rows="3"
                  class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  :class="{ 'border-red-500': errors.address }"
                  required 
                ></textarea>
                <p v-if="errors.address" class="text-red-500 text-sm mt-1">{{ errors.address }}</p>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block mb-2 font-medium">رقم الشقة (اختياري)</label>
                  <input 
                    v-model="form.apartment" 
                    type="text" 
                    class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                  />
                </div>
                <div>
                  <label class="block mb-2 font-medium">رقم الطابق (اختياري)</label>
                  <input 
                    v-model="form.floor" 
                    type="text" 
                    class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                  />
                </div>
              </div>
            </form>
          </div>

          <!-- Payment Method -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold mb-6">طريقة الدفع</h2>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer">
                <input 
                  v-model="form.paymentMethod" 
                  type="radio" 
                  value="cash" 
                  class="text-primary focus:ring-primary" 
                  checked 
                />
                <span class="font-medium">الدفع عند الاستلام</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Right Column: Order Summary -->
        <div class="space-y-6">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold mb-6">ملخص الطلب</h2>
            
            <div v-if="cart.length" class="space-y-4">
              <div v-for="item in cart" :key="item._key" class="border-b pb-4 last:border-b-0">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-semibold">{{ item.product.name }}</h3>
                    <div v-if="item.addOns.length" class="text-sm text-gray-500">
                      إضافات: {{ item.addOns.map(a => a.name).join('، ') }}
                    </div>
                  </div>
                  <div class="text-left">
                    <span class="font-bold">{{ (item.total * item.quantity).toFixed(2) }} ر.س</span>
                  </div>
                </div>
                <div class="flex justify-between text-sm text-gray-500">
                  <span>{{ item.quantity }} × {{ item.total.toFixed(2) }} ر.س</span>
                </div>
              </div>
              
              <div class="border-t pt-4 space-y-2">
                <div class="flex justify-between">
                  <span>إجمالي المنتجات:</span>
                  <span>{{ subtotal.toFixed(2) }} ر.س</span>
                </div>
                <div class="flex justify-between">
                  <span>رسوم التوصيل:</span>
                  <span>{{ deliveryFee.toFixed(2) }} ر.س</span>
                </div>
                <div class="flex justify-between text-lg font-bold text-primary border-t pt-2">
                  <span>الإجمالي النهائي:</span>
                  <span>{{ totalPrice.toFixed(2) }} ر.س</span>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <p class="text-gray-500">لا توجد منتجات في السلة</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-3">
            <button 
              @click="submitOrder"
              :disabled="!cart.length || isSubmitting"
              class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'جاري التأكيد...' : 'تأكيد الطلب' }}
            </button>
            <router-link 
              to="/cart"
              class="block w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition text-center"
            >
              رجوع إلى السلة
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cart = inject('cart')

// Form data
const form = ref({
  name: '',
  phone: '',
  address: '',
  apartment: '',
  floor: '',
  paymentMethod: 'cash'
})

const errors = ref({})
const isSubmitting = ref(false)

// Delivery fee
const deliveryFee = ref(2.0)

// Computed values
const subtotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.total * item.quantity), 0)
})

const totalPrice = computed(() => {
  return subtotal.value + deliveryFee.value
})

// Validation
function validateForm() {
  errors.value = {}
  
  if (!form.value.name.trim()) {
    errors.value.name = 'الاسم مطلوب'
  }
  
  if (!form.value.phone.trim()) {
    errors.value.phone = 'رقم الهاتف مطلوب'
  }
  
  if (!form.value.address.trim()) {
    errors.value.address = 'العنوان مطلوب'
  }
  
  return Object.keys(errors.value).length === 0
}

// Submit order
function submitOrder() {
  if (!validateForm()) {
    return
  }
  
  if (!cart.value.length) {
    alert('السلة فارغة')
    return
  }
  
  isSubmitting.value = true
  
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false
    // Navigate to thank you page (to be implemented)
    router.push('/thank-you')
  }, 2000)
}
</script> 