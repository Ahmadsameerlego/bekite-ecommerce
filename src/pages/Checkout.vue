<template>
  <div
    dir="rtl"
    class="bg-gradient-to-br from-orange-50 to-red-50 text-right min-h-screen"
  >
    <div class="container mx-auto px-4 py-8">
      <h1
        class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
      >
        إتمام الطلب
      </h1>
            <form @submit.prevent="submitOrder" class="space-y-6">

      <div class="grid gap-8 lg:grid-cols-2">
        <!-- Left Column: Forms -->
        <div class="space-y-8">
          <!-- Location Selection -->
          <!-- <form @submit.prevent="" class="space-y-6"> -->
            <div>
              <label class="block mb-3 font-semibold text-gray-700"
                >الموقع علي الخريطه</label
              >

              <div class="space-y-3 max-h-64 overflow-y-auto">
                <div
                  v-for="item in addresses"
                  :key="item.id"
                 @click.stop="openMap(item)"
                  class="p-4 border rounded-xl cursor-pointer transition-all bg-white"
                  :class="
                    item.vip
                      ? 'border-primary bg-orange-50'
                      : 'border-gray-200 hover:bg-gray-50 hover:border-primary'
                  "
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-semibold text-gray-800">
                        {{ item.title }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ item.address || item.lat + ", " + item.lng }}
                      </div>
                    </div>

                    <!-- أيقونة أو Checkbox -->
                    <div>
                            <!-- زرار مع radio -->
                        <label
                          class="flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                          @click.stop="setAddressAsDefault(item)"
                        >
                          <input
                            type="radio"
                            name="defaultAddress"
                            :value="item"
                            v-model="defaultAddress"
                            class="hidden"
                          />
                          <span
                            class="text-sm"
                            :class="{
                              'text-green-600 font-semibold': item.vip === true
                            }"
                          >
                            {{ item.vip === true ? 'العنوان الافتراضي' : 'تعيين كافتراضي' }}
                          </span>
                        </label>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- زرار اضافة عنوان -->
            <button
              @click="openMap()"
              class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
            >
              إضافة عنوان
            </button>
          <!-- </form> -->

          <!-- Customer Delivery Info Form -->
          <div
            class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
          >
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <svg
                class="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              معلومات التوصيل
            </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block mb-3 font-semibold text-gray-700"
                    >الاسم الكامل *</label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    :class="{ 'border-red-500': errors.name }"
                    required
                  />
                  <p v-if="errors.name" class="text-red-500 text-sm mt-2">
                    {{ errors.name }}
                  </p>
                </div>

                <div>
                  <label class="block mb-3 font-semibold text-gray-700"
                    >رقم الهاتف *</label
                  >
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    :class="{ 'border-red-500': errors.phone }"
                    required
                    style="direction: rtl;"
                                    @input="form.phone = form.phone.replace(/\D/g, '')"

                  />
                  <p v-if="errors.phone" class="text-red-500 text-sm mt-2">
                    {{ errors.phone }}
                  </p>
                </div>
              </div>

              <section class="grid  gap-4">
                <div class="h-full">
                  <!-- <div class="">
                    <label class="block mb-3 font-semibold text-gray-700"
                      >العنوان *</label
                    >
                    <textarea
                      v-model="form.address"
                      rows="5"
                      class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      :class="{ 'border-red-500': errors.address }"
                      required
                    ></textarea>
                    <p v-if="errors.address" class="text-red-500 text-sm mt-2">
                      {{ errors.address }}
                    </p>
                  </div> -->
                </div>
                <div class="">
                  <div class="mb-3">
                    <label class="block mb-3 font-semibold text-gray-700"
                      >رقم الشقة (اختياري)</label
                    >
                    <input
                      v-model="form.apartment"
                      type="text"
                      class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label class="block mb-3 font-semibold text-gray-700"
                      >رقم الطابق (اختياري)</label
                    >
                    <input
                      v-model="form.floor"
                      type="text"
                      class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </section>
          </div>
        </div>
  <!-- Delivery Method -->
        <div
          class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
        >
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
            <svg
              class="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              ></path>
            </svg>
            طريقة التوصيل
          </h2>
          <div class="space-y-4 mb-10">
            <label
              class="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all"
              :class="{
                'border-primary bg-orange-50': form.deliveryMethod === 'branch',
              }"
            >
              <input
                v-model="form.deliveryMethod"
                type="radio"
                value="branch"
                class="text-primary focus:ring-primary"
              />
              <div class="mr-4">
                <div class="font-semibold">استلام من الفرع</div>
                <div class="text-sm text-gray-500">استلم طلبك من أقرب فرع</div>
              </div>
            </label>

            <div v-if="form.deliveryMethod==='branch'">
              <div v-for="(provider, index) in providers" :key="index">
                <label class="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all">
                  <input
                    v-model="form.branchProvider"
                    type="radio"
                    :value="provider.id"
                    class="text-primary focus:ring-primary"
                  />
                  <div class="mr-4">
                    <div class="font-semibold">{{ provider.name }}</div>
                    <div class="text-sm text-gray-500">{{ provider.address }}</div>
                  </div>
                </label>
              </div>
            </div>

            <label
              class="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all"
              :class="{
                'border-primary bg-orange-50':
                  form.deliveryMethod === 'delivery',
              }"
            >
              <input
                v-model="form.deliveryMethod"
                type="radio"
                value="delivery"
                class="text-primary focus:ring-primary"
              />
              <div class="mr-4">
                <div class="font-semibold">توصيل</div>
                <div class="text-sm text-gray-500">توصيل سريع من مندوبنا</div>
              </div>
            </label>
          </div>


          <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
            <svg
              class="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              ></path>
            </svg>
            طريقة الدفع
          </h2>
          <div class="space-y-4">
            <label
              class="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all"
              :class="{
                'border-primary bg-orange-50': form.paymentMethod === 'cash',
              }"
            >
              <input
                v-model="form.paymentMethod"
                type="radio"
                value="cash"
                class="text-primary focus:ring-primary"
                checked
              />
              <div class="mr-4">
                <div class="font-semibold">الدفع عند الاستلام</div>
                <div class="text-sm text-gray-500">
                  ادفع نقداً عند استلام الطلب
                </div>
              </div>
            </label>

            <label
              class="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all"
              :class="{
                'border-primary bg-orange-50': form.paymentMethod === 'online',
              }"
            >
              <input
                v-model="form.paymentMethod"
                type="radio"
                value="online"
                class="text-primary focus:ring-primary"
              />
              <div class="mr-4">
                <div class="font-semibold">الدفع الإلكتروني</div>
                <div class="text-sm text-gray-500">
                  ادفع عبر البطاقة الائتمانية
                </div>
              </div>
            </label>

            <!-- <label
              class="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all"
              :class="{
                'border-primary bg-orange-50': form.paymentMethod === 'click',
              }"
            >
              <input
                v-model="form.paymentMethod"
                type="radio"
                value="click"
                class="text-primary focus:ring-primary"
              />
              <div class="mr-4">
                <div class="font-semibold">Click</div>
                <div class="text-sm text-gray-500">ادفع عبر محفظة Click</div>
              </div>
            </label> -->
          </div>
        </div>
        <!-- Right Column: Order Summary -->
        
      </div>

      <section class="grid grid-cols-1 gap-4 mt-5">
      

       

        <div class="space-y-6">
          <div
            class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
          >
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <svg
                class="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
              ملخص الطلب
            </h2>

            <div v-if="cart_data.length" class="space-y-4">
              <div
                v-for="item in cart_data"
                :key="item._key"
                class="border-b border-gray-200 pb-4 last:border-b-0"
              >
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-semibold text-lg">
                      {{ item.service_title }}
                    </h3>
                    <div
                      v-if="item.service_options?.length"
                      class="text-sm text-gray-500"
                    >
                      إضافات:
                      {{ item.service_options?.map((a) => a.title).join("، ") }}
                    </div>
                  </div>
                  <div class="text-left">
                    <span class="font-bold text-lg"
                      >{{ item.total.toFixed(2) }} د.أ</span
                    >
                  </div>
                </div>
                <!-- <div class="flex justify-between text-sm text-gray-500">
                  <span>{{ item.count }} × {{ item.total.toFixed(2) }} د.أ</span>
                </div> -->
              </div>

              <div class="border-t border-gray-200 pt-6 space-y-3">
                <div class="flex justify-between">
                  <span class="text-lg">إجمالي المنتجات:</span>
                  <span class="text-lg font-semibold"
                    >{{ subtotal.toFixed(2) }} د.أ</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-lg">رسوم التوصيل:</span>
                  <span class="text-lg font-semibold"
                    >{{ deliveryFee.toFixed(2) }} د.أ</span
                  >
                </div>

                <div>
                  <label class="block mb-3 font-semibold text-gray-700"
                    >كوبون الخصم
                  </label>
                  <div class="relative flex">
                    <input
                      v-model="form.coupon"
                      type="text"
                      placeholder="ادخل كوبون الخصم ان وجد"
                      class="w-full pr-12 pl-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      required
                    />

                    <button
                      @click="applyCoupon"
                      class="bg-primary text-white px-4 py-2 rounded-xl mx-2"
                    >
                      تطبيق
                    </button>
                  </div>
                  <div v-if="errors.coupon" class="text-red-500 text-xs">
                    {{ errors.coupon }}
                  </div>
                </div>

                <div
                  class="flex justify-between text-xl font-bold text-primary border-t border-gray-200 pt-3"
                >
                  <span>الإجمالي النهائي:</span>
                  <span>{{ totalPrice.toFixed(2) }} د.أ</span>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-12">
              <div class="text-6xl mb-4">🛒</div>
              <p class="text-gray-500 text-lg">لا توجد منتجات في السلة</p>
            </div>
          </div>

          <!-- Actions -->
                         <!-- @click="submitOrder" -->

          <div class="space-y-4">
            <button
              :disabled="!cart_data.length || isSubmitting"
              class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <span
                v-if="isSubmitting"
                class="flex items-center justify-center gap-2"
              >
                <svg
                  class="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                جاري التأكيد...
              </span>
              <span v-else>تأكيد الطلب</span>
            </button>
            <router-link
              to="/cart"
              class="block w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all text-center"
            >
              رجوع إلى السلة
            </router-link>
          </div>
        </div>
      </section>
                  </form>

    </div>
  </div>

  <Transition name="fade-slide">
    <div
      v-if="showMap"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        class="relative bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-800">اختر موقع التوصيل</h3>
          <button
            @click="showMap = false"
            class="text-gray-400 hover:text-gray-700 bg-white rounded-full p-2 shadow-md"
          >
            ✕
          </button>
        </div>
        <GMapAutocomplete
          placeholder="This is a placeholder"
          @place_changed="setPlace"
          :options="{
            bounds: { north: 1.4, south: 1.2, east: 104, west: 102 },
            strictBounds: true,
          }"
        >
        </GMapAutocomplete>
        <!-- خريطة جوجل -->
        <GMapMap
          :center="center"
          :zoom="13"
          style="width: 100%; height: 300px"
          @click="setMarker"
        >
          <GMapMarker
            v-if="marker"
            :position="marker"
            :draggable="true"
            @dragend="updateMarker"
          />
        </GMapMap>

        <div class="mt-4" v-if="!isEditing">
          <input
            v-model="searchBox"
            placeholder="أدخل اسم العنوان (مثلاً: المنزل، المكتب)"
            class="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="flex gap-4 mt-6" v-if="!isEditing">
          <button
            @click="confirmLocation"
            class="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-semibold"
          >
            تأكيد الموقع
          </button>
          <button
            @click="showMap = false"
            class="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-300"
          >
            إلغاء
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
import { ref, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import Toast from "@/components/Toast.vue";
import api from "@/api/http";
const user = JSON.parse(localStorage.getItem("user") || "{}");

const toast = ref({ visible: false, message: "", type: "success" });
const addresses = ref([]);

const showToast = (msg, type = "success") => {
  toast.value = { visible: true, message: msg, type };
  setTimeout(() => (toast.value.visible = false), 3000);
};
const defaultAddress = ref({})
const router = useRouter();

const cart_data = ref(JSON.parse(localStorage.getItem("cart_data") || "[]"));

// Form data
const form = ref({
  name: user?.first_name,
  phone: user?.full_phone,
  address: user?.address || "",
  apartment: "",
  floor: "",
  location: "",
  deliveryMethod: "delivery", // delivery | branch
  paymentMethod: "cash", // cash | transfer | online
  coupon: "",
  branchProvider: null,
});
const discount = ref(0);
const providers = ref([]);  
const subtotal = computed(() => {
  return cart_data.value.reduce((sum, item) => sum + item.total, 0);
});

const totalPrice = computed(() => {
  return subtotal.value + deliveryFee.value - discount.value;
});

const errors = ref({});
const coupon_value = ref("");
const applyCoupon = async () => {
  if (!form.value.coupon.trim()) {
    errors.value.coupon = "يرجى إدخال رمز القسيمة";
    return;
  }
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const body = {
    lang: "ar",
    user_id: user.id,
    code: form.value.coupon,
  };

  try {
    const response = await api.post("/api/check-promo", body);
   if (response.data?.key === 1) {
        showToast(response.data?.msg || "رمز القسيمة صالح", "success");
        coupon_value.value = response.data?.data;

        discount.value = (subtotal.value * response.data.data) / 100;
      } else {
        discount.value = 0; // عشان ما يفضلش مطبق الخصم
        showToast(response.data?.msg || "رمز القسيمة غير صالح", "error");
      }

    // setTimeout(() => {
    //   router.push('/thank-you')
    // }, 1000);
  } catch (error) {
    console.error("Checkout error:", error);
    showToast(
      error.response?.data?.msg || "فشل في التحقق من رمز القسيمة",
      "error"
    );
  } finally {
  }
};
const isSubmitting = ref(false);

const lat = ref(null);
const lng = ref(null);

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat.value = position.coords.latitude;
        lng.value = position.coords.longitude;
        form.value.location = `موقعي الحالي (${lat.value.toFixed(
          4
        )}, ${lng.value.toFixed(4)})`;
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("فشل في تحديد موقعك الحالي");
      }
    );
  } else {
    toast.error("متصفحك لا يدعم تحديد الموقع");
  }
};

