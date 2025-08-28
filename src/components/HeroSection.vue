<template>
  <section class="relative w-full h-80 md:h-96 lg:h-[500px] overflow-hidden">
    <!-- Background Image Slider -->
    <div class="absolute inset-0 w-full h-full" v-if="sliderData.length">
      <Transition name="fade-slide" mode="out-in">
        
        <img
          :key="sliderData[current]?.id"
          :src="sliderData[current]?.image"
          class="object-contain w-full h-full transition-all duration-700"
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
      <div 
        class="mt-8 md:mt-12 flex gap-3 justify-start overflow-x-auto md:flex-wrap md:justify-center scrollbar-hide"
      >
        <button 
          v-for="category in sections" 
          :key="category.id"
           @click="goToCategory(category.id)" 
          class="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium hover:bg-white/30 transition-all border border-white/30 shrink-0"
        >
          {{ category.title }}
        </button>
      </div>

    </div>

    <!-- Map Modal -->
   
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['search', 'to-category'])

const props = defineProps({
  sliderData: {
    type: Array,
    default: () => []
  },
  sections: {
    type: Array,
    default: () => []
  }
})
function goToCategory(categoryId) {
  emit('go-to-category', categoryId)
}
const current = ref(0)
const searchQuery = ref('')

let interval = null

onMounted(() => {
  if (props.sliderData && props.sliderData.length) {
    interval = setInterval(() => {
      current.value = (current.value + 1) % props.sliderData.length
    }, 5000)
  }
})

onUnmounted(() => {
  clearInterval(interval)
})

function performSearch() {
  emit('search', searchQuery.value)
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