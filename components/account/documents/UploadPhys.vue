<template>
  <b-modal id="modal-phys-docs" centered size="xl" title="Загрузка документов">
    <v-file-input
      v-model="personal_id"
      show-size
      single-line
      label="Документ удостоверяющий личность заявителя"
      hint="Документ удостоверяющий личность заявителя"
    />
    <v-file-input
      v-model="proxy"
      show-size
      single-line
      label="Документ подтверждающий полномочия представителя заявителя"
      hint="Документ подтверждающий полномочия представителя заявителя"
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
  name: 'UploadPhys',
  data () {
    return {
      personal_id: null,
      proxy: null
    }
  },
  methods: {
    upload () {
      const formData = new FormData()
      if (this.personal_id) {
        formData.append('personal_id', this.personal_id, this.personal_id.name)
      }
      if (this.proxy) {
        formData.append('proxy', this.proxy, this.proxy.name)
      }
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/documents', formData)
        .then((res) => {
          if (res.data.success) {
            this.$emit('uploaded')
            this.$bvModal.hide('modal-phys-docs')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
