<template>
  <div class="box status-1 col-6 mr-20">
    <h4>Доступ к личному кабинету</h4>
    <div class="inputs">
      <div v-if="type !== 'email'" class="form-group">
        <input v-if="type === 'phys'" v-model="formData.snils" type="text" placeholder="СНИЛС" class="form-control">
        <input v-if="type === 'yur'" v-model="formData.ogrn" type="text" placeholder="ОГРН" class="form-control">
        <input v-if="type === 'ip'" v-model="formData.ogrn" type="text" placeholder="ОГРНИП" class="form-control">
      </div>
      <div class="form-group d-flex justify-content-between">
        <input v-model="formData.email" type="email" placeholder="Имейл" class="form-control mr-20">
        <input v-model="formData.phone" v-mask="'+7 (###) ###-##-##'" type="tel" placeholder="Номер телефона" class="form-control">
      </div>
      <label class="label">Смена пароля</label>
      <div class="form-group">
        <input v-model="passwordData.oldPassword" type="password" placeholder="Старый пароль" class="form-control">
      </div>
      <div class="form-group">
        <input v-model="passwordData.newPassword" type="password" placeholder="Новый пароль" class="form-control">
      </div>
      <div class="form-group">
        <input v-model="passwordData.confirmNewPassword" type="password" placeholder="Новый пароль еще раз" class="form-control">
      </div>
      <div class="form-group">
        <button class="btn blue-button" @click="submitAccountForm">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Form',
  data () {
    return {
      formData: {
        snils: '',
        email: '',
        phone: '',
        ogrn: '',
        ogrnip: ''
      },
      passwordData: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'userProfile'
    ]),
    type () {
      return this.user.login_type
    }
  },
  mounted () {
    Object.assign(this.formData, this.user)
  },
  methods: {
    submitAccountForm () {
      const data = Object.assign({}, this.formData, this.passwordData)
      data.login_type = this.type
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user', data)
        .then((res) => {
          if (res.data.success) {
            this.$store.commit('UPDATE_USER', res.data.user)
            Object.assign(this.passwordData, {
              oldPassword: '',
              newPassword: '',
              confirmNewPassword: ''
            })
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
