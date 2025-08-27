<template>
  <Transition name="fade-slide">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 relative" dir="rtl">
        <!-- Close Button -->
        <button class="absolute top-3 left-3 text-gray-400 hover:text-gray-700 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-all" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Header -->
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">تعديل الإضافات</h2>
          <p class="text-gray-600">{{ item?.service_title }}</p>
        </div>
        <!-- Product Image -->
        <div class="mb-6">
          <img :src="item?.service_image" :alt="item?.service_title" class="w-full h-32 object-cover rounded-lg" />
        </div>
        
        <!-- Add-ons Selection -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4">اختر الإضافات</h3>
          <div class="space-y-3 max-h-48 overflow-y-auto">
            <label 
              v-for="addOn in availableAddOns" 
              :key="addOn.id" 
              class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary transition-all cursor-pointer"
              :class="{ 'border-primary bg-orange-50': selectedAddOns.includes(addOn) }"
            >
              <div class="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  :value="addOn.id" 
                  v-model="selectedAddOns"
                  class="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <div>
                  <div class="font-semibold text-gray-900">{{ addOn.title }}</div>
                  <!-- <div class="text-sm text-gray-500">{{ addOn.description }}</div> -->
                </div>
              </div>
              <div class="text-primary font-bold">+{{ addOn.price_with_value }} د.أ</div>
            </label>
          </div>
        </div>
        
        <!-- Total Price -->
        <div class="border-t pt-4 mb-6">
          <div class="flex justify-between items-center">
            <span class="text-lg font-semibold">السعر الإجمالي:</span>
            <span class="text-2xl font-bold text-primary">{{ totalPrice }} د.أ</span>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button 
            @click="updateCartItemCount"
            class="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            تحديث الإضافات
          </button>
          <button 
            @click="$emit('close')"
            class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  </Transition>

   <Toast 
      v-if="toast.visible"
      :message="toast.message"
      :type="toast.type"
      :visible="toast.visible"
    />
</template>
<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  item: { type: Object, default: null }
})
import Toast from '@/components/Toast.vue'

import api from '@/api/http'
// const increase = inject('increaseCartItem')
// const decrease = inject('decreaseCartItem')
// const remove = inject('removeCartItem')
const toast = ref({ visible: false, message: '', type: 'success' })

const showToast = (msg, type = 'success') => {
  toast.value = { visible: true, message: msg, type }
  setTimeout(() => (toast.value.visible = false), 3000)
}

const emit = defineEmits(['close', 'update'])

const availableAddOns = computed(() => props.item?.service_options || [])

// نخزن IDs فقط
const selectedAddOns = ref([])

// عند فتح المودال: فعّل المختار مبدئيًا حسب selectd من الباك
watch(() => props.open, (isOpen) => {
  if (isOpen && props.item) {
    selectedAddOns.value = availableAddOns.value
      .filter(a => a.selectd === true)   // لاحظ اسم المفتاح selectd
      .map(a => a.id)
  }
})

// اجمالي السعر = سعر الأساس + مجموع أسعار الإضافات المختارة
const totalPrice = computed(() => {
  const base = Number(props.item?.product?.price_with_value) || 0
  const addonsSum = availableAddOns.value
    .filter(a => selectedAddOns.value.includes(a.id))
    .reduce((sum, a) => sum + Number(a.price_with_value || 0), 0)
  return base + addonsSum
})

// تحديث السلة بالـ IDs + الكائنات (لو محتاجينها)
const updateItem = () => {
  if (!props.item) return
  const selectedAddOnObjects = availableAddOns.value
    .filter(a => selectedAddOns.value.includes(a.id))

  emit('update', {
    itemKey: props.item._key,
    addOnIds: selectedAddOns.value,
    addOns: selectedAddOnObjects,
    total: totalPrice.value
  })
  emit('close')
}


const updateCartItemCount = async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!user?.id) {
    showToast('يجب تسجيل الدخول أولاً', 'error')
    return
  }

  try {
    
        const response = await api.post('/api/update-to-cart', {
        user_id: user.id,
        cart_id: props.item?.id,
        count: props.item?.count || 0,
        option_ids: JSON.stringify(selectedAddOns.value) || []  // إرسال نفس الإضافات
      })
      showToast('تم تحديث عدد العناصر', 'success')
    

    setTimeout(() => {
      emit('close')
      emit('update', response.data.data)
    }, 500)
  } catch (error) {
    console.error('Error updating item count:', error)
    showToast('فشل الاتصال بالخادم', 'error')
  }
}
</script>
<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style> 