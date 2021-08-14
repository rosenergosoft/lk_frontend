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
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>Тип пользователя</label>
                <select v-model="userData.type" class="form-control">
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
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>Email</label>
                <input v-model="userData.email" class="form-control" type="text" />
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>Пароль</label>
                <input v-model="userData.password" class="form-control" type="password" />
              </div>
            </div>
          </div>
          <div v-if="userData.type === 'vendor'" class="row">
            <div class="col">
              <div class="form-group">
                <label>Название компании</label>
                <input v-model="userData.vendor_name" type="text" class="form-control">
              </div>
            </div>
          </div>
          <div v-if="userData.type === 'customer'" class="row">
            <div class="col">
              <div class="form-group">
                <label>СНИЛС</label>
                <input v-model="userData.snils" type="text" class="form-control">
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
          <div class="row">
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
          Тут какя-то инфа о ебучем пользователе
        </b-tab>
        <b-tab v-if="userData.type === 'customer'" title="Файлы пользователя">
          Тут ебучие файлы пользователя
        </b-tab>
      </b-tabs>
    </div>
    <template #modal-footer>
      <div class="d-flex justify-content-between">
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
export default {
  name: 'Edit',
  data () {
    return {
      userData: {
        type: ''
      }
    }
  },
  computed: {
    modalTitle () {
      if (this.$route.query.id) {
        return 'Редактирвоание'
      }
      return 'Создание'
    },
    isEdit () {
      return !!(this.$route.query.id)
    }
  },
  methods: {
    init () {
      if (this.isEdit) {
        this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/user/' + this.$route.query.id)
          .then((res) => {
            if (res.data.success) {
              this.userData = {
                id: res.data.user.id,
                type: res.data.user.type,
                email: res.data.user.email,
                vendor_name: (res.data.user.vendor) ? res.data.user.vendor.name : '',
                snils: res.data.user.snils,
                ogrn: res.data.user.ogrn,
                ogrnip: res.data.user.ogrnip,
                is_active: res.data.user.is_active
              }
            }
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
        this.$router.replace({ query })
      }
    },
    saveUser () {
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/save', this.userData)
        .then((res) => {
          if (res.data.success) {
            this.$emit('updated')
            this.$bvModal.hide('modal-users-edit')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
