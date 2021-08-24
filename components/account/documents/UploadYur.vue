<template>
  <b-modal id="modal-yur-docs" centered size="xl" title="Загрузка документов">
    <v-file-input
      v-if="!docs.find(item => item.type === 'yur_proxy')"
      v-model="yur_proxy"
      show-size
      single-line
      label="Документ подтверждающий полномочия представителя заявителя"
      hint="Документ подтверждающий полномочия представителя заявителя"
    />
    <v-file-input
      v-if="!docs.find(item => item.type === 'yur_ustav')"
      v-model="yur_ustav"
      show-size
      single-line
      label="Устав, решение учредителей о создании юр. лица и т.п."
      hint="Устав, решение учредителей о создании юр. лица и т.п."
    />
    <v-file-input
      v-if="!docs.find(item => item.type === 'yur_prikaz')"
      v-model="yur_prikaz"
      show-size
      single-line
      label="Приказ, выписка из протокола, решение учредителей о назначении директора"
      hint="Приказ, выписка из протокола, решение учредителей о назначении директора"
    />
    <v-file-input
      v-if="!docs.find(item => item.type === 'yur_sgr')"
      v-model="yur_sgr"
      show-size
      single-line
      label="Выписка или свидетельство о государственной регистрации заявителя в качестве юридического лица или ип"
      hint="Выписка или свидетельство о государственной регистрации заявителя в качестве юридического лица или ип"
    />
    <v-file-input
      v-if="!docs.find(item => item.type === 'yur_pszun')"
      v-model="yur_pszun"
      show-size
      single-line
      label="Свидетельство о постановке заявителя на учет в налоговом органе"
      hint="Свидетельство о постановке заявителя на учет в налоговом органе"
    />
    <template #modal-footer>
      <button type="button" class="btn blue-button" @click="upload">
        Загрузить
      </button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'UploadYur',
  props: {
    docs: Array
  },
  data () {
    return {
      yur_proxy: null,
      yur_ustav: null,
      yur_prikaz: null,
      yur_sgr: null,
      yur_pszun: null
    }
  },
  methods: {
    upload () {
      const formData = new FormData()
      if (this.yur_proxy) {
        formData.append('yur_proxy', this.yur_proxy, this.yur_proxy.name)
      }
      if (this.yur_ustav) {
        formData.append('yur_ustav', this.yur_ustav, this.yur_ustav.name)
      }
      if (this.yur_prikaz) {
        formData.append('yur_prikaz', this.yur_prikaz, this.yur_prikaz.name)
      }
      if (this.yur_sgr) {
        formData.append('yur_sgr', this.yur_sgr, this.yur_sgr.name)
      }
      if (this.yur_pszun) {
        formData.append('yur_pszun', this.yur_pszun, this.yur_pszun.name)
      }
      this.setLoading(true)
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/documents', formData)
        .then((res) => {
          if (res.data.success) {
            this.yur_proxy = null
            this.yur_ustav = null
            this.yur_prikaz = null
            this.yur_sgr = null
            this.yur_pszun = null
            this.$emit('uploaded')
            this.$bvModal.hide('modal-yur-docs')
          }
          this.setLoading(false)
        })
    }
  }
}
</script>

<style scoped>

</style>
