<template>
  <div class="personal-data">
    <div v-if="userCompany" class="details">
      <div>
        <label class="label">Выбор заявителя</label>
      </div>
      <div class="text-content">
        У вас указано не только физ. лицо, но и юридическое (или ИП), выберите на кого будет заключать договор.
      </div>
      <div>
        <div class="form-group tarifs">
          <div><input id="phys" v-model="details.requester" type="radio" value="phys" name="requester-type"></div>
          <div><label for="phys">Физическое лицо</label></div>
        </div>
        <div class="form-group tarifs">
          <div><input id="yur" v-model="details.requester" type="radio" value="yur" name="requester-type"></div>
          <div><label for="yur">Юридическое лицо</label></div>
        </div>
        <div class="separator" />
      </div>
    </div>
    <div>
      <label class="label">Объект подключения</label>
    </div>
    <div class="text-content">
      Что присоединяем, где и по какой причине
    </div>
    <div class="details">
      <div class="inputs">
        <div class="form-group">
          <input v-model="details.objectName" class="form-control" type="text" placeholder="Наименование присоединяемых объектов (жилой дом, гараж и т.п.)">
        </div>
        <div class="form-group position-relative">
          <vue-autosuggest
            v-if="!manualInput"
            :suggestions="suggestions"
            :input-props="{ id:'autosuggest__input', placeholder:'Местоположение объекта', 'class': 'form-control' }"
            :get-suggestion-value="getSuggestionValue"
            @input="onInputChange"
            @selected="selectHandler"
          >
            <template slot-scope="{suggestion}">
              <span class="my-suggestion-item">{{ suggestion.item.value }}</span>
            </template>
          </vue-autosuggest>
          <button v-if="showManualInput" class="manual-input" @click="manualInput = true">
            Ввести вручную
          </button>
          <input v-if="manualInput" v-model="details.objectLocation" class="form-control" type="text" placeholder="Местоположение объекта"> <!-- address autosuggest -->
        </div>
        <div class="form-group">
          <input v-model="details.objectPurpose" class="form-control" type="text" placeholder="Назначение">
        </div>
        <div class="form-group">
          <input v-model="details.constructionVolume" class="form-control" type="text" placeholder="Строительный объем (m3)">
        </div>
        <div class="form-group">
          <input v-model="details.totalArea" class="form-control" type="text" placeholder="Общая площадь (m2)">
        </div>
        <div class="form-group">
          <input v-model="details.numberOfStoreys" class="form-control" type="text" placeholder="Этажность">
        </div>
        <div class="form-group">
          <input v-model="details.commissioningDate" class="form-control" type="text" placeholder="Планируемый срок ввода в эксплуатацию">
        </div>
      </div>
      <div class="separator" />
    </div>
    <div>
      <label class="label">Тепловая нагрузка объекта</label>
    </div>
    <div class="text-content">
      Гкал/час
    </div>
    <div class="details">
      <div class="inputs">
        <div class="form-group">
          <input v-model="details.warmTotal" class="form-control" type="text" placeholder="ВСЕГО">
        </div>
        <div class="form-group">
          <input v-model="details.warmHeating" class="form-control" type="text" placeholder="в том числе отопление">
        </div>
        <div class="form-group">
          <input v-model="details.warmVentilation" class="form-control" type="text" placeholder="вентиляция">
        </div>
        <div class="form-group">
          <input v-model="details.warmHotWaterR" class="form-control" type="text" placeholder="ГВС (расчетная)">
        </div>
        <div class="form-group">
          <input v-model="details.warmHotWaterH" class="form-control" type="text" placeholder="ГВС (среднечасовая)">
        </div>
        <div class="form-group">
          <input v-model="details.warmOther" class="form-control" type="text" placeholder="прочие виды нагрузки">
        </div>
      </div>
    </div>
    <div>
      <label class="label">Правовые основания пользования подключаемым объектом или земельным участком, на котором расположен подключаемый объект</label>
    </div>
    <div class="details">
      <div class="inputs">
        <textarea v-model="details.legalBase" class="form-control" placeholder="Правовые основания пользования подключаемым объектом или земельным участком, на котором расположен подключаемый объект" />
      </div>
    </div>
    <div>
      <label class="label">Информация о границах земельного участка, на котором планируется осуществить строительство / реконструкцию / модернизацию подключаемого объекта</label>
    </div>
    <div class="details">
      <div class="inputs">
        <textarea v-model="details.landBoundaries" class="form-control" placeholder="Информация о границах земельного участка, на котором планируется осуществить строительство / реконструкцию / модернизацию подключаемого объекта" />
      </div>
    </div>
    <div>
      <label class="label">Информация о виде разрешенного используемого земельного участка</label>
    </div>
    <div class="details">
      <div class="inputs">
        <textarea v-model="details.typeOfLand" class="form-control" placeholder="Информация о виде разрешенного используемого земельного участка" />
      </div>
    </div>
    <div>
      <label class="label">Информация о предельных параметрах разрешенного строительства / реконструкции / модернизации подключаемого объекта</label>
    </div>
    <div class="details">
      <div class="inputs">
        <textarea v-model="details.limitingParams" class="form-control" placeholder="Информация о предельных параметрах разрешенного строительства / реконструкции / модернизации подключаемого объекта" />
      </div>
    </div>
    <div>
      <label class="label">Что-то еще?</label>
    </div>
    <div class="text-content">
      Если вы считаете, что есть и другие сведения, которые нам необходимо знать – напишите об этом
    </div>
    <div class="details">
      <div class="inputs">
        <textarea v-model="details.other" class="form-control" />
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="text-left button-wrapper">
        <button class="btn blue-button float-none" @click="submitDetails">
          Отправить заявку
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
  name: 'Warm',
  props: {
    applicationId: {
      type: [Number, null],
      default: null
    }
  },
  data () {
    return {
      suggestions: [],
      manualInput: false,
      details: {
        requester: '',
        objectName: '',
        objectLocation: '',
        objectPurpose: '',
        constructionVolume: '',
        totalArea: '',
        commissioningDate: '',
        numberOfStoreys: '',
        warmTotal: '',
        warmHeating: '',
        warmVentilation: '',
        warmHotWaterR: '',
        warmHotWaterH: '',
        warmOther: '',
        legalBase: '',
        landBoundaries: '',
        typeOfLand: '',
        limitingParams: '',
        other: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userCompany'
    ]),
    showManualInput () {
      return (this.details.objectLocation && !this.manualInput)
    }
  },
  methods: {
    validate () {
      if (
        this.details.requester &&
        this.details.objectName &&
        this.details.objectLocation &&
        this.details.objectPurpose &&
        this.details.constructionVolume &&
        this.details.totalArea &&
        this.details.commissioningDate &&
        this.details.numberOfStoreys &&
        this.details.warmTotal &&
        this.details.warmHeating &&
        this.details.warmVentilation &&
        this.details.warmHotWaterR &&
        this.details.warmHotWaterH &&
        this.details.warmOther &&
        this.details.legalBase &&
        this.details.landBoundaries &&
        this.details.typeOfLand &&
        this.details.limitingParams
      ) {
        return true
      } else {
        this.$notify({ type: 'error', title: 'Ошибка', text: 'Заполните анкету заявки', duration: 6000 })
        return false
      }
    },
    submitDetails () {
      if (this.validate()) {
        this.details.id = this.applicationId
        this.setLoading(true)
        this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/application/create', this.details)
          .then((response) => {
            this.setLoading(false)
            if (response.data.success) {
              this.$router.push('/request/show/' + response.data.application.id)
            }
          })
      }
    },
    goBack () {
      this.$emit('back', 0)
    },
    getSuggestionValue (suggestion) {
      return suggestion.item.value
    },
    onInputChange (query) {
      this.$dadata.addressSuggestion(query).then((data) => {
        this.suggestions = []
        this.suggestions.push({ data: data.suggestions })
        // this.suggestions[0].data = data.suggestions
      })
    },
    selectHandler (suggestion) {
      if (suggestion) {
        this.details.objectLocation = suggestion.item.value
      }
    }
  }
}
</script>

<style scoped>

</style>