// Delivery fee
const deliveryFee = computed(() => {
  switch (form.value.deliveryMethod) {
    case "branch":
      return 0;
    case "delivery":
      return 2.0;
    default:
      return 2.0;
  }
});



// Validation
function validateForm() {
  errors.value = {};

  if (!form.value.name.trim()) {
    errors.value.name = "الاسم مطلوب";
  }
  if (!form.value.phone.trim()) {
    errors.value.phone = "رقم الهاتف مطلوب";
  }
  if (!form.value.address.trim()) {
    errors.value.address = "العنوان مطلوب";
  }
  // if (!form.value.location.trim()) {
  //   errors.value.location = "موقع التوصيل مطلوب";
  // }

  return Object.keys(errors.value).length === 0;
}

// Submit order
async function submitOrder() {
  if (!validateForm()) {
    return;
  }

  if (!cart_data.value.length) {
    toast.error("السلة فارغة");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user, "user");  
  const body = {
    lang: "ar",
    user_id: user.id,
    type: form.value.deliveryMethod === "branch" ? "pickup" : "delivery",
    lat: addresses.value.find((address) => address.vip=== true)?.lat || null,
    lng: addresses.value.find((address) => address.vip=== true)?.lng || null,
    name: form.value.name,
    phone: form.value.phone,
    address: form.value.address,
    apartment_number: form.value.apartment,
    floor_number: form.value.floor,
    sub_total: subtotal.value,
    delivery: deliveryFee.value,
    total_before_promo: subtotal.value + deliveryFee.value,
    total_after_promo: totalPrice.value, // هتعدلها لو فيه خصم
    payment_method: form.value.paymentMethod,
    promo_code: form.value.coupon || "",
    provider_id : form.value.branchProvider || null,
  };

  try {
    isSubmitting.value = true;
    console.log(body, "body");  
    const response = await api.post("/api/store-order", body);

    showToast(response.data?.msg || "تم تأكيد الطلب بنجاح", "success");
    localStorage.removeItem("cart_data");
    localStorage.setItem(
      "order_data",
      JSON.stringify(response.data?.data || {})
    );
    setTimeout(() => {
      router.push("/thank-you");
    }, 1000);
  } catch (error) {
    console.error("Checkout error:", error);
    showToast(error.response?.data?.msg || "فشل في تأكيد الطلب", "error");
  } finally {
    isSubmitting.value = false;
  }
}
const isLoading = ref(false);

