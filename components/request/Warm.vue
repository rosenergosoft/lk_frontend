<template>
  <div class="personal-data">
    <div v-if="userCompany" class="details">
      <div>
        <label class="label">Выбор заявителя</label>
      </div>
      <div class="text-content">
        У вас указано не только физ. лицо, но и юридическое (или ИП), выберите на кого будет заключать договор.
      </div>
      <div class="details" :class="[validation.requester? 'red-border' : '']">
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
          <input v-model="details.objectName" class="form-control" type="text" placeholder="Наименование присоединяемых объектов (жилой дом, гараж и т.п.)" :class="[validation.objectName? 'red-border' : '']">
        </div>
        <div class="form-group position-relative">
          <vue-autosuggest
            v-if="!manualInput"
            :suggestions="suggestions"
            :input-props="{ id:'autosuggest__input', placeholder:'Местоположение объекта', 'class': 'form-control' }"
            :get-suggestion-value="getSuggestionValue"
            :class="[validation.objectLocation? 'red-border' : '']"
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
          <input
            v-if="manualInput"
            v-model="details.objectLocation"
            class="form-control"
            type="text"
            placeholder="Местоположение объекта"
            :class="[validation.objectLocation? 'red-border' : '']"
          > <!-- address autosuggest -->
        </div>
        <div class="form-group">
          <input v-model="details.objectPurpose" class="form-control" type="text" placeholder="Назначение" :class="[validation.objectPurpose? 'red-border' : '']">
        </div>
        <div class="form-group">
          <input v-model="details.constructionVolume" class="form-control" type="text" placeholder="Строительный объем (m3)" :class="[validation.constructionVolume? 'red-border' : '']">
        </div>
        <div class="form-group">
          <input v-model="details.totalArea" class="form-control" type="text" placeholder="Общая площадь (m2)" :class="[validation.totalArea? 'red-border' : '']">
        </div>
        <div class="form-group">
          <input v-model="details.numberOfStoreys" class="form-control" type="text" placeholder="Этажность" :class="[validation.numberOfStoreys? 'red-border' : '']">
        </div>
        <div class="form-group">
          <input v-model="details.commissioningDate" class="form-control" type="text" placeholder="Планируемый срок ввода в эксплуатацию" :class="[validation.commissioningDate? 'red-border' : '']">
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
          <input v-model="details.warmTotal" class="form-control" type="text" placeholder="ВСЕГО" :class="[validation.warmTotal? 'red-border' : '']">
        </div>
        <div class="form-group">
          <input v-model="details.warmHeating" class="form-control" type="text" placeholder="в том числе отопление" :class="[validation.warmHeating? 'red-border' : '']">
        </div>
        <div class="form-group">
          <input v-model="details.warmVentilation" class="form-control" type="text" placeholder="вентиляция" :class="[validation.warmVentilation? 'red-border' : '']">
        </div>
        <div class="form-group">
          <input v-model="details.warmHotWaterR" class="form-control" type="text" placeholder="ГВС (расчетная)" :class="[validation.warmHotWaterR? 'red-border' : '']">
        </div>
        <div class="form-group">
          <input v-model="details.warmHotWaterH" class="form-control" type="text" placeholder="ГВС (среднечасовая)" :class="[validation.warmHotWaterH? 'red-border' : '']">
        </div>
        <div class="form-group">
          <input v-model="details.warmOther" class="form-control" type="text" placeholder="прочие виды нагрузки" :class="[validation.warmOther? 'red-border' : '']">
        </div>
      </div>
    </div>
    <div>
      <label class="label">Правовые основания пользования подключаемым объектом или земельным участком, на котором расположен подключаемый объект</label>
    </div>
    <div class="details">
      <div class="inputs">
        <textarea v-model="details.legalBase" class="form-control" placeholder="Правовые основания пользования подключаемым объектом или земельным участком, на котором расположен подключаемый объект" :class="[validation.legalBase? 'red-border' : '']" />
      </div>
    </div>
    <div>
      <label class="label">Информация о границах земельного участка, на котором планируется осуществить строительство / реконструкцию / модернизацию подключаемого объекта</label>
    </div>
    <div class="details">
      <div class="inputs">
        <textarea v-model="details.landBoundaries" class="form-control" placeholder="Информация о границах земельного участка, на котором планируется осуществить строительство / реконструкцию / модернизацию подключаемого объекта" :class="[validation.landBoundaries? 'red-border' : '']" />
      </div>
    </div>
    <div>
      <label class="label">Информация о виде разрешенного используемого земельного участка</label>
    </div>
    <div class="details">
      <div class="inputs">
        <textarea v-model="details.typeOfLand" class="form-control" placeholder="Информация о виде разрешенного используемого земельного участка" :class="[validation.typeOfLand? 'red-border' : '']" />
      </div>
    </div>
    <div>
      <label class="label">Информация о предельных параметрах разрешенного строительства / реконструкции / модернизации подключаемого объекта</label>
    </div>
    <div class="details">
      <div class="inputs">
        <textarea v-model="details.limitingParams" class="form-control" placeholder="Информация о предельных параметрах разрешенного строительства / реконструкции / модернизации подключаемого объекта" :class="[validation.limitingParams? 'red-border' : '']" />
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
      validation: {
        requester: false,
        objectName: false,
        objectLocation: false,
        objectPurpose: false,
        constructionVolume: false,
        totalArea: false,
        commissioningDate: false,
        numberOfStoreys: false,
        warmTotal: false,
        warmHeating: false,
        warmVentilation: false,
        warmHotWaterR: false,
        warmHotWaterH: false,
        warmOther: false,
        legalBase: false,
        landBoundaries: false,
        typeOfLand: false,
        limitingParams: false
      },
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
  mounted () {
    if (!this.userCompany) {
      this.details.requester = 'phys'
    }
  },
  methods: {
    validate () {
      this.validation.requester = !this.details.requester
      this.validation.objectName = !this.details.objectName
      this.validation.objectLocation = !this.details.objectLocation
      this.validation.objectPurpose = !this.details.objectPurpose
      this.validation.constructionVolume = !this.details.constructionVolume
      this.validation.totalArea = !this.details.totalArea
      this.validation.commissioningDate = !this.details.commissioningDate
      this.validation.numberOfStoreys = !this.details.numberOfStoreys
      this.validation.warmTotal = !this.details.warmTotal
      this.validation.warmHeating = !this.details.warmHeating
      this.validation.warmVentilation = !this.details.warmVentilation
      this.validation.warmHotWaterR = !this.details.warmHotWaterR
      this.validation.warmHotWaterH = !this.details.warmHotWaterH
      this.validation.warmOther = !this.details.warmOther
      this.validation.legalBase = !this.details.legalBase
      this.validation.landBoundaries = !this.details.landBoundaries
      this.validation.typeOfLand = !this.details.typeOfLand
      this.validation.limitingParams = !this.details.limitingParams
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
  .red-border {
    border: 1px solid red;
  }
</style>
