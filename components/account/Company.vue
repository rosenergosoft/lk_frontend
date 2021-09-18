<template>
  <b-modal id="modal-yur-data" centered title="Данные о Юридическом лице или ИП" @show="initCompany">
    <div class="inputs form-group">
      <vue-autosuggest
        v-if="!companyData"
        :suggestions="suggestions"
        :input-props="{ id:'autosuggest__input', placeholder:'Название компании/ИП/ИНН', 'class': 'form-control' }"
        :get-suggestion-value="getSuggestionValue"
        @input="onInputChange"
        @selected="selectHandler"
      >
        <template slot-scope="{suggestion}">
          <span class="my-suggestion-item">{{ suggestion.item.value }}</span>
        </template>
      </vue-autosuggest>
      <div v-if="companyData">
        <span>ИНН {{ companyData.inn }}</span>
        <span>{{ companyData.opf }} {{ companyData.name }}</span>
        <span>{{ companyData.address }}</span>
      </div>
    </div>
    <label class="label">Банковские реквизиты</label>
    <div class="inputs form-group">
      <vue-autosuggest
        v-if="!bankData"
        :suggestions="bankSuggestions"
        :input-props="{id:'bank__autosuggest__input', placeholder:'БИК', 'class': 'form-control'}"
        :get-suggestion-value="getSuggestionValue"
        @input="bankOnInputChange"
        @selected="bankSelectHandler"
      >
        <template slot-scope="{suggestion}">
          <span class="my-suggestion-item">{{ suggestion.item.value }}</span>
        </template>
      </vue-autosuggest>
      <div v-if="bankData">
        <span>БИК {{ bankData.bic }}</span>
        <span>{{ bankData.bank_name }}</span>
        <span>Корр. счет {{ bankData.bank_corr_account }}</span>
      </div>
      <div class="account-number">
        <input v-if="bankData" v-model="bankData.check_account" type="text" class="form-control" placeholder="Расчетный счет">
      </div>
    </div>
    <template #modal-footer>
      <div class="d-flex justify-content-between">
        <div v-if="userCompany">
          <button type="button" class="btn blue-button" @click="removeCompanyData">
            Очистить
          </button>
        </div>
        <div>
          <button type="button" class="btn blue-button" @click="submitCompany">
            Сохранить
          </button>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Company',
  data () {
    return {
      suggestions: [],
      bankSuggestions: [],
      id: null,
      companyData: null,
      bankData: null,
      model: null,
      items: [],
      search: null
    }
  },
  computed: {
    ...mapGetters([
      'userCompany'
    ])
  },
  methods: {
    initCompany () {
      if (this.userCompany) {
        this.bankData = {
          bank_bik: this.userCompany.bank_bik,
          bank_corr_account: this.userCompany.bank_corr_account,
          bank_name: this.userCompany.bank_name,
          check_account: this.userCompany.check_account
        }
        this.companyData = {
          opf: this.userCompany.opf,
          inn: this.userCompany.inn,
          name: this.userCompany.name,
          address: this.userCompany.address
        }
        this.id = this.userCompany.id
      }
    },
    onInputChange (query) {
      this.$dadata.companySuggestion(query).then((data) => {
        this.suggestions = []
        this.suggestions.push({ data: data.suggestions })
        // this.suggestions[0].data = data.suggestions
      })
    },
    bankOnInputChange (query) {
      this.$dadata.bankSuggestion(query).then((data) => {
        this.bankSuggestions = []
        this.bankSuggestions.push({ data: data.suggestions })
      })
    },
    getSuggestionValue (suggestion) {
      return suggestion.item.value
    },
    selectHandler (suggestion) {
      if (suggestion) {
        const item = suggestion.item.data
        this.companyData = {
          opf: item.opf.short,
          inn: item.inn,
          name: item.name.full,
          address: item.address.unrestricted_value
        }
      }
    },
    bankSelectHandler (suggestion) {
      if (suggestion) {
        const item = suggestion.item.data
        this.bankData = {
          bank_bik: item.bic,
          bank_corr_account: item.correspondent_account,
          bank_name: item.name.short
        }
      }
    },
    submitCompany () {
      if (!this.companyData || !this.bankData) {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Заполните данные о компании', duration: 6000 })
        return false
      }
      if (!this.bankData.check_account) {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Заполните рассчетный счет', duration: 6000 })
        return false
      }
      const data = Object.assign({}, this.companyData, this.bankData)
      data.id = this.id
      this.setLoading(true)
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/user/company', data)
        .then((res) => {
          if (res.data.success) {
            this.$store.commit('UPDATE_USER_COMPANY', res.data.company)
            this.$bvModal.hide('modal-yur-data')
            this.$notify({ type: 'success', title: 'Успех', text: 'Данные сохранены', duration: 6000 })
          }
          this.setLoading(false)
        })
    },
    removeCompanyData () {
      if (this.userCompany && this.userCompany.name) {
        this.setLoading(true)
        this.$axios.delete(process.env.LARAVEL_API_BASE_URL + '/api/user/company', { params: { id: this.id } })
          .then((res) => {
            if (res.data.success) {
              this.$store.commit('DELETE_USER_COMPANY', {})
              this.bankData = null
              this.companyData = null
              this.id = null
              this.$bvModal.hide('modal-yur-data')
            }
            this.setLoading(false)
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
