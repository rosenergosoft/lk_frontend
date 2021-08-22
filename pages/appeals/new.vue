<template>
  <div class="connection">
    <div class="page-title d-flex">
      <div class="active">
        Новое обращение к компании
      </div>
    </div>
    <div class="new-request">
      <div class="boxes">
        <div class="box status-2">
          <div v-if="currentStep === 0">
            <h4>1. Персональные данные</h4>
            <div class="notice">
              Необходимые данные
            </div>
            <div class="big-notice mb-1">
              Укажите данные по физическому и/или юридическому лицу, от которого создается обращение в компанию
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
            <h4>2. Обращение</h4>
            <Details
              :appeal-id="appeal_id"
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
import Details from '~/components/appeals/Details'
export default {
  components: {
    PersonalData,
    Documents,
    Details
  },
  data () {
    return {
      docs: {
        phys: '',
        yur: ''
      },
      currentStep: 0,
      appeal_id: null
    }
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  mounted () {
    this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/appeals/draft')
      .then((res) => {
        if (res.data.appeal_id) {
          this.appeal_id = res.data.appeal_id
          this.nextTo(1)
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
        if (this.docs.phys[0]) {
          if (!this.docs.phys[0].signature) {
            this.$notify({ type: 'error', title: 'Ошибка', text: 'Подпишите документы пользователя' })
            return false
          }
        }
        if (this.docs.phys[1]) {
          if (!this.docs.phys[1].signature) {
            this.$notify({ type: 'error', title: 'Ошибка', text: 'Подпишите документы пользователя' })
            return false
          }
        }
        return true
      } else {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Заполните даные о пользователе' })
        return false
      }
    },
    createDraft () {
      this.setLoading(true)
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/appeals/draft')
        .then((res) => {
          this.setLoading(false)
          if (res.data.success) {
            this.appeal_id = res.data.appeal.id
            this.nextTo(1)
          }
        })
    },
    secondStep () {
      if (this.validateFirstStep()) {
        if (this.appeal_id) {
          this.nextTo(1)
        } else {
          this.createDraft()
        }
      }
    },
    nextTo (to = false) {
      this.currentStep = to
      window.scrollTo(0, 0)
    },
    getDocuments (docs) {
      this.docs = docs
    }
  }
}
</script>

<style scoped>

</style>
