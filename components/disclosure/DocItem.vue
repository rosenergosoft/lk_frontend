<template>
  <div class="personal-data pl-20" @load="processItems">
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
      <div class="doc-status h5 text-nowrap">
        <b-icon v-if="getStatusValue() === 'green'" icon="check-circle" :class="getStatus()" style="width: 18px;" />
        <b-icon v-if="getStatusValue() === 'red'" icon="exclamation-circle" :class="getStatus()" style="width: 18px;" />
        <b-icon v-if="getActiveColor() === 'green'" icon="eye" :class="getActiveClass()" />
        <b-icon v-if="getActiveColor() === 'red'" icon="eye-slash" :class="getActiveClass()" />
      </div>
    </div>
    <div class="separator" />
  </div>
</template>

<script>
import { BIcon, BIconCheckCircle, BIconExclamationCircle, BIconEye, BIconEyeSlash } from 'bootstrap-vue'
export default {
  name: 'DocItem',
  components: {
    BIcon,
    // eslint-disable-next-line vue/no-unused-components
    BIconCheckCircle,
    // eslint-disable-next-line vue/no-unused-components
    BIconExclamationCircle,
    // eslint-disable-next-line vue/no-unused-components
    BIconEye,
    // eslint-disable-next-line vue/no-unused-components
    BIconEyeSlash
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
    getActiveClass () {
      return this.getActiveColor() + '-status'
    },
    getStatusValue () {
      if (this.item.is_processed) {
        return 'green'
      } else {
        return 'red'
      }
    },
    getActiveColor () {
      if (this.item.is_show) {
        return 'green'
      } else {
        return 'red'
      }
    },
    processItems () {
      this.processYearly()
      this.processSemiannual()
      this.processQuarterly()
      this.processFrequency()
      this.processMonthly()
    },
    processMonthly () {
      if (this.item.frequency === 'monthly') {
        const nextMonth = parseInt(this.$moment().format('MM')) + 1
        let month = 0
        let additionalYear = 0
        if (nextMonth > 12) {
          month = 1
          additionalYear = 1
        } else {
          month = parseInt(nextMonth)
        }
        this.itemVal.deadline = this.item.deadline.replace('[YEAR]', this.$moment().add(additionalYear, 'years').format('yy'))
        this.itemVal.deadline = this.item.deadline.replace('[NEXT_MONTH]', this.$moment(month, 'MM').format('MMMM'))
      }
    },
    processQuarterly () {
      if (this.item.frequency === 'quarterly') {
        const currentMonth = this.$moment().format('MM')
        let nextQuarter
        let additionalYear = 0
        if (currentMonth >= 1 && currentMonth < 4) {
          nextQuarter = 4
        } else if (currentMonth >= 4 && currentMonth < 7) {
          nextQuarter = 7
        } else if (currentMonth >= 7 && currentMonth < 10) {
          nextQuarter = 10
        } else if (currentMonth >= 10) {
          additionalYear = 1
          nextQuarter = 1
        }
        if (this.item.is_processed) {
          if (nextQuarter === 1) {
            nextQuarter = 4
          } else if (nextQuarter === 4) {
            nextQuarter = 7
          } else if (nextQuarter === 7) {
            nextQuarter = 10
          } else if (nextQuarter === 10) {
            additionalYear = 1
            nextQuarter = 1
          }
        }
        this.itemVal.deadline = this.item.deadline.replace('[YEAR]', this.$moment().add(additionalYear, 'years').format('yy'))
        this.itemVal.deadline = this.item.deadline.replace('[NEXT_QUARTER_MONTH]', this.$moment(nextQuarter, 'MM').format('MMMM'))
        this.itemVal.deadline = this.item.deadline.replace('[NEXT_AFTER_QUARTER_MONTH]', this.$moment(nextQuarter, 'MM').add(1, 'months').format('MMMM'))
      }
    },
    processSemiannual () {
      if (this.item.frequency === 'semiannual') {
        const currentMonth = this.$moment().format('MM')
        let additionalYear = 0
        let nextDeadlineMonth
        if (currentMonth >= 6) {
          nextDeadlineMonth = 12
        } else {
          nextDeadlineMonth = 6
        }
        if (this.item.is_processed) {
          if (nextDeadlineMonth === 6) {
            nextDeadlineMonth = 12
          } else {
            nextDeadlineMonth = 6
            additionalYear++
          }
        }
        this.itemVal.deadline = this.item.deadline.replace('[YEAR]', this.$moment().add(additionalYear, 'years').format('yy'))
        this.itemVal.deadline = this.item.deadline.replace('[NEXT_SEMIANNUAL]', this.$moment(nextDeadlineMonth, 'MM').format('MMMM'))
      }
    },
    processFrequency () {
      let frequency = ''
      if (this.item.frequency === 'yearly') {
        frequency = ' (ежегодно) '
      } else if (this.item.frequency === 'quarterly') {
        frequency = ' (ежеквартально) '
      } else if (this.item.frequency === 'semiannual') {
        frequency = ' (каждые полгода) '
      } else if (this.item.frequency === 'monthly') {
        frequency = ' (ежемесячно) '
      }
      if (this.itemVal.deadline.includes('[FREQUENCY]') === false) {
        this.itemVal.deadline += frequency
      } else {
        this.itemVal.deadline = this.itemVal.deadline.replace('[FREQUENCY]', frequency)
      }
    },
    processYearly () {
      if (this.item.frequency === 'yearly') {
        let additionalYear = 0
        if (this.item.is_processed) {
          additionalYear++
        }
        const currentMonth = this.$moment().format('MM')
        if (currentMonth >= this.item.deadline_month) {
          additionalYear++
        }
        this.itemVal.deadline = this.item.deadline.replace('[YEAR]', this.$moment().add(additionalYear, 'years').format('yy'))
      }
    }
  }
}
</script>

<style scoped>

</style>
