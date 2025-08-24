<template>
  <Transition name="slide-rtl">
    <aside v-if="open" class="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-lg z-50 flex flex-col text-right" dir="rtl">
      <!-- Edit Add-ons Modal -->
      <EditAddOnsModal 
        :open="showEditModal" 
        :item="selectedItem" 
        @close="showEditModal = false"
        @update="updateItemAddOns"
      />
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-xl font-bold">سلة المشتريات</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-700 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 p-4 overflow-y-auto">
        <template v-if="cart.length">
          <div v-for="item in cart" :key="item._key" class="mb-4 border-b pb-2">
            <div class="flex items-center justify-between mb-1">
              <div class="font-semibold">{{ item.service_title }}</div>
              <div class="flex items-center gap-2">
                <button @click="increase(item._key)" class="bg-gray-200 rounded px-2">+</button>
                <span class="mx-1">{{ item.count }}</span>
                <button @click="decrease(item._key)" class="bg-gray-200 rounded px-2">-</button>
              </div>
            </div>
            <div v-if="item.options.length" class="text-xs text-gray-500 mb-1">إضافات: {{ item.options.map(a => a.title).join('، ') }}</div>
            <div class="flex items-center justify-between">
              <div class="text-sm font-bold text-primary">{{ item.total }} د.أ</div>
              <button 
                @click="editAddOns(item)" 
                class="text-primary hover:text-primary-dark text-xs flex items-center gap-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                تعديل الإضافات
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <p class="text-gray-500">سلتك فارغة</p>
        </template>
      </div>
      <div class="p-4 border-t">
        <router-link 
          to="/checkout" 
          @click="$emit('close')"
          class="block w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary-dark transition text-center"
        >
          إتمام الطلب
        </router-link>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { inject, ref } from 'vue'
import EditAddOnsModal from './EditAddOnsModal.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])
const cart = inject('cart')
console.log(props.payload, 'dsdsds ')
const increase = inject('increaseCartItem')
const decrease = inject('decreaseCartItem')

const showEditModal = ref(false)
const selectedItem = ref(null)

const editAddOns = (item) => {
  selectedItem.value = item
  showEditModal.value = true
}

const updateItemAddOns = (updateData) => {
  // Find the item in cart and update its add-ons
  const itemIndex = cart.value.findIndex(item => item._key === updateData.itemKey)
  if (itemIndex !== -1) {
    cart.value[itemIndex].addOns = updateData.addOns
    cart.value[itemIndex].total = updateData.total
  }
}
</script>

<style scoped>
.slide-rtl-enter-active, .slide-rtl-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s;
}
.slide-rtl-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-rtl-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>