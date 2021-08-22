<template>
  <b-modal :id="'doc-signing-' + doc.id" centered size="md" title="Подпись документа" @show="init">
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
        <div v-if="!userCertificates">
          <div>Нет доступных ЭЦП для подписания документа.</div>
          <div class="d-flex">
            <div>
              <ul class="nav notice">
                <li class="nav-item">
                  Скачайте и установите <a href="https://www.cryptopro.ru/" target="_blank">КриптоПРО</a> (вместе с плагином) согласно инструкции.
                </li>
                <li class="nav-item">
                  Убедитесь что токен загружен на ваш компьютер и/или вставлена флэшка с ЭЦП
                </li>
                <li class="nav-item">
                  Подтвердите запрос на доступ к контейнеру с ЭЦП
                </li>
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
      <div v-if="user.phone">
        <template v-if="!smsSent" class="text-center">
          <span>Мы отправим код на ваш номер телефона указнный в вашем профиле <strong>(+{{ user.phone }})</strong></span>
          <div>
            <button class="btn blue-button float-none mt-3" @click="sendSMSCode">
              Отправить
            </button>
          </div>
        </template>
        <template v-else class="text-left">
          <label>Введите код из СМС:</label>
          <div class="inputs">
            <div class="form-group">
              <input v-model="smsCode" type="text" class="form-control">
            </div>
          </div>
        </template>
      </div>
      <div v-else class="inputs">
        <NuxtLink
          to="/account"
          class="nav-link"
          @click.native="$bvModal.hide('doc-signing-' + doc.id)"
        >
          Укажите ваш номер телефона
        </NuxtLink>
      </div>
    </template>
    <template #modal-footer class="d-block">
      <div class="d-flex justify-content-between">
        <div v-if="smsSent">
          <button type="button" class="btn blue-button" @click="confirmCode">
            Подписать
          </button>
        </div>
        <div>
          <button type="button" class="btn blue-button" @click="$bvModal.hide('doc-signing-' + doc.id)">
            Назад
          </button>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Signing',
  props: {
    doc: {
      type: Object,
      default () {
        return {}
      }
    }
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
          //
        }
      }
    },
    selectCertificate (cert) {
      this.selectedCert = cert
      const thumbprint = cert.thumbprint
      this.setLoading(true)
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
                this.setLoading(false)
              })
            })
          })
        })
    },
    deleteSignature (id) {
      this.setLoading(true)
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/document/unsign', { id })
        .then((res) => {
          if (res.data.success) {
            this.$parent.$emit('unsigned')
          }
          this.setLoading(false)
        })
    },
    sendSMSCode () {
      this.setLoading(true)
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/document/sendSms', { id: this.doc.id })
        .then((res) => {
          this.smsSent = true
          this.$notify({ type: 'success', title: 'Успех', text: 'Смс отправлено' })
          this.setLoading(false)
        })
    },
    confirmCode () {
      this.setLoading(true)
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/document/sign', {
        document_id: this.doc.id,
        type: 'sms',
        code: this.smsCode
      }).then((res) => {
        if (res.data.success) {
          this.$parent.$emit('signed')
          this.$bvModal.hide('doc-signing-' + this.doc.id)
          this.$notify({ type: 'success', title: 'Успех', text: 'Документ подписан' })
        }
        if (res.data.error) {
          this.$notify({ type: 'error', title: 'Ошибка', text: 'Проверьте правильность кода или повторите попытку еще раз' })
        }
        this.setLoading(false)
      })
    }
  }
}
</script>

<style scoped>

</style>
