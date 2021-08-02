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
        <li class="nav-item">
          <a href="/account" class="nav-link"><i class="user" /> Мой аккаунт</a>
        </li>
        <li class="nav-item">
          <a href="/" class="nav-link"><i class="counter" /> Подать показания счетчиков</a>
        </li>
        <li class="nav-item">
          <a href="/" class="nav-link"><i class="payment" /> Оплата счетов</a>
        </li>
      </ul>
      <label>Администрирование</label>
      <ul class="nav d-block">
        <li class="nav-item active">
          <a href="/" class="nav-link"><i class="book" /> Заявки</a>
          <ul class="nav d-block subnav">
            <li class="nav-item">
              <a href="/" class="nav-link"><i class="connect" /> Технологическое подключение</a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link"><i class="questions" /> Обращения</a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <NuxtLink to="/users" class="nav-link">
            <i class="users" />Пользователи
          </NuxtLink>
        </li>
        <li class="nav-item">
          <a href="" class="nav-link"><i class="info" /> Раскрытие</a>
        </li>
        <li class="nav-item">
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
