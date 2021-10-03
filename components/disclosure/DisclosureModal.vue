<template>
  <b-modal id="disclosure-modal" size="xl" :title="getTitle()" @show="initModal" @hidden="initVars">
    <div>
      <quill-editor
        v-model="disclosureText"
        class="quill"
        :content="content.disclosure.content"
        :options="quillOptions"
      />
    </div>
    <div class="d-flex v-application switches justify-content-between">
      <div>
        <v-switch
          v-model="is_processed"
          label="Пункт выполнен"
        />
        <div class="notice">
          Пункт помечен как "выполнен" до следующего отчетного периода
        </div>
      </div>
      <div>
        <v-switch
          v-model="is_show"
          label="Активен"
        />
        <div class="notice">
          Пункт должен быть отображен на странице раскрытия информации.
        </div>
      </div>
      <div class="inputs mt-17">
        <div class="select-wrapper">
          <select v-model="groupBy" class="form-control">
            <option value="0">
              Не группировать
            </option>
            <option value="1">
              По кварталам
            </option>
            <option value="0">
              По годам
            </option>
          </select>
        </div>
        <div class="notice">
          Пункт должен быть отображен на странице раскрытия информации.
        </div>
      </div>
    </div>
    <div class="mt-20">
      <button v-b-modal.add-document-modal class="btn blue-button">
        Добавить документ
      </button>
      <div class="clearfix" />
    </div>
    <div class="docs mt-20">
      <DocumentsItem
        v-for="(doc, index) in files"
        :key="doc.id"
        :doc="doc"
        :docs-count="files.length"
        :index="index"
        @remove-file="removeFile"
      />
    </div>
    <template #modal-footer>
      <div class="d-flex justify-content-between">
        <div>
          <button type="button" class="btn blue-button" @click="$bvModal.hide('disclosure-modal')">
            Назад
          </button>
        </div>
        <div>
          <button type="button" class="btn blue-button" @click="save">
            Сохранить
          </button>
        </div>
      </div>
    </template>
    <AddDocumentModal
      :disclosure-label-id="content.disclosureListItem.id"
      :disclosure-id="disclosureId"
      @file-upload-after="fileUploadAfter"
    />
  </b-modal>
</template>

<script>
import AddDocumentModal from '@/components/disclosure/AddDocumentModal'
import DocumentsItem from '@/components/AppDoc'
export default {
  name: 'DisclosureModal',
  components: {
    AddDocumentModal,
    DocumentsItem
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop,vue/require-prop-types
    content: {
      disclosure: {},
      disclosureListItem: {},
      docs: {}
    }
  },
  data () {
    return {
      groupBy: 0,
      is_processed: 0,
      disclosureId: null,
      files: Object,
      is_show: 0,
      disclosureText: '',
      quillOptions: {
        placeholder: '',
        modules: {
          toolbar: true
        },
        theme: 'snow'
      }
    }
  },
  methods: {
    initModal () {
      if (this.content.disclosure.is_processed) {
        this.is_processed = this.content.disclosure.is_processed
      }
      if (this.content.disclosure.is_show) {
        this.is_show = this.content.disclosure.is_show
      }
      if (this.content.disclosure.content) {
        this.disclosureText = this.content.disclosure.content
      }
      if (this.content.disclosure.id) {
        this.disclosureId = this.content.disclosure.id
      }
      if (this.content.docs) {
        this.files = this.content.docs
      }
    },
    getTitle () {
      return this.content.disclosureListItem.type_label + ': ' + this.content.disclosureListItem.title
    },
    fileUploadAfter (res) {
      this.disclosureId = res.disclosure.id
      this.files = res.docs
    },
    removeFile (fileData) {
      const formData = {
        disclosure_id: this.disclosureId,
        doc_id: fileData.id
      }
      this.setLoading(true)
      this.$axios.$post(process.env.LARAVEL_API_BASE_URL + '/api/disclosure/fileDelete', formData).then(
        (res) => {
          this.setLoading(false)
        }
      )
      this.files.splice(fileData.index, 1)
    },
    save () {
      const formData = {
        is_processed: Number(this.is_processed),
        is_show: Number(this.is_show),
        group_by: this.groupBy,
        disclosure_label_id: this.content.disclosureListItem.id,
        content: this.disclosureText,
        disclosure_id: this.disclosureId,
        docs: this.files
      }
      this.setLoading(true)
      this.$axios.$post(process.env.LARAVEL_API_BASE_URL + '/api/disclosure/save', formData).then(
        (res) => {
          this.setLoading(false)
          this.$emit('disclosure-list-update')
          this.$bvModal.hide('disclosure-modal')
        }
      )
    },
    initVars () {
      this.is_processed = 0
      this.is_show = 0
      this.groupBy = 0
      this.disclosureText = ''
      this.disclosureId = null
      this.files = null
    }
  }
}
</script>

<style scoped lang="scss">
  .inputs .select-wrapper::before {
    right: 32px;
  }
</style>
