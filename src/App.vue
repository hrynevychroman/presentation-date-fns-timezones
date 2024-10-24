<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">
        Date-fns Timezone Examples
      </h1>
      <nav class="mb-8 flex justify-center space-x-4">
        <router-link 
          to="/" 
          class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          Basic Example
        </router-link>
        <router-link 
          to="/examples" 
          class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          Practical Examples
        </router-link>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>