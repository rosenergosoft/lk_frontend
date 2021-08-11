<template>
  <div class="connection">
    <div class="page-title d-flex">
      <div class="active">
        Просмотр обращения
      </div>
    </div>
    <div v-if="loaded" class="new-request">
      <div class="boxes">
        <div class="box status-2">
          <h4>Заявка | <span class="red-warning">{{ status[appeal.status] }}</span></h4>
          <div class="personal-data">
            <div class="d-flex justify-content-between">
              <div>
                <div>
                  <label class="label">Персональные данные</label>
                </div>
                <div class="text-content">
                  <div>{{ userProfile.first_name }} {{ userProfile.middle_name }} {{ userProfile.last_name }}</div>
                  <div>Паспорт: {{ userProfile.pasport }}, {{ userProfile.pasport_granted_by }}, {{ formatDate(userProfile.pasport_date) }}</div>
                </div>
              </div>
            </div>
            <div class="docs-show">
              <DocumentsItem
                v-for="doc in documents.phys"
                :key="doc.id"
                :doc="doc"
              />
            </div>
            <div class="separator" />
          </div>
          <div v-if="appeal.requester === 'yur'" class="personal-data">
            <div class="d-flex justify-content-between">
              <div>
                <div>
                  <label class="label">Юридическое лицо</label>
                </div>
                <div class="text-content">
                  <div>{{ company.name }}</div>
                  <div>ИНН: {{ company.inn }}</div>
                  <div>Адрес: {{ company.address }}</div>
                  <div class="mt-20">
                    <label class="label">Реквизиты</label>
                    <div>
                      Банк: {{ company.bank_name }}
                    </div>
                    <div>
                      БИК: {{ company.bank_bik }}
                    </div>
                    <div>
                      Расчетный счет: {{ company.check_account }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="docs-show">
              <DocumentsItem
                v-for="doc in documents.yur"
                :key="doc.id"
                :doc="doc"
              />
            </div>
            <div class="separator" />
          </div>
          <div class="personal-data">
            <div>
              <div>
                <label class="label">Ваш вопрос</label>
                <div class="text-content">
                  <div>{{ appeal.question }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DocumentsItem from '~/components/account/documents/DocumentsItem'
export default {
  name: 'Index',
  components: {
    DocumentsItem
  },
  data () {
    return {
      application: {},
      company: {},
      documents: {
        phys: [],
        yur: []
      },
      loaded: false,
      status: {
        draft: 'Черновик',
        accepted: 'В работе',
        in_progress: 'Исполняется',
        waiting_admin_resp: 'Ожидает ответа админа',
        completed: 'Выполнен'
      }
    }
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  created () {
    this.getAppeal()
  },
  methods: {
    async getAppeal () {
      const id = this.$route.params.id
      try {
        const res = await this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/appeals/get/' + id)
        if (res.appeal) {
          this.appeal = res.appeal
        }
        if (res.userProfile) {
          this.userProfile = res.userProfile
        }
        if (res.company) {
          this.company = res.company
        }
        await this.getDocuments()
        this.loaded = true
      } catch (e) {
        console.log(e)
      }
    },
    formatDate (date) {
      return this.$moment.utc(date).format('DD-MM-YYYY')
    },
    async getDocuments () {
      const res = await this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/user/documents')
      if (res.data.docs) {
        this.documents = res.data.docs
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .red-warning {
    color: $redWarning !important;
  }
</style>
