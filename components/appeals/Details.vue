<template>
  <div class="personal-data">
    <div v-if="userCompany" >
      <div>
        <label class="label">Выбор заявителя</label>
      </div>
      <div class="text-content">
        У вас указано не только физ. лицо, но и юридическое (или ИП), выберите на кого будет заключать договор.
      </div>
      <div class="details">
        <div class="form-group">
          <input id="phys" v-model="details.requester" type="radio" value="phys" name="requester-type"><label for="phys">Физическое лицо</label>
        </div>
        <div class="form-group">
          <input id="yur" v-model="details.requester" type="radio" value="yur" name="requester-type"><label for="yur">Юридическое лицо</label>
        </div>
        <div class="separator" />
      </div>
    </div>
    <div>
      <label class="label">Задайте вопрос</label>
    </div>
    <div class="text-content">
      Напишите свой вопрос в свободной форме
    </div>
    <div class="details">
      <div class="inputs">
        <textarea v-model="details.question" class="form-control" placeholder="Ваш вопрос"/>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="text-left button-wrapper">
        <button class="btn blue-button float-none" @click="submitDetails">
          Отправить обращение
        </button>
      </div>
      <div class="text-left button-wrapper">
        <button class="btn blue-button float-none" @click="goBack">
          Назад
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Details',
  props: {
    appealId: {
      type: [Number, null],
      default: null
    }
  },
  data () {
    return {
      details: {
        requester: '',
        question: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userCompany'
    ])
  },
  created () {
    if (!this.userCompany) {
      this.details.requester = 'phys'
    }
  },
  methods: {
    submitDetails () {
      this.details.id = this.appealId
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/appeals/create', this.details)
        .then((response) => {
          if (response.data.success) {
            this.$router.push('/appeals/show/' + response.data.appeal.id)
          }
        })
    },
    goBack () {
      this.$emit('back', 0)
    }
  }
}
</script>

<style scoped>

</style>
