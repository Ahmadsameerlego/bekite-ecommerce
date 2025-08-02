<template>
  <div
    class="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden flex flex-col"
    @click="$emit('click')"
    :dir="rtl ? 'rtl' : 'ltr'"
  >
    <img :src="product.image" :alt="product.name" class="h-40 w-full object-cover" />
    <div class="p-4 flex-1 flex flex-col justify-between text-right">
      <div>
        <h3 class="font-semibold text-lg mb-1">{{ product.name }}</h3>
        <p class="text-gray-500 text-sm line-clamp-2">{{ product.description }}</p>
      </div>
      <div class="mt-3 font-bold text-primary text-lg flex flex-row-reverse gap-2 items-center">
        <template v-if="showDiscount && product.originalPrice && product.discountedPrice && product.discountedPrice < product.originalPrice">
          <span class="text-red-600">{{ product.discountedPrice.toFixed(2) }} ر.س</span>
          <span class="text-gray-400 line-through text-base">{{ product.originalPrice.toFixed(2) }} ر.س</span>
        </template>
        <template v-else>
          <span>{{ product.price.toFixed(2) }} ر.س</span>
        </template>
      </div>
      <div v-if="cartItem" class="mt-2 flex flex-row-reverse items-center gap-2">
        <button @click.stop="increase(cartItem._key)" class="bg-gray-200 rounded px-2">+</button>
        <span class="mx-1">{{ cartItem.quantity }}</span>
        <button @click.stop="decrease(cartItem._key)" class="bg-gray-200 rounded px-2">-</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
const props = defineProps({
  product: { type: Object, required: true },
  rtl: { type: Boolean, default: false },
  showDiscount: { type: Boolean, default: false }
})
const cart = inject('cart')
const increase = inject('increaseCartItem')
const decrease = inject('decreaseCartItem')
const cartItem = computed(() => {
  if (!cart || !cart.value) return null
  // Find any cart item with this product (ignoring addOns for card view)
  return cart.value.find(i => i.product.id === props.product.id) || null
})
</script>