<template>
  <div dir="rtl" class="bg-gradient-to-br from-orange-50 to-red-50 text-right min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
        إتمام الطلب
      </h1>
      
      <div class="grid gap-8 lg:grid-cols-2">
        <!-- Left Column: Forms -->
        <div class="space-y-8">
          <!-- Customer Delivery Info Form -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              معلومات التوصيل
            </h2>
            <form @submit.prevent="submitOrder" class="space-y-6">
              <div>
                <label class="block mb-3 font-semibold text-gray-700">الاسم الكامل *</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                  :class="{ 'border-red-500': errors.name }"
                  required 
                />
                <p v-if="errors.name" class="text-red-500 text-sm mt-2">{{ errors.name }}</p>
              </div>
              
              <div>
                <label class="block mb-3 font-semibold text-gray-700">رقم الهاتف *</label>
                <input 
                  v-model="form.phone" 
                  type="tel" 
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  :class="{ 'border-red-500': errors.phone }"
                  required 
                />
                <p v-if="errors.phone" class="text-red-500 text-sm mt-2">{{ errors.phone }}</p>
              </div>
              
              <div>
                <label class="block mb-3 font-semibold text-gray-700">العنوان *</label>
                <textarea 
                  v-model="form.address" 
                  rows="3"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  :class="{ 'border-red-500': errors.address }"
                  required 
                ></textarea>
                <p v-if="errors.address" class="text-red-500 text-sm mt-2">{{ errors.address }}</p>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block mb-3 font-semibold text-gray-700">رقم الشقة (اختياري)</label>
                  <input 
                    v-model="form.apartment" 
                    type="text" 
                    class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                  />
                </div>
                <div>
                  <label class="block mb-3 font-semibold text-gray-700">رقم الطابق (اختياري)</label>
                  <input 
                    v-model="form.floor" 
                    type="text" 
                    class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                  />
                </div>
              </div>
            </form>
          </div>

          <!-- Delivery Method -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              طريقة التوصيل
            </h2>
            <div class="space-y-4">
              <label class="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all" :class="{ 'border-primary bg-orange-50': form.deliveryMethod === 'branch' }">
                <input 
                  v-model="form.deliveryMethod" 
                  type="radio" 
                  value="branch" 
                  class="text-primary focus:ring-primary" 
                />
                <div class="mr-4">
                  <div class="font-semibold">استلام من الفرع</div>
                  <div class="text-sm text-gray-500">استلم طلبك من أقرب فرع</div>
                </div>
              </label>
              
              <label class="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all" :class="{ 'border-primary bg-orange-50': form.deliveryMethod === 'delivery' }">
                <input 
                  v-model="form.deliveryMethod" 
                  type="radio" 
                  value="delivery" 
                  class="text-primary focus:ring-primary" 
                />
                <div class="mr-4">
                  <div class="font-semibold">توصيل مندوب</div>
                  <div class="text-sm text-gray-500">توصيل سريع من مندوبنا</div>
                </div>
              </label>
              
              <label class="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all" :class="{ 'border-primary bg-orange-50': form.deliveryMethod === 'shipping' }">
                <input 
                  v-model="form.deliveryMethod" 
                  type="radio" 
                  value="shipping" 
                  class="text-primary focus:ring-primary" 
                />
                <div class="mr-4">
                  <div class="font-semibold">شركة شحن</div>
                  <div class="text-sm text-gray-500">توصيل عبر شركة شحن</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
              طريقة الدفع
            </h2>
            <div class="space-y-4">
              <label class="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all" :class="{ 'border-primary bg-orange-50': form.paymentMethod === 'cash' }">
                <input 
                  v-model="form.paymentMethod" 
                  type="radio" 
                  value="cash" 
                  class="text-primary focus:ring-primary" 
                  checked 
                />
                <div class="mr-4">
                  <div class="font-semibold">الدفع عند الاستلام</div>
                  <div class="text-sm text-gray-500">ادفع نقداً عند استلام الطلب</div>
                </div>
              </label>
              
              <label class="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all" :class="{ 'border-primary bg-orange-50': form.paymentMethod === 'online' }">
                <input 
                  v-model="form.paymentMethod" 
                  type="radio" 
                  value="online" 
                  class="text-primary focus:ring-primary" 
                />
                <div class="mr-4">
                  <div class="font-semibold">الدفع الإلكتروني</div>
                  <div class="text-sm text-gray-500">ادفع عبر البطاقة الائتمانية</div>
                </div>
              </label>
              
              <label class="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all" :class="{ 'border-primary bg-orange-50': form.paymentMethod === 'click' }">
                <input 
                  v-model="form.paymentMethod" 
                  type="radio" 
                  value="click" 
                  class="text-primary focus:ring-primary" 
                />
                <div class="mr-4">
                  <div class="font-semibold">Click</div>
                  <div class="text-sm text-gray-500">ادفع عبر محفظة Click</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Right Column: Order Summary -->
        <div class="space-y-6">
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              ملخص الطلب
            </h2>
            
            <div v-if="cart.length" class="space-y-4">
              <div v-for="item in cart" :key="item._key" class="border-b border-gray-200 pb-4 last:border-b-0">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-semibold text-lg">{{ item.product.name }}</h3>
                    <div v-if="item.addOns.length" class="text-sm text-gray-500">
                      إضافات: {{ item.addOns.map(a => a.name).join('، ') }}
                    </div>
                  </div>
                  <div class="text-left">
                    <span class="font-bold text-lg">{{ (item.total * item.quantity).toFixed(2) }} ر.س</span>
                  </div>
                </div>
                <div class="flex justify-between text-sm text-gray-500">
                  <span>{{ item.quantity }} × {{ item.total.toFixed(2) }} ر.س</span>
                </div>
              </div>
              
              <div class="border-t border-gray-200 pt-6 space-y-3">
                <div class="flex justify-between">
                  <span class="text-lg">إجمالي المنتجات:</span>
                  <span class="text-lg font-semibold">{{ subtotal.toFixed(2) }} ر.س</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-lg">رسوم التوصيل:</span>
                  <span class="text-lg font-semibold">{{ deliveryFee.toFixed(2) }} ر.س</span>
                </div>
                <div class="flex justify-between text-xl font-bold text-primary border-t border-gray-200 pt-3">
                  <span>الإجمالي النهائي:</span>
                  <span>{{ totalPrice.toFixed(2) }} ر.س</span>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-12">
              <div class="text-6xl mb-4">🛒</div>
              <p class="text-gray-500 text-lg">لا توجد منتجات في السلة</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-4">
            <button 
              @click="submitOrder"
              :disabled="!cart.length || isSubmitting"
              class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري التأكيد...
              </span>
              <span v-else>تأكيد الطلب</span>
            </button>
            <router-link 
              to="/cart"
              class="block w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all text-center"
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
  deliveryMethod: 'delivery',
  paymentMethod: 'cash'
})

const errors = ref({})
const isSubmitting = ref(false)

// Delivery fee based on method
const deliveryFee = computed(() => {
  switch (form.value.deliveryMethod) {
    case 'branch': return 0
    case 'delivery': return 2.0
    case 'shipping': return 5.0
    default: return 2.0
  }
})

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
    router.push('/thank-you')
  }, 2000)
}
</script> 