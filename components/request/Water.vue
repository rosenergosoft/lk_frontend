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
      <label class="label">Тип подключения</label>
    </div>
    <div class="details">
      <div class="inputs">
        <div class="form-group d-flex">
          <div><input id="water_in" v-model="details.waterTypeIn" type="checkbox"></div>
          <div><label for="water_in">ВОДОСНАБЖЕНИЕ</label></div>
        </div>
        <div class="form-group d-flex">
          <div><input id="water_out" v-model="details.waterTypeOut" type="checkbox"></div>
          <div><label for="water_out">ВОДООТВЕДЕНИЕ</label></div>
        </div>
      </div>
      <div class="separator" />
    </div>
    <div>
      <label class="label">Объект подключения</label>
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
          <input v-model="details.kadastrNum" class="form-control" type="text" placeholder="Кадастровый номер земельного участка">
        </div>
        <div class="form-group">
          <div><label>Правоустанавливающие документы на земельный участок *</label></div>
          <div v-if="details.objectRightsDoc">
            <span>{{ details.objectRightsDoc }}</span>
          </div>
          <div>
            <button class="blue-button float-none" @click="openUploadDoc('object-rights')">
              Добавить документ
            </button>
          </div>
        </div>
      </div>
      <div class="separator" />
    </div>
    <div>
      <label class="label">Данные расчета баланса</label>
    </div>
    <div>
      <div class="form-group tarifs">
        <div><input v-model="details.hasCalculationData" type="radio" value="1" name="hasCalculationData"></div>
        <div><label>Есть данные расчета баланса водопотребления и водоотведения подключаемого объекта</label></div>
      </div>
      <div class="form-group tarifs">
        <div><input v-model="details.hasCalculationData" type="radio" value="0" name="hasCalculationData"></div>
        <div><label>Нет данных расчета баланса водопотребления и водоотведения подключаемого объекта</label></div>
      </div>
      <div v-if="details.hasCalculationData === '1'">
        <div class="form-group">
          <input v-model="details.waterLoad" class="form-control" type="text" placeholder="ДАННЫЕ ОБ ОБЩЕЙ ПОДКЛЮЧАЕМОЙ НАГРУЗКЕ (м3/сутки)">
        </div>
        <div class="form-group">
          <div><label>ПРОЕКТ РАСЧЁТА БАЛАНСА ВОДОПОТРЕБЛЕНИЯ</label></div>
          <div v-if="details.projectLoadCalcDoc">
            <span>{{ details.projectLoadCalcDoc }}</span>
          </div>
          <div>
            <button class="blue-button float-none" @click="openUploadDoc('project-load-calculation')">
              Добавить документ
            </button>
          </div>
        </div>
      </div>
      <div class="separator" />
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
    <AddDocumentModal
      :entity-id="applicationId"
      :document-type="docType"
      type="application"
      @file-upload-after="updateDocs"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddDocumentModal from '@/components/AddDocumentModal'
export default {
  name: 'Water',
  components: {
    AddDocumentModal
  },
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
      docType: null,
      details: {
        requester: '',
        objectName: '',
        objectLocation: '',
        objectPurpose: '',
        objectRightsDoc: '',
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
        other: '',
        hasCalculationData: null,
        projectLoadCalcDoc: '',
        waterLoad: '',
        waterTypeIn: '',
        waterTypeOut: ''
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
    this.getDocuments()
  },
  methods: {
    getDocuments () {
      this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/application/getDocs/' + this.applicationId).then((res) => {
        this.updateDocs(res)
      })
    },
    validate () {
      if (
        this.details.requester &&
        (this.details.waterTypeIn || this.details.waterTypeOut) &&
        this.details.objectName &&
        this.details.objectLocation &&
        this.details.kadastrNum &&
        this.details.objectRightsDoc
      ) {
        if (this.hasCalculationData) {
          if (this.details.projectLoadCalcDoc && this.details.waterLoad) {
            return true
          } else {
            this.$notify({ type: 'error', title: 'Ошибка', text: 'Заполните анкету заявки', duration: 6000 })
            return false
          }
        }
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
    },
    openUploadDoc (type) {
      this.docType = type
      this.$bvModal.show('add-document-modal')
    },
    updateDocs (res) {
      this.docType = null
      res.docs.forEach((doc) => {
        if (doc.type === 'object-rights') {
          this.details.objectRightsDoc = doc.original_name
        }
        if (doc.type === 'project-load-calculation') {
          this.details.projectLoadCalcDoc = doc.original_name
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
