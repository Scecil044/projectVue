<template>
  <div class="Login">
    <!-- Login Method Selector -->
    <div class="flex rounded-md shadow-sm mb-6">
      <button
        type="button"
        @click="authMethod = 'credentials'"
        :class="[
          'w-1/2 py-2 px-4 text-sm font-medium text-center rounded-l-md focus:outline-none',
          authMethod === 'credentials' 
            ? 'bg-indigo-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        Email & Password
      </button>
      <button
        type="button"
        @click="authMethod = 'otp'"
        :class="[
          'w-1/2 py-2 px-4 text-sm font-medium text-center rounded-r-md focus:outline-none',
          authMethod === 'otp' 
            ? 'bg-indigo-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        OTP Login
      </button>
    </div>
    
    <!-- Credentials Login Form -->
    <form v-if="authMethod === 'credentials'" @submit.prevent="handleLogin" class="space-y-6">
      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
        <div class="mt-1">
          <input 
            id="email" 
            name="email" 
            type="email" 
            autocomplete="email" 
            required 
            v-model="formData.email"
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <!-- Password Field -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <div class="mt-1 relative">
          <input 
            id="password" 
            name="password" 
            :type="showPassword ? 'text' : 'password'" 
            autocomplete="current-password" 
            required 
            v-model="formData.password"
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
          />
          <button 
            type="button" 
            @click="showPassword = !showPassword" 
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
          >
            <svg 
              v-if="showPassword" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
            <svg 
              v-else 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Remember Me Checkbox & Forgot Password -->
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input 
            id="remember-me" 
            name="remember-me" 
            type="checkbox" 
            v-model="rememberMe"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <!-- Submit Button -->
      <div>
        <button 
          type="submit" 
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg 
            v-if="loading" 
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>
      </div>
    </form>

    <!-- Sign Up Link -->
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">
        Don't have an account?
        <router-link to="/auth/register" class="font-medium text-indigo-600 hover:text-indigo-500">
          Sign up
        </router-link>
      </p>
    </div>
    
    <!-- OTP Login Form -->
    <form v-if="authMethod === 'otp'" @submit.prevent="handleOtpRequest" class="space-y-6">
      <!-- Email Field -->
      <div>
        <label for="otp-email" class="block text-sm font-medium text-gray-700">Email address</label>
        <div class="mt-1">
          <input 
            id="otp-email" 
            name="otp-email" 
            type="email" 
            autocomplete="email" 
            required 
            v-model="otpData.email"
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>
      </div>
      
      <!-- OTP Field (shows only after requesting OTP) -->
      <div v-if="otpSent">
        <label for="otp-code" class="block text-sm font-medium text-gray-700">One-Time Password</label>
        <div class="mt-1">
          <input 
            id="otp-code" 
            name="otp-code" 
            type="text" 
            inputmode="numeric" 
            pattern="[0-9]*" 
            autocomplete="one-time-code" 
            required 
            v-model="otpData.code"
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter the OTP sent to your email"
          />
        </div>
      </div>
      
      <!-- Remember Me Checkbox (for OTP too) -->
      <div v-if="otpSent" class="flex items-center">
        <input 
          id="remember-me-otp" 
          name="remember-me-otp" 
          type="checkbox" 
          v-model="otpData.rememberMe"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label for="remember-me-otp" class="ml-2 block text-sm text-gray-700">
          Remember me
        </label>
      </div>
      
      <!-- Submit Button -->
      <div>
        <button 
          type="submit" 
          :disabled="otpLoading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg 
            v-if="otpLoading" 
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ otpSent ? 'Verify OTP' : 'Send OTP' }}
        </button>
      </div>
      
      <!-- Resend OTP option -->
      <div v-if="otpSent" class="text-center">
        <button 
          type="button" 
          @click="resendOtp" 
          :disabled="resendCountdown > 0"
          class="text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none"
        >
          {{ resendCountdown > 0 ? `Resend OTP in ${resendCountdown}s` : 'Resend OTP' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/userStore";
import { ref, inject, onUnmounted } from "vue";

const router = useRouter();
const userStore = useUserStore();
const setError = inject('setError');

// Authentication method selector
const authMethod = ref('credentials');

// Credentials login data
const formData = ref({
  email: "",
  password: "",
});
const rememberMe = ref(false);
const loading = ref(false);
const showPassword = ref(false);

// OTP login data
const otpData = ref({
  email: "",
  code: "",
  rememberMe: false
});
const otpLoading = ref(false);
const otpSent = ref(false);
const resendCountdown = ref(0);
let countdownTimer = null;

// Clean up timer when component is unmounted
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
});

