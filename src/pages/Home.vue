<template>
  <div dir="rtl" class="bg-gray-50 text-right">
    <HeroSection>
      <div class="w-full flex flex-col items-center justify-center px-4">
        <h1 class="text-3xl text-right md:text-5xl font-bold text-white mb-4 drop-shadow">اطلب أشهى الأطباق بسرعة!</h1>
        <SearchBar v-model="search" />
      </div>
    </HeroSection>

    <!-- Menu Section -->
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-4">المنيو</h2>
      <div class="overflow-x-auto pb-2">
        <div class="flex gap-4" :class="sliderClass">
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
    <div v-if="offers.length" class="container mx-auto px-4 py-4">
      <h2 class="text-2xl font-bold mb-4 text-red-600">العروض والخصومات</h2>
      <div class="overflow-x-auto pb-2">
        <div class="flex gap-4" :class="sliderClass">
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

    <!-- Category Sections -->
    <div v-for="cat in categories" :key="cat" class="container mx-auto px-4 py-4">
      <h2 class="text-xl font-bold mb-4">{{ cat }}</h2>
      <div class="overflow-x-auto pb-2">
        <div class="flex gap-4" :class="sliderClass">
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
import SearchBar from '../components/SearchBar.vue'
import ProductCard from '../components/ProductCard.vue'
import ProductModal from '../components/ProductModal.vue'
import CartSidebar from '../components/CartSidebar.vue'
import { useRouter } from 'vue-router'

const search = ref('')
const filteredProducts = computed(() => {
  if (!search.value) return products
  return products.filter(p =>
    p.name.includes(search.value) ||
    p.description.includes(search.value)
  )
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