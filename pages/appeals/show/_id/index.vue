<template>
  <div class="connection">
    <div class="page-title d-flex">
      <div class="active">
        Просмотр обращения
      </div>
    </div>
    <div v-if="loaded" class="new-request">
      <div class="boxes">
        <div class="box status-6">
          <h4>Управление</h4>
          <div class="personal-data">
            <div class="inputs">
              <label class="label">Сменить статус</label>
              <div class="select-wrapper">
                <select v-model="appeal.status" class="form-control" @change="changeStatus">
                  <option value="accepted">
                    В работе
                  </option>
                  <option value="replied">
                    Ожидает ответа пользователя
                  </option>
                  <option value="completed">
                    Выполнено
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="inputs">
            <textarea v-model="text" class="form-control" placeholder="Ответить" />
          </div>
          <div class="mt-20">
            <button class="btn blue-button" @click="sendMessage">
              Отправить ответ
            </button>
          </div>
          <div class="clearfix" />
        </div>
        <div class="box status-2">
          <h4>Заявка | <span class="red-warning">{{ status[appeal.status] }}</span></h4>
          <div class="personal-data">
            <div>
              <div class="notice">
                Заявка создана: {{ $moment(appeal.created_at).format('DD MMMM yyyy') }}
              </div>
            </div>
            <div class="separator" />
            <div class="d-flex justify-content-between">
              <div>
                <div>
                  <label class="label">Персональные данные</label>
                </div>
                <div class="text-content">
                  <div>{{ userProfile.first_name }} {{ userProfile.middle_name }} {{ userProfile.last_name }}</div>
                  <div>Паспорт: {{ userProfile.pasport }}, {{ userProfile.pasport_granted_by }}, {{ formatDate(userProfile.pasport_date) }}</div>
                </div>
              </div>
            </div>
            <div class="docs-show">
              <DocumentsItem
                v-for="doc in documents.phys"
                :key="doc.id"
                :doc="doc"
              />
            </div>
            <div class="separator" />
          </div>
          <div v-if="appeal.requester === 'yur'" class="personal-data">
            <div class="d-flex justify-content-between">
              <div>
                <div>
                  <label class="label">Юридическое лицо</label>
                </div>
                <div class="text-content">
                  <div>{{ company.name }}</div>
                  <div>ИНН: {{ company.inn }}</div>
                  <div>Адрес: {{ company.address }}</div>
                  <div class="mt-20">
                    <label class="label">Реквизиты</label>
                    <div>
                      Банк: {{ company.bank_name }}
                    </div>
                    <div>
                      БИК: {{ company.bank_bik }}
                    </div>
                    <div>
                      Расчетный счет: {{ company.check_account }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="docs-show">
              <DocumentsItem
                v-for="doc in documents.yur"
                :key="doc.id"
                :doc="doc"
              />
            </div>
            <div class="separator" />
          </div>
          <div class="personal-data">
            <div>
              <div v-if="appeal.question">
                <label class="label">Сообщения</label>
                <div class="d-flex justify-content-between align-items-center mt-20">
                  <div class="text-content d-flex">
                    <div class="person w40-square"></div>
                    <div class="">
                      <div class="label">
                        {{ userProfile.first_name }} {{ userProfile.last_name }}
                      </div>
                      <div>{{ appeal.question }}</div>
                    </div>
                  </div>
                  <div class="notice">
                    {{ $moment(appeal.created_at).format('hh:ss, DD MMMM yyyy') }}
                  </div>
                </div>
                <div class="separator"></div>
                <div class="private-messages">
                  <Message
                    v-for="message in messages"
                    :key="message.item"
                    :message="message"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="docs" class="box status-1">
          <h4>Загруженные файлы</h4>
          <div class="docs">
            <UploadedDocumentsItem
              v-for="(doc, index) in docs"
              :key="doc.id"
              :doc="doc"
              :index="index"
              :hide-delete-button="true"
              @download-file="downloadFile"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fileDownload from 'js-file-download'
import DocumentsItem from '~/components/account/documents/DocumentsItem'
import UploadedDocumentsItem from '~/components/disclosure/DocumentsItem'
import Message from '~/components/appeals/Message'
export default {
  name: 'Index',
  components: {
    DocumentsItem,
    UploadedDocumentsItem,
    Message
  },
  data () {
    return {
      appeal: {
        created_at: ''
      },
      company: {},
      documents: {
        phys: [],
        yur: []
      },
      docs: {},
      messages: {},
      text: '',
      loaded: false,
      userProfile: '',
      status: {
        draft: 'Черновик',
        accepted: 'В работе',
        in_progress: 'Исполняется',
        replied: 'Ожидает ответа пользователя',
        completed: 'Выполнен'
      }
    }
  },
  created () {
    this.getAppeal()
  },
  methods: {
    getMessages () {
      this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/appeals/getMessages/' + this.appeal.id)
        .then((res) => {
          if (res.success) {
            this.messages = res.messages
          }
        })
    },
    sendMessage () {
      const formData = {
        appeal_id: this.appeal.id,
        message: this.text
      }
      this.$axios.$post(process.env.LARAVEL_API_BASE_URL + '/api/appeals/sendMessage', formData)
        .then((res) => {
          if (res.success) {
            this.text = ''
            this.$notify({ type: 'success', title: 'Успех', text: 'Сообщение отправлено' })
            this.messages = res.messages
          }
        })
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
    },
    changeStatus () {
      const formData = {
        appeal_id: this.appeal.id,
        status: this.appeal.status
      }
      this.$axios.$post(process.env.LARAVEL_API_BASE_URL + '/api/appeals/changeStatus', formData)
        .then((res) => {
          if (res.success) {
            this.$notify({ type: 'success', title: 'Успех', text: 'Статус изменен' })
          }
        })
    },
    async getAppeal () {
      const id = this.$route.params.id
      try {
        const res = await this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/appeals/get/' + id)
        if (res.appeal) {
          this.appeal = res.appeal
        }
        if (res.userProfile) {
          this.userProfile = res.userProfile
        }
        if (res.company) {
          this.company = res.company
        }
        await this.getDocuments()
        await this.getDocs()
        this.getMessages()
        this.loaded = true
      } catch (e) {
        // console.log(e)
      }
    },
    formatDate (date) {
      return this.$moment.utc(date).format('DD-MM-YYYY')
    },
    async getDocs () {
      const id = this.$route.params.id
      const res = await this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/appeals/getDocs/' + id)
      if (res) {
        this.docs = res.docs
      }
    },
    async getDocuments () {
      const res = await this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/user/documents')
      if (res.data.docs) {
        this.documents = res.data.docs
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .red-warning {
    color: $redWarning !important;
  }
</style>
