<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="handleSubmit">
        <TextInput
          id="email"
          label="Email"
          placeholder="Enter your email"
          v-model="email"
          :errorMessage="emailError"
        />
        <TextInput
          id="username"
          label="Username"
          placeholder="Enter your username"
          v-model="username"
          :errorMessage="usernameError"
        />
        <TextInput
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          v-model="password"
          :errorMessage="passwordError"
        />
        <TextInput
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          v-model="confirmPassword"
          :errorMessage="confirmPasswordError"
        />
        <p class="text-red-500 text-xs italic mt-2">{{ serverError }}</p>
        <div class="flex flex-row space-x-1">
          <router-link to="/login">
            <button
              type="button"
              class="w-full bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 hover:bg-blue-700"
            >
              Login
            </button>
          </router-link>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 hover:bg-blue-700"
          >
            Register
          </button>
          <loading-comp :isLoading="processing" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axiosClient from '@/axios'
import TextInput from '../components/TextInput.vue'
import LoadingComp from '../components/LoadingComp.vue'

export default {
  components: {
    TextInput,
    LoadingComp
  },
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      emailError: '',
      usernameError: '',
      passwordError: '',
      confirmPasswordError: '',
      serverError: '',
      processing: false
    }
  },
  methods: {
    async handleSubmit() {
      this.emailError = ''
      this.usernameError = ''
      this.passwordError = ''
      this.confirmPasswordError = ''

      // Basic validation
      if (!this.email.includes('@')) {
        this.emailError = 'Please enter a valid email address'
      }

      if (this.username.length < 3) {
        this.usernameError = 'Username must be at least 3 characters long'
      }

      if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters long'
      }

      if (this.password !== this.confirmPassword) {
        this.confirmPasswordError = 'Passwords do not match'
      }

      if (
        !this.emailError &&
        !this.usernameError &&
        !this.passwordError &&
        !this.confirmPasswordError
      ) {
        this.processing = true
        axiosClient
          .post('/account/register', {
            email: this.email,
            username: this.username,
            password: this.password
          })
          .then((response) => {
            console.log('Registration successful', response)
            sessionStorage.setItem('token', response.data.token)
            this.processing = false
            this.$router.push('/')
          })
          .catch((error) => {
            this.processing = false
            console.error('Registration failed', error)
            this.serverError = error.response.data.message
          })
      }
    }
  }
}
</script>

<style scoped></style>
