<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center py-8">
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('register.title') }}</h1>
        <p class="text-gray-600">{{ $t('register.subtitle') }}</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- Full Name -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('register.fullName') }}</label>
          <div class="relative">
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <input 
              v-model="form.fullName"
              type="text" 
              :placeholder="$t('register.fullNamePlaceholder')"
              required
              class="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              :class="{ 'border-red-500': errors.fullName }"
               
            />
          </div>
          <p v-if="errors.fullName" class="text-red-500 text-sm mt-1">{{ errors.fullName }}</p>
        </div>

        <!-- Phone Number -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('register.phone') }}</label>
          <div class="relative">
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <input 
              v-model="form.phone"
              type="tel" 
              :placeholder="$t('register.phonePlaceholder')"
              class="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              :class="{ 'border-red-500': errors.phone }"
              style="direction: rtl;"
              required
                              @input="form.phone = form.phone.replace(/\D/g, '')"

               
            />
          </div>
          <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('register.email') }} <span class="text-red-500 text-sm"> ({{ $t('register.optional') }})</span> </label>
          <div class="relative">
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <input 
              v-model="form.email"
              type="email" 
              :placeholder="$t('register.emailPlaceholder')"
              class="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              :class="{ 'border-red-500': errors.email }"
               
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('register.address') }} <span class="text-red-500 text-sm"> ({{ $t('register.optional') }})</span> </label>
          <div class="relative">
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <input 
              v-model="form.address"
              type="text" 
              :placeholder="$t('register.addressPlaceholder')"
              class="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
               
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('register.password') }}</label>
          <div class="relative">
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <input 
              v-model="form.password"
              required
              :type="showPassword ? 'text' : 'password'"
              :placeholder="$t('register.passwordPlaceholder')"
              class="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              :class="{ 'border-red-500': errors.password }"
               
            />
            <button 
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Confirm Password -->
        <!-- <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('register.confirmPassword') }}</label>
          <div class="relative">
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <input 
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              :placeholder="$t('register.confirmPasswordPlaceholder')"
              class="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              :class="{ 'border-red-500': errors.confirmPassword }"
               
            />
            <button 
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
              </svg>
            </button>
          </div>
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
        </div> -->

        <!-- Terms and Conditions -->
        <div class="flex items-start">
          <input 
            type="checkbox" 
            v-model="form.acceptTerms"
            class="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
            :class="{ 'border-red-500': errors.acceptTerms }"
          />
          <label class="mr-2 text-sm text-gray-600">
            {{ $t('register.acceptTerms') }}
            <router-link to="/terms" class="text-primary hover:text-primary-dark">
              {{ $t('register.terms') }}
            </router-link>
            {{ $t('register.and') }}
            <router-link to="/privacy" class="text-primary hover:text-primary-dark">
              {{ $t('register.privacy') }}
            </router-link>
          </label>
        </div>
        <p v-if="errors.acceptTerms" class="text-red-500 text-sm">{{ errors.acceptTerms }}</p>

        <!-- Submit Button -->
        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ $t('register.creating') }}
          </span>
          <span v-else>{{ $t('register.register') }}</span>
        </button>

        <!-- Divider -->
        <!-- <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">{{ $t('register.or') }}</span>
          </div>
        </div> -->

        <!-- Social Register -->
        <!-- <div class="space-y-3">
          <button type="button" class="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            {{ $t('register.facebook') }}
          </button>
          
          <button type="button" class="w-full flex items-center justify-center gap-3 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            {{ $t('register.google') }}
          </button>
        </div> -->

        <!-- Login Link -->
        <div class="text-center">
          <p class="text-gray-600">
            {{ $t('register.haveAccount') }}
            <router-link to="/login" class="text-primary hover:text-primary-dark font-semibold">
              {{ $t('register.login') }}
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>

  <!-- Toast -->
    <Toast 
      v-if="toast.visible"
      :message="toast.message"
      :type="toast.type"
      :visible="toast.visible"
    />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Toast from '@/components/Toast.vue'
import api from '@/api/http' // ← استدعاء ملف الـ axios

const router = useRouter()

const form = ref({
  fullName: '',
  phone: '',
  email: '',
  password: '',
  address: '',
  confirmPassword: '',
  acceptTerms: false,
  address: '' // عشان الـ API بتطلبها
})

const errors = ref({})
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Toast state
const toast = ref({
  visible: false,
  message: '',
  type: 'success'
})

const showToast = (msg, type = 'success') => {
  toast.value = { visible: true, message: msg, type }
  setTimeout(() => (toast.value.visible = false), 3000)
}

const handleRegister = async () => {
  errors.value = {}

  // Validation بسيطة
  if (!form.value.fullName.trim()) return errors.value.fullName = 'الاسم الكامل مطلوب'
  if (!form.value.phone.trim()) return errors.value.phone = 'رقم الهاتف مطلوب'
  if (!form.value.password.trim()) return errors.value.password = 'كلمة المرور مطلوبة'
  if (form.value.password.length < 6) return errors.value.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
  // if (form.value.password !== form.value.confirmPassword) return errors.value.confirmPassword = 'كلمة المرور غير متطابقة'
  if (!form.value.acceptTerms) return errors.value.acceptTerms = 'يجب الموافقة على الشروط والأحكام'

  isLoading.value = true

  try {
    const { data } = await api.post('/api/register', {
      lang: 'ar',
      user_type: 'client',
      first_name: form.value.fullName,
      phone: form.value.phone,
      email: form.value.email || '',
      address: form.value.address || '',
      password: form.value.password
    })

    if (data.key === 1) {
      // Success
      localStorage.setItem('user', JSON.stringify(data.data))
      localStorage.setItem('token', data.data.api_token)

      showToast(data.msg, 'success')
      setTimeout(() => {
         router.push('/')
      }, 1500);
    } else {
      // Fail
      showToast(data.msg || 'حدث خطأ ما', 'error')
    }
  } catch (error) {
    console.error('Register error:', error)
    showToast('فشل الاتصال بالخادم', 'error')
  } finally {
    isLoading.value = false
  }
}
</script>
