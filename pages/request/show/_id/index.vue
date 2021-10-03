<template>
  <div class="connection">
    <div class="page-title d-flex">
      <div class="active">
        Просмотр заявки
      </div>
    </div>
    <div v-if="loaded" class="new-request">
      <div class="boxes">
        <div class="box status-2">
          <h4>Заявка | <span class="red-warning">{{ status[application.status] }}</span></h4>
          <div class="personal-data">
            <div class="d-flex justify-content-between">
              <div>
                <div>
                  <label class="label">Персональные данные</label>
                </div>
                <div class="text-content">
                  <div>{{ userProfile.first_name }} {{ userProfile.middle_name }} {{ userProfile.last_name }}</div>
                  <div>Паспорт: {{ userProfile.pasport }}, {{ userProfile.pasport_granted_by }}, {{ formatDate(userProfile.pasport_date) }}</div>
                </div>
              </div>
            </div>
            <div class="docs-show">
              <DocumentsItem
                v-for="doc in documents.phys"
                :key="doc.id"
                :doc="doc"
              />
            </div>
            <div class="separator" />
          </div>
          <div v-if="application.requester === 'yur'" class="personal-data">
            <div class="d-flex justify-content-between">
              <div>
                <div>
                  <label class="label">Юридическое лицо</label>
                </div>
                <div class="text-content">
                  <div>{{ company.name }}</div>
                  <div>ИНН: {{ company.inn }}</div>
                  <div>Адрес: {{ company.address }}</div>
                  <div class="mt-20">
                    <label class="label">Реквизиты</label>
                    <div>
                      Банк: {{ company.bank_name }}
                    </div>
                    <div>
                      БИК: {{ company.bank_bik }}
                    </div>
                    <div>
                      Расчетный счет: {{ company.check_account }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="docs-show">
              <DocumentsItem
                v-for="doc in documents.yur"
                :key="doc.id"
                :doc="doc"
              />
            </div>
            <div class="separator" />
          </div>
          <div class="personal-data">
            <div>
              <div>
                <label class="label">Параметры подключения</label>
                <div class="text-content show-content">
                  <div>Тип подключения: {{ connectionType[application.connectionType] }}</div>
                  <div v-if="application.connectionType === 1">
                    <div>Номер текущего договора: {{ application.contractNumber }}</div>
                    <div>Дата заключения договора: {{ formatDate(application.contractDate) }}</div>
                  </div>
                  <div v-if="application.connectionType === 2">
                    <div>Продолжительность подключения в днях: {{ application.connectionDuration }}</div>
                  </div>
                  <div>Объект подключения: {{ application.objectName }}</div>
                  <div>Местоположение объекта: {{ application.objectLocation }}</div>
                  <div>Кадастровый номер земельного участка: {{ application.kadastrNum }}</div>
                  <div>Причина подсоединения: {{ constructionReason[application.constructionReason] }}</div>
                  <div>Количество точек присоединения (шт.): {{ application.connectorsCount }}</div>
                  <div>Запрашиваемая максимальная мощность для основного источника питания (кВт): {{ application.maxPower }}</div>
                  <div>В том числе ранее присоединенная максимальная мощность (кВт): {{ application.previousMaxPower }}</div>
                  <div>Категория надежности: {{ integrityCategory[application.integrityCategory] }}</div>
                  <div>Уровень напряжения: {{ powerLevel[application.powerLevel] }}</div>
                  <div>Характер нагрузки (вид экономической деятельности): {{ loadType[application.loadType] }}</div>
                  <div>Энергопринимающие устройства, которые могут быть присоединены к устройствам противоаварийной автоматики: {{ emergencyAuto[application.emergencyAuto] }}</div>
                  <div>Сроки проектирования: {{ estimationQuater[application.estimationQuater] }} квартал {{ application.estimationYear }} года</div>
                  <div>Мощность (кВт): {{ application.power }} </div>
                  <div v-if="application.vendor">
                    Энергосбытовая: {{ application.vendor.name }}
                  </div>
                  <div>Ценовая категория:  {{ pricing[application.pricing] }}</div>
                  <div>Дополнительная информация:  {{ application.other }}</div>
                </div>
              </div>
            </div>
            <div class="separator" />
          </div>
          <div v-if="messages" class="personal-data">
            <label class="label">Сообщения</label>
            <div class="private-messages">
              <Message
                v-for="item in messages"
                :key="item.id"
                :message="item"
                :entity="application"
              />
            </div>
          </div>
        </div>
        <div class="box status-1">
          <div class="personal-data">
            <h4>Документы к заявке</h4>
            <div class="details">
              <button v-b-modal.add-document-modal class="blue-button float-none">
                Добавить документ
              </button>
            </div>
            <div class="clearfix" />
            <div class="details">
              <AppDoc
                v-for="(doc, index) in docs"
                :key="doc.id"
                :doc="doc"
                :index="index"
                :count="docs.length"
                :show-owner="true"
                @remove-file="removeFile"
                @download-file="downloadFile"
              />
            </div>
            <div class="clearfix" />
            <AddDocumentModal
              :entity-id="application.id"
              type="application"
              @file-upload-after="updateDocs"
            />
          </div>
        </div>
        <div v-if="isExecutive || application.status !== 'completed'" class="box status-6">
          <h4>Заявка</h4>
          <div v-if="isExecutive" class="personal-data">
            <div class="inputs">
              <label class="label">Сменить статус</label>
              <div class="select-wrapper">
                <select v-model="application.status" class="form-control" @change="changeStatus">
                  <option v-if="application.user_id === user.id" value="draft">
                    Черновик
                  </option>
                  <option value="accepted">
                    В работе
                  </option>
                  <option value="in_progress">
                    Исполняется
                  </option>
                  <option value="preparing">
                    Подготовка технических условий
                  </option>
                  <option value="invoice">
                    Счет на оплату
                  </option>
                  <option value="waiting_company_resp">
                    Ожидает ответа компании
                  </option>
                  <option value="completed">
                    Выполнен
                  </option>
                  <option value="declined">
                    Отклонен
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div v-if="application.status !== 'completed'" class="inputs">
            <textarea v-model="text" class="form-control" placeholder="Ответить" />
          </div>
          <div class="mt-20">
            <button class="btn blue-button" @click="sendMessage">
              Отправить ответ
            </button>
          </div>
          <div class="clearfix" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddDocumentModal from '@/components/AddDocumentModal'
import { mapGetters } from 'vuex'
import fileDownload from 'js-file-download'
import AppDoc from '@/components/AppDoc'
import DocumentsItem from '~/components/account/documents/DocumentsItem'
import Message from '~/components/Message'
export default {
  name: 'Index',
  components: {
    DocumentsItem,
    Message,
    AddDocumentModal,
    AppDoc
  },
  data () {
    return {
      userProfile: {},
      application: {},
      company: {},
      text: '',
      messages: {},
      docs: {},
      documents: {
        phys: [],
        yur: []
      },
      loaded: false,
      connectionType: [
        'Постоянное подключение',
        'Временное на период выполнения постоянной схемы электроснабжения',
        'Временное подключение передвижного объекта'
      ],
      constructionReason: [
        'Новое строительство',
        'Увеличение максимальной мощности',
        'Изменение точки присоединения',
        'Изменение категории надежности',
        'Увеличение максимальной мощности и изменение точки присоединения',
        'Увеличение максимальной мощности и изменение категории надежности'
      ],
      integrityCategory: [
        '',
        'I',
        'II',
        'III'
      ],
      powerLevel: [
        '',
        '0.22 кВт',
        '0.38 кВт',
        '6 кВт',
        '10 кВт'
      ],
      loadType: [
        '',
        'Другое',
        'Гостиницы и рестораны',
        'Государственное управление и обеспечение военной безопасности; обязательное социальное обеспечение',
        'Деятельность экстерриториальных организаций',
        'Добыча полезных ископаемых',
        'Здравоохранение и предоставление социальных услуг',
        'Обрабатывающие производства',
        'Образование',
        'Операции с недвижимым имуществом, аренда и предоставление услуг',
        'Оптовая и розничная торговля; ремонт автотранспортных средств, мотоциклов, бытовых изделий и предмет',
        'Предоставление прочих коммунальных, социальных и персональных услуг',
        'Предоставление услуг по ведению домашнего хозяйства',
        'Производство и распределение электроэнергии, газа и воды (генерация)',
        'Производство и распределение электроэнергии, газа и воды (прочие)',
        'Производство и распределение электроэнергии, газа и воды (электрические сети ТСО)',
        'Прочее',
        'Рыболовство, рыбоводство',
        'Сельское хозяйство, охота и лесное хозяйство',
        'Строительство',
        'Транспорт и связь',
        'Финансовая деятельность'
      ],
      emergencyAuto: [
        'Нет',
        'Да'
      ],
      estimationQuater: [
        '',
        '1',
        '2',
        '3',
        '4'
      ],
      pricing: [
        '',
        '1 (Расчет = цена * объем потребления. Тариф по передаче эл.эн. одноставочный)',
        '2 (Расчет = сумма стоимости эл.эн для каждой зоны суток. Тариф по передаче эл.эн. одноставочный)',
        '3 (Расчет = сумма стоимости эл.эн. за каждый час плюс стоимость мощности. Тариф по передаче эл.эн. одноставочный)',
        '4 (Расчет = сумма стоимости эл.эн. за каждый час плюс стоимость мощности. Тариф по передаче эл.эн. двухставочный)',
        '5 (Расчет = сумма фактической стоимости эл.эн. по каждому часу, сумма отклонений от плана и стоимости мощности. Тариф одноставочный)',
        '6 (Расчет = сумма фактической стоимости эл.эн. по каждому часу, сумма отклонений от плана и стоимости мощности. Тариф двухставочный)'
      ],
      status: {
        draft: 'Черновик',
        accepted: 'В работе',
        in_progress: 'Исполняется',
        preparing: 'Подготовка технических условий',
        invoice: 'Счет на оплату',
        waiting_company_resp: 'Ожидает ответа компании',
        completed: 'Выполнен',
        declined: 'Отклонен'
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted () {
    this.getApplication()
  },
  methods: {
    updateDocs (res) {
      this.docs = res.docs
    },
    async getDocs () {
      const res = await this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/application/getDocs/' + this.application.id)
      if (res) {
        this.docs = res.docs
      }
    },
    removeFile (fileData) {
      const formData = {
        application_id: this.application.id,
        doc_id: fileData.id
      }
      this.setLoading(true)
      this.$axios.$post(process.env.LARAVEL_API_BASE_URL + '/api/application/fileDelete', formData).then(
        (res) => {
          this.setLoading(false)
        }
      )
      this.docs.splice(fileData.index, 1)
    },
    downloadFile (fileData) {
      this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/application/downloadFile/' + fileData.id, {
        responseType: 'blob'
      })
        .then((res) => {
          if (res) {
            fileDownload(res, fileData.name)
          }
        })
    },
    async getApplication () {
      const id = this.$route.params.id
      try {
        this.setLoading(true)
        const res = await this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/application/get/' + id)
        if (res.application) {
          this.application = res.application
        }
        if (res.userProfile) {
          this.userProfile = res.userProfile
        }
        if (res.company) {
          this.company = res.company
        }
        await this.getDocuments()
        await this.getMessages()
        this.loaded = true
        await this.getDocs()
        this.setLoading(false)
      } catch (e) {
        // console.log(e)
      }
    },
    async getMessages () {
      const res = await this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/application/getMessages/' + this.application.id)
      if (res.success) {
        this.messages = res.messages
      }
    },
    sendMessage () {
      const formData = {
        entity_id: this.application.id,
        message: this.text
      }
      this.$axios.$post(process.env.LARAVEL_API_BASE_URL + '/api/application/sendMessage', formData)
        .then((res) => {
          if (res.success) {
            this.text = ''
            this.$notify({ type: 'success', title: 'Успех', text: 'Сообщение отправлено', duration: 6000 })
            this.messages = res.messages
            this.application = res.application
          }
        })
    },
    formatDate (date) {
      return this.$moment.utc(date).format('DD-MM-YYYY')
    },
    changeStatus () {
      const formData = {
        application_id: this.application.id,
        status: this.application.status
      }
      this.setLoading(true)
      this.$axios.$post(process.env.LARAVEL_API_BASE_URL + '/api/application/changeStatus', formData)
        .then((res) => {
          this.setLoading(false)
          if (res.success) {
            this.$notify({ type: 'success', title: 'Успех', text: 'Статус изменен', duration: 6000 })
          }
        })
    },
    async getDocuments () {
      const res = await this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/user/documents/' + this.application.user_id)
      if (res.data.docs) {
        this.documents = res.data.docs
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .red-warning {
    color: $redWarning !important;
  }
</style>
