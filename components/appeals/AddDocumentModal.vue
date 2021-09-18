<template>
  <b-modal id="add-document-modal" title="Добавить документ">
    <div class="inputs">
      <v-file-input
        v-model="file.fileData"
        show-size
        single-line
        label="Выбрать файл на компьютере"
      />
    </div>
    <template #modal-footer class="d-block">
      <div class="d-flex justify-content-between">
        <div>
          <button type="button" class="btn blue-button" @click="$bvModal.hide('add-document-modal')">
            Назад
          </button>
        </div>
        <div>
          <button type="button" class="btn blue-button" @click="upload">
            Загрузить
          </button>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'AddDocumentModal',
  props: {
    appealId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      file: {
        fileData: null,
        fileName: null
      }
    }
  },
  methods: {
    validateFile () {
      if (!this.file.fileData) {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Файл не выбран', duration: 6000 })
        return false
      }
      return true
    },
    async upload () {
      if (this.validateFile()) {
        const formData = new FormData()
        if (this.file.fileData) {
          formData.append('file_data', this.file.fileData, this.file.fileData.name)
          if (this.appealId) {
            formData.append('appeal_id', this.appealId)
          }
          this.setLoading(true)
          const res = await this.$axios.$post(process.env.LARAVEL_API_BASE_URL + '/api/appeals/fileUpload', formData)
          this.setLoading(false)
          if (res.success) {
            this.$emit('file-upload-after', res)
            this.$notify({ type: 'success', title: 'Успех', text: 'Файл загружен', duration: 6000 })
            this.$bvModal.hide('add-document-modal')
            this.file = Object
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
