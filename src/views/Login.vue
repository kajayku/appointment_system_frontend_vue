<template>
    <div class="auth-container">
      <h2>Login</h2>
      <div v-if="authStore.errorMessage" class="alert alert-danger">
        {{ authStore.errorMessage }}
    </div>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
      <p class="mt-3">Don't have an account? <router-link to="/register">Register</router-link></p>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '../store/auth';
    import { useRouter } from 'vue-router';

    const authStore = useAuthStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    
    const handleLogin = async () => {
        const success = await authStore.login({ email: email.value, password: password.value });
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
   
  }
  </style>
  


 <!-- <template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header text-center">Login</div>
                    <div class="card-body">
                        <div v-if="authStore.errorMessage" class="alert alert-danger">
                            {{ authStore.errorMessage }}
                        </div>
                        <form @submit.prevent="handleLogin">
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" v-model="email" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input type="password" v-model="password" class="form-control" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
    const success = await authStore.login({ email: email.value, password: password.value });
    if (success) router.push('/dashboard');
};
</script> -->

