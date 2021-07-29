<template>
  <div class="relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <div v-if="currentStep === 0" class="login-form mx-auto">
      <div class="bg-white">
        <div class="row">
          <div class="col-6 form-container">
            <h2 class="text-2xl leading-7 font-semibold">
              Авторизация
            </h2>
            <div>
              <ul>
                <li><input id="snils" type="radio" name="type" checked="checked" @click="changeTypePlaceholder('СНИЛС')"><label for="snils">Физическое лицо (вход по СНИЛС)</label></li>
                <li><input id="ogrn" type="radio" name="type" @click="changeTypePlaceholder('ОГРН')"><label for="ogrn">Юридическое лицо (вход по ОГРН)</label></li>
                <li><input id="ogrnip" type="radio" name="type" @click="changeTypePlaceholder('ОГРНИП')"><label for="ogrnip">Индивидуальный предприниматель (вход по ОГРНИП)</label></li>
                <li><input id="by-email" type="radio" name="type" @click="changeTypePlaceholder('Имейл')"><label for="by-email">Вход по электронной почте</label></li>
              </ul>
              <div class="inputs">
                <div class="form-group">
                  <input v-model="email" :placeholder="placeholder" type="text" class="form-control">
                </div>
                <div class="form-group">
                  <input v-model="password" type="password" class="form-control" placeholder="Пароль">
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
          <div class="col-6 form-image" />
        </div>
      </div>
    </div>
    <div v-if="currentStep === 1" class="login-form mx-auto">
      <div class="bg-white">
        <div class="row">
          <div class="col-6 form-container">
            <h2 class="text-2xl leading-7 font-semibold">
              Регистрация
            </h2>
            <div class="login-form-row">
              <div class="steps">
                <div class="step-title">
                  1. Способ входа
                </div>
                <div class="step-description">
                  Выберите тип аккаунта для определения способа входа. В последствии вы можете изменить его в вашем профиле.
                </div>
              </div>
              <ul>
                <li><input id="phys" v-model="type" type="radio" value="phys" name="type"><label for="phys">Физическое лицо (вход по СНИЛС)</label></li>
                <li><input id="yur" v-model="type" type="radio" value="yur" name="type"><label for="yur">Юридическое лицо (вход по ОГРН)</label></li>
                <li><input id="ip" v-model="type" type="radio" value="ip" name="type"><label for="ip">Индивидуальный предприниматель (вход по ОГРНИП)</label></li>
              </ul>
              <div class="inputs">
                <div v-if="type === 'phys'" class="form-group">
                  <input v-model="snils" type="text" class="form-control" placeholder="СНИЛС">
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
                  <input v-model="confirmPassword" type="password" class="form-control" placeholder="Повторите пароль">
                </div>
              </div>
            </div>
            <div class="form-group d-flex justify-content-between">
              <div>
                <button class="btn submit" @click="nextTo(2)">
                  Далее
                </button>
              </div>
              <div>
                <button class="btn reg" @click="nextTo(0)">
                  Авторизация
                </button>
              </div>
            </div>
            <div class="d-flex ellipses justify-content-between">
              <div class="active-ellipse" />
              <div />
              <div />
            </div>
          </div>
          <div class="col-6 form-image" />
        </div>
      </div>
    </div>
    <div v-if="currentStep === 2" class="login-form mx-auto">
      <div class="bg-white">
        <div class="row">
          <div class="col-6 form-container">
            <h2 class="text-2xl leading-7 font-semibold">
              Регистрация
            </h2>
            <div class="login-form-row">
              <div class="steps">
                <div class="step-title">
                  2. Контактная информация
                </div>
                <div class="step-description">
                  Укажите телефон и электронную почту для связи и уведомлений о изменениях по ваших заявкам, договору и тарифах
                </div>
              </div>
              <div class="inputs">
                <div class="form-group">
                  <input v-model="email" type="text" class="form-control" placeholder="Электронная почта для связи">
                </div>
                <div class="form-group">
                  <input v-model="phone" type="tel" class="form-control" placeholder="Телефон для уведомлений">
                </div>
              </div>
            </div>
            <div class="form-group d-flex justify-content-between">
              <div>
                <button class="btn submit" @click="nextTo(3)">
                  Далее
                </button>
              </div>
              <div>
                <button class="btn reg" @click="nextTo(1)">
                  Назад
                </button>
              </div>
            </div>
            <div class="d-flex ellipses justify-content-between">
              <div />
              <div class="active-ellipse" />
              <div />
            </div>
          </div>
          <div class="col-6 form-image" />
        </div>
      </div>
    </div>
    <div v-if="currentStep === 3" class="login-form mx-auto">
      <div class="bg-white">
        <div class="row">
          <div class="col-6 form-container">
            <h2 class="text-2xl leading-7 font-semibold">
              Регистрация
            </h2>
            <div class="login-form-row">
              <div class="steps">
                <div class="step-title">
                  3. Лицевой счет
                </div>
                <div class="step-description">
                  Если вы уже являетесь нашим клиентом, укажите ваш лицевой счет и ФИО (по договору). Его можно будет добавить позже в вашем профиле.
                </div>
              </div>
              <div class="form-group login-form-checkbox">
                <input
                  id="im-not-a-client"
                  v-model="notaclient"
                  type="checkbox"
                  value="1"
                ><label for="im-not-a-client">Я не являюсь клиентом компании и у меня нет лицевого счета</label>
              </div>
              <div v-if="notaclient === false" class="inputs">
                <div class="form-group">
                  <input v-model="account" type="text" class="form-control" placeholder="Лицевой счет">
                </div>
                <div class="form-group">
                  <input v-model="name" type="text" class="form-control" placeholder="ФИО">
                </div>
              </div>
              <div class="steps">
                <div class="step-title">
                  4. Соглашения
                </div>
                <div class="form-group login-form-checkbox">
                  <input id="agreement" type="checkbox"><label for="agreement">Я принимаю <a href="">соглашение</a> об обработке персональных данных</label>
                </div>
              </div>
            </div>
            <div class="form-group d-flex justify-content-between">
              <div>
                <button @click="submitRegistration" class="btn submit">
                  Отправить
                </button>
              </div>
              <div>
                <button class="btn reg" @click="nextTo(2)">
                  Назад
                </button>
              </div>
            </div>
            <div class="d-flex ellipses justify-content-between">
              <div />
              <div />
              <div class="active-ellipse" />
            </div>
          </div>
          <div class="col-6 form-image" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  layout: 'auth',
  data () {
    return {
      currentStep: 0,
      placeholder: 'СНИЛС',
      notaclient: false,
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      type: 'phys',
      snils: '',
      ogrn: '',
      ogrnip: '',
      account: '',
      name: ''
    }
  },
  head: {
    bodyAttrs: {
      class: 'login'
    }
  },
  methods: {
    async submitLogin () {
      const self = this
      await this.$auth.login({
        data: {
          email: self.email,
          password: self.password
        }
      })
    },
    submitRegistration () {
      const data = {
        password: this.password,
        email: this.email,
        account: this.account,
        name: this.name
      }

      if (this.type === 'phys') {
        data.snils = this.snils
      } else if (this.type === 'yur') {
        data.ogrn = this.ogrn
      } else {
        data.ogrnip = this.ogrnip
      }

      this.$axios.post('http://api.user-dashboard.local/api/registration', data).then((resp) => {
        if (resp.data.success) {
          this.currentStep = 0
        }
      })
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
  .col, .row, .col-6 {
    margin: 0;
    padding: 0;
  }
  .login-form-row {
    height: 365px;
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
    background: url('/images/sign-up/form-image.jpg') no-repeat right center;
    background-size: cover;
  }
  .login-form {
    max-width: 1140px;
    width: 100%;
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
  .form-container {
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 32px;
    height: 611px;
    input[type=text], input[type=password], input[type=tel] {
      width: 508px;
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
