<template>
  <div class="personal-data pl-20">
    <div class="doc-item d-flex align-items-center">
      <div class="type-icon">
        {{ type }}
      </div>
      <div class="text-content text-truncate">
        {{ content }}
        <div v-if="deadline" class="notice">
          {{ deadline }}
        </div>
      </div>
      <div class="doc-status h5">
        <b-icon icon="check-circle" :class="getStatus()" />
      </div>
    </div>
    <div v-if="!last" class="separator" />
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
    type: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'green'
    },
    deadline: {
      type: String,
      default: ''
    },
    last: {
      type: Boolean,
      default: false
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
