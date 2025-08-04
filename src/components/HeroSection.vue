<template>
  <section class="relative w-full h-80 md:h-96 lg:h-[500px] overflow-hidden">
    <!-- Background Image Slider -->
    <div class="absolute inset-0 w-full h-full">
      <Transition name="fade-slide" mode="out-in">
        <img
          :key="images[current]"
          :src="images[current]"
          class="object-cover w-full h-full transition-all duration-700"
          alt="Hero image"
        />
      </Transition>
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
    </div>
    
    <!-- Main Content -->
    <div class="relative z-20 h-full flex flex-col justify-center items-center px-4">
     

                <!-- Search Container -->
          <div class="w-full max-w-2xl mx-auto px-2">
            <div class="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 md:p-4">
              <!-- Search Bar -->
              <div class="mb-6">
                <div class="relative">
                  <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <input 
                    v-model="searchQuery"
                    type="text" 
                    :placeholder="$t('hero.searchPlaceholder')"
                    class="w-full pr-12 pl-2 py-2 sm:py-4 md:py-2 text-base sm:text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white/80"
                  />
                </div>
              </div>

              <!-- Search Button -->
              <div class="mt-6">
                <button 
                  @click="performSearch"
                  class="w-1/2 mx-auto bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 sm:py-4 md:py-2 rounded-2xl font-bold text-base sm:text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg flex items-center justify-center gap-3"
                >
                  <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  {{ $t('hero.searchButton') }}
                </button>
              </div>
            </div>
          </div>

      <!-- Quick Categories -->
      <div class="mt-8 md:mt-12 flex flex-wrap justify-center gap-3">
        <button 
          v-for="category in quickCategories" 
          :key="category.id"
          @click="searchByCategory(category.key)"
          class="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium hover:bg-white/30 transition-all border border-white/30"
        >
          {{ $t(`hero.categories.${category.key}`) }}
        </button>
      </div>
    </div>

    <!-- Map Modal -->
    <Transition name="fade-slide">
      <div v-if="showMap" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div class="bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-gray-800">اختر موقع التوصيل</h3>
            <button @click="showMap = false" class="text-gray-400 hover:text-gray-700 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Google Maps Placeholder -->
          <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-64 mb-6 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div class="text-center">
              <div class="text-6xl mb-4">🗺️</div>
              <p class="text-gray-600 font-semibold text-lg">خريطة Google Maps</p>
              <p class="text-sm text-gray-500 mt-2">سيتم إضافة مفتاح Google Maps API</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <input 
              v-model="locationQuery"
              type="text" 
              placeholder="ابحث عن عنوان..."
              class="w-full border-2 border-gray-200 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg"
            />
            
            <div class="space-y-3 max-h-48 overflow-y-auto">
              <div v-for="suggestion in locationSuggestions" :key="suggestion.id" 
                   @click="selectLocation(suggestion)"
                   class="p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all hover:border-primary">
                <div class="font-semibold text-gray-800">{{ suggestion.name }}</div>
                <div class="text-sm text-gray-500">{{ suggestion.address }}</div>
              </div>
            </div>
          </div>
          
          <div class="flex gap-4 mt-6">
            <button 
              @click="confirmLocation"
              class="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
            >
              تأكيد الموقع
            </button>
            <button 
              @click="showMap = false"
              class="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-300 transition-all"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </Transition>
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
const searchQuery = ref('')
const locationQuery = ref('')
const showMap = ref(false)
const selectedLocation = ref(null)

// Quick categories for search
const quickCategories = ref([
  { id: 1, name: '🍔 البرجر', key: 'burger' },
  { id: 2, name: '🍕 البيتزا', key: 'pizza' },
  { id: 3, name: '🥗 السلطات', key: 'salads' },
  { id: 4, name: '🍰 الحلويات', key: 'desserts' },
  { id: 5, name: '☕ المشروبات', key: 'drinks' }
])

// Mock location suggestions
const locationSuggestions = ref([
  { id: 1, name: 'وسط البلد', address: 'عمان، وسط البلد، الأردن' },
  { id: 2, name: 'الصويفية', address: 'عمان، الصويفية، الأردن' },
  { id: 3, name: 'الزرقاء', address: 'الزرقاء، الأردن' },
  { id: 4, name: 'إربد', address: 'إربد، الأردن' }
])

let interval = null

onMounted(() => {
  interval = setInterval(() => {
    current.value = (current.value + 1) % images.length
  }, 5000)
})

onUnmounted(() => {
  clearInterval(interval)
})

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        // Here you would reverse geocode the coordinates
        locationQuery.value = `خط العرض: ${latitude}, خط الطول: ${longitude}`
        showMap.value = true
      },
      (error) => {
        console.error('Error getting location:', error)
        alert('تعذر تحديد موقعك الحالي')
      }
    )
  } else {
    alert('متصفحك لا يدعم تحديد الموقع')
  }
}

function selectLocation(location) {
  selectedLocation.value = location
  locationQuery.value = location.name
}

function confirmLocation() {
  if (selectedLocation.value) {
    // Emit the selected location
    // You can add emit here if needed
    showMap.value = false
  }
}

function performSearch() {
  // Emit search event with query and location
  console.log('Searching for:', searchQuery.value, 'at location:', locationQuery.value)
  // You can add emit here if needed
}

function searchByCategory(categoryName) {
  searchQuery.value = categoryName
  performSearch()
}
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