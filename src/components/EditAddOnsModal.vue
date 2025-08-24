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
                  :value="addOn" 
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
            @click="updateItem"
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
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  item: { type: Object, default: null }
})

const emit = defineEmits(['close', 'update'])

const selectedAddOns = ref([])

// Available add-ons (this would come from the product data)
const availableAddOns = computed(() => {
  return props.item?.options || []
})

// Calculate total price
const totalPrice = computed(() => {
  let total = Number(props.item?.product?.price_with_value) || 0
  for (const addOn of selectedAddOns.value) {
    total += Number(addOn.price_with_value) || 0
  }
  return total
})

// Initialize selected add-ons when modal opens
watch(() => props.open, (isOpen) => {
  if (isOpen && props.item) {
    selectedAddOns.value = [...(props.item.addOns || [])]
  }
})

// Update item with new add-ons
const updateItem = () => {
  if (props.item) {
    emit('update', {
      itemKey: props.item._key,
      addOns: selectedAddOns.value,
      total: totalPrice.value
    })
    emit('close')
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