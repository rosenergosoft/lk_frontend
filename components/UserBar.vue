<template>
  <div class="userBar d-flex">
    <div class="notifications">
      <a href=""><i class="bell" /></a>
    </div>
    <div class="private-messages">
      <a href=""><i class="messages" /></a>
    </div>
    <div class="user-account d-flex">
      <div class="person"></div>
      <div>
        <a href="">
          Владимир Спутников
          <p class="">Менеджер</p>
        </a>
      </div>
    </div>
    <div class="logout-button">
      <a @click="logout"><i class="logout" /></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserBar',
  methods: {
    logout () {
      this.$auth.logout().then(() => {
        this.$auth.redirect('/login')
      })
    }
  }
}
</script>

<style scoped>

</style>
