<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mt-20">
      <div class="text-content d-flex">
        <div class="person w40-square" />
        <div class="">
          <div v-if="appeal.user_id === message.user_id" class="label">
            {{ message.user_profile.first_name }} {{ message.user_profile.last_name }}
          </div>
          <div v-else class="label">
            Администратор
          </div>
          <div>{{ message.message }}</div>
        </div>
      </div>
      <div class="notice">
        {{ $moment(message.created_at).format('hh:ss, DD MMMM yyyy') }}
      </div>
    </div>
    <div class="separator" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      default: null
    },
    appeal: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters([
      'userProfile'
    ])
  }
}
</script>

<style scoped>

</style>
