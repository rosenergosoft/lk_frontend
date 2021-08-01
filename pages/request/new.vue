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
            <Documents />
            <div class="text-left button-wrapper">
              <button class="btn blue-button float-none" @click="nextTo(1)">
                Далее
              </button>
            </div>
          </div>
          <div v-if="currentStep === 1">
            <h4>2. Заявка на подключение</h4>
            <Details />
            <div class="d-flex justify-content-between">
              <div class="text-left button-wrapper">
                <button class="btn blue-button float-none">
                  Отправить заявку
                </button>
              </div>
              <div class="text-left button-wrapper">
                <button class="btn blue-button float-none" @click="nextTo(0)">
                  Назад
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalData from '~/components/account/PersonalData'
import Documents from '~/components/account/Documents'
import Details from '~/components/request/Details'
export default {
  components: {
    PersonalData,
    Documents,
    Details
  },
  data () {
    return {
      currentStep: 0
    }
  },
  methods: {
    nextTo (to = false) {
      this.currentStep = to
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>

</style>
