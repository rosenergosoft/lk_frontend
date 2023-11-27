<template>
  <div class="login-container">
    <notifications />
    <div class="d-flex align-items-center flex-wrap" style="min-height: 100vh; padding: 40px 0;" :class="currentStep === 1 ? 'flex-column': ''">
      <div v-if="currentStep === 0" class="login-form">
        <div class="bg-white">
          <div class="row">
            <div class="form-container">
              <h2>
                Авторизация
              </h2>
              <div>
                <ul>
                  <li class="nav-item">
                    <input id="snils" v-model="loginData.type" type="radio" name="type" value="phys"><label for="snils">Физическое
                      лицо (вход по СНИЛС)</label>
                  </li>
                  <li class="nav-item">
                    <input id="ogrn" v-model="loginData.type" type="radio" name="type" value="yur"><label for="ogrn">Юридическое
                      лицо (вход по ОГРН)</label>
                  </li>
                  <li class="nav-item">
                    <input id="ogrnip" v-model="loginData.type" type="radio" name="type" value="ip"><label for="ogrnip">Индивидуальный
                      предприниматель (вход по ОГРНИП)</label>
                  </li>
                  <li class="nav-item">
                    <input id="by-email" v-model="loginData.type" type="radio" name="type" value="email"><label
                      for="by-email"
                    >Вход по электронной почте</label>
                  </li>
                </ul>
                <div class="inputs">
                  <div v-if="loginData.type === 'phys'" class="form-group">
                    <input
                      v-model="loginData.snils"
                      v-mask="'###-###-### ##'"
                      :placeholder="placeholder"
                      type="text"
                      class="form-control"
                    >
                  </div>
                  <div v-if="loginData.type === 'yur'" class="form-group">
                    <input v-model="loginData.ogrn" :placeholder="placeholder" type="text" class="form-control">
                  </div>
                  <div v-if="loginData.type === 'ip'" class="form-group">
                    <input v-model="loginData.ogrnip" :placeholder="placeholder" type="text" class="form-control">
                  </div>
                  <div v-if="loginData.type === 'email'" class="form-group">
                    <input v-model="loginData.email" :placeholder="placeholder" type="text" class="form-control">
                  </div>
                  <div class="form-group">
                    <input
                      v-model="loginData.password"
                      type="password"
                      class="form-control"
                      placeholder="Пароль"
                      @keyup.enter="submitLogin"
                    >
                  </div>
                </div>
              </div>
              <div class="form-group d-flex justify-content-between">
                <div>
                  <button class="btn submit" @click="submitLogin">
                    Войти
                  </button>
                </div>
                <div>
                  <button class="btn reg" @click="nextTo(1)">
                    Регистрация
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentStep === 1" class="login-form mx-auto">
        <div class="bg-white">
          <div class="row">
            <div class="col form-container">
              <h2 class="text-2xl leading-7 font-semibold">
                Регистрация
              </h2>
              <div class="login-form-row">
                <div class="steps">
                  <div class="step-title">
                    1. Способ входа
                  </div>
                  <div class="step-description">
                    Выберите тип аккаунта для определения способа входа. В последствии вы можете изменить его в вашем
                    профиле.
                  </div>
                </div>
                <ul>
                  <li>
                    <input id="phys" v-model="type" type="radio" value="phys" name="type"><label for="phys">Физическое
                      лицо (вход по СНИЛС)</label>
                  </li>
                  <li>
                    <input id="yur" v-model="type" type="radio" value="yur" name="type"><label for="yur">Юридическое
                      лицо (вход по ОГРН)</label>
                  </li>
                  <li>
                    <input id="ip" v-model="type" type="radio" value="ip" name="type"><label for="ip">Индивидуальный
                      предприниматель (вход по ОГРНИП)</label>
                  </li>
                </ul>
                <div class="inputs">
                  <div v-if="type === 'phys'" class="form-group">
                    <input
                      v-model="display.snils"
                      v-mask="'###-###-### ##'"
                      type="text"
                      class="form-control"
                      placeholder="СНИЛС"
                    >
                  </div>
                  <div v-if="type === 'yur'" class="form-group">
                    <input v-model="ogrn" type="text" class="form-control" placeholder="ОГРН">
                  </div>
                  <div v-if="type === 'ip'" class="form-group">
                    <input v-model="ogrnip" type="text" class="form-control" placeholder="ОГРНИП">
                  </div>
                  <div class="form-group">
                    <input v-model="password" type="password" class="form-control" placeholder="Пароль">
                  </div>
                  <div class="form-group">
                    <input
                      v-model="confirmPassword"
                      type="password"
                      class="form-control"
                      placeholder="Повторите пароль"
                    >
                  </div>
                </div>
              </div>
              <div class="form-group d-flex justify-content-between">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentStep === 1" class="login-form mx-auto">
        <div class="bg-white">
          <div class="row">
            <div class="col form-container">
              <div class="login-form-row">
                <div class="steps">
                  <div class="step-title">
                    2. Контактная информация
                  </div>
                  <div class="step-description">
                    Укажите телефон и электронную почту для связи и уведомлений о изменениях по ваших заявкам, договору
                    и тарифах
                  </div>
                </div>
                <div class="inputs">
                  <div class="form-group">
                    <input v-model="email" type="text" class="form-control" placeholder="Электронная почта для связи">
                  </div>
                  <div class="form-group">
                    <input
                      v-model="display.phone"
                      v-mask="'+7 (###) ###-##-##'"
                      type="tel"
                      class="form-control"
                      placeholder="Телефон для уведомлений"
                    >
                  </div>
                </div>
              </div>
              <div class="form-group d-flex justify-content-between">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentStep === 1" class="login-form mx-auto">
        <div class="bg-white">
          <div class="row">
            <div class="col form-container">
              <div class="login-form-row">
                <div class="steps">
                  <div class="step-title">
                    3. Соглашения
                  </div>
                  <div v-if="host == 'lk.rsosiluet.ru'">
                    <div class="form-group login-form-checkbox">
                      <input id="agreement1" v-model="agreement" type="checkbox"><label for="agreement1">Я принимаю условия <a href="https://rsosiluet.ru/privacy-policy" target="_blank">Политики конфиденциальности</a></label>
                    </div>
                    <div class="form-group login-form-checkbox">
                      <input id="agreement2" v-model="agreement2" type="checkbox"><label for="agreement2">Я даю <a href="https://rsosiluet.ru/user-agreement" target="_blank">Согласие на обработку персональных данных</a></label>
                    </div>
                  </div>
                  <div v-else-if="host == 'lk.zoloto-krs.ru'">
                    <div class="form-group login-form-checkbox">
                      <input id="agreement3" v-model="agreement" type="checkbox"><label for="agreement4">Я принимаю условия <a href="https://zoloto-krs.ru/privacy-policy" target="_blank">Политики конфиденциальности</a></label>
                    </div>
                    <div class="form-group login-form-checkbox">
                      <input id="agreement4" v-model="agreement2" type="checkbox"><label for="agreement4">Я даю <a href="https://zoloto-krs.ru/user-agreement" target="_blank">Согласие на обработку персональных данных</a></label>
                    </div>
                  </div>
                  <div v-else-if="host == 'lk.sks-energo.ru'">
                    <div class="form-group login-form-checkbox">
                      <input id="agreement5" v-model="agreement" type="checkbox"><label for="agreement5">Я принимаю условия на <a href="https://sks-energo.ru/politika-confidencialnosti/" target="_blank">Политики конфиденциальности</a></label>
                    </div>
                    <div class="form-group login-form-checkbox">
                      <input id="agreement6" v-model="agreement2" type="checkbox"><label for="agreement6">Я даю <a href="https://sks-energo.ru/soglashenie-na-obrabotku-dannyh/" target="_blank">Согласие на обработку персональных данных</a></label>
                    </div>
                  </div>
                  <div v-else>
                    <div class="form-group login-form-checkbox">
                      <input id="agreement7" v-model="agreement" type="checkbox"><label for="agreement7">Я принимаю условия на <a href="#" target="_blank">Политики конфиденциальности</a></label>
                    </div>
                    <div class="form-group login-form-checkbox">
                      <input id="agreement8" v-model="agreement2" type="checkbox"><label for="agreement8">Я даю <a href="#" target="_blank">Согласие на обработку персональных данных</a></label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group d-flex justify-content-between">
                <div>
                  <button class="btn reg" @click="nextTo(0)">
                    Авторизация
                  </button>
                </div>
                <div>
                  <button class="btn submit" @click="submitRegistration">
                    Зарегистрироваться
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentStep === 666" class="login-form mx-auto">
        <div class="bg-white">
          <div class="row" style="padding-bottom: 50px;">
            <div class="form-container">
              <h2 class="text-2xl leading-7 font-semibold">
                Демо доступ
              </h2>
              <div class="login-form-row text-center mt-5">
                <div class="row">
                  <div class="col-12">
                    <button class="btn submit mb-0" @click="demo('admin')">
                      Войти как администратор
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <button class="btn submit mt-0 mb-0" @click="demo('customer')">
                      Войти как пользователь
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <button class="btn submit mt-0 mb-0" @click="demo('vendor')">
                      Войти как поставщик
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dataValidation from '../mixins/dataValidation'

