<template>
  <b-modal id="modal-phys-data" centered title="Паспортные данные" @show="initProfile">
    <div class="d-flex inputs justify-content-between">
      <div class="form-group col-4 mr-20">
        <input v-model="profileData.first_name" type="text" class="form-control" placeholder="Имя">
      </div>
      <div class="form-group col-4 mr-20">
        <input v-model="profileData.last_name" type="text" class="form-control" placeholder="Фамилия">
      </div>
      <div class="form-group col-4">
        <input v-model="profileData.middle_name" type="text" class="form-control" placeholder="Отчество">
      </div>
    </div>
    <div class="inputs form-group">
      <input v-model="profileData.pasport" v-mask="'#### ######'" type="text" class="form-control" placeholder="Серия и номер паспорта">
    </div>
    <div class="d-flex inputs justify-content-between">
      <div class="form-group col-9 mr-20">
        <input v-model="profileData.pasport_granted_by" type="text" class="form-control" placeholder="Кем выдан">
      </div>
      <div class="form-group col-3">
        <DatePicker
          v-model="profileData.pasport_date"
          :format="'dd.MM.yyyy'"
          :language="ru"
          :monday-first="true"
          input-class="form-control"
          placeholder="Дата выдачи"
        />
      </div>
    </div>
    <div class="inputs form-group">
      <input v-model="profileData.reg_address" type="text" class="form-control" placeholder="Адрес регистрации">
    </div>
    <div class="inputs form-group">
      <input v-model="profileData.phys_address" type="text" class="form-control" placeholder="Адрес проживания (если отличается)">
    </div>
    <template #modal-footer>
      <button type="button" class="btn blue-button" @click="submitProfile">
        Сохранить
      </button>
    </template>
  </b-modal>
</template>

<script>
import { ru } from 'vuejs-datepicker/dist/locale'
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  data () {
    return {
      ru,
      profileData: {
        first_name: '',
        last_name: '',
        middle_name: '',
        pasport: '',
        pasport_granted_by: '',
        pasport_date: '',
        reg_address: '',
        phys_address: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    initProfile () {
      Object.assign(this.profileData, this.user.profile)
    },
    validateProfile () {
      if (!this.profileData.first_name ||
        !this.profileData.middle_name ||
        !this.profileData.last_name ||
        !this.profileData.pasport ||
        !this.profileData.pasport_granted_by ||
        !this.profileData.pasport_date ||
        !this.profileData.reg_address
      ) {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Все поля должны быть заполнены' })
        return false
      } else {
        return true
      }
    },
    submitProfile () {
      if (this.validateProfile()) {
        this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/profile', this.profileData)
          .then((response) => {
            if (response.data.success) {
              this.$store.commit('UPDATE_USER_PROFILE', response.data.user.profile)
              this.$bvModal.hide('modal-phys-data')
            }
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
