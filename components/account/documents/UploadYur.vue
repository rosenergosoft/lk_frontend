<template>
  <b-modal id="modal-yur-docs" centered size="xl" title="Загрузка документов">
    <v-file-input
      v-model="companyProxy"
      show-size
      single-line
      label="Документ подтверждающий полномочия представителя заявителя"
      hint="Документ подтверждающий полномочия представителя заявителя"
    />
    <v-file-input
      v-model="ustav"
      show-size
      single-line
      label="Устав, решение учредителей о создании юр. лица и т.п."
      hint="Устав, решение учредителей о создании юр. лица и т.п."
    />
    <v-file-input
      v-model="ceoOrder"
      show-size
      single-line
      label="Приказ, выписка из протокола, решение учредителей о назначении директора"
      hint="Приказ, выписка из протокола, решение учредителей о назначении директора"
    />
    <v-file-input
      v-model="gosReg"
      show-size
      single-line
      label="Выписка или свидетельство о государственной регистрации заявителя в качестве юридического лица или ип"
      hint="Выписка или свидетельство о государственной регистрации заявителя в качестве юридического лица или ип"
    />
    <v-file-input
      v-model="fnsReg"
      show-size
      single-line
      label="Свидетельство о постановке заявителя на учет в налоговом органе"
      hint="Свидетельство о постановке заявителя на учет в налоговом органе"
    />
    <template #modal-footer>
      <button type="button" class="btn blue-button">
        Загрузить
      </button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'UploadYur',
  data () {
    return {
      companyProxy: null,
      ustav: null,
      ceoOrder: null,
      gosReg: null,
      fnsReg: null
    }
  },
  methods: {
    upload () {
      const formData = new FormData()
      if (this.companyProxy) {
        formData.append('company_proxy', this.companyProxy, this.companyProxy.name)
      }
      if (this.ustav) {
        formData.append('proxy', this.ustav, this.ustav.name)
      }
      if (this.ceoOrder) {
        formData.append('ceoOrder', this.ceoOrder, this.ceoOrder.name)
      }
      if (this.gosReg) {
        formData.append('gosReg', this.gosReg, this.gosReg.name)
      }
      if (this.fnsReg) {
        formData.append('fnsReg', this.fnsReg, this.fnsReg.name)
      }
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/documents', formData)
        .then((res) => {
          if (res.data.success) {
            this.$emit('uploaded')
            this.$bvModal.hide('modal-yur-docs')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
