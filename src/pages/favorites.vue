<template>
  <div class="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">

   

  
     <!-- Offers Section -->
    <div  class="bg-gradient-to-r from-red-50 to-orange-50 py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4 text-red-600">العناصر المفضلة</h2>
          <p class="text-gray-600 text-lg">استعرض العناصر المفضلة لديك</p>
        </div>
        <div v-if="homeData.length" class="overflow-x-auto pb-4">
          <div class="flex gap-6" :class="sliderClass">
            <ProductCard
              v-for="product in homeData"
              :key="product.id"
              :product="product"
              :show-discount="true"
              @click="openProduct(product)"
              rtl
            />
          </div>
        </div>
        <div v-else>
            <p class="text-red-600 text-center text-2xl">لا توجد عناصر مفضلة لديك !</p>
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
const homeData = ref([])


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
    const response = await api.post('/api/show-favourites' ,{
            user_id: user.id,

    })
    homeData.value = response.data.data ;
    console.log('Home data fetched successfully:', homeData.value.data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
} 
onMounted(() => {
   getData()
});
</script>