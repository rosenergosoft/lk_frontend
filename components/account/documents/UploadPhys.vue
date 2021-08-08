<template>
  <b-modal id="modal-phys-docs" centered size="xl" title="Загрузка документов">
    <v-file-input
      v-if="!docs.find(item => item.type === 'personal_id')"
      v-model="personal_id"
      show-size
      single-line
      label="Документ удостоверяющий личность заявителя"
      hint="Документ удостоверяющий личность заявителя"
    />
    <v-file-input
      v-if="!docs.find(item => item.type === 'proxy')"
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
  props: {
    docs: Array
  },
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
            this.personal_id = null
            this.proxy = null
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
