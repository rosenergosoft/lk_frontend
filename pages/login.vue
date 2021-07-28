<template>
  <div class="relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <div class="login-form mx-auto">
      <div class="bg-white">
        <div class="row">
          <div class="col-6 form-container">
            <h2 class="text-2xl leading-7 font-semibold">
              Авторизация
            </h2>
            <ul>
              <li><input id="snils" type="radio" name="type"><label for="snils">Физическое лицо (вход по СНИЛС)</label></li>
              <li><input id="ogrn" type="radio" name="type"><label for="ogrn">Юридическое лицо (вход по ОГРН)</label></li>
              <li><input id="ogrnip" type="radio" name="type"><label for="ogrnip">Индивидуальный предприниматель (вход по ОГРНИП)</label></li>
              <li><input id="by-email" type="radio" name="type"><label for="by-email">Вход по электронной почте</label></li>
            </ul>
            <div class="inputs">
              <div class="form-group">
                <input v-model="email" type="text" class="form-control" placeholder="СНИЛС">
              </div>
              <div class="form-group">
                <input v-model="password" type="password" class="form-control" placeholder="Пароль">
              </div>
            </div>
            <div class="form-group d-flex justify-content-between">
              <div>
                <button class="btn submit">
                  Войти
                </button>
              </div>
              <div>
                <button class="btn reg">
                  Регистрация
                </button>
              </div>
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
      email: '',
      password: ''
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .col, .row, .col-6 {
    margin: 0;
    padding: 0;
  }
  .form-image {
    background: url('/images/sign-up/form-image.jpg') no-repeat right center;
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
  .form-container {
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 32px;
    input[type=text], input[type=password] {
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
    ul {
      margin-top: 28px;
      li {
        margin-bottom: 7px;
      }
      input[type=radio] {
        width: 16px;
        height: 16px;
        border: 1px solid $radioColor;
      }
      label {
        font-family: Varela, sans-serif;
        font-size: 14px;
        margin-left: 10px;
        top: -3px;
        position: relative;
        margin-bottom: 0;
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
    }
    .reg {
      margin-top: 33px;
      margin-bottom: 25px;
      padding: 15px 31px;
      background-color: $regColor;
      color: $wrapperBackgroundColor;
      border-radius: 0;
    }
  }
</style>
