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
        <input id="phys" type="radio" value="" name="requester-type"><label for="phys">Физическое лицо</label>
      </div>
      <div class="form-group">
        <input id="yur" type="radio" value="" name="requester-type"><label for="yur">Юридическое лицо</label>
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
        <input id="constant" v-model="connectionType" type="radio" value="0" name="connection_type"><label for="constant">Постоянное подключение</label>
      </div>
      <div class="form-group">
        <input id="short" v-model="connectionType" type="radio" value="1" name="connection_type"><label for="short">Временное на период выполнения постоянной схемы электроснабжения</label>
      </div>
      <div class="form-group">
        <input id="short-move" v-model="connectionType" type="radio" value="2" name="connection_type"><label for="short-move">Временное подключение передвижного объекта</label>
      </div>
      <div v-if="connectionType === '1'">
        <div class="inputs">
          <div class="form-group">
            <input class="form-control" type="text" placeholder="Номер текущего договора">
          </div>
          <div class="form-group">
            <input class="form-control" type="text" placeholder="Дата заключения договора">
          </div>
        </div>
      </div>
      <div v-if="connectionType === '2'">
        <div class="inputs">
          <div class="form-group">
            <input class="form-control" type="text" placeholder="Продолжительность подключения в днях">
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
          <input class="form-control" type="text" placeholder="Наименование присоединяемых объектов (жилой дом, гараж и т.п.)">
        </div>
        <div class="form-group">
          <input class="form-control" type="text" placeholder="Местоположение объекта"> <!-- address autosuggest -->
        </div>
        <div class="form-group">
          <input class="form-control" type="text" placeholder="Кадастровый номер земельного участка">
        </div>
        <div class="form-group select-wrapper">
          <select class="form-control">
            <option>Новое строительство</option>
            <option>Увеличение максимальной мощности</option>
            <option>Изменение точки присоединения</option>
            <option>Изменение категории надежности</option>
            <option>Увеличение максимальной мощности и изменение точки присоединения</option>
            <option>Увеличение максимальной мощности и изменение категории надежности</option>
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
          <input class="form-control" type="text" placeholder="Количество точек присоединения (шт.)">
        </div>
        <div class="form-group">
          <input class="form-control" type="text" placeholder="Запрашиваемая максимальная мощность для основного источника питания (кВт)"> <!-- address autosuggest -->
        </div>
        <div class="form-group">
          <input class="form-control" type="text" placeholder="В том числе ранее присоединенная максимальная мощность (кВт)">
        </div>
        <div class="form-group select-wrapper">
          <select class="form-control">
            <option>Категория надежности</option>
            <option>I</option>
            <option>II</option>
            <option>III</option>
          </select>
        </div>
        <div class="form-group select-wrapper">
          <select class="form-control">
            <option>Уровень напряжения</option>
            <option>0.22 кВт</option>
            <option>0.38 кВт</option>
            <option>6 кВт</option>
            <option>10 кВт</option>
          </select>
        </div>
        <div class="form-group select-wrapper">
          <select class="form-control">
            <option>Характер нагрузки (вид экономической деятельности)</option>
            <option>Другое</option>
            <option>Гостиницы и рестораны</option>
            <option>Государственное управление и обеспечение военной безопасности; обязательное социальное обеспечение</option>
            <option>Деятельность экстерриториальных организаций</option>
            <option>Добыча полезных ископаемых</option>
            <option>Здравоохранение и предоставление социальных услуг</option>
            <option>Обрабатывающие производства</option>
            <option>Образование</option>
            <option>Операции с недвижимым имуществом, аренда и предоставление услуг</option>
            <option>Оптовая и розничная торговля; ремонт автотранспортных средств, мотоциклов, бытовых изделий и предмет</option>
            <option>Предоставление прочих коммунальных, социальных и персональных услуг</option>
            <option>Предоставление услуг по ведению домашнего хозяйства</option>
            <option>Производство и распределение электроэнергии, газа и воды (генерация)</option>
            <option>Производство и распределение электроэнергии, газа и воды (прочие)</option>
            <option>Производство и распределение электроэнергии, газа и воды (электрические сети ТСО)</option>
            <option>Прочее</option>
            <option>Рыболовство, рыбоводство</option>
            <option>Сельское хозяйство, охота и лесное хозяйство</option>
            <option>Строительство</option>
            <option>Транспорт и связь</option>
            <option>Финансовая деятельность</option>
          </select>
        </div>
        <div>
          <label>Энергопринимающие устройства, которые могут быть присоединены к устройствам противоаварийной автоматики</label>
        </div>
        <div class="form-group">
          <input id="emergency_auto_yes" type="radio" value="" name="emergency_auto"><label for="emergency_auto_yes" class="mr-20">Есть</label>
          <input id="emergency_auto_no" type="radio" value="" name="emergency_auto"><label for="emergency_auto_no">Нет</label>
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
          <select class="form-control">
            <option>Год</option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
            <option>2027</option>
            <option>2028</option>
            <option>2029</option>
            <option>2030</option>
          </select>
        </div>
        <div class="form-group select-wrapper">
          <select class="form-control">
            <option>Квартал</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div class="form-group">
          <input class="form-control" type="text" placeholder="Мощность (кВт)">
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
          <select class="form-control">
            <option>Наименование энергосбытовой компании</option>
            <option>ООО Ололо</option>
            <option>ООО Рога и копыта</option>
            <option>ООО Тыц Тыц</option>
          </select>
        </div>
        <div>
          <label>Ценовая категория</label>
        </div>
        <div class="form-group">
          <input id="tarif_1" type="radio" value="" name="tarif"><label for="tarif_1" class="mr-20">1 (Расчет = цена * объем потребления. Тариф по передаче эл.эн. одноставочный)</label>
        </div>
        <div class="form-group">
          <input id="tarif_2" type="radio" value="" name="tarif"><label for="tarif_2">2 (Расчет = сумма стоимости эл.эн для каждой зоны суток. Тариф по передаче эл.эн. одноставочный)</label>
        </div>
        <div class="form-group">
          <input id="tarif_3" type="radio" value="" name="tarif"><label for="tarif_3">3 (Расчет = сумма стоимости эл.эн. за каждый час плюс стоимость мощности. Тариф по передаче эл.эн. одноставочный)</label>
        </div>
        <div class="form-group">
          <input id="tarif_4" type="radio" value="" name="tarif"><label for="tarif_4">4 (Расчет = сумма стоимости эл.эн. за каждый час плюс стоимость мощности. Тариф по передаче эл.эн. двухставочный)</label>
        </div>
        <div class="form-group">
          <input id="tarif_5" type="radio" value="" name="tarif"><label for="tarif_5">5 (Расчет = сумма фактической стоимости эл.эн. по каждому часу, сумма отклонений от плана и стоимости мощности. Тариф одноставочный)</label>
        </div>
        <div class="form-group">
          <input id="tarif_6" type="radio" value="" name="tarif"><label for="tarif_6">6 (Расчет = сумма фактической стоимости эл.эн. по каждому часу, сумма отклонений от плана и стоимости мощности. Тариф двухставочный)</label>
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
        <textarea class="form-control" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Details',
  data () {
    return {
      connectionType: 1
    }
  }
}
</script>

<style scoped>

</style>
