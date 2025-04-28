<template>
  <div :class="['Sidebar', 'min-h-screen', 'bg-[#1A1A1A]', 'w-[300px]' ,'border-r-2', 'border-gray-600']">
    sidebar
    <div class="flex flex-col items-start p-4">
      <h1 class="text-white text-2xl font-bold mb-4">Admin Panel</h1>
      <ul class="space-y-2 w-full">
        <li
          v-for="item in menuItems"
          :key="item.name"
          :class="['flex', 'items-center', 'p-2', 'text-white', 'cursor-pointer','w-full', activeItem === item.path ? 'bg-gray-700' : '']"
          @click="navigate(item.path)"
        >
          <i :class="`fas fa-${item.icon} mr-2`"></i>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import { useRouter } from "vue-router";
const menuItems = [
  { name: "Dashboard", icon: "home", path: "/app/dashboard" },
  { name: "Users", icon: "users", path: "/app/users" },
  { name: "Settings", icon: "settings", path: "/app/settings" },
];


const router = useRouter();
const activeItem = ref(router.currentRoute.value.path);
const navigate = (path) => {
  activeItem.value = path;
  router.push(path);
};
</script>

<style scoped>
/* Your styles here */
</style>