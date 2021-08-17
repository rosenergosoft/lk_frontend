<template>
  <b-modal :id="'doc-signing' + doc.id" centered size="xl" title="Подпись документа" @show="init">
    <template v-if="userCompany">
      <div v-if="doc.signature">
        <div>
          <span>Документ подписан:</span>
        </div>
        <div class="d-flex">
          <div>ICON</div>
          <div>
            <div>Представитель компании</div>
            <div> {{ $moment(doc.signature.created_at).format('DD MMM YYYY') }} г. </div>
          </div>
          <div>
            <div>download icon</div>
            <div @click="deleteSignature(doc.signature.id)">
              delete icon
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span>Добавление подписи ЭЦП:</span>
        </div>
        <div v-if="!userCertificates">
          <div>Нет доступных ЭЦП для подписания документа. </div>
          <div class="d-flex">
            <div />
            <div>
              <ul>
                <li>Скачайте и установите <a href="https://www.cryptopro.ru/" target="_blank">КриптоПРО</a> (вместе с плагином) согласно инструкции.</li>
                <li>Убедитесь что токен загружен на ваш компьютер и/или вставлена флэшка с ЭЦП</li>
                <li>Подтвердите запрос на доступ к контейнеру с ЭЦП</li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-for="(cert, index) in userCertificates" :key="index">
            <div style="cursor: pointer" @click="selectCertificate(cert)">
              ОГРН ДО {{ $moment(cert.validTo).format('DD MMM YYYY') }} г.
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        <div>Подписать через SMS:</div>
      </div>
      <div v-if="user.phone">
        <template v-if="!smsSent">
          <span>Мы отправим код на ваш номер телефона указнный в вашем профиле (+{{ user.phone }})</span>
          <button @click="sendSMSCode">
            Отправить
          </button>
        </template>
        <template v-else>
          <label>Введите код из СМС:</label>
          <input v-model="smsCode" type="number">
          <button @click="confirmCode">
            Подписать
          </button>
        </template>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Signing',
  props: {
    doc: Object
  },
  data () {
    return {
      userCertificates: null,
      selectedCert: null,
      smsSent: false,
      smsCode: null
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'userCompany'
    ])
  },
  methods: {
    async init () {
      if (this.userCompany) {
        let certificates
        try {
          certificates = await this.$cryptopro.getUserCertificates()
          this.userCertificates = certificates
        } catch (error) {
          console.log(error)
        }
      }
    },
    selectCertificate (cert) {
      this.selectedCert = cert
      const thumbprint = cert.thumbprint
      this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/user/document/sign?id=' + this.doc.id, { responseType: 'arraybuffer' })
        .then((res) => {
          this.$cryptopro.createHash(res.data).then((hash) => {
            this.$cryptopro.createDetachedSignature(thumbprint, hash).then((signature) => {
              this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/document/sign', {
                document_id: this.doc.id,
                type: 'eds',
                hash,
                sign: signature
              }).then((res) => {
                if (res.data.success) {
                  this.$parent.$emit('signed')
                }
              })
            })
          })
        })
    },
    deleteSignature (id) {
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/document/unsign', { id })
        .then((res) => {
          if (res.data.success) {
            this.$parent.$emit('unsigned')
          }
        })
    },
    sendSMSCode () {
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/document/sendSms', { id: this.doc.id })
        .then((res) => {
          this.smsSent = true
        })
    },
    confirmCode () {
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/document/sign', {
        document_id: this.doc.id,
        type: 'sms',
        code: this.smsCode
      }).then((res) => {
        if (res.data.success) {
          this.$parent.$emit('signed')
          this.$bvModal.hide('doc-signing')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
