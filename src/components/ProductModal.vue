<template>
  <Transition name="fade-slide">
    <div
      v-if="open"
      class="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
    >
      <div
        class="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6 relative animate-fade-in"
        dir="rtl"
      >
        <button
          class="absolute top-3 left-3 text-gray-400 hover:text-gray-700 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-all"
          @click="$emit('close')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-red-500 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-all"
          @click="toggleFavourite"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :class="[
              'h-6 w-6',
              isFav ? 'fill-red-500 stroke-red-500' : 'stroke-gray-500',
            ]"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 
         116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 
         0 010-6.364z"
            />
          </svg>
        </button>
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-48 object-cover rounded mb-4"
        />
        <h2 class="text-2xl font-bold mb-1">{{ product.title }}</h2>
        <p class="text-gray-500 mb-2">{{ product.desc }}</p>
        <div class="mb-4">
          <span class="font-semibold text-[#f97316]"
            >{{ $t("product.basePrice") }}:</span
          >
          <span class="ml-2 font-bold text-lg">
            {{ product.price_with_value }} {{ $t("product.currency") }}</span
          >
        </div>
        <div v-if="product.options && product.options.length" class="mb-4">
          <div class="font-semibold mb-1 text-[#f97316]">
            {{ $t("product.addOns") }}:
          </div>
          <div class="flex flex-col gap-2">
            <label
              v-for="option in product.options"
              :key="option.id"
              class="flex items-center gap-2"
            >
              <input type="checkbox" v-model="selectedAddOns" :value="option" />
              <span class="font-semibold text-md"
                >{{ option.title }} (+{{ option.price_with_value }}
                {{ $t("product.currency") }})</span
              >
            </label>
          </div>
        </div>
        <div class="flex items-center justify-between mt-6">
          <div class="font-bold text-lg text-[#f97316]">
            {{ $t("product.total") }}: {{ totalPrice }}
            {{ $t("product.currency") }}
          </div>
          <button
            class="bg-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-primary-dark transition"
            @click="addToCart"
          >
            {{ $t("product.addToCart") }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
  <Toast
    v-if="toast.visible"
    :message="toast.message"
    :type="toast.type"
    :visible="toast.visible"
  />
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import Toast from "@/components/Toast.vue";
import api from "@/api/http"; // ← ملف axios

const router = useRouter();
const toast = ref({ visible: false, message: "", type: "success" });

const showToast = (msg, type = "success") => {
  toast.value = { visible: true, message: msg, type };
  setTimeout(() => (toast.value.visible = false), 3000);
};

const props = defineProps({
  product: { type: Object, required: true },
  open: { type: Boolean, default: false },
});
const emit = defineEmits(["close", "add-to-cart"]);
const selectedAddOns = ref([]);
const totalPrice = computed(() => {
  let total = Number(props.product.price_with_value);
  for (const addOn of selectedAddOns.value) {
    total += Number(addOn.price_with_value);
  }
  return total;
});

// add to fav 
const isFav = ref(props.product.is_favourite || false)
async function toggleFavourite() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user || !user.id) {
    showToast('يجب تسجيل الدخول أولاً', 'error')
    setTimeout(() => router.push('/login'), 1500)
    return
  }

  try {
    const body = {
      lang: 'ar',
      user_id: user.id,
      service_id: props.product.id
    }

    const { data } = await api.post('/api/add-to-favourite', body)

    if (data.key === 1) {
      isFav.value = !isFav.value
      showToast(data.msg, 'success')
    } else {
      showToast(data.msg || 'حدث خطأ أثناء تعديل المفضلة', 'error')
    }
  } catch (error) {
    console.error('Favourite error:', error)
    showToast('فشل الاتصال بالخادم', 'error')
  }
}

watch(() => props.open, (v) => {
  if (v) {
    selectedAddOns.value = []
    isFav.value = props.product.is_favourite || false
  }
})



async function addToCart() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user || !user.id) {
    showToast("يجب تسجيل الدخول أولاً", "error");
    setTimeout(() => router.push("/login"), 1500);
    return;
  }

  try {
    const option_ids = selectedAddOns.value.map((o) => o.id);
    const body = {
      lang: "ar",
      user_id: user.id,
      service_id: props.product.id,
      count: 1,
      option_ids: JSON.stringify(option_ids),
    };

    const { data } = await api.post("/api/add-to-cart", body);

    if (data.key === 1) {
      showToast(data.msg, "success");
      setTimeout(() => {
        emit("add-to-cart", data.data);
        // emit('add-to-cart', { data, total: totalPrice.value })
        emit("close");
      }, 1000);
    } else {
      showToast(data.msg || "حدث خطأ أثناء إضافة المنتج", "error");
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    showToast("فشل الاتصال بالخادم", "error");
  }
}

watch(
  () => props.open,
  (v) => {
    if (!v) selectedAddOns.value = [];
  }
);
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
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