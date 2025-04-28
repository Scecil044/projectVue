<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      <!-- Logo/Branding Area (optional) -->
      <div v-if="showLogo" class="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-center items-center">
        <div class="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center">
          <svg class="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      
      <div class="px-4 py-5 sm:p-6">
        <!-- Header area -->
        <div class="text-center mb-6">
          <h2 class="text-3xl font-extrabold text-gray-900">
            <slot name="header">Welcome</slot>
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            <slot name="subheader">Sign in to your account</slot>
          </p>
        </div>
        
        <!-- Alert system -->
        <div v-if="alert.show" :class="[
          'mb-4 px-4 py-3 rounded relative border',
          alert.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 
          alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 
          'bg-blue-50 border-blue-200 text-blue-700'
        ]" role="alert">
          <div class="flex">
            <!-- Alert icon -->
            <div class="flex-shrink-0">
              <svg v-if="alert.type === 'error'" class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <svg v-if="alert.type === 'success'" class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <svg v-if="alert.type === 'info'" class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <!-- Alert message -->
            <div class="ml-3">
              <p class="text-sm">{{ alert.message }}</p>
            </div>
            <!-- Close button -->
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button @click="clearAlert" class="inline-flex rounded-md p-1.5 focus:outline-none" :class="[
                  alert.type === 'error' ? 'text-red-500 hover:bg-red-100' : 
                  alert.type === 'success' ? 'text-green-500 hover:bg-green-100' : 
                  'text-blue-500 hover:bg-blue-100'
                ]">
                  <span class="sr-only">Dismiss</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Main content area -->
        <div class="mt-6">
          <RouterView @set-error="setAlert" @set-success="setSuccessAlert" @set-info="setInfoAlert"></RouterView>
        </div>
      </div>
      
      <!-- Footer area -->
      <div v-if="$slots.footer" class="bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-200">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { ref, provide, watch } from "vue";

// Logo display option
const showLogo = ref(true);

// Enhanced alert system
const alert = ref({
  show: false,
  type: 'error', // error, success, info
  message: ''
});

// Alert handling functions
const setAlert = (message) => {
  alert.value = {
    show: true,
    type: 'error',
    message
  };
};

const setSuccessAlert = (message) => {
  alert.value = {
    show: true,
    type: 'success',
    message
  };
};

const setInfoAlert = (message) => {
  alert.value = {
    show: true,
    type: 'info',
    message
  };
};

const clearAlert = () => {
  alert.value.show = false;
};

// Auto-dismiss alerts after 5 seconds
const autoHideAlert = (seconds = 5) => {
  if (alert.value.show) {
    setTimeout(() => {
      alert.value.show = false;
    }, seconds * 1000);
  }
};

// Watch for alert changes to trigger auto-hide
watch(
  () => alert.value.show,
  (newVal) => {
    if (newVal) {
      autoHideAlert();
    }
  }
);

// Provide alert handling to child components
provide('setError', setAlert);
provide('setSuccess', setSuccessAlert);
provide('setInfo', setInfoAlert);
provide('clearAlert', clearAlert);
</script>