const showMap = ref(false);
const locationQuery = ref("");
const searchBox = ref("");
const locationSuggestions = ref([]);
const selectedLocation = ref({
  lat: null,
  lng: null,
  address: "",
  title: "home",
});

const center = ref({ lat: 31.963158, lng: 35.930359 }); // عمان by default

const marker = ref(null);
const selectedAddress = ref("");
const activeTab = ref("profile");
const editingAddress = ref(null);
const isEditing = ref(false);
// فتح الماب (لإضافة أو تعديل)
const openMap = (address = null) => {
  editingAddress.value = address;
  if (address) {
    center.value = { lat: address.lat, lng: address.lng };
    marker.value = { ...center.value };
    selectedAddress.value = address.address;
    isEditing.value = true;
  } else {
    // لو إضافة جديدة -> حاول تجيب اللوكيشن الحالي
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          center.value = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          marker.value = { ...center.value };
        },
        () => {
          center.value = { lat: 31.963158, lng: 35.930359 }; // fallback
        }
      );
    }
    marker.value = null;
    selectedAddress.value = "";
    isEditing.value = false;
  }

  showMap.value = true;

  // لازم نستنى لما الماب تتعمل render قبل ما نحط searchBox
  nextTick(() => initSearchBox());
};


// ✅ جلب بيانات المستخدم
const getAddresses = async () => {
  if (!user?.id) {
    showToast("لم يتم العثور على مستخدم", "error");
    return;
  }

  try {
    isLoading.value = true;
    const response = await api.post("/api/all-addresses", {
      lang: "ar",
      user_id: user.id,
    });

    if (response.data.key === 1) {
      const data = response.data.data;
      addresses.value = data;
    } else {
      showToast(response.data.msg || "فشل في جلب البيانات", "error");
    }
  } catch (error) {
    console.error("show-user error:", error);
    showToast("فشل الاتصال بالخادم", "error");
  } finally {
    isLoading.value = false;
  }
};

