<template>
  <div class="AdminLayout">
    <div class="flex w-full">
      <Sidebar/>
      <main class="w-full">
        <Header/>
        <section>
          <slot/>
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