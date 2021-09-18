<template>
  <div>
    <div class="mt-20">
      <div class="text-content d-flex">
        <div>
          <div class="person mr-0 w-40p" />
        </div>
        <div class="pl-3 w-100">
          <div class="d-flex">
            <div v-if="entity.user_id === message.user_id" class="label">
              {{ message.user_profile.first_name }} {{ message.user_profile.last_name }}
            </div>
            <div v-else class="label">
              Администратор
            </div>
            <div class="notice ml-auto">
              {{ $moment.utc(message.updated_at).local().format('HH:mm:ss, DD MMMM yyyy') }}
            </div>
          </div>
          <div>{{ message.message }}</div>
        </div>
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
    entity: {
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
