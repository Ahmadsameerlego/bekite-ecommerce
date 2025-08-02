<template>
  <div class="flex items-center justify-center min-h-[60vh] py-8">
    <form class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">
      <h2 class="text-2xl font-bold mb-2">Login</h2>
      <div>
        <label class="block mb-1 font-medium">Phone Number</label>
        <input type="tel" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-primary" placeholder="e.g. 0501234567" required />
      </div>
      <div>
        <label class="block mb-1 font-medium">Password</label>
        <input type="password" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-primary" required />
      </div>
      <button type="submit" class="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary-dark transition">Login</button>
    </form>
  </div>
</template>

<script setup>
// No logic for now (mock form)
</script>