import { defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore("user", ()=>{
    const user = ref(null);
    const accessToken = ref(null);
    const refreshToken = ref(null);

    const setUser = (payload)=>{
        user.value = payload.user;
        accessToken.value = payload.token.access;
        refreshToken.value = payload.token.refresh;
    }

    const removeUser = ()=>{
        user.value = null;
        accessToken.value = null;
        refreshToken.value = null;
    }
   
    return {
        user,
        accessToken,
        refreshToken,
        setUser,
        removeUser
    }
});