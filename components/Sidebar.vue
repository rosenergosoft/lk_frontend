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
            <b-icon-person-fill /><span class="pl-2">Мой аккаунт</span>
          </NuxtLink>
        </li>
        <li v-if="can('metersData*')" class="nav-item">
          <NuxtLink
            to="/development"
            class="nav-link"
          >
            <b-icon-calculator-fill /><span class="pl-2">Подать показания счетчиков</span>
          </NuxtLink>
        </li>
        <li v-if="can('bills*')" class="nav-item">
          <NuxtLink
            to="/development"
            class="nav-link"
          >
            <b-icon-credit-card /><span class="pl-2">Оплата счетов</span>
          </NuxtLink>
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
            <b-icon-book /><span class="pl-2">Заявки</span>
          </NuxtLink>
          <ul class="nav d-block subnav">
            <li v-if="can('applications_*')" class="nav-item">
              <NuxtLink
                to="/"
                class="nav-link"
                :class="{ active : $nuxt.$route.name === 'index'}"
              >
                <b-icon-card-heading /><span class="pl-2">Технологическое подключение</span>
              </NuxtLink>
            </li>
            <li v-if="can('requests_*')" class="nav-item">
              <NuxtLink
                to="/appeals"
                class="nav-link"
                :class="{ active : $nuxt.$route.name === 'appeals'}"
              >
                <b-icon-vector-pen /><span class="pl-2">Обращения</span>
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
            <b-icon-people-fill /><span class="pl-2">Пользователи</span>
          </NuxtLink>
        </li>
        <li v-if="can('disclosure*')" class="nav-item">
          <NuxtLink
            to="/disclosure"
            class="nav-link"
            :class="{ active : $nuxt.$route.name === 'disclosure'}"
          >
            <b-icon-info-circle /><span class="pl-2">Раскрытие</span>
          </NuxtLink>
        </li>
        <li v-if="can('settings')" class="nav-item">
          <NuxtLink
            to="/settings"
            class="nav-link"
            :class="{ active : $nuxt.$route.name === 'settings'}"
          >
            <b-icon-gear /><span class="pl-2">Настройки</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { BIconBook, BIconCardHeading, BIconVectorPen, BIconPersonFill, BIconCalculatorFill, BIconCreditCard, BIconPeopleFill, BIconInfoCircle, BIconGear } from 'bootstrap-vue'
export default {
  name: 'Sidebar',
  components: {
    BIconBook,
    BIconCardHeading,
    BIconVectorPen,
    BIconPersonFill,
    BIconCalculatorFill,
    BIconCreditCard,
    BIconPeopleFill,
    BIconInfoCircle,
    BIconGear
  }
}
</script>

<style scoped>

</style>
