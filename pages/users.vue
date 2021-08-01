<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :options.sync="options"
    :server-items-length="totalUsers"
    :items-per-page="perPage"
    class="elevation-1"
  />
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
      perPage: 5,
      totalUsers: 0,
      options: {},
      headers: [
        { text: 'Пользователь', value: 'user' },
        { text: 'Физ лицо', value: 'phys' },
        { text: 'Юр лицо', value: 'yur' }
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
          Object.assign(this.users, res.data.users)
        })
    }
  }
}
</script>

<style scoped>

</style>
