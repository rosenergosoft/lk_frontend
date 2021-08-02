<template>
  <div class="personal-data">
    <div>
      <label class="label">Выбор заявителя</label>
    </div>
    <div class="text-content">
      У вас указано не только физ. лицо, но и юридическое (или ИП), выберите на кого будет заключать договор.
    </div>
    <div class="details">
      <div class="form-group">
        <input id="phys" v-model="details.requester" type="radio" value="" name="requester-type"><label for="phys">Физическое лицо</label>
      </div>
      <div class="form-group">
        <input id="yur" v-model="details.requester" type="radio" value="" name="requester-type"><label for="yur">Юридическое лицо</label>
      </div>
      <div class="separator" />
    </div>
    <div>
      <label class="label">Тип подключения</label>
    </div>
    <div class="text-content">
      Можно подключиться не только постоянно, но и временно. К примеру, пока проводятся основные работы по подключению или объект передвижной.
    </div>
    <div class="details">
      <div class="form-group">
        <input id="constant" v-model="details.connectionType" type="radio" value="0" name="connection_type"><label for="constant">Постоянное подключение</label>
      </div>
      <div class="form-group">
        <input id="short" v-model="details.connectionType" type="radio" value="1" name="connection_type"><label for="short">Временное на период выполнения постоянной схемы электроснабжения</label>
      </div>
      <div class="form-group">
        <input id="short-move" v-model="details.connectionType" type="radio" value="2" name="connection_type"><label for="short-move">Временное подключение передвижного объекта</label>
      </div>
      <div v-if="connectionType === '1'">
        <div class="inputs">
          <div class="form-group">
            <input v-model="details.contractNumber" class="form-control" type="text" placeholder="Номер текущего договора">
          </div>
          <div class="form-group">
            <DatePicker
              v-model="details.contractDate"
              :format="'dd.MM.yyyy'"
              :language="ru"
              :monday-first="true"
              input-class="form-control"
              placeholder="Дата заключения договора"
            />
          </div>
        </div>
      </div>
      <div v-if="connectionType === '2'">
        <div class="inputs">
          <div class="form-group">
            <input v-model="details.connectionDuration" class="form-control" type="text" placeholder="Продолжительность подключения в днях">
          </div>
        </div>
      </div>
      <div class="separator" />
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
        <div class="form-group">
          <input v-model="details.objectLocation" class="form-control" type="text" placeholder="Местоположение объекта"> <!-- address autosuggest -->
        </div>
        <div class="form-group">
          <input v-model="details.kadastrNum" class="form-control" type="text" placeholder="Кадастровый номер земельного участка">
        </div>
        <div class="form-group select-wrapper">
          <select v-model="details.constructionReason" class="form-control">
            <option value="0">
              Новое строительство
            </option>
            <option value="1">
              Увеличение максимальной мощности
            </option>
            <option value="2">
              Изменение точки присоединения
            </option>
            <option value="3">
              Изменение категории надежности
            </option>
            <option value="4">
              Увеличение максимальной мощности и изменение точки присоединения
            </option>
            <option value="5">
              Увеличение максимальной мощности и изменение категории надежности
            </option>
          </select>
        </div>
      </div>
      <div class="separator" />
    </div>
    <div>
      <label class="label">Параметры подключения</label>
    </div>
    <div class="text-content">
      Требуемая мощность, категория надежности, напряжение и сроки
    </div>
    <div class="details">
      <div class="inputs">
        <div class="form-group">
          <input v-model="details.connectorsCount" class="form-control" type="text" placeholder="Количество точек присоединения (шт.)">
        </div>
        <div class="form-group">
          <input v-model="details.maxPower" class="form-control" type="text" placeholder="Запрашиваемая максимальная мощность для основного источника питания (кВт)"> <!-- address autosuggest -->
        </div>
        <div class="form-group">
          <input v-model="details.previousMaxPower" class="form-control" type="text" placeholder="В том числе ранее присоединенная максимальная мощность (кВт)">
        </div>
        <div class="form-group select-wrapper">
          <select v-model="details.integrityCategory" class="form-control">
            <option value="0">
              Категория надежности
            </option>
            <option value="1">
              I
            </option>
            <option value="2">
              II
            </option>
            <option value="3">
              III
            </option>
          </select>
        </div>
        <div class="form-group select-wrapper">
          <select v-model="details.powerLevel" class="form-control">
            <option value="0">
              Уровень напряжения
            </option>
            <option value="1">
              0.22 кВт
            </option>
            <option value="2">
              0.38 кВт
            </option>
            <option value="3">
              6 кВт
            </option>
            <option value="4">
              10 кВт
            </option>
          </select>
        </div>
        <div class="form-group select-wrapper">
          <select v-model="details.loadType" class="form-control">
            <option value="0">
              Характер нагрузки (вид экономической деятельности)
            </option>
            <option value="1">
              Другое
            </option>
            <option value="2">
              Гостиницы и рестораны
            </option>
            <option value="3">
              Государственное управление и обеспечение военной безопасности; обязательное социальное обеспечение
            </option>
            <option value="4">
              Деятельность экстерриториальных организаций
            </option>
            <option value="5">
              Добыча полезных ископаемых
            </option>
            <option value="6">
              Здравоохранение и предоставление социальных услуг
            </option>
            <option value="7">
              Обрабатывающие производства
            </option>
            <option value="8">
              Образование
            </option>
            <option value="9">
              Операции с недвижимым имуществом, аренда и предоставление услуг
            </option>
            <option value="10">
              Оптовая и розничная торговля; ремонт автотранспортных средств, мотоциклов, бытовых изделий и предмет
            </option>
            <option value="11">
              Предоставление прочих коммунальных, социальных и персональных услуг
            </option>
            <option value="12">
              Предоставление услуг по ведению домашнего хозяйства
            </option>
            <option value="13">
              Производство и распределение электроэнергии, газа и воды (генерация)
            </option>
            <option value="14">
              Производство и распределение электроэнергии, газа и воды (прочие)
            </option>
            <option value="15">
              Производство и распределение электроэнергии, газа и воды (электрические сети ТСО)
            </option>
            <option value="16">
              Прочее
            </option>
            <option value="17">
              Рыболовство, рыбоводство
            </option>
            <option value="18">
              Сельское хозяйство, охота и лесное хозяйство
            </option>
            <option value="19">
              Строительство
            </option>
            <option value="20">
              Транспорт и связь
            </option>
            <option value="21">
              Финансовая деятельность
            </option>
          </select>
        </div>
        <div>
          <label>Энергопринимающие устройства, которые могут быть присоединены к устройствам противоаварийной автоматики</label>
        </div>
        <div class="form-group">
          <input id="emergency_auto_yes" v-model="details.emergencyAuto" type="radio" value="" name="emergency_auto"><label for="emergency_auto_yes" class="mr-20">Есть</label>
          <input id="emergency_auto_no" v-model="details.emergencyAuto" type="radio" value="" name="emergency_auto"><label for="emergency_auto_no">Нет</label>
        </div>
      </div>
    </div>
    <div>
      <label class="label">Сроки проектирования и поэтапного введения в эксплуатацию</label>
    </div>
    <div class="text-content">
      Укажите текущий квартал, если объект уже готов к подключению
    </div>
    <div class="details">
      <div class="inputs">
        <div class="form-group select-wrapper">
          <select v-model="details.estimationYear" class="form-control">
            <option value="0">
              Год
            </option>
            <option value="1">
              2020
            </option>
            <option value="2">
              2021
            </option>
            <option value="3">
              2022
            </option>
            <option value="4">
              2023
            </option>
            <option value="5">
              2024
            </option>
            <option value="6">
              2025
            </option>
            <option value="7">
              2026
            </option>
            <option value="8">
              2027
            </option>
            <option value="9">
              2028
            </option>
            <option value="10">
              2029
            </option>
            <option value="11">
              2030
            </option>
          </select>
        </div>
        <div class="form-group select-wrapper">
          <select v-model="details.estimationQuater" class="form-control">
            <option value="0">
              Квартал
            </option>
            <option value="1">
              1
            </option>
            <option value="2">
              2
            </option>
            <option value="3">
              3
            </option>
            <option value="4">
              4
            </option>
          </select>
        </div>
        <div class="form-group">
          <input v-model="details.power" class="form-control" type="text" placeholder="Мощность (кВт)">
        </div>
      </div>
    </div>
    <div>
      <label class="label">Электричество и тарифы</label>
    </div>
    <div class="text-content">
      Выберите энергосбытовую компанию, ценовую категорию и порядок расчетов (или оставьте все как есть, если не знаете что выбрать)
    </div>
    <div class="details">
      <div class="inputs">
        <div class="form-group select-wrapper">
          <select v-model="details.energoCompanyName" class="form-control">
            <option value="0">
              Наименование энергосбытовой компании
            </option>
            <option value="1">
              ООО Ололо
            </option>
            <option value="2">
              ООО Рога и копыта
            </option>
            <option value="3">
              ООО Тыц Тыц
            </option>
          </select>
        </div>
        <div>
          <label>Ценовая категория</label>
        </div>
        <div class="form-group">
          <input id="tarif_1" v-model="details.pricing" type="radio" value="" name="tarif"><label for="tarif_1" class="mr-20">1 (Расчет = цена * объем потребления. Тариф по передаче эл.эн. одноставочный)</label>
        </div>
        <div class="form-group">
          <input id="tarif_2" v-model="details.pricing" type="radio" value="" name="tarif"><label for="tarif_2">2 (Расчет = сумма стоимости эл.эн для каждой зоны суток. Тариф по передаче эл.эн. одноставочный)</label>
        </div>
        <div class="form-group">
          <input id="tarif_3" v-model="details.pricing" type="radio" value="" name="tarif"><label for="tarif_3">3 (Расчет = сумма стоимости эл.эн. за каждый час плюс стоимость мощности. Тариф по передаче эл.эн. одноставочный)</label>
        </div>
        <div class="form-group">
          <input id="tarif_4" v-model="details.pricing" type="radio" value="" name="tarif"><label for="tarif_4">4 (Расчет = сумма стоимости эл.эн. за каждый час плюс стоимость мощности. Тариф по передаче эл.эн. двухставочный)</label>
        </div>
        <div class="form-group">
          <input id="tarif_5" v-model="details.pricing" type="radio" value="" name="tarif"><label for="tarif_5">5 (Расчет = сумма фактической стоимости эл.эн. по каждому часу, сумма отклонений от плана и стоимости мощности. Тариф одноставочный)</label>
        </div>
        <div class="form-group">
          <input id="tarif_6" v-model="details.pricing" type="radio" value="" name="tarif"><label for="tarif_6">6 (Расчет = сумма фактической стоимости эл.эн. по каждому часу, сумма отклонений от плана и стоимости мощности. Тариф двухставочный)</label>
        </div>
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
  </div>
</template>

<script>
import { ru } from 'vuejs-datepicker/dist/locale'
export default {
  name: 'Details',
  data () {
    return {
      ru,
      details: {
        connectionType: 1,
        requester: '',
        contractNumber: '',
        contractDate: '',
        connectionDuration: '',
        objectName: '',
        objectLocation: '',
        kadastrNum: '',
        constructionReason: '0',
        connectorsCount: '',
        maxPower: '',
        previousMaxPower: '',
        integrityCategory: '0',
        powerLevel: '0',
        loadType: '0',
        emergencyAuto: '',
        estimationYear: '0',
        estimationQuater: '0',
        power: '',
        energoCompanyName: '0',
        pricing: '',
        other: ''
      }
    }
  },
  methods: {
    submitDetails () {
      this.$axios.post(process.env.LARAVEL_API_BASE_URL + '/api/request/details', this.details)
        .then((response) => {
          if (response.data.success) {
            // todo: редирект на страницу заявки где можно посмотреть что ты заполнил и увидеть статус
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
