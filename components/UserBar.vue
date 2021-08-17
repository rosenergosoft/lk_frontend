<template>
  <div class="userBar d-flex">
    <div v-if="isSuper" class="form-group mr-4">
      <select v-model="current_client" class="form-control" @change="switchClient">
        <option v-for="(value, key) of clients" :key="key" :value="key">
          {{ value }}
        </option>
      </select>
    </div>
    <div class="notifications">
      <a href=""><i class="bell" /></a>
    </div>
    <div class="private-messages">
      <a href=""><i class="messages" /></a>
    </div>
    <div class="user-account d-flex">
      <div class="person" />
      <div>
        <NuxtLink to="/account">
          Владимир Спутников
          <p v-if="isSuper" class="">
            Супер админ
          </p>
          <p v-if="isExecutive && !isSuper" class="">
            Админ
          </p>
          <p v-if="isCustomer" class="">
            Пользователь
          </p>
          <p v-if="isVendor" class="">
            Поставщик
          </p>
        </NuxtLink>
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
  data () {
    return {
      clients: [],
      current_client: null
    }
  },
  mounted () {
    if (this.isSuper) {
      this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/client/list')
        .then((res) => {
          if (res.data.success) {
            this.clients = res.data.list
            this.current_client = this.$store.getters.user.client_id
          }
        })
    }
  },
  methods: {
    logout () {
      this.$auth.logout().then(() => {
        this.$auth.redirect('/login')
      })
    },
    switchClient () {
      if (this.isSuper) {
        this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/client/switch', { client_id: this.current_client })
          .then((res) => {
            if (res.data.success) {
              this.$router.go()
            }
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
