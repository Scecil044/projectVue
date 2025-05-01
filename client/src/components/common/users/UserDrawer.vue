<!-- UserDrawer.vue -->
<template>
    <div>
      <Drawer
        :visible="modelValue"
        @update:visible="$emit('update:modelValue', $event)"
        header="Right Drawer"
        position="right"
      >
        <p>
          Lorem ipsum dolor sit amet...
        </p>
      </Drawer>
    </div>
  </template>
  
  <script setup>
  import Drawer from "primevue/drawer";
  import { defineProps, defineEmits } from "vue";
  
  defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  });
  
  defineEmits(['update:modelValue']);
  </script>