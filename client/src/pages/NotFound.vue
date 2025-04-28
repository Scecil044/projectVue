<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div class="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Header section with gradient background -->
        <div class="bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-6 text-white">
          <h1 class="text-4xl font-bold tracking-tight">404</h1>
          <p class="mt-2 text-indigo-100">Oops! Page not found</p>
        </div>
        
        <div class="p-8">
          <div class="space-y-6">
            <!-- Visual element -->
            <div class="relative">
              <div class="h-52 flex items-center justify-center">
                <div class="text-center">
                  <div class="relative inline-block">
                    <!-- Concentric circles design -->
                    <div class="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
                      <div class="w-24 h-24 bg-indigo-200 rounded-full flex items-center justify-center animate-pulse">
                        <div class="w-16 h-16 bg-indigo-300 rounded-full flex items-center justify-center">
                          <span class="text-indigo-700 text-4xl font-bold">?</span>
                        </div>
                      </div>
                    </div>
                    <!-- Exclamation badge -->
                    <div class="absolute -top-3 -right-3 w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      !
                    </div>
                  </div>
                  <p class="mt-6 text-gray-600">We couldn't find the page you're looking for.</p>
                  <p class="text-sm text-gray-500">
                    Redirecting to home in <span class="font-medium text-indigo-600">{{ count }}</span> seconds
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Action buttons -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                class="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-white transition-all duration-300"
                :class="isHovering ? 'bg-indigo-700 scale-105' : 'bg-indigo-600 hover:bg-indigo-700'"
                @click="goToHome"
                @mouseenter="isHovering = true"
                @mouseleave="isHovering = false"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Go to Home</span>
              </button>
              
              <button
                class="flex items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-3 text-base font-medium text-indigo-600 transition-all hover:bg-indigo-50"
                @click="goBack"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Go Back</span>
              </button>
            </div>
            
            <!-- Refresh link -->
            <div class="text-center pt-2">
              <button
                class="inline-flex items-center gap-1 text-sm text-indigo-500 hover:text-indigo-700 transition-colors"
                @click="refreshPage"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
                </svg>
                <span>Refresh page</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const count = ref(15)
  const isHovering = ref(false)
  let timer = null
  
  const goToHome = () => {
    router.push({ name: 'Home' })
  }
  
  const goBack = () => {
    router.go(-1)
  }
  
  const refreshPage = () => {
    window.location.reload()
  }
  
  onMounted(() => {
    timer = setInterval(() => {
      if (count.value > 1) {
        count.value--
      } else {
        clearInterval(timer)
        goToHome()
      }
    }, 1000)
  })
  
  onBeforeUnmount(() => {
    clearInterval(timer)
  })
  </script>