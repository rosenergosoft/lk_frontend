<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
      <div style="width: 100px"></div>
      <div class="mr-4">
        <button class="btn blue-button" @click="$bvModal.show('modal-users-edit')">
          Новый пользователь
        </button>
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="users"
      :options.sync="options"
      :server-items-length="totalUsers"
      :items-per-page="perPage"
      :page="currentPage"
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
          {{ item.company.opf }} "{{ item.company.name }}"
        </template>
        <template v-else>
          <span>-</span>
        </template>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <a @click.prevent="openEdit(item.id)">Edit</a>
      </template>
    </v-data-table>
    <Edit
      @updated="init"
    />
  </div>
</template>

<script>
import User from '../components/users/table/User'
import Edit from '../components/users/Edit'
export default {
  name: 'Users',
  components: {
    User,
    Edit
  },
  data () {
    return {
      perPage: 5,
      totalUsers: 0,
      currentPage: 1,
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
    },
    '$route.query.id' (value) {
      if (value) {
        this.$bvModal.show('modal-users-edit')
      }
    }
  },
  mounted () {
    this.init()
    if (this.$route.query.id) {
      this.$bvModal.show('modal-users-edit')
    }
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
    },
    openEdit (id) {
      this.$router.replace({ query: { ...this.$route.query, id } })
    }
  }
}
</script>

<style scoped>

</style>
