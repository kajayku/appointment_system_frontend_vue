import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        errorMessage: null
    }),
    actions: {
        async login(credentials) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/auth/login', credentials);
                this.token = response.data.data.token;
                this.user = response.data.data.user;
                localStorage.setItem('token', this.token);
                return true;
            } catch (error) {
                this.errorMessage = error.response?.data?.message || 'Login failed!';
                return false;
            }
        },
        async register(userData) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/auth/register', userData);
                this.token = response.data.data.token;
                this.user = response.data.data.user;
                localStorage.setItem('token', this.token);
                return true;
            } catch (error) {
                this.errorMessage = error.response?.data?.message || 'Registration failed!';
                return false;
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
        }
    }
});
