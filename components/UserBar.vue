<template>
  <div class="userBar d-flex inputs">
    <div v-if="parseInt(current_client) === 2">
      Телефон технической службы: +7 (4152) 31-61-41
    </div>
    <div v-if="isSuper" class="mr-20 select-wrapper">
      <select v-model="current_client" class="form-control" @change="switchClient">
        <option v-for="(value, key) of clients" :key="key" :value="key">
          {{ value }}
        </option>
      </select>
    </div>
    <div class="notifications d-none">
      <a href=""><i class="bell" /></a>
    </div>
    <div class="private-messages d-none">
      <a href=""><i class="messages" /></a>
    </div>
    <div class="user-account d-flex">
      <div class="person" />
      <div>
        <NuxtLink to="/account">
          {{ userName }}
          <p v-if="isSuper" class="">
            Супер админ
          </p>
          <p v-if="isAdmin" class="">
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
import { mapGetters } from 'vuex'
export default {
  name: 'UserBar',
  data () {
    return {
      clients: [],
      current_client: null
    }
  },
  computed: {
    ...mapGetters(['user', 'userProfile']),
    userName () {
      if (this.user.name) {
        return this.user.name
      } else if (this.userProfile && this.userProfile.first_name && this.userProfile.last_name) {
        return this.userProfile.first_name + ' ' + this.userProfile.last_name
      } else {
        return 'Пользователь'
      }
    }
  },
  mounted () {
    if (this.isSuper) {
      this.setLoading(true)
      this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/client/list')
        .then((res) => {
          if (res.data.success) {
            this.clients = res.data.list
            this.current_client = this.$store.getters.user.client_id
          }
          this.setLoading(false)
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
        this.setLoading(true)
        this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/client/switch', { client_id: this.current_client })
          .then((res) => {
            this.setLoading(false)
            if (res.data.success) {
              this.$router.go()
            }
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .select-wrapper {
    position: relative;
    top: -4px;
    width: 150px;
  }
  .inputs .select-wrapper::before {
    right: 15px;
  }
</style>
