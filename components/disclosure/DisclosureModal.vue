<template>
  <b-modal id="disclosure-modal" size="xl" :title="getTitle()" @show="initModal">
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
          label="Обязательно для заполнения"
        />
        <div class="notice">
          Пункт должен быть отображен на странице раскрытия информации.
        </div>
      </div>
      <div class="inputs mt-17">
        <div class="select-wrapper">
          <select class="form-control">
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
    </div>
    <template #modal-footer>
      <div class="d-flex justify-content-between">
        <div>
          <button type="button" class="btn blue-button">
            Назад
          </button>
        </div>
        <div>
          <button type="button" class="btn blue-button">
            Сохранить
          </button>
        </div>
      </div>
    </template>
    <AddDocumentModal
      :disclosure-label-id="content.disclosureListItem.id"
      :disclosure-id="content.disclosure.id"
    />
  </b-modal>
</template>

<script>
import AddDocumentModal from '@/components/disclosure/AddDocumentModal'
export default {
  name: 'DisclosureModal',
  components: {
    AddDocumentModal
  },
  props: {
    content: {
      disclosure: {},
      disclosureListItem: {},
      docs: {}
    }
  },
  data () {
    return {
      is_processed: '',
      is_show: '',
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
      this.is_processed = this.content.disclosure.is_processed
      this.is_show = this.content.disclosure.is_show
      this.disclosureText = this.content.disclosure.content
    },
    getTitle () {
      return this.content.disclosureListItem.type_label + ': ' + this.content.disclosureListItem.title
    }
  }
}
</script>

<style scoped lang="scss">
  .inputs .select-wrapper::before {
    right: 32px;
  }
</style>
