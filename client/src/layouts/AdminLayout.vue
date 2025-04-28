<template>
  <div class="AdminLayout min-h-screen bg-[#1A1A1A] dark:bg-gray-900 text-white">
    <div class="flex w-full">
      <Sidebar ref="sidebarRef" @collapse-toggle="handleSidebarCollapse" />
      <main :class="['w-full transition-all duration-300', sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-[300px]']">
        <Header @toggle-sidebar="toggleMobileSidebar" />
        <section class="p-6">
          <RouterView></RouterView>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import Sidebar from "../components/common/Sidebar.vue";
import Header from "../components/common/Header.vue";

// Track sidebar collapsed state
const sidebarCollapsed = ref(false);
const sidebarRef = ref(null);

// Handle sidebar collapse toggle
const handleSidebarCollapse = (collapsed) => {
  sidebarCollapsed.value = collapsed;
};

// Toggle mobile sidebar
const toggleMobileSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.setMobileOpen(true);
  }
};
</script>

<style scoped>
/* Your styles here */
</style>