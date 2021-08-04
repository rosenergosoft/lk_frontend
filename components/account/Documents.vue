<template>
  <div>
    <div class="personal-data">
      <div>
        <label class="label">Документы по физическому лицу</label>
      </div>
      <div class="file-upload">
        <button v-b-modal.modal-phys-docs type="button" class="btn blue-button">
          Загрузить
        </button>
        <upload-phys
          @uploaded="reloadDocs"
        />
      </div>
      <DocumentsItem
        v-for="doc in documents.phys"
        :key="doc.id"
        :doc="doc"
      />
    </div>
    <div v-if="userCompany" class="personal-data">
      <div class="separator sep-15" />
      <div>
        <label class="label">Документы по юридическому лицу или ИП</label>
      </div>
      <div class="file-upload">
        <button v-b-modal.modal-yur-docs type="button" class="btn blue-button">
          Загрузить
        </button>
        <upload-yur />
      </div>
      <DocumentsItem
        v-for="doc in documents.yur"
        :key="doc.id"
        :doc="doc"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadPhys from './documents/UploadPhys'
import UploadYur from './documents/UploadYur'
import DocumentsItem from './documents/DocumentsItem'

export default {
  name: 'Documents',
  components: {
    DocumentsItem,
    UploadPhys,
    UploadYur
  },
  data () {
    return {
      documents: {
        phys: [],
        yur: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'userCompany'
    ])
  },
  mounted () {
    this.reloadDocs()
  },
  methods: {
    reloadDocs () {
      this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/user/documents')
        .then((res) => {
          if (res.data.docs) {
            this.documents = res.data.docs
          }
        })
    }
  }
}
</script>
