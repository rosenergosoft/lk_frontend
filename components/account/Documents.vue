<template>
  <div>
    <div class="personal-data">
      <div>
        <label class="label">Документы по физическому лицу</label>
      </div>
      <div v-if="canUploadPhys" class="file-upload">
        <button v-b-modal.modal-phys-docs type="button" class="btn blue-button">
          Загрузить
        </button>
        <upload-phys
          :docs="documents.phys"
          @uploaded="reloadDocs"
        />
      </div>
      <DocumentsItem
        v-for="doc in documents.phys"
        :key="doc.id"
        :doc="doc"
        @deleted="handleDelete"
        @signed="handleSigned"
        @unsigned="reloadDocs"
      />
    </div>
    <div v-if="userCompany" class="personal-data">
      <div class="separator sep-15" />
      <div>
        <label class="label">Документы по юридическому лицу или ИП</label>
      </div>
      <div v-if="canUploadYur" class="file-upload">
        <button v-b-modal.modal-yur-docs type="button" class="btn blue-button">
          Загрузить
        </button>
        <upload-yur
          :docs="documents.yur"
          @uploaded="reloadDocs"
        />
      </div>
      <DocumentsItem
        v-for="doc in documents.yur"
        :key="doc.id"
        :doc="doc"
        @deleted="handleDelete"
        @signed="handleSigned"
        @unsigned="reloadDocs"
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
    ]),
    canUploadPhys () {
      return (this.documents.phys.length === 0 ||
        !(this.documents.phys.find(item => item.type === 'proxy') &&
        this.documents.phys.find(item => item.type === 'personal_id'))
      )
    },
    canUploadYur () {
      return (this.documents.yur.length === 0 ||
          !(this.documents.yur.find(item => item.type === 'yur_proxy') &&
            this.documents.yur.find(item => item.type === 'yur_ustav') &&
            this.documents.yur.find(item => item.type === 'yur_prikaz') &&
            this.documents.yur.find(item => item.type === 'yur_sgr') &&
            this.documents.yur.find(item => item.type === 'yur_pszun')
          )
      )
    }
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
          this.$emit('docs', this.documents)
        })
    },
    handleDelete () {
      this.reloadDocs()
    },
    handleSigned () {
      this.reloadDocs()
    }
  }
}
</script>
