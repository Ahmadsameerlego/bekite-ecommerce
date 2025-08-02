<template>
  <header class="bg-white shadow sticky top-0 z-30" dir="rtl">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-xl font-bold text-primary">🍔 فودستور</span>
      </div>
      <nav class="hidden md:flex gap-6 items-center">
        <RouterLink to="/" class="hover:text-primary">الرئيسية</RouterLink>
        <RouterLink to="/login" class="hover:text-primary">تسجيل الدخول</RouterLink>
        <RouterLink to="/register" class="hover:text-primary">إنشاء حساب</RouterLink>
        <RouterLink to="/profile" class="hover:text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </RouterLink>
        <div class="relative">
          <button class="relative" @click="goToCart">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 008.48 19h7.04a2 2 0 001.83-1.3L17 13M7 13V6h13" />
            </svg>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{{ cartCount }}</span>
          </button>
        </div>
      </nav>
      <!-- Hamburger -->
      <button class="md:hidden" @click="open = !open">
        <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <!-- Mobile Nav -->
    <Transition name="fade-slide">
      <nav v-if="open" class="md:hidden bg-white border-t px-4 pb-4 flex flex-col gap-3">
        <RouterLink to="/" class="hover:text-primary" @click="open = false">الرئيسية</RouterLink>
        <RouterLink to="/login" class="hover:text-primary" @click="open = false">تسجيل الدخول</RouterLink>
        <RouterLink to="/register" class="hover:text-primary" @click="open = false">إنشاء حساب</RouterLink>
        <RouterLink to="/profile" class="hover:text-primary flex items-center gap-2" @click="open = false">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          الملف الشخصي
        </RouterLink>
        <div class="relative">
          <button class="relative" @click="goToCart">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 008.48 19h7.04a2 2 0 001.83-1.3L17 13M7 13V6h13" />
            </svg>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{{ cartCount }}</span>
          </button>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({ cartCount: { type: Number, default: 0 } })
const open = ref(false)
const router = useRouter()
function goToCart() {
  router.push('/cart')
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