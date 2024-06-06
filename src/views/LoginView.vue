<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleSubmit">
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
        <div class="flex flex-row space-x-1">
          <router-link to="/register">
            <button
              type="button"
              class="w-full bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 hover:bg-blue-700"
            >
              Register
            </button>
          </router-link>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 hover:bg-blue-700"
          >
            Login
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
  beforeCreate() {
    if (sessionStorage.getItem('token')) {
      this.$router.push('/')
    }
  },
  data() {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      processing: false
    }
  },
  methods: {
    async handleSubmit() {
      this.usernameError = ''
      this.passwordError = ''
      console.log('Logging in with', this.username, this.password)
      if (this.username.length < 3) {
        this.usernameError = 'Username must be at least 3 characters long'
      }

      if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters long'
      }

      if (!this.usernameError && !this.passwordError) {
        this.processing = true
        axiosClient
          .post('/account/login', {
            username: this.username,
            password: this.password
          })
          .then((response) => {
            console.log('Login successful', response)
            sessionStorage.setItem('token', response.data.token)
            this.processing = false
            this.$router.push('/')
          })
          .catch((error) => {
            this.processing = false
            console.error('Login failed', error)
            this.usernameError = 'Invalid username or password'
          })
      }
    }
  }
}
</script>

<style scoped></style>
