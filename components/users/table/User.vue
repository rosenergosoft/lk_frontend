<template>
  <div>
    <template v-if="user.login_type === 'email'">
      <span>Вход по Имейл (id:{{ user.id }})</span>
    </template>
    <template v-if="user.login_type === 'phys'">
      <span>СНИЛС: {{ user.snils }}</span>
    </template>
    <template v-if="user.login_type === 'yur'">
      <span>ОГРН: {{ user.ogrn }}</span>
    </template>
    <template v-if="user.login_type === 'ip'">
      <span>ОГРНИП: {{ user.ogrnip }}</span>
    </template>
    <span>{{ user.email }}</span>
    <span v-if="user.phone">{{ user.phone }}</span>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: Object
  }
}
</script>

<style scoped>

</style>
