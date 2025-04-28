<template>
  <div class="DeleteModal h-full w-full flex items-center justify-center fixed inset-0 bg-black/50">
    <div class="p-5 bg-white">
        <h1>Delete {{title}}</h1>
        <button @click="$emit(`handleDelete`)">Delete user</button>
        <button @click="closeDeleteModal">Close delete modal</button>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";
defineProps({
    title: {type: String, default: "Item"},
})
const emit =defineEmits(['handleDelete','closeDeleteModal'])
const closeDeleteModal = ()=>{
    emit('closeDeleteModal')
}
</script>

<style scoped>
/* Your styles here */
</style>