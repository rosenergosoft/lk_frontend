<template>
  <div class="wrapper">
    <div>
      <notifications />
      <div class="row">
        <div class="col-3">
          <Sidebar />
        </div>
        <div class="col-9">
          <div class="row">
            <UserBar />
          </div>
          <Nuxt />
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="loader-background">
      <div class="mx-auto">
        <div class="lds-spinner">
          <div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import UserBar from '../components/UserBar'

export default {
  name: 'Default',
  components: {
    UserBar,
    Sidebar
  }
}
</script>

<style scoped lang="scss">
</style>
