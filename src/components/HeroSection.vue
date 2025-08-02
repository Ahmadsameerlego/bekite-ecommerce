<template>
  <section class="relative w-full h-64 md:h-96 overflow-hidden">
    <div class="absolute inset-0 w-full h-full">
      <Transition name="fade-slide" mode="out-in">
        <img
          :key="images[current]"
          :src="images[current]"
          class="object-cover w-full h-full transition-all duration-700"
          alt="Hero image"
        />
      </Transition>
      <div class="absolute inset-0 bg-black/40"></div>
    </div>
    <div class="absolute inset-0 flex flex-col items-center justify-center z-10">
      <slot />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const images = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
]
const current = ref(0)
let interval = null
onMounted(() => {
  interval = setInterval(() => {
    current.value = (current.value + 1) % images.length
  }, 5000)
})
onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: scale(1.05);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>