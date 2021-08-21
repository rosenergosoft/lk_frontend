<template>
  <div class="connection">
    <div class="page-title d-flex">
      <div class="active">
        Технологическое подключение
      </div>
      <div class="l-separator">
        /
      </div>
      <div>
        <NuxtLink to="/appeals">
          Обращения
        </NuxtLink>
      </div>
      <div v-if="can('applications_add') && !isSuper" class="ml-auto">
        <button class="btn blue-button" @click="$router.push('/request/new')">
          Новая заявка
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
    <div class="filters d-flex">
      <div class="">
        <div class="select-wrapper">
          <select v-model="filters.status" @change="getTableData">
            <option :value="null">
              Статус заявки
            </option>
            <option v-if="isCustomer" value="draft">
              Черновики
            </option>
            <option value="accepted">
              В работе
            </option>
            <option value="waiting_company_resp">
              Ожидает ответа компании
            </option>
            <option value="completed">
              Выполнены
            </option>
            <option value="declined">
              Отклонены
            </option>
            <option value="all">
              Все заявки
            </option>
          </select>
        </div>
      </div>
      <div class="">
        <div class="search-wrapper">
          <input v-model="filters.query" type="text" placeholder="Поиск" @change="getTableData">
        </div>
      </div>
      <div class="">
        <div class="select-wrapper">
          <select>
            <option>Тип заявки</option>
            <option>Вода</option>
            <option>Элеткричество</option>
            <option>Тепло</option>
            <option>Все заявки</option>
          </select>
        </div>
      </div>
    </div>
    <div class="v-application mt-4">
      <client-only>
        <v-data-table
          :headers="headers"
          :items="applications"
          :options.sync="options"
          :server-items-length="totalApplications"
          :items-per-page="perPage"
          no-results-text="Нет данных"
          no-data-text="Нет данных"
          class="elevation-1 w-100"
          :loading="dataLoading"
          :loading-text="loadingText"
          :footer-props="{
            itemsPerPageText: 'Элементов на странице'
          }"
        >
          <template #[`item.id`]="{ item }">
            <div class="count">
              {{ item.id }}
            </div>
          </template>
          <template #[`item.members`]="{ item }">
            <div class="members">
              <div>
                <strong>От:</strong> {{ getMemberFrom(item) }}
              </div>
              <div>
                <strong>Кому:</strong> {{ (item.vendor) ? item.vendor.name : item.client.name }}
              </div>
            </div>
          </template>
          <template #[`item.type`]="{ item }">
            <div class="order-status">
              Технологическое присоединение
            </div>
            <div class="order-address">
              {{ item.objectLocation }}
            </div>
            <div class="order-details">
              {{ getConnectionType(item) }}, {{ getConstructionReason(item) }}, {{ getPowerLevel(item) }}
            </div>
            <div class="order-updated-at">
              {{ $moment(item.updated_at).format('DD MMM YYYY') }} г.: Заявка обновлена.
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
        </v-data-table>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Connection',
  data () {
    return {
      perPage: 10,
      dataLoading: true,
      loadingText: 'Загрузка данных',
      totalApplications: 0,
      options: {},
      headers: [
        { text: '№', value: 'id' },
        { text: 'Участники', value: 'members' },
        { text: 'Тип заявки', value: 'type' },
        { text: 'Статус', value: 'status' },
        { text: 'Дата создания', value: 'created_at' }
      ],
      applications: [],
      counts: {},
      filters: {
        status: null,
        query: ''
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
    tableDataUrl () {
      const query = {}
      if (this.filters.status) {
        query.status = this.filters.status
      }
      if (this.filters.query !== '') {
        query.query = this.filters.query
      }
      if (JSON.stringify(query) !== '{}') {
        return '/api/application/list?' + new URLSearchParams(query).toString()
      } else {
        return '/api/application/list?'
      }
    }
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
    this.getTableData()
    if (this.isExecutive) {
      this.setLoading(true)
      this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/application/counts')
        .then((res) => {
          this.counts = res.data.counts
          this.setLoading(false)
        })
    }
  },
  methods: {
    handleClick () {
      // console.log(123)
    },
    getTableData () {
      this.setLoading(true)
      this.dataLoading = true
      this.$axios.get(process.env.LARAVEL_API_BASE_URL + this.tableDataUrl)
        .then((res) => {
          this.applications = res.data.data
          this.totalApplications = res.data.total
          this.setLoading(false)
          this.dataLoading = false
        })
    },
    getMemberFrom (application) {
      if (application.requester === 'phys') {
        const profile = application.user.profile
        return profile.last_name + ' ' + profile.first_name + ' ' + profile.middle_name
      } else if (application.requester === 'yur') {
        const company = application.user.company
        return company.opf + ' "' + company.name + '"'
      }
    },
    getConnectionType (application) {
      switch (application.connectionType) {
        case 0:
          return 'Постоянное подключение'
        case 1:
          return 'Временное на период выполнения постоянной схемы электроснабжения'
        case 2:
          return 'Временное подключение передвижного объекта'
      }
    },
    getConstructionReason (application) {
      switch (application.constructionReason) {
        case 0:
          return 'Новое строительство'
        case 1:
          return 'Увеличение максимальной мощности'
        case 2:
          return 'Изменение точки присоединения'
        case 3:
          return 'Изменение категории надежности'
        case 4:
          return 'Увеличение максимальной мощности и изменение точки присоединения'
        case 5:
          return 'Увеличение максимальной мощности и изменение категории надежности'
      }
    },
    getPowerLevel (application) {
      switch (application.powerLevel) {
        case 1:
          return '0.22 кВт'
        case 2:
          return '0.38 кВт'
        case 3:
          return '6 кВт'
        case 4:
          return '10 кВт'
      }
    },
    getStatus (application) {
      switch (application.status) {
        case 'draft':
          return 'Черновик'
        case 'declined':
          return 'Отклонен'
        case 'completed':
          return 'Выполнен'
        case 'waiting_company_resp':
          return 'Ожидает ответа компании'
        case 'invoice':
          return 'Счет на оплату'
        case 'preparing':
          return 'Подготовока тех условий'
        case 'in_progress':
          return 'Исполняется'
        case 'accepted':
          return 'В работе'
      }
    },
    getStatusClass (application) {
      switch (application.status) {
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
