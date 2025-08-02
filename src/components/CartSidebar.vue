<template>
  <Transition name="slide-rtl">
    <aside v-if="open" class="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-lg z-50 flex flex-col text-right" dir="rtl">
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-xl font-bold">سلة المشتريات</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 p-4 overflow-y-auto">
        <template v-if="cart.length">
          <div v-for="item in cart" :key="item._key" class="mb-4 border-b pb-2">
            <div class="flex items-center justify-between mb-1">
              <div class="font-semibold">{{ item.product.name }}</div>
              <div class="flex items-center gap-2">
                <button @click="increase(item._key)" class="bg-gray-200 rounded px-2">+</button>
                <span class="mx-1">{{ item.quantity }}</span>
                <button @click="decrease(item._key)" class="bg-gray-200 rounded px-2">-</button>
              </div>
            </div>
            <div v-if="item.addOns.length" class="text-xs text-gray-500 mb-1">إضافات: {{ item.addOns.map(a => a.name).join('، ') }}</div>
            <div class="text-sm font-bold text-primary">{{ (item.total * item.quantity).toFixed(2) }} ر.س</div>
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
import { inject } from 'vue'
const props = defineProps({
  open: { type: Boolean, default: false }
})
const emit = defineEmits(['close'])
const cart = inject('cart')
const increase = inject('increaseCartItem')
const decrease = inject('decreaseCartItem')
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