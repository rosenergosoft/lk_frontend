<template>
  <div class="personal-data pl-20">
    <div class="doc-item d-flex align-items-center">
      <div class="type-icon">
        {{ item.type_label }}
      </div>
      <div class="text-content text-truncate">
        {{ item.title }}
        <div v-if="item.deadline" class="notice">
          {{ itemVal.deadline }}
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
      itemVal: ''
    }
  },
  created () {
    this.itemVal = this.item
    this.processItems()
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
    },
    processItems () {
      if (this.item.is_processed && this.item.frequency === 'yearly') {
        this.itemVal.deadline = this.item.deadline.replace('[YEAR]', this.$moment().add(1, 'years').format('yy'))
      } else {
        this.itemVal.deadline = this.item.deadline.replace('[YEAR]', this.$moment().format('yy'))
      }
      let frequency
      if (this.item.frequency === 'yearly') {
        frequency = ' (ежегодно) '
      } else if (this.item.frequency === 'quarterly') {
        frequency = ' (ежеквартально) '
      } else if (this.item.frequency === 'semiannual') {
        frequency = ' (каждые полгода) '
      } else {
        frequency = ''
      }
      if (this.itemVal.deadline.includes('[FREQUENCY]') !== -1) {
        this.itemVal.deadline = this.itemVal.deadline.replace('[FREQUENCY]', frequency)
      } else {
        this.itemVal.deadline += frequency
      }
    }
  }
}
</script>

<style scoped>

</style>
