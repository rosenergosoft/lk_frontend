<template>
  <div class="userBar d-flex">
    <div class="notifications">
      <a href=""><i class="bell"></i></a>
    </div>
    <div class="private-messages">
      <a href=""><i class="messages"></i></a>
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
      <a href=""><i class="logout"></i></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserBar'
}
</script>

<style scoped>

</style>
