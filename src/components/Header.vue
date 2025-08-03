<template>
  <header class="bg-white shadow sticky top-0 z-30">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-xl font-bold text-primary">{{ $t('header.storeName') }}</span>
      </div>
      <nav class="hidden md:flex gap-6 items-center">
        <RouterLink to="/" class="hover:text-primary">{{ $t('nav.home') }}</RouterLink>
        <RouterLink to="/about" class="hover:text-primary">من نحن</RouterLink>
        <RouterLink to="/login" class="hover:text-primary">{{ $t('nav.login') }}</RouterLink>
        <RouterLink to="/register" class="hover:text-primary">{{ $t('nav.register') }}</RouterLink>
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
        <!-- Language Toggle -->
        <button 
          @click="toggleLanguage" 
          class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <span class="text-sm font-medium">{{ currentLanguage === 'ar' ? 'عربي' : 'EN' }}</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
        </button>
      </nav>
      <!-- Hamburger -->
      <button class="md:hidden" @click="open = !open">
        <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <!-- Mobile Nav -->
    <Transition name="fade-slide">
      <nav v-if="open" class="md:hidden bg-white border-t px-4 pb-4 flex flex-col gap-3">
        <RouterLink to="/" class="hover:text-primary" @click="open = false">{{ $t('nav.home') }}</RouterLink>
        <RouterLink to="/about" class="hover:text-primary" @click="open = false">من نحن</RouterLink>
        <RouterLink to="/login" class="hover:text-primary" @click="open = false">{{ $t('nav.login') }}</RouterLink>
        <RouterLink to="/register" class="hover:text-primary" @click="open = false">{{ $t('nav.register') }}</RouterLink>
        <RouterLink to="/profile" class="hover:text-primary flex items-center gap-2" @click="open = false">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          {{ $t('header.profile') }}
        </RouterLink>
        <div class="relative">
          <button class="relative" @click="goToCart">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 008.48 19h7.04a2 2 0 001.83-1.3L17 13M7 13V6h13" />
            </svg>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{{ cartCount }}</span>
          </button>
        </div>
        <!-- Language Toggle Mobile -->
        <button 
          @click="toggleLanguage" 
          class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <span class="text-sm font-medium">{{ currentLanguage === 'ar' ? 'عربي' : 'EN' }}</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
        </button>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { setLanguage } from '../i18n'

const props = defineProps({ cartCount: { type: Number, default: 0 } })
const open = ref(false)
const router = useRouter()
const { locale } = useI18n()

const currentLanguage = computed(() => locale.value)

function goToCart() {
  router.push('/cart')
}

function toggleLanguage() {
  const newLocale = currentLanguage.value === 'ar' ? 'en' : 'ar'
  setLanguage(newLocale)
  open.value = false
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