// Start countdown timer for OTP resend
const startResendCountdown = () => {
  resendCountdown.value = 60; // 60 seconds countdown
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
  countdownTimer = setInterval(() => {
    if (resendCountdown.value > 0) {
      resendCountdown.value--;
    } else {
      clearInterval(countdownTimer);
    }
  }, 1000);
};

// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Credentials login validation
const validateFormData = () => {
  // Email validation
  if (!validateEmail(formData.value.email)) {
    setError("Please enter a valid email address.");
    return false;
  }
  
  // Password validation - at least 6 characters
  if (formData.value.password.length < 6) {
    setError("Password must be at least 6 characters long.");
    return false;
  }
  
  return true;
};

// OTP email validation
const validateOtpEmail = () => {
  if (!validateEmail(otpData.value.email)) {
    setError("Please enter a valid email address.");
    return false;
  }
  return true;
};

// OTP code validation
const validateOtpCode = () => {
  if (!otpData.value.code || otpData.value.code.length < 4) {
    setError("Please enter a valid OTP code.");
    return false;
  }
  return true;
};

// Handle credentials login
const handleLogin = async () => {
  try {
    if (!validateFormData()) return;
    
    loading.value = true;
    setError(null);
    
    const res = await fetch(`/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData.value,
        remember_me: rememberMe.value
      })
    });
    
    const data = await res.json();
    
    if (data.status === 200 || data.statusCode === 200) {
      handleSuccessfulLogin(data, rememberMe.value);
    } else {
      loading.value = false;
      setError(data?.message || "Login Failed! Please check your credentials!");
    }
  } catch (error) {
    loading.value = false;
    setError(error?.message || "Login Failed! Please check your credentials!");
    console.log(error);
  }
};

// Request OTP or verify OTP based on current state
const handleOtpRequest = async () => {
  try {
    // If OTP hasn't been sent yet, request one
    if (!otpSent.value) {
      if (!validateOtpEmail()) return;
      
      otpLoading.value = true;
      setError(null);
      
      const res = await fetch(`/api/users/request-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: otpData.value.email
        })
      });
      
      const data = await res.json();
      
      if (data.status === 200 || data.statusCode === 200) {
        otpSent.value = true;
        startResendCountdown();
        setError(null);
      } else {
        setError(data?.message || "Failed to send OTP. Please try again.");
      }
      
      otpLoading.value = false;
    } 
    // If OTP has been sent, verify it
    else {
      if (!validateOtpCode()) return;
      
      otpLoading.value = true;
      setError(null);
      
      const res = await fetch(`/api/users/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: otpData.value.email,
          otp: otpData.value.code,
          remember_me: otpData.value.rememberMe
        })
      });
      
      const data = await res.json();
      
      if (data.status === 200 || data.statusCode === 200) {
        handleSuccessfulLogin(data, otpData.value.rememberMe);
      } else {
        otpLoading.value = false;
        setError(data?.message || "Invalid OTP. Please try again.");
      }
    }
  } catch (error) {
    otpLoading.value = false;
    setError(error?.message || "An error occurred. Please try again.");
    console.log(error);
  }
};

// Resend OTP function
const resendOtp = async () => {
  try {
    if (resendCountdown.value > 0) return;
    
    otpLoading.value = true;
    setError(null);
    
    const res = await fetch(`/api/users/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: otpData.value.email
      })
    });
    
    const data = await res.json();
    
    if (data.status === 200 || data.statusCode === 200) {
      startResendCountdown();
      otpData.value.code = ""; // Clear previous OTP
      setError(null);
    } else {
      setError(data?.message || "Failed to resend OTP. Please try again.");
    }
    
    otpLoading.value = false;
  } catch (error) {
    otpLoading.value = false;
    setError(error?.message || "Failed to resend OTP. Please try again.");
    console.log(error);
  }
};

// Common function to handle successful login for both methods
const handleSuccessfulLogin = (data, rememberMe) => {
  userStore.setUser(data);
  
  // Handle remember me functionality
  if (rememberMe) {
    // Store tokens in localStorage
    localStorage.setItem("token", data.token.access);
    localStorage.setItem("refreshToken", data.token.refresh);
  } else {
    // Use session storage instead
    sessionStorage.setItem("token", data.token.access);
    sessionStorage.setItem("refreshToken", data.token.refresh);
    
    // Clear localStorage tokens
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }
  
  // Reset loading states
  loading.value = false;
  otpLoading.value = false;
  
  // Navigate to dashboard
  router.push({ name: "Dashboard" });
};
</script>