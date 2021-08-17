<template>
  <b-modal id="add-document-modal" title="Добавить документ" @show="initVars">
    <div class="inputs">
      <v-file-input
        v-model="file.fileData"
        show-size
        single-line
        label="Выбрать файл на компьютере"
      />
      <div class="form-group">
        <input v-model="file.fileName" type="text" class="form-control" placeholder="Имя файла">
      </div>
      <div class="form-group">
        <DatePicker
          v-model="pickedDate"
          :format="'dd.MM.yyyy'"
          :language="ru"
          :monday-first="true"
          input-class="form-control"
          placeholder="Дата документа"
        />
      </div>
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
import { ru } from 'vuejs-datepicker/dist/locale'
export default {
  name: 'AddDocumentModal',
  props: {
    disclosureId: {
      type: Number,
      default: null
    },
    disclosureLabelId: {
      type: Number,
      default: null
    }
  },
  data () {
    let pickedDate
    return {
      ru,
      pickedDate,
      file: {
        fileData: null,
        fileName: null
      }
    }
  },
  methods: {
    initVars () {
      this.file = {
        fileData: null,
        fileName: null
      }
      this.pickedDate = ''
    },
    async upload () {
      const formData = new FormData()
      if (this.file.fileData) {
        formData.append('file_data', this.file.fileData, this.file.fileData.name)
        if (this.pickedDate) {
          formData.append('document_date', this.$moment(this.pickedDate).format('DD.MM.YYYY'))
        }
        if (this.file.fileName) {
          formData.append('name', this.file.fileName)
        }
        if (this.disclosureLabelId) {
          formData.append('disclosure_label_id', this.disclosureLabelId)
        }
        if (this.disclosureId) {
          formData.append('disclosure_id', this.disclosureId)
        }
        const res = await this.$axios.$post(process.env.LARAVEL_API_BASE_URL + '/api/disclosure/fileUpload', formData)
        if (res.success) {
          this.$emit('file-upload-after', res)
          this.$bvModal.hide('add-document-modal')
          this.file = Object
          this.pickedDate = ''
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
