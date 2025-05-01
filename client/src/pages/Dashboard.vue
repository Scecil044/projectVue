<template>
  <div class="Dashboard">
    dashboard
    <h1 class="text-white">{{ userStore.user ? userStore : "Not logged in" }}</h1>
  </div>
</template>

<script setup>
// Your script here
import { useUserStore } from "../store/userStore";
const userStore = useUserStore();
import { onMounted } from "vue";
</script>

<style scoped>
/* Your styles here */
</style>