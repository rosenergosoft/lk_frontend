<template>
  <b-modal
    id="modal-users-edit"
    centered
    size="xl"
    :title="modalTitle"
    @show="init"
    @close="closeHandle"
    @hide="closeHandle"
  >
    <div class="content">
      <b-tabs content-class="mt-3">
        <b-tab title="Основаня информация">
          <div class="row inputs">
            <div class="col">
              <div class="form-group">
                <label>Тип пользователя</label>
                <div class="select-wrapper">
                  <select v-model="userData.type" class="form-control" :disabled="isEdit && !isExecutive">
                    <option value="">
                      Выберите тип пользователя
                    </option>
                    <option value="admin">
                      Администратор
                    </option>
                    <option value="vendor">
                      Гарантийный поставщик
                    </option>
                    <option value="customer">
                      Потребитель
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="row inputs">
            <div class="col-6 pr-2">
              <div class="form-group">
                <label>Email*</label>
                <input v-model="userData.email" class="form-control" type="text">
              </div>
            </div>
            <div class="col-6 pl-2">
              <div class="form-group">
                <label>Телефон</label>
                <input v-model="displayPhone" v-mask="phoneMask" class="form-control" type="text">
              </div>
            </div>
          </div>
          <div class="row inputs">
            <div class="col">
              <div class="form-group">
                <label>Пароль*</label>
                <input v-model="userData.password" class="form-control" type="password">
              </div>
            </div>
          </div>
          <div v-if="userData.type === 'vendor'" class="row inputs">
            <div class="col">
              <div class="form-group">
                <label>Название компании*</label>
                <input v-model="userData.vendor_name" type="text" class="form-control">
              </div>
            </div>
          </div>
          <div v-if="userData.type === 'customer'" class="row inputs">
            <div class="col">
              <div class="form-group">
                <label>СНИЛС</label>
                <input v-model="displaySnils" v-mask="'###-###-### ##'" type="text" class="form-control">
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>ОГРН</label>
                <input v-model="userData.ogrn" type="text" class="form-control">
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>ОГРНИП</label>
                <input v-model="userData.ogrnip" type="text" class="form-control">
              </div>
            </div>
          </div>
          <div v-if="!isEdit" class="row inputs">
            <div class="col">
              <div class="v-application">
                <v-switch
                  v-model="userData.is_active"
                  label="Активен"
                />
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab v-if="userData.type === 'customer'" title="Профиль пользователя">
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col inputs">
                  <div class="form-group">
                    <label>Фамилия</label>
                    <input v-model="userProfile.last_name" type="text" class="form-control">
                  </div>
                </div>
                <div class="col inputs">
                  <div class="form-group">
                    <label>Имя</label>
                    <input v-model="userProfile.first_name" type="text" class="form-control">
                  </div>
                </div>
                <div class="col inputs">
                  <div class="form-group">
                    <label>Отчество</label>
                    <input v-model="userProfile.middle_name" type="text" class="form-control">
                  </div>
                </div>
              </div>
              <div class="row inputs">
                <div class="col">
                  <div class="form-group">
                    <label>Лицевой счет</label>
                    <input v-model="userProfile.account" type="text" class="form-control">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab v-if="userData.type === 'customer'" title="Файлы пользователя" @click="loadFiles">
          <DocumentsItem
            v-for="doc in documents.phys"
            :key="doc.id"
            :doc="doc"
            @deleted="handleDelete"
            @signed="handleSigned"
            @unsigned="loadFiles"
          />
          <DocumentsItem
            v-for="doc in documents.yur"
            :key="doc.id"
            :doc="doc"
            @deleted="handleDelete"
            @signed="handleSigned"
            @unsigned="loadFiles"
          />
        </b-tab>
      </b-tabs>
    </div>
    <template #modal-footer>
      <div>
        <div>
          <button type="button" class="btn blue-button" @click="saveUser">
            Сохранить
          </button>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script>
import DocumentsItem from '../account/documents/DocumentsItem'
export default {
  name: 'Edit',
  components: {
    DocumentsItem
  },
  data () {
    return {
      displaySnils: '',
      displayPhone: '',
      phoneMask: '+7 (###) ###-##-##',
      userData: {
        type: ''
      },
      userProfile: {},
      documents: {
        phys: [],
        yur: []
      }
    }
  },
  computed: {
    modalTitle () {
      if (this.$route.query.id) {
        return 'Редактирование'
      }
      return 'Создание'
    },
    isEdit () {
      return !!(this.$route.query.id)
    }
  },
  watch: {
    displaySnils (val) {
      if (val && typeof (val) === 'string') {
        this.userData.snils = val.replace(/[^0-9]/g, '')
      }
    },
    displayPhone (val) {
      if (val && typeof (val) === 'string') {
        this.userData.phone = val.replace(/[^0-9]/g, '')
      }
    }
  },
  methods: {
    init () {
      if (this.isEdit) {
        this.setLoading(true)
        this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/user/' + this.$route.query.id)
          .then((res) => {
            if (res.data.success) {
              this.phoneMask = '+# (###) ###-##-##'
              this.userData = {
                id: res.data.user.id,
                type: res.data.user.type,
                email: res.data.user.email,
                phone: res.data.user.phone,
                vendor_name: (res.data.user.vendor) ? res.data.user.vendor.name : '',
                snils: res.data.user.snils,
                ogrn: res.data.user.ogrn,
                ogrnip: res.data.user.ogrnip,
                is_active: res.data.user.is_active
              }
              this.displaySnils = res.data.user.snils
              this.displayPhone = res.data.user.phone
              this.userProfile = res.data.user.profile ?? {}
            }
            this.setLoading(false)
          })
      } else {
        this.userData = {
          type: '',
          is_active: 0
        }
      }
    },
    closeHandle () {
      if (this.$route.query.id) {
        const query = Object.assign({}, this.$route.query)
        delete query.id
        this.$router.replace({ query }).catch(
          (e) => {
            //
          }
        )
      }
    },
    saveUser () {
      if (!this.userData.email && !this.userData.password) {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Email и Пароль обязательные поля' })
        return
      }
      if (this.userData.type === 'vendor' && !this.userData.vendor_name) {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Название компании обязательное поле' })
        return
      }
      const data = {
        userData: this.userData,
        userProfile: this.userProfile
      }
      this.setLoading(true)
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/save', data)
        .then((res) => {
          if (res.data.success) {
            this.$emit('updated')
            this.$bvModal.hide('modal-users-edit')
          }
          this.setLoading(false)
        }).catch(() => {
          this.setLoading(false)
        })
    },
    loadFiles () {
      this.setLoading(true)
      this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/user/documents?id=' + this.$route.query.id)
        .then((res) => {
          if (res.data.docs) {
            this.documents = res.data.docs
          }
          this.setLoading(false)
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

<style scoped>

</style>
