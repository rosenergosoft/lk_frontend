<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :options.sync="options"
    :server-items-length="totalUsers"
    :items-per-page="perPage"
    class="elevation-1"
  >
    <template v-slot:[`item.user`]="{ item }">
      <User :user="item"/>
    </template>
    <template v-slot:[`item.phys`]="{ item }">
      <template v-if="item.profile">
        {{ getFullName(item.profile) }}
      </template>
      <template v-else>
        <span>-</span>
      </template>
    </template>
    <template v-slot:[`item.yur`]="{ item }">
      <template v-if="item.company">
        {{ item.company.name }}
      </template>
      <template v-else>
        <span>-</span>
      </template>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <NuxtLink :to="'/user/edit?id='+item.id">
        Edit
      </NuxtLink>
    </template>
  </v-data-table>
</template>

<script>
import User from '../components/users/table/User'
export default {
  name: 'Users',
  components: {
    User
  },
  data () {
    return {
      perPage: 5,
      totalUsers: 0,
      options: {},
      headers: [
        { text: 'Пользователь', value: 'user' },
        { text: 'Физ лицо', value: 'phys' },
        { text: 'Юр лицо', value: 'yur' },
        { text: '', value: 'actions' }
      ],
      users: []
    }
  },
  computed: {
    query () {
      const obj = {
        per_page: this.perPage
      }
      return Object.keys(obj)
        .map(key => `${key}=${obj[key]}`)
        .join('&')
    }
  },
  watch: {
    options: {
      handler (val) {
        console.log(val)
        // this.getDataFromApi()
      },
      deep: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/user/list?' + this.query)
        .then((res) => {
          this.users = res.data.data
          this.totalUsers = res.data.total
        })
    },
    getFullName (user) {
      return user.last_name + ' ' + user.first_name + ' ' + user.middle_name
    }
  }
}
</script>

<style scoped>

</style>
