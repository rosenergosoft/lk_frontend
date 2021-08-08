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
        <b-icon v-if="getStatusValue() === 'green'" icon="check-circle" :class="getStatus()" />
        <b-icon v-if="getStatusValue() === 'red'" icon="exclamation-circle" :class="getStatus()" />
      </div>
    </div>
    <div class="separator" />
  </div>
</template>

<script>
import { BIcon, BIconCheckCircle, BIconExclamationCircle } from 'bootstrap-vue'
export default {
  name: 'DocItem',
  components: {
    BIcon,
    // eslint-disable-next-line vue/no-unused-components
    BIconCheckCircle,
    // eslint-disable-next-line vue/no-unused-components
    BIconExclamationCircle
  },
  props: {
    item: {
      type_label: '',
      title: '',
      deadline: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
    getStatus () {
      return this.getStatusValue() + '-status'
    },
    getStatusValue () {
      if (this.item.is_processed) {
        return 'green'
      } else {
        return 'red'
      }
    }
  }
}
</script>

<style scoped>

</style>
