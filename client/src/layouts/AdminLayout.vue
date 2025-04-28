<template>
  <div class="AdminLayout min-h-screen">
    <div class="flex w-full">
      <Sidebar/>
      <main class="w-full">
        <Header/>
        <section class="p-6">  <!-- Added padding and background -->
          <RouterView></RouterView>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView} from "vue-router";
import Sidebar from "../components/common/Sidebar.vue";
import Header from "../components/common/Header.vue";
</script>

<style scoped>
/* Your styles here */
</style>