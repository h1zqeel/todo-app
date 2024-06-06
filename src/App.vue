<script>
import { RouterView } from 'vue-router'

export default {
  components: {
    RouterView
  },
  methods: {
    async logout() {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  data() {
    return {
      isLoggedIn: false
    }
  },
  watch: {
    $route() {
      this.isLoggedIn = !!sessionStorage.getItem('token')
    }
  }
}
</script>

<template>
  <nav v-if="isLoggedIn" class="bg-gray-600 p-4 shadow-md flex flex-row justify-end">
    <button
      class="flex items-center bg-blue-500 text-white text-xl font-bold py-2 px-4 rounded hover:bg-blue-600"
      @click="logout"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
      Logout
    </button>
  </nav>

  <RouterView />
</template>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style> -->
