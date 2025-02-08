<template>
    <div class="container mt-5">
        <h4>Dashboard</h4>
        <!-- Header -->
        <nav class="navbar p-3" style="background-color: #f8f9fa;">
            <div class="container-fluid d-flex justify-content-between">
                <span class="navbar-brand"></span>
                <button class="btn btn-secondary" @click="logout">Logout</button>
            </div>
        </nav>
    <div>
        <span>Welcome, {{ authStore.user?.name }}</span>

        <div class="d-flex justify-content-between align-items-center">
            <span class="navbar-brand">My Appointments</span>
            <button class="btn btn-primary" @click="showModal = true">+ Book Appointment</button>
        </div>

        <table class="table table-striped mt-3">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date & Time</th>
                     <th>Status</th>
                    <th>Guests</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="appointment in appointments" :key="appointment.id">
                    <td>{{ appointment.title }}</td>
                    <td>{{ appointment.description }}</td>
                    <td>{{ formatDate(appointment.appointment_date) }}</td>
                    <td>{{ appointment.status }}</td>
                    <td>{{ appointment.guests.map(guest => guest.email).join(', ') }}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" @click="cancelAppointment(appointment.id)">Cancel</button>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <!-- Booking Modal -->
        <div v-if="showModal" class="modal fade show d-block" style="background: rgba(0, 0, 0, 0.5);">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Book an Appointment</h5>
                        <button type="button" class="btn-close" @click="showModal = false"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="bookAppointment">
                            <div class="mb-3">
                                <label class="form-label">Title</label>
                                <input v-model="title" type="text" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Description</label>
                                <textarea v-model="description" class="form-control" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Date & Time</label>
                                <input v-model="datetime" type="datetime-local" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Guest Emails (comma-separated)</label>
                                <input v-model="guests" type="text" class="form-control">
                            </div>

                            <div class="mb-3">
                            <label class="form-label">Timezone</label>
                            <select v-model="timezone" class="form-control">
                                <option v-for="tz in timezones" :key="tz" :value="tz">{{ tz }}</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Reminder Time (Minutes Before)</label>
                            <input v-model="reminder_time" type="number" class="form-control" min="5" required>
                        </div>
                            
                            <button type="submit" class="btn btn-success w-100">Book</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Booking Modal -->
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import axios from 'axios';

const authStore = useAuthStore();
const router = useRouter();
const showModal = ref(false);
const title = ref('');
const description = ref('');
const datetime = ref('');
const guests = ref('');
const appointments = ref([]);

const timezone = ref('Asia/Kolkata'); 
const reminder_time = ref(60); 

const timezones = ref([
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Asia/Kolkata",
    "Australia/Sydney"
]);

const fetchAppointments = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/appointments', {
            headers: { Authorization: `Bearer ${authStore.token}` }
        });
        
        appointments.value = response.data.appointments.data;
    } catch (error) {
        console.error(error);
    }
};

const bookAppointment = async () => {
    try {
        await axios.post(
            'http://127.0.0.1:8000/api/auth/appointments',
            {
                title: title.value,
                description: description.value,
                appointment_date: datetime.value,
                timezone : timezone.value,
                reminder_time : reminder_time.value,
                guests: guests.value ? guests.value.split(',').map(email => email.trim()) : []
            },
            { headers: { Authorization: `Bearer ${authStore.token}` } }
        );
        showModal.value = false;
        fetchAppointments();
    } catch (error) {
        console.error(error);
    }
};

const cancelAppointment = async (id) => {
    try {
        await axios.delete(`http://127.0.0.1:8000/api/auth/appointments/${id}`, {
            headers: { Authorization: `Bearer ${authStore.token}` }
        });
        fetchAppointments();
    } catch (error) {
        console.error(error);
    }
};

const logout = () => {
    authStore.logout();
    router.push('/login');
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
};

onMounted(fetchAppointments);
</script>


<!-- <style scoped>
.navbar {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.container {
    max-width: 900px;
    margin: auto;
}
</style> -->

