<template>
  <header class="bg-white shadow sticky top-0 z-30">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <router-link to="/">
        <!-- <span class="text-xl font-bold text-primary">{{ $t('header.storeName') }}</span> -->
         <img src="@/assets/logo.png" class="w-[150px] h-[70px] object-contain" alt="">
        </router-link>
      </div>
      <nav class="hidden md:flex gap-6 items-center">
        <RouterLink to="/" class="hover:text-primary">{{ $t('nav.home') }}</RouterLink>
        <RouterLink to="/about" class="hover:text-primary">{{ $t('nav.about') }}</RouterLink>
        <RouterLink to="/contact" class="hover:text-primary">{{ $t('nav.contact') }}</RouterLink>
        <RouterLink v-if="isAuthed" to="/favorites" class="hover:text-primary">{{ $t('nav.favorites') }}</RouterLink>
      <RouterLink v-if="!isAuthed" to="/login" class="hover:text-primary">{{ $t('nav.login') }}</RouterLink>
      <RouterLink v-if="!isAuthed" to="/register" class="hover:text-primary">{{ $t('nav.register') }}</RouterLink>
      <RouterLink 
        v-if="isAuthed" 
        to="#" 
        class="hover:text-primary btn"
        @click.prevent="logout"
      >
        {{  $t('nav.logout') }}
      </RouterLink>


        <!-- notification  -->
        <RouterLink v-if="isAuthed" to="/notifications" class="hover:text-primary relative">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true">
          <path d="M15 17h5l-1.4-2.1A7 7 0 0 1 18 11V9a6 6 0 1 0-12 0v2a7 7 0 0 1-.6 3.9L4 17h5"/>
          <path d="M9 17a3 3 0 0 0 6 0"/>
          
        </svg>
                    <span v-if="notification_count > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{{ notification_count }}</span>
        </RouterLink>
        <!-- profile  -->
        <RouterLink  v-if="isAuthed" to="/profile" class="hover:text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </RouterLink>
        
        <!-- cart  -->
        <div class="relative mt-3">
          <button class="relative" @click="goToCart">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 008.48 19h7.04a2 2 0 001.83-1.3L17 13M7 13V6h13" />
            </svg>
            <span v-if="cart_count > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{{ cart_count }}</span>
          </button>
        </div>
        <!-- Language Toggle -->
        <button 
          @click="toggleLanguage" 
          class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <span class="text-sm font-medium">{{ currentLanguage === 'ar' ? 'En' : 'عربي' }}</span>
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
        <RouterLink to="/about" class="hover:text-primary" @click="open = false">{{ $t('nav.about') }}</RouterLink>
        <RouterLink to="/contact" class="hover:text-primary" @click="open = false">{{ $t('nav.contact') }}</RouterLink>
        <RouterLink v-if="isAuthed" to="/favorites" class="hover:text-primary">{{ $t('nav.favorites') }}</RouterLink>
        <RouterLink  v-if="!isAuthed" to="/login" class="hover:text-primary" @click="open = false">{{ $t('nav.login') }}</RouterLink>
        <RouterLink  v-if="!isAuthed" to="/register" class="hover:text-primary" @click="open = false">{{ $t('nav.register') }}</RouterLink>
        <RouterLink 
      v-if="isAuthed" 
      to="#" 
      class="hover:text-primary" 
      @click.prevent="logout"
    >
      {{ $t('nav.logout') }}
    </RouterLink>

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
          <span class="text-sm font-medium">{{ currentLanguage === 'ar' ? 'En' : 'عربي' }}</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
        </button>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted , watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { setLanguage } from '../i18n'
import api from '@/api/http' // ← استدعاء ملف الـ axios

const props = defineProps({ cartCount: { type: Number, default: 0 } })
const open = ref(false)
const router = useRouter()
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    open.value = false ;
    console.log('Route changed, menu closed.');
  }
)

const { locale } = useI18n()

const currentLanguage = computed(() => locale.value)

// Check if user is authenticated
const token = ref(localStorage.getItem('token'))

const isAuthed = computed(() => !!token.value)

function goToCart() {
  if (!isAuthed.value) {
    router.push('/login')
    return
  }
  router.push('/cart')
}

function toggleLanguage() {
  const newLocale = currentLanguage.value === 'ar' ? 'en' : 'ar'
  setLanguage(newLocale)
  open.value = false ;
  window.location.reload()
}
const cart_count = ref(null) ;
const notification_count = ref(null) ;
const getData = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

  try {
    const response = await api.post('/api/home' ,{
            user_id: user.id,

    })
    
    cart_count.value = response.data.cart_count ;
    notification_count.value = response.data.notification_count;
    console.log('Cart count fetched successfully:', response)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
} 
onMounted(() => {
   getData()
})

async function logout() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  try {
    await api.post('/api/logout', {
      lang: currentLanguage.value, // ar أو en
      device_id: localStorage.getItem('device_id') || 'unknown',
      user_id: user.id
    })

    // تنظيف البيانات
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // رجوع لصفحة تسجيل الدخول
    router.push('/login')
    setTimeout(() => {
      location.reload()
    }, 500)
  } catch (error) {
    console.error('Logout failed:', error)
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