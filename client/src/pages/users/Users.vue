<template>
  <div class="Users">
    <Table :data="users" :columns="columns" />
    <button @click="toggleDeleteModal = true">Delete modal</button>
    <DeleteModal
      v-if="toggleDeleteModal"
      title="User"
      @closeDeleteModal="toggleDeleteModal = false"
      @handleDelete="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import DeleteModal from "../../components/common/DeleteModal.vue";
import Table from "../../components/common/Table.vue";
const users = [
  {
    firstName: "Johnstone",
    lastName: "Maina",
    middleName: "Joacheime",
    _id: "909999999898DGG90988876",
    email: "scecil072@gmail.com",
    imageUrl: "",
    phone: "+254888333434",
  },
  {
    firstName: "Johnstone",
    lastName: "keem",
    middleName: "Kennedy",
    _id: "909999999898DGG90988876",
    email: "scecil072@gmail.com",
    imageUrl: "",
    phone: "+254888333434",
  },
];
const columns =[
  {
    key:"firstName",
    label:"First Name"
  },
  {
    key:"lastName",
    label:"Last Name"
  },
  {
    key:"middleName",
    label:"Middle Name"
  },
  {
    key:"email",
    label:"Email"
  },
  {
    key:"phone",
    label:"Phone"
  },
  {
    key:"imageUrl",
    label:"Image"
  },
  {
    key:"_id",
    label:"ID"
  },
]
const toggleDeleteModal = ref(false);

const handleDelete = async () => {
  console.log("handling delete user function");
};
</script>

<style scoped>
/* Your styles here */
</style>
