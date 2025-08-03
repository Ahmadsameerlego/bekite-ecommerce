<template>
  <footer class="bg-white border-t py-4 mt-8">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
      <div class="text-gray-500 text-sm">
        © 2025 Be-Kite. All rights reserved. Created by Be-Kite
      </div>
      <div class="flex gap-4 text-sm">
        <router-link to="/privacy" class="hover:text-primary">Privacy Policy</router-link>
        <router-link to="/terms" class="hover:text-primary">Terms</router-link>
        <router-link to="/contact" class="hover:text-primary">Contact</router-link>
      </div>
    </div>
  </footer>
</template>