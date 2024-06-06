<template>
  <div class="p-6 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-4">Todos</h1>
    <ul>
      <TodoItem
        v-for="(item, index) in todos"
        :key="index"
        :task="item.task"
        :is-completed="item.isCompleted"
        @toggle-completed="toggleCompleted(index)"
        @delete-todo="deleteTodo(index)"
      />
    </ul>
    <input
      v-model="newTodoText"
      @keyup.enter="addTodo"
      placeholder="Add a new todo"
      class="mt-4 p-2 border rounded w-full"
    />
    <div class="flex flex-row justify-end">
      <button
        @click="addTodo"
        class="mt-2 flex items-center bg-blue-500 text-white text-l font-bold py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Todo
      </button>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import TodoItem from './TodoItem.vue'

export default {
  components: {
    TodoItem
  },
  async created() {
    await this.fetchTodos()
  },
  data() {
    return {
      todos: [],
      newTodoText: ''
    }
  },
  methods: {
    async addTodo() {
      if (!this.newTodoText) {
        alert('Please enter a task')
        return
      }
      await axios.post('/todo', {
        task: this.newTodoText,
        isCompleted: false
      })
      this.newTodoText = ''
      await this.fetchTodos()
    },
    async fetchTodos() {
      const response = await axios.get('/todo')
      this.todos = response.data
    },
    async toggleCompleted(index) {
      await axios.put(`/todo/${this.todos[index].id}`, {
        task: this.todos[index].task,
        isCompleted: !this.todos[index].isCompleted
      })

      await this.fetchTodos()
    },
    async deleteTodo(index) {
      await axios.delete(`/todo/${this.todos[index].id}`)
      await this.fetchTodos()
    }
  }
}
</script>

<style scoped></style>
