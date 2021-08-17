<template>
  <div class="connection">
    <div class="page-title d-flex">
      <div class="active">
        Ваш профиль
      </div>
    </div>
    <div class="account">
      <div class="d-flex boxes">
        <account-form />
        <div v-if="!isExecutive" class="box status-5 col-6">
          <h4>Персональные данные</h4>
          <PersonalData />
        </div>
      </div>
      <div v-if="!isExecutive" class="box status-2 col-12">
        <h4>Ваши документы</h4>
        <Documents />
      </div>
    </div>
  </div>
</template>

<script>
import Form from './account/Form'
import PersonalData from '~/components/account/PersonalData'
import Documents from '~/components/account/Documents'
export default {
  name: 'Account',
  components: {
    'account-form': Form,
    PersonalData,
    Documents
  }
  // components: { Index }
}
</script>

<style scoped lang="scss">

</style>
