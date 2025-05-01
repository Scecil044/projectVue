<template>
  <div class="Users">
    <Table :data="users" :columns="columns" @delete="handleDelete" @view="handleView" @edit="handleEdit" />
    <button @click="toggleDeleteModal = true">Delete modal</button>
    <DeleteModal
      v-if="toggleDeleteModal"
      title="User"
      @closeDeleteModal="toggleDeleteModal = false"
      @handleDelete="handleDelete"
    />

    <UserDrawer  v-model="showUserDrawer"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DeleteModal from "../../components/common/DeleteModal.vue";
import Table from "../../components/common/Table.vue";
import UserDrawer from "../../components/common/users/UserDrawer.vue";
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
const showUserDrawer = ref(false);
const toggleDeleteModal = ref(false);

const handleDelete = async () => {
  console.log("handling delete user function");
};
const handleView = async (user) => {
  console.log("handling view user function", user);
};
const handleEdit = async (user) => {
  console.log("handling edit user function", user);
};
</script>

<style scoped>
/* Your styles here */
</style>
