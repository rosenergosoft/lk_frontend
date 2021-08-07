<template>
  <b-modal id="disclosure-modal" size="xl" :title="getTitle()">
    <div>
      <quill-editor
        class="quill"
        :content="content.content"
        :options="quillOptions"
      />
    </div>
    <div class="d-flex v-application">
      <v-switch
        v-model="is_processed"
        label=""
      />
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
  </b-modal>
</template>

<script>
export default {
  name: 'DisclosureModal',
  props: {
    content: Object
  },
  data () {
    return {
      is_processed: false,
      is_show: false,
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
    getTitle () {
      return this.content.type_label + ': ' + this.content.title
    }
  }
}
</script>

<style scoped>

</style>
