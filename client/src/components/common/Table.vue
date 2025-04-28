<template>
  <div class="Table overflow-x-auto">
    <table class="w-full table-auto border-collapse text-sm">
      <thead class="">
        <tr>
          <th
            v-for="column in columns"
            :key="column.label"
            class="p-2 text-left border-b"
          >
            {{ column.label }}
          </th>
          <th class="p-2 text-left border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="item._id"
          :class="['border-b', index % 2 === 1 ? '' : '']"
        >
          <td v-for="column in columns" :key="column.key" class="p-2">
            {{ item[column.key] }}
          </td>
          <td class="p-2 flex gap-2">
            <button
              class="text-blue-500 hover:underline"
              @click="$emit('view', item)"
            >
              View
            </button>
            <button
              class="text-green-500 hover:underline"
              @click="$emit('edit', item)"
            >
              Edit
            </button>
            <button
              class="text-red-500 hover:underline"
              @click="$emit('delete', item)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

defineEmits(["view", "edit", "delete"]);
</script>

<style scoped>
/* You can style your table here */
</style>
