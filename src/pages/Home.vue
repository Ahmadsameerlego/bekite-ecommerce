<template>
  <div dir="rtl" class="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 text-right">
    <HeroSection />

    <!-- Menu Section -->
    <div class="container mx-auto px-4 py-12">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">المنيو</h2>
        <p class="text-gray-600 text-lg">اكتشف تشكيلة متنوعة من أشهى الأطباق</p>
      </div>
      <div class="overflow-x-auto pb-4">
        <div class="flex gap-6" :class="sliderClass">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @click="openProduct(product)"
            rtl
          />
        </div>
      </div>
    </div>

    <!-- Offers Section -->
    <div v-if="offers.length" class="bg-gradient-to-r from-red-50 to-orange-50 py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4 text-red-600">العروض والخصومات</h2>
          <p class="text-gray-600 text-lg">احصل على أفضل الأسعار</p>
        </div>
        <div class="overflow-x-auto pb-4">
          <div class="flex gap-6" :class="sliderClass">
            <ProductCard
              v-for="product in offers"
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
      <div v-for="cat in categories" :key="cat" class="mb-16">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold mb-2 text-gray-800">{{ cat }}</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
        </div>
        <div class="overflow-x-auto pb-4">
          <div class="flex gap-6" :class="sliderClass">
            <ProductCard
              v-for="product in productsByCategory(cat)"
              :key="product.id"
              :product="product"
              @click="openProduct(product)"
              rtl
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4 text-gray-800">لماذا تختارنا؟</h2>
          <p class="text-gray-600 text-lg">نقدم لك أفضل تجربة طعام</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">توصيل سريع</h3>
            <p class="text-gray-600">خلال 30 دقيقة أو أقل</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">طعام طازج</h3>
            <p class="text-gray-600">مكونات طازجة يومياً</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">جودة عالية</h3>
            <p class="text-gray-600">أعلى معايير الجودة</p>
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
    <CartSidebar :open="cartSidebarOpen" @close="cartSidebarOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { products } from '../mock/products.js'
import HeroSection from '../components/HeroSection.vue'
import ProductCard from '../components/ProductCard.vue'
import ProductModal from '../components/ProductModal.vue'
import CartSidebar from '../components/CartSidebar.vue'
import { useRouter } from 'vue-router'

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
  return products.filter(p => p.category === cat)
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
const addToCart = inject('addToCart')
function handleAddToCart(payload) {
  addToCart(payload)
  cartSidebarOpen.value = true
}
const router = useRouter()
// Responsive slider classes
const sliderClass = computed(() =>
  'min-w-full sm:min-w-[600px] md:min-w-[900px] lg:min-w-[1200px]'
)
</script>