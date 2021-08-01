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
          <h4>Персональные данные</h4>
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
            <button class="btn blue-button float-none">
              Далее
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalData from '~/components/account/PersonalData'
import Documents from '~/components/account/Documents'
export default {
  components: {
    PersonalData,
    Documents
  }
}

</script>

<style scoped>

</style>
