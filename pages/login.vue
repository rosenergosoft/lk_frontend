<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <div class="row">
          <div class="col-6">
            <h2 class="text-2xl leading-7 font-semibold">
              Авторизация
            </h2>
            <ul>
              <li><input type="radio" name="type"><label>Физ Лицо</label></li>
              <li><input type="radio" name="type"><label>ИП</label></li>
              <li><input type="radio" name="type"><label>ООО</label></li>
            </ul>
            <div class="form-group">
              <input v-model="email" type="text" class="form-control" placeholder="email">
            </div>
            <div class="form-group">
              <input v-model="password" type="text" class="form-control" placeholder="password">
            </div>
          </div>
          <div class="col-6">
            <span>image here</span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button
              class="btn btn-primary"
              @click="submitLogin"
            >
              Войти
            </button>
          </div>
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

<style scoped>

</style>
