<template>
  <div dir="rtl" class="bg-gray-50 text-right min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">سلة المشتريات</h1>
      
      <template v-if="cart.length">
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div v-for="item in cart" :key="item._key" class="flex items-center justify-between py-4 border-b last:border-b-0">
            <div class="flex items-center gap-4">
              <img :src="item.product.image" :alt="item.product.name" class="w-16 h-16 object-cover rounded" />
              <div>
                <h3 class="font-semibold text-lg">{{ item.product.name }}</h3>
                <div v-if="item.addOns.length" class="text-sm text-gray-500">إضافات: {{ item.addOns.map(a => a.name).join('، ') }}</div>
                <div class="text-primary font-bold">{{ item.total.toFixed(2) }} ر.س</div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <button @click="decrease(item._key)" class="bg-gray-200 rounded px-3 py-1">-</button>
                <span class="mx-2 font-semibold">{{ item.quantity }}</span>
                <button @click="increase(item._key)" class="bg-gray-200 rounded px-3 py-1">+</button>
              </div>
              <button @click="remove(item._key)" class="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-xl font-bold">الإجمالي:</span>
            <span class="text-2xl font-bold text-primary">{{ totalPrice.toFixed(2) }} ر.س</span>
          </div>
          <button class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition text-lg">
            <router-link to="/checkout" class="block w-full h-full flex items-center justify-center">
              إتمام الطلب
            </router-link>
          </button>
        </div>
      </template>
      
      <template v-else>
        <div class="bg-white rounded-xl shadow-lg p-12 text-center">
          <div class="text-6xl mb-4">🛒</div>
          <h2 class="text-2xl font-bold mb-2">سلتك فارغة</h2>
          <p class="text-gray-500 mb-6">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
          <router-link to="/" class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition">
            تصفح المنتجات
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
const cart = inject('cart')
const increase = inject('increaseCartItem')
const decrease = inject('decreaseCartItem')
const remove = inject('removeCartItem')

const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.total * item.quantity), 0)
})
</script> 