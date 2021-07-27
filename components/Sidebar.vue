<template>
  <div class="sidebar">
    <div class="logo">
      <a href=""><img src="/images/logo.svg" alt="" title="" /></a>
    </div>
    <div class="separator"></div>
    <nav>
      <label>Администрирование</label>
      <ul class="nav d-block">
        <li class="nav-item active">
          <a href="" class="nav-link"><i class="book"></i> Заявки</a>
          <ul class="nav d-block subnav">
            <li class="nav-item">
              <a href="" class="nav-link"><i class="connect"></i> Технологическое подключение</a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link"><i class="questions"></i> Обращения</a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="" class="nav-link"><i class="users"></i> Пользователи</a>
        </li>
        <li class="nav-item">
          <a href="" class="nav-link"><i class="info"></i> Раскрытие</a>
        </li>
        <li class="nav-item">
          <a href="" class="nav-link"><i class="settings"></i> Настройки</a>
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