const updateMarker = (e) => {
  marker.value = {
    lat: e.latLng.lat(),
    lng: e.latLng.lng(),
  };
  reverseGeocode();
};

// لما يضغط على الماب
const setMarker = (e) => {
  marker.value = {
    lat: e.latLng.lat(),
    lng: e.latLng.lng(),
  };
  reverseGeocode();
};

// دالة تحول الإحداثيات لعنوان نصي
const reverseGeocode = async () => {
  if (!marker.value) return;

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: marker.value }, (results, status) => {
    if (status === "OK") {
      if (results[0]) {
        selectedAddress.value = results[0].formatted_address;
        console.log("Selected address:", results[0].formatted_address);
      } else {
        console.warn("No results found");
      }
    } else {
      console.error("Geocoder failed due to: " + status);
    }
  });
};

// تفعيل Google Places SearchBox

onMounted(() => {
  getAddresses();
  providers.value = JSON.parse(localStorage.getItem('providers') || '[]');  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        center.value = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        marker.value = { ...center.value };
        console.log(marker, "fdfdfdfdfdfdfd");
      },
      (err) => {
        console.warn("Geolocation error:", err);
      }
    );
  }

  const input = document.getElementById("searchBox");
  if (!input) return;

  const searchBox = new google.maps.places.SearchBox(input);
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    if (!places || !places.length) return;
    const place = places[0];
    if (!place.geometry) return;

    center.value = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    marker.value = { ...center.value };
    selectedAddress.value = place.formatted_address;
  });
});
// تأكيد وحفظ العنوان
const confirmLocation = async () => {
  if (!marker.value) {
    showToast("اختر موقعك أولاً", "error");
    return;
  }

  try {
    const response = await api.post("/api/store-address", {
      lang: "ar",
      user_id: user.id,
      title: searchBox.value,
      address: selectedAddress.value,
      lat: marker.value.lat,
      lng: marker.value.lng,
    });

    if (response.data.key === 1) {
      showToast("تم حفظ العنوان بنجاح", "success");
      showMap.value = false;
      getAddresses();
    } else {
      showToast(response.data.msg || "خطأ في الحفظ", "error");
    }
  } catch (err) {
    console.error(err);
    showToast("فشل الاتصال بالخادم", "error");
  }
};