export default {
  name: 'Login',
  mixins: [dataValidation],
  layout: 'auth',
  asyncData ({ req }) {
    if (req) {
      const host = req.headers.host
      return { host }
    }
  },
  data () {
    return {
      currentStep: 0,
      notaclient: false,
      loginData: {
        snils: '',
        ogrn: '',
        ogrnip: '',
        email: '',
        password: '',
        type: 'phys'
      },
      email: '',
      agreement: false,
      agreement2: false,
      password: '',
      confirmPassword: '',
      phone: '',
      type: 'phys',
      snils: '',
      ogrn: '',
      ogrnip: '',
      account: '',
      name: '',
      display: {
        snils: '',
        phone: ''
      },
      passwordError: {
        required: {},
        confirm: {}
      }
    }
  },
  head: {
    bodyAttrs: {
      class: 'login'
    }
  },
  computed: {
    placeholder () {
      switch (this.loginData.type) {
        case 'phys':
          return 'СНИЛС'
        case 'yur':
          return 'ОГРН'
        case 'ip':
          return 'ОГРНИП'
        case 'email':
          return 'Имейл'
      }
      return ''
    }
  },
  watch: {
    'display.snils' (val) {
      this.snils = val.replace(/[^0-9]/g, '')
    },
    'display.phone' (val) {
      this.phone = val.replace(/[^0-9]/g, '')
    },
    'loginData.snils' (val) {
      this.snils = val.replace(/[^0-9]/g, '')
    }
  },
  mounted () {
    if (process.env.VUE_APP_DEMO_HOST === this.host) {
      this.currentStep = 666
    }
  },
  methods: {
    async submitLogin () {
      const formData = JSON.parse(JSON.stringify(this.loginData))
      formData.snils = this.snils
      await this.$auth.login({
        data: formData
      }).catch((error) => {
        if (error.response.status === 401) {
          this.$notify({ type: 'error', title: 'Ошибка', text: 'Проверьте данные для входа. Если ошибка повторятся, обратитесь к администратору', duration: 6000 })
        }
      })
    },
    demo (type) {
      const credentials = {
        admin: {
          email: 'admin@demoenrgosoft.com',
          password: 'demo12Admin21',
          type: 'email'
        },
        customer: {
          email: 'customer@demoenrgosoft.com',
          password: 'demo12Customer21',
          type: 'email'
        },
        vendor: {
          email: 'vendor@demoenrgosoft.com',
          password: 'demo12Vendor21',
          type: 'email'
        }
      }

      this.$auth.login({
        data: credentials[type]
      })
    },
    submitRegistration () {
      if (this.validateFirstStep() && this.validateSecondStep() && this.validateThirdStep()) {
        const data = {
          password: this.password,
          email: this.email,
          account: this.account,
          name: this.name,
          login_type: this.type,
          phone: this.phone,
          host: this.host
        }

        if (this.type === 'phys') {
          data.snils = this.snils
        } else if (this.type === 'yur') {
          data.ogrn = this.ogrn
        } else {
          data.ogrnip = this.ogrnip
        }
        if (this.notaclient) {
          this.name = ''
          this.account = ''
        }
        this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/registration', data).then((resp) => {
          if (resp.data.success) {
            this.currentStep = 0
            this.$notify({ type: 'success', title: 'Успех', text: 'Теперь вы можете войти используя свои данные', duration: 6000 })
          } else if (resp.data.message === 'Duplicate') {
            this.$notify({ type: 'error', title: 'Ошибка', text: 'Пользователь с этим email уже существует', duration: 6000 })
          } else {
            this.$notify({ type: 'error', title: 'Ошибка', text: 'Перезагрузите страницу и попробуйте еще раз', duration: 6000 })
          }
        })
      }
    },
    validateThirdStep () {
      if (!this.agreement) {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Примите соглашение об обработке персональных данных', duration: 6000 })
        return false
      }
      if (!this.agreement2) {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Примите соглашение об обработке персональных данных', duration: 6000 })
        return false
      }
      return true
    },
    validateSecondStep () {
      if (!this.email) {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Укажите электронную почту', duration: 6000 })
        return false
      }
      if (!this.display.phone) {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Введите телефон', duration: 6000 })
        return false
      }
      return true
    },
    validateFirstStep () {
      Object.assign(this.passwordError, {
        required: {},
        confirm: {}
      })
      this.resetValidation()
      let result = true
      switch (this.type) {
        case 'phys':
          result = this.validateSnils(this.snils)
          break
        case 'yur':
          result = this.validateOgrn(this.ogrn)
          break
        case 'ip':
          result = this.validateOgrnip(this.ogrnip)
          break
      }
      if (!this.password) {
        this.passwordError.required = {
          message: 'Обязательное поле'
        }
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Придумайте пароль', duration: 6000 })
        return false
      }
      if (this.password.length < 6) {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Пароль должен содержать минимум 6 символов', duration: 6000 })
        return false
      }
      if (this.password !== this.confirmPassword) {
        this.passwordError.confirm = {
          message: 'Пароли не совпадают'
        }
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Пароли не совпадают', duration: 6000 })
        return false
      }
      if (result) {
        return true
      }
    },
    nextTo (to = false) {
      this.currentStep = to
    },
    changeTypePlaceholder (placeholderTitle) {
      this.placeholder = placeholderTitle
    }
  }
}
</script>
<style lang="scss" scoped>
  .absolute-center {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
  .col, .row, .col-6 {
    margin: 0;
    padding: 0;
  }
  .login-form-row {
    //height: 365px;
    margin: 0 auto;
  }
  .step-title {
    font-family: Varela, sans-serif;
    font-size: 24px;
    color: $h2Color;
    margin-top: 25px;
    line-height: 19px;
  }
  .step-description {
    font-family: Varela, sans-serif;
    color: $regColor;
    font-size: 14px;
    line-height: 21px;
    margin-top: 10px;
  }
  .form-image {
    background: url('/images/sign-up/form-image2.jpg') no-repeat right center;
    background-size: cover;
  }
  .login-form {
    max-width: 570px;
    width: 100%;
    margin: 0 auto !important;
  }
  h2 {
    font-family: Barlow-Bold, sans-serif;
    font-size: 38px;
    color: $h2Color;
  }
  input[type=checkbox] {
    width: 16px;
    height: 16px;
    border: 1px solid $radioColor;
    border-radius: 0;
    -webkit-appearance: none;
    outline: none;
    &:checked {
      background: $submitColor url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e") no-repeat center center;
      background-size: 70%;
    }
  }
  .form-group {
    margin-bottom: 0;
  }
  .login-container {
    min-height: 100vh;
    align-items: center !important;
    ul {
      li {
        list-style: none;
      }
    }
  }
  .form-container {
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 32px;
    width: 100%;
    //height: 611px;
    input[type=text], input[type=password], input[type=tel] {
      //width: 508px;
      border-radius: 0;
      height: 40px;
      border: 1px solid $radioColor;
      &::-webkit-input-placeholder {
        color: $placeholderColor;
      }
      &::-moz-placeholder {
        color: $placeholderColor;
      }
      &:-ms-input-placeholder {
        color: $placeholderColor;
      }
      &::placeholder {
        color: $placeholderColor;
      }
    }
    label {
      font-family: Varela, sans-serif;
      font-size: 14px;
      margin-left: 10px;
      margin-bottom: 0;
      position: relative;
      top: -3px;
      color: $regColor;
    }
    a {
      color: $regLinkColor;
    }
    ul {
      margin-top: 28px;
      li {
        label {
          top: -3px;
          position: relative;
        }
        margin-bottom: 7px;
      }
      input[type=radio] {
        width: 16px;
        height: 16px;
        border: 1px solid $radioColor;
        appearance: none;
        -webkit-appearance: none;
        outline: none;
        border-radius: 8px;
        &:checked {
          background: $submitColor url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e") center center no-repeat;
          background-size: 70%;
        }
      }
    }
    .inputs {
      margin-top: 18px;
    }
    .submit {
      margin-top: 33px;
      margin-bottom: 25px;
      padding: 15px 31px;
      background-color: $submitColor;
      color: $wrapperBackgroundColor;
      border-radius: 0;
      &:hover {
        background-color: $submitColorHover;
      }
    }
    .reg {
      margin-top: 33px;
      margin-bottom: 25px;
      padding: 15px 31px;
      background-color: $regColor;
      color: $wrapperBackgroundColor;
      border-radius: 0;
      &:hover {
        background-color: $regColorHover;
      }
    }
    .ellipses {
      width: 60px;
      margin: 0 auto 15px;
      div {
        width: 16px;
        height: 16px;
        border-radius: 8px;
        background-color: $ellipseColor;
      }
      .active-ellipse {
        background-color: $submitColor;
      }
    }
    .login-form-checkbox {
      margin-top: 28px;
    }
  }
</style>
