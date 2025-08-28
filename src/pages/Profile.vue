<template>
  <div
    dir="rtl"
    class="bg-gradient-to-br from-orange-50 to-red-50 text-right min-h-screen"
  >
    <div class="container mx-auto px-4 py-8">
      <h1
        class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
      >
        الملف الشخصي
      </h1>

      <!-- Tabs -->
      <div class="flex justify-center mb-8">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl">
          <button
            @click="activeTab = 'profile'"
            class="md:px-6 px-3 py-3 rounded-xl font-semibold transition-all"
            :class="
              activeTab === 'profile'
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-600 hover:text-primary'
            "
          >
            البيانات الشخصية
          </button>
          <button
            @click="activeTab = 'addresses'"
            class="md:px-6 px-3 py-3 rounded-xl font-semibold transition-all"
            :class="
              activeTab === 'addresses'
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-600 hover:text-primary'
            "
          >
            عناويني
          </button>
          <button
            @click="activeTab = 'orders'"
            class="md:px-6 px-3 py-3 rounded-xl font-semibold transition-all"
            :class="
              activeTab === 'orders'
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-600 hover:text-primary'
            "
          >
            طلباتي
          </button>
        </div>
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'" class="max-w-2xl mx-auto">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            البيانات الشخصية
          </h2>

          <form @submit.prevent="updateProfile" class="space-y-6">
            <div>
              <label class="block mb-3 font-semibold text-gray-700"
                >الاسم الكامل</label
              >
              <input
                v-model="profile.name"
                type="text"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label class="block mb-3 font-semibold text-gray-700"
                >رقم الهاتف</label
              >
              <input
                v-model="profile.phone"
                type="tel"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                style="direction: rtl"
              />
            </div>

            <div>
              <label class="block mb-3 font-semibold text-gray-700"
                >البريد الإلكتروني</label
              >
              <input
                v-model="profile.email"
                type="email"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <!-- <div>
              <label class="block mb-3 font-semibold text-gray-700"
                >العنوان</label
              >
              <textarea
                v-model="profile.address"
                rows="3"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              ></textarea>
            </div> -->

            <div>
              <label class="block mb-3 font-semibold text-gray-700"
                >الرقم السري</label
              >
              <input
                v-model="profile.password"
                type="password"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              </span>
              <span v-else>حفظ التغييرات</span>
            </button>
          </form>
        </div>
      </div>
      <!-- addresses Tab -->
      <div v-if="activeTab === 'addresses'" class="max-w-2xl mx-auto">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            عناويني
          </h2>

          <form @submit.prevent="" class="space-y-6">
            <div>
              <label class="block mb-3 font-semibold text-gray-700"
                >الموقع علي الخريطه</label
              >

              <div class="space-y-3 max-h-64 overflow-y-auto">
                <div
                  v-for="item in addresses"
                  :key="item.id"
                  @click="openMap(item)"
                  class="p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all hover:border-primary bg-white"
                >
                  <div class="font-semibold text-gray-800">
                    {{ item.title }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ item.address || item.lat + ", " + item.lng }}
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
          </form>
        </div>
      </div>

      <!-- Orders Tab -->
      <div v-if="activeTab === 'orders'" class="max-w-4xl mx-auto">
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
            طلباتي
          </h2>

          <div v-if="orders.length" class="space-y-6">
            <div
              v-for="order in orders"
              :key="order.id"
              class="border-2 border-gray-200 rounded-xl md:p-6 p-3 hover:border-primary transition-all"
            >
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-semibold">طلب #{{ order.id }}</h3>
                  <p class="text-gray-500">{{ order.order_date_time }}</p>
                </div>
                <div class="text-left">
                  <span
                    class="px-3 py-1 rounded-full text-sm font-semibold"
                    :class="getStatusClass(order.status)"
                  >
                    {{ getStatusText(order.status) }}
                  </span>
                </div>
              </div>

              <div class="space-y-2 mb-4">
                <div
                  v-for="item in order.items"
                  :key="item.id"
                  class="flex justify-between"
                >
                  <span>{{ item.service_title }} × {{ item.count }}</span>
                  <span>{{ item.total }} د.أ</span>
                </div>
              </div>

              <div
                class="border-t border-gray-200 pt-4 flex justify-between items-center"
              >
                <div>
                  <span class="font-semibold"
                    >الإجمالي: {{ order.sub_total }} د.أ</span
                  >
                </div>
                <button
                  @click="trackOrder(order.id)"
                  class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all"
                >
                  تتبع الطلب
                </button>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <div class="text-6xl mb-4">📦</div>
            <p class="text-gray-500 text-lg">لا توجد طلبات بعد</p>
            <router-link
              to="/"
              class="inline-block mt-4 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all"
            >
              تصفح المنتجات
            </router-link>
          </div>
        </div>
      </div>
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
            حفظ الموقع
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
import { onMounted, ref } from "vue";
import Toast from "@/components/Toast.vue";
import api from "@/api/http";

