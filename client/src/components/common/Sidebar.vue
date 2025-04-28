<template>
  <div 
    :class="[
      'Sidebar', 
      'min-h-screen', 
      'bg-[#1A1A1A]', 
      'dark:bg-gray-900', 
      'border-r', 
      'border-gray-700',
      'transition-all duration-300 ease-in-out',
      isMobileOpen ? 'fixed z-20 left-0' : 'fixed z-20 -left-full lg:left-0',
      isCollapsed ? 'w-20' : 'w-[300px]'
    ]"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-700">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m-11.142 0L12 16.5l4.179-2.25M12 16.5l5.571-3L12 7.5" />
        </svg>
        <h1 
          v-if="!isCollapsed" 
          class="text-white text-xl font-bold ml-2 transition-opacity duration-300"
        >
          Admin Panel
        </h1>
      </div>
      
      <!-- Toggle Collapse Button -->
      <button 
        @click="toggleCollapse" 
        class="text-white focus:outline-none hidden lg:block"
      >
        <svg v-if="isCollapsed" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
        </svg>
      </button>
      
      <!-- Close Button for Mobile -->
      <button 
        @click="closeMobileSidebar" 
        class="text-white focus:outline-none lg:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Menu Items -->
    <div class="mt-4">
      <ul class="space-y-2">
        <li
          v-for="item in menuItems"
          :key="item.name"
          :class="[
            'flex', 
            'items-center', 
            'p-4', 
            'text-gray-300', 
            'hover:bg-gray-700', 
            'cursor-pointer',
            'transition-colors',
            activeItem === item.path ? 'bg-gray-700 text-white' : ''
          ]"
          @click="navigate(item.path)"
        >
          <!-- Icon -->
          <div class="flex items-center justify-center">
            <component :is="item.icon" class="w-6 h-6" />
          </div>
          
          <!-- Label (visible only when not collapsed) -->
          <span 
            v-if="!isCollapsed" 
            class="ml-3 transition-opacity duration-300"
          >
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    
    <!-- Bottom Section -->
    <div class="absolute bottom-0 w-full p-4 border-t border-gray-700">
      <div 
        :class="[
          'flex', 
          'items-center', 
          'text-gray-300', 
          'hover:bg-gray-700', 
          'rounded-md',
          'cursor-pointer',
          'p-4'
        ]"
        @click="logout"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        <span v-if="!isCollapsed" class="ml-3">Logout</span>
      </div>
    </div>
    
    <!-- Mobile Overlay to close sidebar -->
    <div 
      v-if="isMobileOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
      @click="closeMobileSidebar"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue';
import { useRouter } from 'vue-router';

// Icons (using Heroicons SVG directly as components)
const HomeIcon = (props) => h('svg', { 
  xmlns: 'http://www.w3.org/2000/svg', 
  fill: 'none', 
  viewBox: '0 0 24 24', 
  'stroke-width': '1.5', 
  stroke: 'currentColor', 
  class: props.class 
}, [h('path', { 
  'stroke-linecap': 'round', 
  'stroke-linejoin': 'round', 
  d: 'M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' 
})]);

const UsersIcon = (props) => h('svg', { 
  xmlns: 'http://www.w3.org/2000/svg', 
  fill: 'none', 
  viewBox: '0 0 24 24', 
  'stroke-width': '1.5', 
  stroke: 'currentColor', 
  class: props.class 
}, [h('path', { 
  'stroke-linecap': 'round', 
  'stroke-linejoin': 'round', 
  d: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' 
})]);

const SettingsIcon = (props) => h('svg', { 
  xmlns: 'http://www.w3.org/2000/svg', 
  fill: 'none', 
  viewBox: '0 0 24 24', 
  'stroke-width': '1.5', 
  stroke: 'currentColor', 
  class: props.class 
}, [h('path', { 
  'stroke-linecap': 'round', 
  'stroke-linejoin': 'round', 
  d: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z' 
}), h('path', { 
  'stroke-linecap': 'round', 
  'stroke-linejoin': 'round', 
  d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' 
})]);

const ReportsIcon = (props) => h('svg', { 
  xmlns: 'http://www.w3.org/2000/svg', 
  fill: 'none', 
  viewBox: '0 0 24 24', 
  'stroke-width': '1.5', 
  stroke: 'currentColor', 
  class: props.class 
}, [h('path', { 
  'stroke-linecap': 'round', 
  'stroke-linejoin': 'round', 
  d: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' 
})]);

// Menu items
const menuItems = [
  { name: "Dashboard", icon: HomeIcon, path: "/app/dashboard" },
  { name: "Users", icon: UsersIcon, path: "/app/users" },
  { name: "Reports", icon: ReportsIcon, path: "/app/reports" },
  { name: "Settings", icon: SettingsIcon, path: "/app/settings" },
];

// State
const router = useRouter();
const activeItem = ref(router.currentRoute.value.path);
const isCollapsed = ref(false);
const isMobileOpen = ref(false);

// Navigation
const navigate = (path) => {
  activeItem.value = path;
  router.push(path);
  // Close sidebar on mobile after navigation
  if (window.innerWidth < 1024) {
    isMobileOpen.value = false;
  }
};

// Toggle collapsed state
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  // Emit event to parent to adjust layout
  emit('collapse-toggle', isCollapsed.value);
};

// Close mobile sidebar
const closeMobileSidebar = () => {
  isMobileOpen.value = false;
};

// Logout function
const logout = () => {
  console.log('Logging out...');
  router.push('/login');
};

// Set mobile sidebar state based on screen size
onMounted(() => {
  // Check if screen is mobile size
  if (window.innerWidth >= 1024) {
    isMobileOpen.value = false;
  }
  
  // Listen for window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      isMobileOpen.value = false;
    }
  });
});

// Define emits
const emit = defineEmits(['collapse-toggle']);

// Define props & expose for parent component
defineExpose({
  setMobileOpen: (value) => {
    isMobileOpen.value = value;
  }
});
</script>

<style scoped>
/* Add any additional styles here */
</style>