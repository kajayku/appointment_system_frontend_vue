<template>
    <div class="auth-container">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label>Name</label>
          <input v-model="name" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label>Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>
        <div class="mb-3">
        <label>Confirm Password</label>
        <input type="password" v-model="password_confirmation" class="form-control" required>
    </div>
        <button type="submit" class="btn btn-success w-100">Register</button>
      </form>
      <p class="mt-3">Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

const handleRegister = async () => {
    const success = await authStore.register({
        name: name.value,
        email: email.value,
        password: password.value,
        c_password: password_confirmation.value
    });

    if (success) router.push('/dashboard');
};
</script>

<style scoped>
.auth-container {
  width: 400px;
  padding: 20px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  /* text-align: center; */
}
</style>
