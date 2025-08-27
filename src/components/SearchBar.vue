<template>
  <form @submit.prevent class="w-full max-w-md mx-auto flex items-center bg-white/90 rounded-full shadow px-4 py-2">
    <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
    </svg>
    <input
      v-model="query"
      @input="$emit('update:modelValue', query)"
      type="text"
      placeholder="Search for products..."
      class="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
    />
  </form>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'
const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])
const query = ref(props.modelValue || '')
watch(() => props.modelValue, v => { query.value = v })
</script>