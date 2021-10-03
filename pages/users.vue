<template>
  <div class="user-list">
    <div class="d-flex justify-content-between mb-4">
      <div style="width: 100px" />
      <div class="mr-4">
        <button class="btn blue-button" @click="$bvModal.show('modal-users-edit')">
          Новый пользователь
        </button>
      </div>
    </div>
    <div class="v-application">
      <client-only>
        <v-data-table
          :headers="headers"
          :items="users"
          :options.sync="options"
          :server-items-length="totalUsers"
          :items-per-page="perPage"
          :page="currentPage"
          :disable-sort="true"
          :disable-items-per-page="true"
          no-results-text="Нет данных"
          no-data-text="Нет данных"
          class="elevation-1 w-100"
          :loading="dataLoading"
          :loading-text="loadingText"
          :footer-props="{
            itemsPerPageText: 'Элементов на странице',
            'disable-items-per-page':true
          }"
          @click:row="handleClick"
        >
          <template #[`item.user`]="{ item }">
            <User :user="item" />
          </template>
          <template #[`item.phys`]="{ item }">
            <template v-if="item.profile">
              {{ getFullName(item.profile) }}
            </template>
            <template v-else>
              <span>-</span>
            </template>
          </template>
          <template #[`item.yur`]="{ item }">
            <template v-if="item.company">
              {{ item.company.opf }} "{{ item.company.name }}"
            </template>
            <template v-else>
              <span>-</span>
            </template>
          </template>
        </v-data-table>
      </client-only>
      <Edit
        @updated="init"
      />
    </div>
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
      dataLoading: true,
      loadingText: 'Загрузка данных',
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
        per_page: this.perPage,
        page: this.currentPage
      }
      return Object.keys(obj)
        .map(key => `${key}=${obj[key]}`)
        .join('&')
    }
  },
  watch: {
    dataLoading (val) {
      if (val) {
        this.loadingText = 'Загрузка данных'
      } else {
        this.loadingText = 'Нет данных'
      }
    },
    options: {
      handler (val) {
        this.currentPage = val.page
        this.init()
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
      this.dataLoading = true
      this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/user/list?' + this.query)
        .then((res) => {
          this.users = res.data.data
          this.totalUsers = res.data.total
          this.dataLoading = false
        })
    },
    getFullName (user) {
      let fullName
      if (user.last_name) {
        fullName = user.last_name
      }
      if (user.first_name) {
        fullName += ' ' + user.first_name
      }
      if (user.middle_name) {
        fullName += ' ' + user.middle_name
      }
      if (!fullName) {
        fullName = 'Имя не заполнено'
      }
      return fullName
    },
    openEdit (id) {
      this.$router.replace({ query: { ...this.$route.query, id } })
    },
    handleClick (item) {
      this.openEdit(item.id)
    }
  }
}
</script>

<style scoped>

</style>
