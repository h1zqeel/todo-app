<template>
  <li class="flex items-center justify-between p-2 border-b">
    <span :class="{ 'line-through task-gray-500': isCompleted }">{{ task }}</span>
    <div>
      <button
        @click="deleteTodo"
        class="hover:bg-gray-200 hover:rounded-2xl p-1 m-1"
        v-tippy="'Delete Todo'"
      >
        <IconDelete />
      </button>
      <button
        @click="toggleCompleted"
        class="hover:bg-gray-200 hover:rounded-2xl p-1 m-1"
        v-tippy="isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'"
      >
        <span v-if="isCompleted">
          <IconCompleted />
        </span>
        <span v-else>
          <IconIncomplete />
        </span>
      </button>
    </div>
  </li>
</template>

<script>
import IconCompleted from '@/components/icons/IconCompleted.vue'
import IconIncomplete from '@/components/icons/IconIncomplete.vue'
import IconDelete from '@/components/icons/IconDelete.vue'

export default {
  components: {
    IconCompleted,
    IconIncomplete,
    IconDelete
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    task: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleCompleted() {
      this.$emit('toggle-completed')
    },
    deleteTodo() {
      this.$emit('delete-todo')
    }
  }
}
</script>

<style scoped></style>
