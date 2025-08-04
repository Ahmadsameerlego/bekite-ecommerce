<template>
  <Transition name="fade-slide">
    <div v-if="open" class="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6 relative animate-fade-in" dir="rtl">
        <button class="absolute top-3 left-3 text-gray-400 hover:text-gray-700 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-all" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded mb-4" />
        <h2 class="text-2xl font-bold mb-1">{{ product.name }}</h2>
        <p class="text-gray-500 mb-2">{{ product.description }}</p>
        <div class="mb-4">
          <span class="font-semibold text-[#f97316]">{{ $t('product.basePrice') }}:</span>
          <span class="ml-2 font-bold text-lg">  {{ product.price.toFixed(2) }} {{ $t('product.currency') }}</span>
        </div>
        <div v-if="product.addOns && product.addOns.length" class="mb-4">
          <div class="font-semibold mb-1 text-[#f97316]">{{ $t('product.addOns') }}:</div>
          <div class="flex flex-col gap-2">
            <label v-for="addOn in product.addOns" :key="addOn.id" class="flex items-center gap-2">
              <input type="checkbox" v-model="selectedAddOns" :value="addOn" />
              <span class="font-semibold text-md ">{{ addOn.name }} (+{{ addOn.price.toFixed(2) }} {{ $t('product.currency') }})</span>
            </label>
          </div>
        </div>
        <div class="flex items-center justify-between mt-6">
          <div class="font-bold text-lg text-[#f97316]">{{ $t('product.total') }}: {{ totalPrice.toFixed(2) }} {{ $t('product.currency') }}</div>
          <button class="bg-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-primary-dark transition" @click="addToCart">{{ $t('product.addToCart') }}</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
const props = defineProps({
  product: { type: Object, required: true },
  open: { type: Boolean, default: false }
})
const emit = defineEmits(['close', 'add-to-cart'])
const selectedAddOns = ref([])
const totalPrice = computed(() => {
  let total = props.product.price
  for (const addOn of selectedAddOns.value) {
    total += addOn.price
  }
  return total
})
function addToCart() {
  emit('add-to-cart', { product: props.product, addOns: selectedAddOns.value, total: totalPrice.value })
  emit('close')
}
watch(() => props.open, (v) => { if (!v) selectedAddOns.value = [] })
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