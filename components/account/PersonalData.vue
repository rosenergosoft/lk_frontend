<template>
  <div class="personal-data">
    <div class="d-flex justify-content-between">
      <div>
        <div>
          <label class="label">Лицевой счет</label>
        </div>
        <div class="text-content">
          Новый клиент: лицевой счет еще не присвоен
        </div>
      </div>
    </div>
    <div class="separator" />
    <div class="d-flex justify-content-between">
      <div>
        <div>
          <label class="label">Физическое лицо</label>
        </div>
        <div class="text-content">
          {{ customerName }}
        </div>
        <div class="red-warning">
          {{ passportData }}
        </div>
      </div>
      <div class="text-right">
        <a v-b-modal.modal-phys-data><img src="/images/edit.svg" alt="" title=""></a>
        <profile />
      </div>
    </div>
    <div class="separator" />
    <div class="d-flex justify-content-between">
      <div>
        <div>
          <label class="label">Юридическое лицо или ИП</label>
        </div>
        <div v-if="companyName">
          <div class="text-content">
            {{ companyName }}
          </div>
          <div class="text-details">
            {{ companyInfo }}
          </div>
        </div>
        <div v-if="companyInfo" class="red-warning" v-html="bankInfo" />
        <div v-else>
          Нет данных
        </div>
      </div>
      <div class="text-right">
        <a v-b-modal.modal-yur-data href="#"><img src="/images/edit.svg" alt="" title=""></a>
        <company />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Profile from '~/components/account/Profile'
import Company from '~/components/account/Company'

export default {
  name: 'PersonalData',
  components: {
    Profile,
    Company
  },
  computed: {
    ...mapGetters([
      'user',
      'userProfile',
      'userCompany'
    ]),
    customerName () {
      if (this.userProfile) {
        return this.userProfile.last_name + ' ' + this.userProfile.first_name + ' ' + this.userProfile.middle_name
      }
      return ''
    },
    companyName () {
      if (this.userCompany) {
        return this.userCompany.opf + ' "' + this.userCompany.name + '"'
      }
      return ''
    },
    companyInfo () {
      if (this.userCompany) {
        return this.userCompany.inn + ' ' + this.userCompany.address
      }
      return ''
    },
    bankInfo () {
      if (this.userCompany && this.userCompany.bank_name && this.userCompany.check_account) {
        return '<div>' + this.userCompany.bank_name + '</div><div>Р/с: ' + this.userCompany.check_account + '</div>'
      }
      return 'Банковские реквизиты не указаны'
    },
    passportData () {
      if (this.userProfile && this.userProfile.pasport) {
        return 'Паспорт: ' + this.userProfile.pasport
      }
      return 'Паспортные данные не указаны'
    }
  }
}
</script>

<style scoped lang="scss">
.personal-data {
  .red-warning {
    color: $redWarning;
    font-size: 12px;
  }
  .text-details {
    font-size: 12px;
    color: $orderStatusColor;
  }
}
</style>
