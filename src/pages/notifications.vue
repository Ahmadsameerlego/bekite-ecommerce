<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-4">الإشعارات</h1>

    <!-- لو في إشعارات -->
    <div v-if="notifications.length" class="bg-white shadow rounded-lg divide-y">
      <div
        v-for="item in notifications"
        :key="item.id"
        class="flex items-center justify-between p-4 hover:bg-gray-50 transition"
      >
        <div>
          <p class="text-gray-800 font-medium">{{ item.message }}</p>
          <p class="text-sm text-gray-500">{{ item.duration }} • {{ item.date }}</p>
        </div>
        <button
          @click="deleteNotification(item.id)"
          class="text-red-500 hover:text-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 
                 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- لو مفيش إشعارات -->
    <div v-else class="bg-white shadow rounded-lg p-6 text-center text-gray-500">
      لا يوجد إشعارات جديدة
    </div>
  </div>
  
</template>

<script>
import api from "@/api/http"; // لو عندك ملف api.js فيه axios instance

export default {
  data() {
    return {
      notifications: [],
      user: JSON.parse(localStorage.getItem("user") || "{}"),
    };
  },
  methods: {
    async getNotifications() {
      try {
        const response = await api.post("/api/show-notification", {
          lang: "ar",
          user_id: this.user.id,
        });
        this.notifications = response.data.data || [];
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    },
    async deleteNotification(id) {
      try {
        await api.post("/api/delete-notification", {
          lang: "ar",
          notification_id: id,
        });
        this.notifications = this.notifications.filter((n) => n.id !== id);
      } catch (error) {
        console.error("Error deleting notification:", error);
      }
    },
  },
  mounted() {
    this.getNotifications();
  },
};
</script>
