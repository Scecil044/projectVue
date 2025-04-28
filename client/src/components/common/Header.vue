<template>
  <div
    class="header min-w-full p-4 bg-[#1A1A1A] dark:bg-gray-800 border-b border-gray-700 flex items-center justify-between"
  >
    <div class="flex items-center">
      <!-- Menu toggle button (for mobile) -->
      <button
        @click="toggleSidebar"
        class="lg:hidden mr-4 text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <!-- Page title -->
      <h1 class="text-xl font-semibold text-white">{{ pageTitle }}</h1>
    </div>

    <div class="flex items-center space-x-4">
      <!-- Notification Icon -->
      <div class="relative">
        <button
          @click="toggleNotifications"
          class="text-gray-300 hover:text-white focus:outline-none relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
          <span
            v-if="notificationCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
          >
            {{ notificationCount }}
          </span>
        </button>

        <!-- Notification Dropdown -->
        <div
          v-if="showNotifications"
          class="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg py-1 z-10"
        >
          <div
            class="px-4 py-2 text-sm text-white font-semibold border-b border-gray-700"
          >
            Notifications
          </div>
          <div
            v-if="notifications.length === 0"
            class="px-4 py-2 text-sm text-gray-400"
          >
            No new notifications
          </div>
          <div v-else>
            <div
              v-for="(notification, index) in notifications"
              :key="index"
              class="px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer border-b border-gray-700"
            >
              {{ notification.message }}
              <div class="text-xs text-gray-400 mt-1">
                {{ notification.time }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Theme Toggle -->
      <button
        @click="toggleTheme"
        class="text-gray-300 hover:text-white focus:outline-none"
      >
        <svg
          v-if="isDarkMode"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      </button>

      <!-- Profile Dropdown -->
      <div class="relative">
        <button
          @click="toggleProfileMenu"
          class="flex items-center focus:outline-none"
        >
          <img
            :src="userProfileImage"
            class="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
            alt="Profile"
          />
        </button>

        <div
          v-if="showProfileMenu"
          class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10"
        >
          <a
            href="#"
            class="block px-4 py-2 text-sm text-white hover:bg-gray-700"
            @click="navigateToProfile"
          >
            Profile
          </a>
          <a
            href="#"
            class="block px-4 py-2 text-sm text-white hover:bg-gray-700"
            @click="navigateToSettings"
          >
            Settings
          </a>
          <a
            href="#"
            class="block px-4 py-2 text-sm text-white hover:bg-gray-700"
            @click="logout"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useDark, useToggle } from "@vueuse/core";

// For theme toggle
const isDarkMode = useDark();
const toggleDark = useToggle(isDarkMode);

// Router
const router = useRouter();

// Page title based on current route
const pageTitle = computed(() => {
  const path = router.currentRoute.value.path;
  const pathSegments = path.split("/").filter((segment) => segment);
  const lastSegment = pathSegments[pathSegments.length - 1];
  return lastSegment
    ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
    : "Dashboard";
});

// Profile image
const userProfileImage = ref("https://via.placeholder.com/150");

// Profile dropdown state
const showProfileMenu = ref(false);
const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
  if (showProfileMenu.value) {
    showNotifications.value = false;
  }
};

// Notification state
const showNotifications = ref(false);
const notifications = ref([
  { message: "New user registered", time: "5 minutes ago" },
  { message: "Server alert: High CPU usage", time: "1 hour ago" },
  { message: "Payment received from client", time: "3 hours ago" },
]);
const notificationCount = computed(() => notifications.value.length);

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  if (showNotifications.value) {
    showProfileMenu.value = false;
  }
};

// Theme toggle
const toggleTheme = () => {
  toggleDark();
};

// Sidebar toggle (for mobile)
const toggleSidebar = () => {
  // Emit event to parent component
  emit("toggle-sidebar");
};

// Navigation methods
const navigateToProfile = () => {
  router.push("/app/profile");
  showProfileMenu.value = false;
};

const navigateToSettings = () => {
  router.push("/app/settings");
  showProfileMenu.value = false;
};

const logout = () => {
  // Implement logout logic here
  console.log("Logging out...");
  router.push("/auth/login");
};

// Close dropdowns when clicking outside
const closeDropdowns = (event) => {
  const isClickInsideProfileMenu = event.target.closest(".profile-menu");
  const isClickInsideNotifications = event.target.closest(".notifications");

  if (!isClickInsideProfileMenu && showProfileMenu.value) {
    showProfileMenu.value = false;
  }

  if (!isClickInsideNotifications && showNotifications.value) {
    showNotifications.value = false;
  }
};

// Setup event listeners
onMounted(() => {
  document.addEventListener("click", closeDropdowns);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdowns);
});

// Define emits
const emit = defineEmits(["toggle-sidebar"]);
</script>

<style scoped>
/* Add any additional styles here */
</style>