const setAddressAsDefault = async(item)=>{
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!user?.id) {
    showToast('يجب تسجيل الدخول أولاً', 'error')
    return
  }

  try {
    const response = await api.post('/api/update-address', {
      user_id: user.id,
      address_id: item.id,
      vip : true,
      lat: item.lat,
      lng: item.lng,
    })

    if (response.data.key === 1) {
      showToast('تم تعيين العنوان كافتراضي', 'success')
      getAddresses()
    } else {
      showToast(response.data.msg || 'خطأ في تعيين العنوان', 'error')
    }
  } catch (error) {
    console.error('Error setting default address:', error)
    showToast('فشل الاتصال بالخادم', 'error')
  }
}
</script>

<style scoped>
.pac-target-input {
  position: absolute;
  top: 16%;
  z-index: 9999;
  right: 32%;
  border: 1px solid #ccc;
  width: 36% !important;
  height: 31px !important;
}
.p-4{padding: .5rem !important;}
</style>
<!-- <script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// const cart = inject('cart')
const cart_data = ref(JSON.parse(localStorage.getItem('cart_data') || '[]'))
// Form data
const form = ref({
  name: '',
  phone: '',
  address: '',
  apartment: '',
  floor: '',
  location: '',
  deliveryMethod: 'delivery',
  paymentMethod: 'cash'
})

