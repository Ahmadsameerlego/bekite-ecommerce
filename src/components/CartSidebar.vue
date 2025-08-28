<template>
  <Transition name="slide-rtl">
    <aside v-if="open" class="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-lg z-50 flex flex-col text-right" dir="rtl">
      <!-- Edit Add-ons Modal -->
      <EditAddOnsModal 
        :open="showEditModal" 
        :item="selectedItem" 
        @close="showEditModal = false"
        @update="updateItemAddOns"
      />
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-xl font-bold">سلة المشتريات</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-700 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 p-4 overflow-y-auto">
        <template v-if="cart_data.length">
          <div v-for="item in cart_data" :key="item.id" class="mb-4 border-b pb-2">
            <div class="flex items-center justify-between mb-1">
              <div class="font-semibold">{{ item.service_title }}</div>
              <div class="flex items-center gap-2">
                <button @click="increase(item.id)" class="bg-gray-200 rounded px-2">+</button>
                <span class="mx-1">{{ item.count }}</span>
                <button @click="decrease(item.id)" class="bg-gray-200 rounded px-2">-</button>
              </div>
               <button @click="removeCartItem(item.id)" class="text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
            </div>
            <div v-if="item.options?.length" class="text-xs text-gray-500 mb-1">إضافات: {{ item.options.map(a => a.title).join('، ') }}</div>
            <div class="flex items-center justify-between">
              <div class="text-sm font-bold text-primary">{{ item.total_with_option }} د.أ</div>
              <button 
                @click="editAddOns(item)" 
                class="text-primary hover:text-primary-dark text-xs flex items-center gap-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                تعديل الإضافات
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <p class="text-gray-500">سلتك فارغة</p>
        </template>
      </div>
      <div class="p-4 border-t">
        <router-link 
          to="/checkout" 
          @click="storeCart"
          class="block w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary-dark transition text-center"
        >
          إتمام الطلب
        </router-link>
      </div>
    </aside>
  </Transition>

  <Toast 
      v-if="toast.visible"
      :message="toast.message"
      :type="toast.type"
      :visible="toast.visible"
    />
</template>

<script setup>
import { inject, onMounted, ref, watch } from 'vue'
import EditAddOnsModal from './EditAddOnsModal.vue'
import Toast from '@/components/Toast.vue'
import api from '@/api/http'

const props = defineProps({
  open: { type: Boolean, default: false },
})

watch(() => props.open, (newVal) => {
  if (newVal) {
    getData()
  }
} )
const toast = ref({ visible: false, message: '', type: 'success' })

const showToast = (msg, type = 'success') => {
  toast.value = { visible: true, message: msg, type }
  setTimeout(() => (toast.value.visible = false), 3000)
}

const emit = defineEmits(['close'])
const cart = inject('cart')
console.log(props.payload, 'dsdsds ')
// const increase = inject('increaseCartItem')
// const decrease = inject('decreaseCartItem')

const showEditModal = ref(false)
const selectedItem = ref(null)

const editAddOns = (item) => {
  selectedItem.value = item
  showEditModal.value = true
}

const updateItemAddOns = (updateData) => {
getData()
console.log(updateData, 'updateData ');
}
const cart_data = ref([])

const providers = ref([])
const getData = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

  try {
    const response = await api.post('/api/show-cart' ,{
            user_id: user.id,

    })
    cart_data.value = response.data.data;
    providers.value = response.data?.providers;
  } catch (error) {
    console.error('Error fetching data:', error)
  }
} 

onMounted(() => {
   getData()
} )
const storeCart = ()=>{
  cart_data.value = localStorage.setItem('cart_data', JSON.stringify(cart.value));
  localStorage.setItem('providers', JSON.stringify(providers.value));
}

// remove cart 
const removeCartItem = async (itemKey) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  try {
    const response = await api.post('/api/update-to-cart' ,{
            user_id: user.id,
        cart_id : itemKey,
        count: 0,
        option_ids : []
    })
    showToast(response.data.msg, 'success')
    setTimeout(() => {
       getData()
    }, 800);
  } catch (error) {
    console.error('Error fetching data:', error)
    showToast('فشل الاتصال بالخادم', 'error')
  }
}

const increase = (itemId) => {
  const item = cart_data.value.find(i => i.id === itemId)
  if (!item) return
  updateCartItemCount(item, item.count + 1)
}

const decrease = (itemId) => {
  const item = cart_data.value.find(i => i.id === itemId)
  if (!item) return
  updateCartItemCount(item, item.count - 1)
}


const updateCartItemCount = async (item, newCount) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!user?.id) {
    showToast('يجب تسجيل الدخول أولاً', 'error')
    return
  }

  try {
    if (newCount <= 0) {
      // نفس removeCartItem
      await api.post('/api/update-to-cart', {
        user_id: user.id,
        cart_id: item.id,
        count: 0,
        option_ids: []
      })
      showToast('تم إزالة العنصر من السلة', 'success')
    } else {
      const response = await api.post('/api/update-to-cart', {
        user_id: user.id,
        cart_id: item.id,
        count: newCount,
        option_ids: JSON.stringify(item.service_options?.map(o => o.id)) || []  // إرسال نفس الإضافات
      })
      showToast('تم تحديث عدد العناصر', 'success')
    }

     getData()

  } catch (error) {
    console.error('Error updating item count:', error)
    showToast('فشل الاتصال بالخادم', 'error')
  }
}
</script>

<style scoped>
.slide-rtl-enter-active, .slide-rtl-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s;
}
.slide-rtl-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-rtl-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>