<template>
  <div class="sidebar">
    <div class="logo">
      <NuxtLink to="/">
        <img src="/images/logo.svg" alt="" title="">
      </NuxtLink>
    </div>
    <div class="separator" />
    <nav>
      <label>Управление</label>
      <ul class="nav d-block">
        <li v-if="can('myAccount_edit')" class="nav-item">
          <NuxtLink
            to="/account"
            class="nav-link"
            :class="{ active : $nuxt.$route.name === 'account'}"
          >
            <i class="user" /> Мой аккаунт
          </NuxtLink>
        </li>
        <li v-if="can('metersData*')" class="nav-item">
          <a href="/" class="nav-link"><i class="counter" /> Подать показания счетчиков</a>
        </li>
        <li v-if="can('bills*')" class="nav-item">
          <a href="/" class="nav-link"><i class="payment" /> Оплата счетов</a>
        </li>
      </ul>
      <label>Администрирование</label>
      <ul class="nav d-block">
        <li v-if="can('applications_*') || can('requests_*')" class="nav-item">
          <NuxtLink
            to="/"
            class="nav-link"
            :class="{ active : $nuxt.$route.name === 'index' || $nuxt.$route.name === 'appeals' }"
          >
            <i class="book" /> Заявки
          </NuxtLink>
          <ul class="nav d-block subnav">
            <li v-if="can('applications_*')" class="nav-item">
              <NuxtLink
                to="/"
                class="nav-link"
                :class="{ active : $nuxt.$route.name === 'index'}"
              >
                <i class="connect" /> Технологическое подключение
              </NuxtLink>
            </li>
            <li v-if="can('requests_*')" class="nav-item">
              <NuxtLink
                to="/appeals"
                class="nav-link"
                :class="{ active : $nuxt.$route.name === 'appeals'}"
              >
                <i class="questions" /> Обращения
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li v-if="can('users*')" class="nav-item">
          <NuxtLink
            to="/users"
            class="nav-link"
            :class="{ active : $nuxt.$route.name === 'users'}"
          >
            <i class="users" />Пользователи
          </NuxtLink>
        </li>
        <li v-if="can('disclosure*')" class="nav-item">
          <NuxtLink
            to="/disclosure"
            class="nav-link"
            :class="{ active : $nuxt.$route.name === 'disclosure'}"
          >
            <i class="info" /> Раскрытие
          </NuxtLink>
        </li>
        <li v-if="can('settings')" class="nav-item">
          <a href="" class="nav-link"><i class="settings" /> Настройки</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>

</style>