const errors = ref({})
const isSubmitting = ref(false)
const showMap = ref(false)

// Location functions
const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        // Here you would typically reverse geocode the coordinates
        form.value.location = `موقعي الحالي (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
      },
      (error) => {
        console.error('Error getting location:', error)
        alert('فشل في تحديد موقعك الحالي')
      }
    )
  } else {
    alert('متصفحك لا يدعم تحديد الموقع')
  }
}

// Delivery fee based on method
const deliveryFee = computed(() => {
  switch (form.value.deliveryMethod) {
    case 'branch': return 0
    case 'delivery': return 2.0
    case 'shipping': return 5.0
    default: return 2.0
  }
})

// Computed values
const subtotal = computed(() => {
  return cart_data.value.reduce((sum, item) => sum + (item.total ), 0)
})

const totalPrice = computed(() => {
  return subtotal.value + deliveryFee.value
})

// Validation
function validateForm() {
  errors.value = {}

  if (!form.value.name.trim()) {
    errors.value.name = 'الاسم مطلوب'
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = 'رقم الهاتف مطلوب'
  }

  if (!form.value.address.trim()) {
    errors.value.address = 'العنوان مطلوب'
  }

  if (!form.value.location.trim()) {
    errors.value.location = 'موقع التوصيل مطلوب'
  }

  return Object.keys(errors.value).length === 0
}

// Submit order
function submitOrder() {
  if (!validateForm()) {
    return
  }

  if (!cart.value.length) {
    alert('السلة فارغة')
    return
  }

  isSubmitting.value = true

  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false
    router.push('/thank-you')
  }, 2000)
}
</script> -->