<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-900 text-center">شروط الخدمة</h1>
        <p class="text-gray-600 text-center mt-2">آخر تحديث: يناير 2025</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div class="prose prose-lg max-w-none">
            <div v-html="setting?.data?.desc">
            
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/http'

const user = JSON.parse(localStorage.getItem("user") || "{}");
const setting = ref(null);
// ✅ جلب بيانات المستخدم
const getData = async () => {
  
  try {
    const response = await api.post("/api/page", {
      lang: "ar",
      user_id: user.id,
      title:'condition'
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