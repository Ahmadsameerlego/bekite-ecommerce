<template>
  <div dir="rtl" class="bg-gray-50 text-right min-h-screen">
    <!-- Edit Add-ons Modal -->
    <EditAddOnsModal 
      :open="showEditModal" 
      :item="selectedItem" 
      @close="showEditModal = false"
      @update="updateItemAddOns"
    />
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">سلة المشتريات</h1>
      
      <template v-if="cart_data.length">
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div v-for="item in cart_data" :key="item._key" class="flex items-center justify-between py-4 border-b last:border-b-0">
            <div class="flex items-center gap-4">
              <img :src="item.service_image" :alt="item.service_title" class="w-16 h-16 object-cover rounded" />
              <div>
                <h3 class="font-semibold text-lg">{{ item.service_title }}</h3>
                <div v-if="item.service_options?.length" class="text-sm text-gray-500">إضافات: {{ item.service_options.map(a => a.title).join('، ') }}</div>
                <div class="text-primary font-bold">{{ item.total.toFixed(2) }} د.أ</div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <button @click="decrease(item.id)" class="bg-gray-200 rounded px-3 py-1">-</button>
                <span class="mx-2 font-semibold">{{ item.count }}</span>
                <button @click="increase(item.id)" class="bg-gray-200 rounded px-3 py-1">+</button>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  @click="editAddOns(item)" 
                  class="text-primary hover:text-primary-dark text-sm flex items-center gap-1 px-3 py-1 rounded border border-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  تعديل الإضافات
                </button>
                <button @click="removeCartItem(item.id)" class="text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-xl font-bold">الإجمالي:</span>
            <span class="text-2xl font-bold text-primary">{{ totalPrice.toFixed(2) }} د.أ</span>
          </div>
          <button class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition text-lg">
            <router-link @click="storeCart" to="/checkout" class="block w-full h-full flex items-center justify-center">
              إتمام الطلب
            </router-link>
          </button>
        </div>
      </template>
      
      <template v-else>
        <div class="bg-white rounded-xl shadow-lg p-12 text-center">
          <div class="text-6xl mb-4">🛒</div>
          <h2 class="text-2xl font-bold mb-2">سلتك فارغة</h2>
          <p class="text-gray-500 mb-6">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
          <router-link to="/" class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition">
            تصفح المنتجات
          </router-link>
        </div>
      </template>
    </div>
  </div>
  <Toast 
      v-if="toast.visible"
      :message="toast.message"
      :type="toast.type"
      :visible="toast.visible"
    />
</template>

<script setup>
import { inject, computed, ref , onMounted} from 'vue'
import EditAddOnsModal from '../components/EditAddOnsModal.vue'
import Toast from '@/components/Toast.vue'

import api from '@/api/http'
const cart = inject('cart')
// const increase = inject('increaseCartItem')
// const decrease = inject('decreaseCartItem')
// const remove = inject('removeCartItem')
const toast = ref({ visible: false, message: '', type: 'success' })

const showToast = (msg, type = 'success') => {
  toast.value = { visible: true, message: msg, type }
  setTimeout(() => (toast.value.visible = false), 3000)
}

const showEditModal = ref(false)
const selectedItem = ref(null)

const editAddOns = (item) => {
  selectedItem.value = item
  showEditModal.value = true
}

const updateItemAddOns = (updateData) => {
  getData();
}

const cart_data = ref([]);
const providers = ref([])
const totalPrice = computed(() => {
  return cart_data.value.reduce((sum, item) => sum + item.total , 0)
})

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
      getData();
    }, 800);
  } catch (error) {
    console.error('Error fetching data:', error)
    showToast('فشل الاتصال بالخادم', 'error')
  }
}

// update cart 

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
      await api.post('/api/update-to-cart', {
        user_id: user.id,
        cart_id: item.id,
        count: newCount,
        option_ids: JSON.stringify(item.service_options?.map(o => o.id)) || []  // إرسال نفس الإضافات
      })
      showToast('تم تحديث عدد العناصر', 'success')
    }

    setTimeout(() => {
      getData()
    }, 500)
  } catch (error) {
    console.error('Error updating item count:', error)
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

const storeCart = ()=>{
  localStorage.setItem('cart_data', JSON.stringify(cart_data.value));
  localStorage.setItem('providers', JSON.stringify(providers.value));
}
onMounted(() => {
   getData()
});
</script> 