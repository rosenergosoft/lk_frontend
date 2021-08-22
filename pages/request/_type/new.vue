<template>
  <div class="connection">
    <div class="page-title d-flex">
      <div class="active">
        Анкета заявки на подключение
      </div>
    </div>
    <div class="new-request">
      <div class="boxes">
        <div class="box status-2">
          <div v-if="currentStep === 0">
            <h4>1. Персональные данные</h4>
            <div class="notice">
              Документы, необходимые для заключения договора
            </div>
            <div class="big-notice mb-1">
              Укажите данные по физическому и/или юридическому лицу, которое будет учавствовать в заключении договора на присоединение.
            </div>
            <PersonalData />
            <div class="personal-data">
              <div class="separator" />
            </div>
            <Documents @docs="getDocuments" />
            <div class="text-left button-wrapper">
              <button class="btn blue-button float-none" @click="secondStep">
                Далее
              </button>
            </div>
          </div>
          <div v-if="currentStep === 1">
            <h4>2. Заявка на подключение</h4>
            <Electricity
              v-if="$route.params.type === 'electricity'"
              :application-id="application_id"
              @back="nextTo"
            />
            <Warm
              v-if="$route.params.type === 'warm'"
              :application-id="application_id"
              @back="nextTo"
            />
            <Water
              v-if="$route.params.type === 'water'"
              :application-id="application_id"
              @back="nextTo"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PersonalData from '~/components/account/PersonalData'
import Documents from '~/components/account/Documents'
import Electricity from '~/components/request/Electricity'
import Warm from '~/components/request/Warm'
import Water from '~/components/request/Water'
export default {
  components: {
    PersonalData,
    Documents,
    Electricity,
    Warm,
    Water
  },
  data () {
    return {
      currentStep: 0,
      application_id: null,
      docs: {
        phys: '',
        yur: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userProfile', 'userCompany'])
  },
  mounted () {
    this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/application/draft')
      .then((res) => {
        if (res.data.id) {
          this.application_id = res.data.id
          this.docs = res.data.docs
          if (this.validateFirstStep()) {
            this.nextTo(1)
          }
        }
      })
  },
  methods: {
    validateFirstStep () {
      if (
        this.userProfile.first_name &&
        this.userProfile.last_name &&
        this.userProfile.pasport &&
        this.userProfile.pasport_granted_by &&
        this.userProfile.pasport_date &&
        this.userProfile.reg_address &&
        this.userProfile.phys_address
      ) {
        if (!this.docs.phys[0]) {
          this.$notify({ type: 'error', title: 'Ошибка', text: 'Загрузите документы пользователя' })
          return false
        }
        if (!this.docs.phys[0].signature) {
          this.$notify({ type: 'error', title: 'Ошибка', text: 'Подпишите документы пользователя' })
          return false
        }
        if (this.docs.phys[1]) {
          if (!this.docs.phys[1].signature) {
            this.$notify({ type: 'error', title: 'Ошибка', text: 'Подпишите документы пользователя' })
            return false
          }
        }
        if (this.userCompany && this.userCompany.inn) {
          if (
            this.userCompany.opf &&
            this.userCompany.name &&
            this.userCompany.address &&
            this.userCompany.bank_name &&
            this.userCompany.bank_bik &&
            this.userCompany.bank_corr_account &&
            this.userCompany.check_account
          ) {
            if (!this.docs.yur[0]) {
              this.$notify({ type: 'error', title: 'Ошибка', text: 'Заполните документы о компании' })
              return false
            }
            if (!this.docs.yur[0].signature) {
              this.$notify({ type: 'error', title: 'Ошибка', text: 'Подпишите документы компании' })
              return false
            }
            if (this.docs.yur[1]) {
              if (!this.docs.yur[1].signature) {
                this.$notify({ type: 'error', title: 'Ошибка', text: 'Подпишите документы компании' })
                return false
              }
            }
            if (this.docs.yur[2]) {
              if (!this.docs.yur[2].signature) {
                this.$notify({ type: 'error', title: 'Ошибка', text: 'Подпишите документы компании' })
                return false
              }
            }
            if (this.docs.yur[3]) {
              if (!this.docs.yur[2].signature) {
                this.$notify({ type: 'error', title: 'Ошибка', text: 'Подпишите документы компании' })
                return false
              }
            }
            if (this.docs.yur[4]) {
              if (!this.docs.yur[2].signature) {
                this.$notify({ type: 'error', title: 'Ошибка', text: 'Подпишите документы компании' })
                return false
              }
            }
          } else {
            this.$notify({ type: 'error', title: 'Ошибка', text: 'Заполните данные о компании' })
            return false
          }
        }
        return true
      } else {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Заполните даные о пользователе' })
        return false
      }
    },
    getDocuments (docs) {
      this.docs = docs
    },
    createDraft () {
      this.setLoading(true)
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/application/draft')
        .then((res) => {
          this.setLoading(false)
          if (res.data.success) {
            this.application_id = res.data.application.id
            this.nextTo(1)
          }
        })
    },
    secondStep () {
      if (this.validateFirstStep()) {
        if (this.application_id) {
          this.nextTo(1)
        } else {
          this.createDraft()
        }
      }
    },
    nextTo (to = false) {
      this.currentStep = to
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>

</style>
