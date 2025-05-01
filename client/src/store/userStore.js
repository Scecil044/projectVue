import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null,
        accessToken: localStorage.getItem("token") || sessionStorage.getItem("token") || null,
        refreshToken: localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken") || null
    }),
    
    actions: {
        setUser(payload) {
            this.user = payload.user;
            this.accessToken = payload.tokens.accessToken.token;
            this.refreshToken = payload.tokens.refreshToken.token;
        },
        
        removeUser() {
            this.user = null;
            this.accessToken = null;
            this.refreshToken = null;
            // Clear stored tokens
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("refreshToken");
        }
    },

    persist: true
});