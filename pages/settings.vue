<template>
  <div class="connection">
    <div class="page-title d-flex">
      <div class="active">
        Настройка
      </div>
    </div>
    <div class="boxes">
      <div class="box status-2">
        <h4>Личный кабинет</h4>
        <div class="form-group inputs">
          <div class="notice">
            Выберите ваши сферы деятельности
          </div>
          <label class="label">Сферы деятельности</label>
          <div class="select-wrapper">
            <select v-model="clientType" multiple class="form-control">
              <option value="1">
                Электричество
              </option>
              <option value="2">
                Тепло
              </option>
              <option value="3">
                Вода
              </option>
            </select>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <button class="btn blue-button" @click="submitClient">
              Сохранить
            </button>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      clientType: []
    }
  },
  mounted () {
    this.setLoading(true)
    this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/client')
      .then((res) => {
        this.setLoading(false)
        if (res.data.success) {
          this.clientType = res.data.client.type
        }
      })
  },
  methods: {
    submitClient () {
      this.setLoading(true)
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/client/save', { type: this.clientType })
        .then((res) => {
          this.setLoading(false)
          if (res.data.success) {
            this.$notify({ type: 'success', title: 'Успех', text: 'Данные успешно сохранены', duration: 6000 })
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
