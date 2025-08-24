<template>
  <div class="flex flex-col min-h-screen">
    <Header :cart-count="cartCount" />
    <main class="flex-1">
      <Transition name="fade-slide" mode="out-in">
        <router-view />
      </Transition>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, provide, computed } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

// Cart state: array of { product, addOns, total, quantity }
const cart = ref([])
const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))

function addToCart(data) {
  // Check if same product+addOns exists
  // const key = JSON.stringify({ id: product.id, addOns: addOns.map(a => a.id).sort() })
  // const found = cart.value.find(item => item._key === key)
  cart.value = data
  // if (found) {
  //   found.quantity++
  // } else {
  //   cart.value.push({
  //     _key: key,
  //     product,
  //     addOns,
  //     total,
  //     quantity: 1
  //   })
  // }
}
function increaseCartItem(key) {
  const item = cart.value.find(i => i._key === key)
  if (item) item.quantity++
}
function decreaseCartItem(key) {
  const item = cart.value.find(i => i._key === key)
  if (item && item.quantity > 1) item.quantity--
  else if (item) removeCartItem(key)
}
function removeCartItem(key) {
  cart.value = cart.value.filter(i => i._key !== key)
}

provide('cart', cart)
provide('cartCount', cartCount)
provide('addToCart', addToCart)
provide('increaseCartItem', increaseCartItem)
provide('decreaseCartItem', decreaseCartItem)
provide('removeCartItem', removeCartItem)
</script>

<style>
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