<template>
  <div class="personal-data pl-20">
    <div class="doc-item d-flex align-items-center">
      <div class="type-icon">
        {{ item.type_label }}
      </div>
      <div class="text-content text-truncate">
        {{ item.title }}
        <div v-if="item.deadline" class="notice">
          {{ item.deadline }}
        </div>
      </div>
      <div class="doc-status h5">
        <b-icon icon="check-circle" :class="getStatus()" />
      </div>
    </div>
    <div class="separator" />
  </div>
</template>

<script>
import { BIcon, BIconCheckCircle } from 'bootstrap-vue'
export default {
  name: 'DocItem',
  components: {
    BIcon,
    // eslint-disable-next-line vue/no-unused-components
    BIconCheckCircle
  },
  props: {
    item: {
      type_label: '',
      title: '',
      deadline: ''
    },
    status: {
      type: String,
      default: 'green'
    }
  },
  methods: {
    getStatus () {
      return this.status + '-status'
    }
  }
}
</script>

<style scoped>

</style>
