<template>
  <div class="disclosure">
    <div class="page-title d-flex">
      <div class="active">
        Информация о компании
      </div>
    </div>
    <div class="boxes">
      <div v-if="fields" class="box status-6 inputs">
        <div
          v-for="field in fields"
          :key="field.name"
          class="form-group"
        >
          <input v-model="field.value" class="form-control" :placeholder="field.field_name">
        </div>
        <div class="col">
          <div class="form-group">
            <button class="btn blue-button" @click="saveFields">
              Сохранить
            </button>
          </div>
        </div>
        <div class="clearfix" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Information',
  data () {
    return {
      fields: ''
    }
  },
  mounted () {
    this.setLoading(true)
    this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/client/fields')
      .then((res) => {
        this.setLoading(false)
        if (res.data.success) {
          this.fields = res.data.fields
        }
      })
  },
  methods: {
    saveFields () {
      this.setLoading(true)
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/client/saveFields', { fields: this.fields })
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
