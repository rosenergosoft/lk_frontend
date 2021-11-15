<template>
  <div class="connection">
    <div class="page-title d-flex">
      <div>
        <NuxtLink
          to="/"
        >
          Технологическое присоединение
        </NuxtLink>
      </div>
      <div class="l-separator">
        /
      </div>
      <div class="active">
        Обращения
      </div>
      <div v-if="can('appeals_add') && !isSuper" class="ml-auto">
        <button class="btn blue-button" @click="$router.push('/appeals/new')">
          Новое обращение
        </button>
      </div>
    </div>
    <div class="v-application mt-4">
      <client-only>
        <v-data-table
          :headers="headers"
          :items="appeals"
          :options.sync="options"
          :server-items-length="totalAppeals"
          :items-per-page="perPage"
          class="elevation-1 w-100"
          no-results-text="Нет данных"
          no-data-text="Нет данных"
          :disable-sort="true"
          :disable-items-per-page="true"
          :loading="dataLoading"
          :loading-text="loadingText"
          :footer-props="{
            itemsPerPageText: 'Элементов на странице'
          }"
          @click:row="handleClick"
        >
          <template #[`item.question`]="{ item }">
            <div v-if="item.question">
              {{ item.question | cut}}
            </div>
            <div v-else>
              - Вопрос не задан -
            </div>
          </template>
          <template #[`item.status`]="{ item }">
            <div :class="getStatusClass(item)" class="r-statuses">
              {{ getStatus(item) }}
            </div>
          </template>
          <template #[`item.created_at`]="{ item }" class="text-nowrap">
            {{ $moment(item.created_at).format('DD MMM YYYY') }} г.
          </template>
          <template #[`item.actions`]="{ item }">
            Edit
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Appeals',
  data () {
    return {
      perPage: 10,
      dataLoading: true,
      loadingText: 'Загрузка данных',
      totalAppeals: 0,
      options: {},
      headers: [
        { text: '№', value: 'id' },
        { text: 'Вопрос', value: 'question' },
        { text: 'Статус', value: 'status' },
        { text: 'Дата создания', value: 'created_at', class: 'text-nowrap' }
      ],
      appeals: [],
      counts: {}
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    dataLoading (val) {
      if (val) {
        this.loadingText = 'Загрузка данных'
      } else {
        this.loadingText = 'Нет данных'
      }
    }
  },
  mounted () {
    this.loadData()
  },
  filters: {
    cut (value) {
      let i = 240
      if (value.length > i) {
        if (value[i] === ' ') {
          return value.substr(0, i) + ' ...'
        } else {
          while (value[i] !== ' ') {
            i++
            if (value[i] === ' ') {
              return value.substr(0, i) + ' ...'
            }
          }
        }
      }
      return value
    }
  },
  methods: {
    async loadData () {
      this.dataLoading = true
      const res = await this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/appeals/list')
      if (res) {
        this.appeals = res.data.data
        this.totalAppeals = res.data.total
      }
      this.dataLoading = false
    },
    handleClick (value) {
      if (value.status !== 'draft') {
        this.$router.push('/appeals/show/' + value.id)
      } else {
        this.$router.push('/appeals/new/')
      }
    },
    getStatus (appeal) {
      switch (appeal.status) {
        case 'draft':
          return 'Черновик'
        case 'completed':
          return 'Выполнен'
        case 'replied':
          return 'Ожидает ответа пользователя'
        case 'accepted':
          return 'В работе'
      }
    },
    getStatusClass (appeal) {
      switch (appeal.status) {
        case 'accepted':
        case 'in_progress':
        case 'invoice':
        case 'waiting_company_resp':
          return 'orange-status'
        case 'completed':
          return 'green-status'
        case 'draft':
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>

</style>
