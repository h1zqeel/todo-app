<script setup>
import TodoList from '../components/TodoList.vue'
</script>

<template>
  <main>
    <TodoList />
  </main>
</template>

<script>
export default {
  beforeCreate() {
    if (!sessionStorage.getItem('token')) {
      this.$router.push('/login')
    }
  }
}
</script>
