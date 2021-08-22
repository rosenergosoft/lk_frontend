<template>
  <div class="container ml-4">
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label>Тип клиента</label>
          <select multiple v-model="clientType" class="form-control">
            <option value="">
              Выберите тип клиента
            </option>
            <option value="1">
              Электричество
            </option>
            <option value="2">
              Тепло
            </option>
            <option value="3">
              Вода
            </option>
            <option value="4">
              Водоотведение
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
            this.$notify({ type: 'success', title: 'Успех', text: 'Данные успешно сохранены' })
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
