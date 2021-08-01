<template>
  <b-modal id="modal-yur-data" centered title="Данные о Юридическом лице или ИП">
    <div class="inputs form-group">
      <v-autocomplete
        v-model="model"
        :items="items"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="value"
        item-value="data"
        label="Public APIs"
        placeholder="Start typing to Search"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
      <vue-autosuggest
        :suggestions="suggestions"
        :input-props="{id:'autosuggest__input', placeholder:'Название компании/ИП/ИНН'}"
        @input="onInputChange"
        @selected="selectHandler"
        @click="clickHandler"
      >
        <template slot-scope="{suggestion}">
          <span class="my-suggestion-item">{{ suggestion.item.value }}</span>
        </template>
      </vue-autosuggest>
      <input type="text" class="form-control" placeholder="Название компании/ИП/ИНН">
    </div>
    <label class="label">Банковские реквизиты</label>
    <div class="inputs form-group">
      <input type="text" class="form-control" placeholder="БИК">
    </div>
    <template #modal-footer>
      <button type="button" class="btn blue-button" @click="checkdata">
        Сохранить
      </button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'Company',
  data () {
    return {
      suggestions: [
        {
          data: []
        }
      ],
      model: null,
      items: [],
      search: null
    }
  },
  watch: {
    search (value) {
      this.$dadata.companySuggestion(value).then((data) => {
        console.log(data)
        Object.assign(this.items, data.suggestions)
      })
    }
  },
  methods: {
    checkdata () {
      this.$dadata.companySuggestion('ООО НЬЮВИЗ')
    },
    onInputChange (query) {
      this.$dadata.companySuggestion(query).then((data) => {
        console.log(data)
        Object.assign(this.suggestions[0].data, data.suggestions)
      })
    },
    selectHandler (value) {
      console.log(value)
    },
    clickHandler (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>

</style>