const toast = ref({ visible: false, message: "", type: "success" });

const showToast = (msg, type = "success") => {
  toast.value = { visible: true, message: msg, type };
  setTimeout(() => (toast.value.visible = false), 3000);
};

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
const activeTab = ref("orders");
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

// Location functions
const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Here you would typically reverse geocode the coordinates
        form.value.location = `موقعي الحالي (${latitude.toFixed(
          4
        )}, ${longitude.toFixed(4)})`;
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("فشل في تحديد موقعك الحالي");
      }
    );
  } else {
    alert("متصفحك لا يدعم تحديد الموقع");
  }
};
// Profile data
const profile = ref({
  name: "",
  phone: "",
  email: "",
  address: "",
  password: "",
});
const isLoading = ref(false);
// Mock orders data
const orders = ref([]);

const user = JSON.parse(localStorage.getItem("user") || "{}");
// ✅ جلب بيانات المستخدم
const getProfile = async () => {
  if (!user?.id) {
    toast.error("لم يتم العثور على مستخدم");
    return;
  }

  try {
    isLoading.value = true;
    const response = await api.post("/api/show-user", {
      lang: "ar",
      user_id: user.id,
    });

    if (response.data.key === 1) {
      const data = response.data.data;
      profile.value = {
        name: data.first_name || "",
        phone: data.phone || "",
        email: data.email || "",
        address: data.address || "",
      };
    } else {
    }
  } catch (error) {
    console.error("show-user error:", error);
  } finally {
    isLoading.value = false;
  }
};

// ✅ جلب بيانات المستخدم
const getOrders = async () => {
  if (!user?.id) {
    toast.error("لم يتم العثور على مستخدم");
    return;
  }

  try {
    isLoading.value = true;
    const response = await api.post("/api/show-all-orders", {
      lang: "ar",
      user_id: user.id,
    });

    if (response.data.key === 1) {
      const data = response.data.data;
      orders.value = data;
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

const addresses = ref([]);
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

// ✅ تحديث بيانات المستخدم
const updateProfile = async () => {
  if (!user?.id) {
    toast.error("لم يتم العثور على مستخدم");
    return;
  }

  try {
    isLoading.value = true;
    const response = await api.post("/api/update-user", {
      lang: "ar",
      user_id: user.id,
      first_name: profile.value.name,
      phone: profile.value.phone,
      email: profile.value.email,
      address: profile.value.address,
      password: profile.value.password,
    });

    if (response.data.key === 1) {
      showToast(response.data.msg || "تم حفظ البيانات بنجاح", "success");
      // ممكن تحدّث الـ localStorage لو عايز
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          name: profile.value.name,
          phone: profile.value.phone,
          email: profile.value.email,
          address: profile.value.address,
        })
      );
    } else {
      showToast(response.data.msg || "فشل في تحديث البيانات", "error");
    }
  } catch (error) {
    console.error("update-user error:", error);
    showToast("فشل الاتصال بالخادم", "error");
  } finally {
    isLoading.value = false;
  }
};

function trackOrder(orderId) {
  // Navigate to order tracking page
  alert(`سيتم تتبع الطلب ${orderId}`);
}

function getStatusClass(status) {
  switch (status) {
    case "new":
      return "bg-yellow-100 text-yellow-800";
    case "active":
      return "bg-orange-100 text-orange-800";
    case "finish":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusText(status) {
  switch (status) {
    case "new":
      return "في الانتظار";
    case "active":
      return "قيد التحضير";
    case "finish":
      return "تم التوصيل";
    default:
      return "غير محدد";
  }
}
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
    if (status === "OK" && results[0]) {
      selectedAddress.value = results[0].formatted_address;
    }
  });
};

// تفعيل Google Places SearchBox

onMounted(() => {
  getProfile();
  getOrders();
  getAddresses();
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
</script>




<style>
.pac-target-input {
  position: absolute;
  top: 16%;
  z-index: 9999;
  right: 32%;
  border: 1px solid #ccc;
  width: 36% !important;
  height: 31px !important;
}
</style>