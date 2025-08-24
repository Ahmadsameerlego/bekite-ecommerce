<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-900 text-center">من نحن</h1>
        <p class="text-gray-600 text-center mt-2">تعرف على قصة نجاحنا ورحلتنا في عالم الطعام</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <!-- Hero Section -->
      <div class="max-w-4xl mx-auto mb-16">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div class="relative h-64 md:h-80">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
              alt="Be-Kite Team" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <!-- <div class="absolute bottom-6 left-6 text-white">
              <h2 class="text-2xl md:text-3xl font-bold mb-2">Be-Kite</h2>
              <p class="text-lg opacity-90">نحلم بطعام أفضل للجميع</p>
            </div> -->
          </div>
        </div>
      </div>

      <!-- Our Story -->
      <div class="max-w-4xl mx-auto mb-16">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <!-- <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">قصتنا</h2> -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p class="text-gray-700 text-lg leading-relaxed mb-6" v-html="setting?.data?.desc">

              </p>
              
            </div>
            <div class="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-6">
              <div class="text-center">
                <div class="text-4xl font-bold text-orange-600 mb-2">3+</div>
                <div class="text-gray-700 font-semibold">سنوات من الخبرة</div>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-6">
                <div class="text-center">
                  <div class="text-2xl font-bold text-orange-600">500+</div>
                  <div class="text-sm text-gray-600">مطعم شريك</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-orange-600">50K+</div>
                  <div class="text-sm text-gray-600">عميل سعيد</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Our Mission & Vision -->
      <div class="max-w-6xl mx-auto mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Mission -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">مهمتنا</h3>
            </div>
            <p class="text-gray-700 text-lg leading-relaxed text-center" v-html="setting?.mission?.desc">
             
            </p>
          </div>

          <!-- Vision -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">رؤيتنا</h3>
            </div>
            <p class="text-gray-700 text-lg leading-relaxed text-center" v-html="setting?.vision?.desc">
            
            </p>
          </div>
        </div>
      </div>

      <!-- Our Values -->
      <div class="max-w-6xl mx-auto mb-16">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">قيمنا</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Quality -->
            <div class="text-center">
              <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">الجودة</h3>
              <p class="text-gray-600">نحرص على تقديم أفضل جودة في الطعام والخدمة</p>
            </div>

            <!-- Speed -->
            <div class="text-center">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">السرعة</h3>
              <p class="text-gray-600">نضمن وصول طلبك في أسرع وقت ممكن</p>
            </div>

            <!-- Trust -->
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">الثقة</h3>
              <p class="text-gray-600">نبنى علاقات طويلة الأمد مع عملائنا ومطاعمنا</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Section -->
    
      <!-- Contact CTA -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg p-8 text-center text-white">
          <h2 class="text-3xl font-bold mb-4">هل تريد معرفة المزيد؟</h2>
          <p class="text-xl mb-6 opacity-90">تواصل معنا لمعرفة المزيد عن خدماتنا</p>
          <router-link 
            to="/contact" 
            class="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            تواصل معنا
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/api/http";
import { onMounted, ref } from "vue";
const user = JSON.parse(localStorage.getItem("user") || "{}");
const setting = ref(null);
// ✅ جلب بيانات المستخدم
const getData = async () => {
  
  try {
    const response = await api.post("/api/page", {
      lang: "ar",
      user_id: user.id,
      title:'about'
    });

    if (response.data.key === 1) {
      const data = response.data;
      setting.value = data;
      console.log("page data:", setting.value);
    } else {
    }
  } catch (error) {
    console.error("show-user error:", error);
  } 
};

onMounted(() => {
  getData();
});
</script>