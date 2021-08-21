<template>
  <div class="d-flex">
    <div class="d-flex align-items-center mr-4">
      <b-icon-person-fill variant="dark" font-scale="3"></b-icon-person-fill>
    </div>
    <div>
      <template v-if="user.login_type === 'email'">
        <div>
          <span>Вход по Имейл (id:{{ user.id }})</span>
        </div>
      </template>
      <template v-if="user.login_type === 'phys'">
        <div>
          <span>СНИЛС: {{ user.snils }}</span>
        </div>
      </template>
      <template v-if="user.login_type === 'yur'">
        <div>
          <span>ОГРН: {{ user.ogrn }}</span>
        </div>
      </template>
      <template v-if="user.login_type === 'ip'">
        <div>
          <span>ОГРНИП: {{ user.ogrnip }}</span>
        </div>
      </template>
      <div>
        <span>{{ user.email }}</span>
      </div>
      <div v-if="user.phone">
        <span>{{ formattedPhone }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconPersonFill } from 'bootstrap-vue'
export default {
  name: 'User',
  components: {
    BIconPersonFill
  },
  props: {
    user: Object
  },
  computed: {
    formattedPhone () {
      // Filter only numbers from the input
      const cleaned = ('' + this.user.phone).replace(/\D/g, '')

      // Check if the input is of correct length
      const match = cleaned.match(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/)

      if (match) {
        return '+' + match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4] + '-' + match[5]
      }

      return null
    }
  }
}
</script>

<style scoped>

</style>
