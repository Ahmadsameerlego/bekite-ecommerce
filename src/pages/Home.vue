<template>
  <div class="">
    <HeroSection @go-to-category="scrollToCategory" :sliderData="homeData?.data?.sliders" :sections="homeData?.data?.sections"    @search="handleSearch"  />
<div v-if="searchResults" class="container mx-auto px-4 py-8">
  <h2 class="text-center text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">نتائج البحث</h2>

  <!-- <div v-if="searchResults.sections.length">
    <h3 class="text-xl font-semibold mb-2">الأقسام</h3>
    <ul class="mb-6">
      <li v-for="sec in searchResults.sections" :key="sec.id" class="mb-2">
        {{ sec.title }}
      </li>
    </ul>
  </div> -->

  <div v-if="searchResults.services.length">
    <h3 class="text-xl font-semibold mb-2">الخدمات</h3>
    <div class="flex gap-6 overflow-x-auto">
      <ProductCard
        v-for="product in searchResults.services"
        :key="product.id"
        :product="product"
        @click="openProduct(product)"
        rtl
      />
    </div>
  </div>

  <div v-if="!searchResults.sections.length && !searchResults.services.length">
    <p class="text-red-600 text-lg">لا توجد نتائج مطابقة !</p>
  </div>
</div>

    <!-- Menu Section -->
    <div class="container mx-auto px-4 py-12">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{{ $t('home.menu.title') }}</h2>
        <p class="text-gray-600 text-lg">{{ $t('home.menu.subtitle') }}</p>
      </div>
      <div class="overflow-x-auto pb-4">
        <div class="flex gap-6" :class="sliderClass">
          <ProductCard
            v-for="product in homeData?.data?.services"
            :key="product.id"
            :product="product"
            @click="openProduct(product)"
            rtl
          />
        </div>
      </div>
    </div>

    <!-- Offers Section -->
    <div v-if="homeData?.data?.offers.length > 0" class=" py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4 text-red-600">{{ $t('home.offers.title') }}</h2>
          <p class="text-gray-600 text-lg">{{ $t('home.offers.subtitle') }}</p>
        </div>
        <div class="overflow-x-auto pb-4">
          <div class="flex gap-6" :class="sliderClass">
            <ProductCard
              v-for="product in homeData?.data?.offers"
              :key="product.id"
              :product="product"
              :show-discount="true"
              @click="openProduct(product)"
              rtl
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Category Sections -->
    <div class="container mx-auto px-4 py-12">
      <div v-for="cat in homeData?.data?.sections" :key="cat.id" class="mb-16"     :id="'section-' + cat.id">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold mb-2 text-gray-800">{{ cat.title }}</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
        </div>
        <div class="overflow-x-auto pb-4">
          <div v-if="productsByCategory(cat).length" class="flex gap-6" :class="sliderClass">
            <ProductCard
              v-for="product in productsByCategory(cat)"
              :key="product.id"
              :product="product"
              @click="openProduct(product)"
              rtl
            />
          </div>
          <div v-else>
            <p class="text-red-600 text-center text-2xl">{{  $t('NotFoundProducts')  }} !</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4 text-gray-800">{{ $t('home.whyChooseUs.title') }}</h2>
          <p class="text-gray-600 text-lg">{{ $t('home.whyChooseUs.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">{{ $t('home.whyChooseUs.fastDelivery.title') }}</h3>
            <p class="text-gray-600">{{ $t('home.whyChooseUs.fastDelivery.description') }}</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">{{ $t('home.whyChooseUs.freshFood.title') }}</h3>
            <p class="text-gray-600">{{ $t('home.whyChooseUs.freshFood.description') }}</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">{{ $t('home.whyChooseUs.highQuality.title') }}</h3>
            <p class="text-gray-600">{{ $t('home.whyChooseUs.highQuality.description') }}</p>
          </div>
        </div>
      </div>
    </div>

    <ProductModal
      v-if="selectedProduct"
      :open="modalOpen"
      :product="selectedProduct"
      @close="closeModal"
      @add-to-cart="handleAddToCart"
      rtl
    />
    <CartSidebar :open="cartSidebarOpen" @close="cartSidebarOpen = false"  />
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import { products } from '../mock/products.js'
import HeroSection from '../components/HeroSection.vue'
import ProductCard from '../components/ProductCard.vue'
import ProductModal from '../components/ProductModal.vue'
import CartSidebar from '../components/CartSidebar.vue'
import { useRouter } from 'vue-router'
import api from '@/api/http' // ← استدعاء ملف الـ axios
const homeData = ref(null)

const filteredProducts = computed(() => {
  return products
})
const offers = computed(() =>
  products.filter(p => p.discountedPrice && p.originalPrice && p.discountedPrice < p.originalPrice)
)
const categories = computed(() =>
  [...new Set(products.map(p => p.category))]
)
function productsByCategory(cat) {
  return homeData.value?.data?.services.filter(p => p.section_id === cat.id)
}
const selectedProduct = ref(null)
const modalOpen = ref(false)
const cartSidebarOpen = ref(false)
function openProduct(product) {
  selectedProduct.value = product
  modalOpen.value = true
}
function closeModal() {
  modalOpen.value = false
  selectedProduct.value = null
}
const cartData = ref(null)
const addToCart = inject('addToCart')
function handleAddToCart(payload) {
  console.log(payload)
  addToCart(payload)
  cartSidebarOpen.value = true
}
const router = useRouter()
// Responsive slider classes
const sliderClass = computed(() => {
  // Mobile: 1 card, Tablet: 2 cards, Desktop: 3-4 cards
  return 'flex gap-4 md:gap-6  pb-4 '
})



const getData = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

  try {
    const response = await api.post('/api/home' ,{
            user_id: user.id,

    })
    homeData.value = response.data 
    console.log('Home data fetched successfully:', homeData.value.data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
} 

const searchResults = ref(null)

function handleSearch(query) {
  if (!query) {
    searchResults.value = null
    return
  }

  const services = homeData.value?.data?.services.filter(s =>
    s.title?.toLowerCase().includes(query.toLowerCase())
  )

  const sections = homeData.value?.data?.sections.filter(sec =>
    sec.title?.toLowerCase().includes(query.toLowerCase())
  )

  searchResults.value = { services, sections }
}
function scrollToCategory(categoryId) {
  const el = document.getElementById(`section-${categoryId}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}


onMounted(() => {
   getData()
});
</script>