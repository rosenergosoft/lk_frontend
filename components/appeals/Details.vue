<template>
  <div class="personal-data">
    <div v-if="userCompany">
      <div>
        <label class="label">Выбор заявителя</label>
      </div>
      <div class="text-content">
        У вас указано не только физ. лицо, но и юридическое (или ИП), выберите на кого будет заключать договор.
      </div>
      <div class="details">
        <div class="form-group">
          <input id="phys" v-model="details.requester" type="radio" value="phys" name="requester-type"><label for="phys">Физическое лицо</label>
        </div>
        <div class="form-group">
          <input id="yur" v-model="details.requester" type="radio" value="yur" name="requester-type"><label for="yur">Юридическое лицо</label>
        </div>
        <div class="separator" />
      </div>
    </div>
    <div>
      <label class="label">Задайте вопрос</label>
    </div>
    <div class="text-content">
      Напишите свой вопрос в свободной форме
    </div>
    <div class="details">
      <div class="inputs">
        <textarea v-model="details.question" class="form-control" placeholder="Ваш вопрос" />
      </div>
    </div>
    <div class="details">
      <button v-b-modal.add-document-modal class="blue-button">
        Добавить документ
      </button>
    </div>
    <div class="clearfix" />
    <div class="details">
      <DocumentsItem
        v-for="(doc, index) in docs"
        :key="doc.id"
        :doc="doc"
        :index="index"
        @remove-file="removeFile"
        @download-file="downloadFile"
      />
    </div>
    <div class="clearfix" />
    <div class="d-flex justify-content-between">
      <div class="text-left button-wrapper">
        <button class="btn blue-button float-none" @click="goBack">
          Назад
        </button>
      </div>
      <div class="text-left button-wrapper">
        <button class="btn blue-button float-none" @click="submitDetails">
          Отправить обращение
        </button>
      </div>
    </div>
    <AddDocumentModal
      :entity-id="appealId"
      @file-upload-after="updateDocs"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fileDownload from 'js-file-download'
import AddDocumentModal from '@/components/AddDocumentModal'
import DocumentsItem from '@/components/AppDoc'
export default {
  name: 'Details',
  components: {
    AddDocumentModal,
    DocumentsItem
  },
  props: {
    appealId: {
      type: [Number, null],
      default: null
    }
  },
  data () {
    return {
      docs: {},
      details: {
        requester: '',
        question: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userCompany'
    ])
  },
  created () {
    if (!this.userCompany) {
      this.details.requester = 'phys'
    }
    this.getDocs()
  },
  methods: {
    validateDetails () {
      if (!this.details.requester) {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Заявитель не выбран', duration: 6000 })
        return false
      }
      if (!this.details.question) {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Введите ваш вопрос', duration: 6000 })
        return false
      }
      return true
    },
    submitDetails () {
      if (this.validateDetails()) {
        this.details.id = this.appealId
        this.setLoading(true)
        this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/appeals/create', this.details)
          .then((response) => {
            this.setLoading(false)
            if (response.data.success) {
              this.$router.push('/appeals/show/' + response.data.appeal.id)
            }
          })
      }
    },
    goBack () {
      this.$emit('back', 0)
    },
    updateDocs (res) {
      this.docs = res.docs
    },
    async getDocs () {
      const res = await this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/appeals/getDocs/' + this.appealId)
      if (res) {
        this.docs = res.docs
      }
    },
    removeFile (fileData) {
      const formData = {
        appeal_id: this.appealId,
        doc_id: fileData.id
      }
      this.setLoading(true)
      this.$axios.$post(process.env.LARAVEL_API_BASE_URL + '/api/appeals/fileDelete', formData).then(
        (res) => {
          this.setLoading(false)
        }
      )
      this.docs.splice(fileData.index, 1)
    },
    downloadFile (fileData) {
      this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/appeals/downloadFile/' + fileData.id, {
        responseType: 'blob'
      })
        .then((res) => {
          if (res) {
            fileDownload(res, fileData.name)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
