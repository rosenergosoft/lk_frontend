<template>
  <div class="connection">
    <div class="page-title d-flex">
      <div>
        <NuxtLink
          to="/"
        >
          Технологическое подключение
        </NuxtLink>
      </div>
      <div class="l-separator">
        /
      </div>
      <div class="active">
        Обращения
      </div>
      <div class="ml-auto">
        <button class="btn blue-button" @click="$router.push('/appeals/new')">
          Новое обращение
        </button>
      </div>
    </div>
    <div v-if="isExecutive" class="row justify-content-between funnel align-middle">
      <div class="col status-1 status d-flex align-items-center justify-content-center">
        <div>
          <div class="count">
            {{ counts.accepted }}
          </div>
          <div class="status-text">
            В работе
          </div>
        </div>
      </div>
      <div class="col status-2 status d-flex align-items-center justify-content-center">
        <div>
          <div class="count">
            {{ counts.waiting_company_resp }}
          </div>
          <div class="status-text">
            Ожидает ответа компании
          </div>
        </div>
      </div>
      <div class="col status-3 status d-flex align-items-center justify-content-center">
        <div>
          <div class="count">
            {{ counts.preparing }}
          </div>
          <div class="status-text">
            Подготовка тех условий
          </div>
        </div>
      </div>
      <div class="col status-4 status d-flex align-items-center justify-content-center">
        <div>
          <div class="count">
            {{ counts.invoice }}
          </div>
          <div class="status-text">
            Счет на оплату
          </div>
        </div>
      </div>
      <div class="col status-5 status d-flex align-items-center justify-content-center">
        <div>
          <div class="count">
            {{ counts.in_progress }}
          </div>
          <div class="status-text">
            Исполняется
          </div>
        </div>
      </div>
      <div class="col status-6 status d-flex align-items-center justify-content-center">
        <div>
          <div class="count">
            {{ counts.completed }}
          </div>
          <div class="status-text">
            Выполнен
          </div>
        </div>
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
          loading="isLoading"
          loading-text="Загрузка данных"
          :footer-props="{
            itemsPerPageText: 'Элементов на странице'
          }"
          @click:row="handleClick"
        >
          <template #[`item.question`]="{ item }">
            <div v-if="item.question">
              {{ item.question }}
            </div>
            <div v-else>
              - Вопрос не задан -
            </div>
          </template>
          <template #[`item.status`]="{ item }">
            <div :class="getStatusClass(item)">
              {{ getStatus(item) }}
            </div>
          </template>
          <template #[`item.created_at`]="{ item }">
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
      isLoading: true,
      totalAppeals: 0,
      options: {},
      headers: [
        { text: '№ обращения', value: 'id' },
        { text: 'Вопрос', value: 'question' },
        { text: 'Статус', value: 'status' },
        { text: 'Дата создания', value: 'created_at' }
      ],
      appeals: [],
      counts: {}
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted () {
    this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/appeals/list')
      .then((res) => {
        this.appeals = res.data.data
        this.totalAppeals = res.data.total
        this.isLoading = false
      })
  },
  methods: {
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
