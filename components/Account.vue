<template>
  <div class="connection">
    <div class="page-title d-flex">
      <div class="active">
        Ваш профиль
      </div>
    </div>
    <div class="account">
      <div class="d-flex boxes">
        <account-form />
        <div class="box status-5 col-6">
          <h4>Персональные данные</h4>
          <div class="personal-data">
            <div class="d-flex justify-content-between">
              <div>
                <div>
                  <label class="label">Лицевой счет</label>
                </div>
                <div class="text-content">
                  Новый клиент: лицевой счет еще не присвоен
                </div>
              </div>
            </div>
            <div class="separator" />
            <div class="d-flex justify-content-between">
              <div>
                <div>
                  <label class="label">Физическое лицо</label>
                </div>
                <div class="text-content">
                  {{ customerName }}
                </div>
                <div class="red-warning">
                  {{ passportData }}
                </div>
              </div>
              <div class="text-right">
                <a v-b-modal.modal-phys-data><img src="/images/edit.svg" alt="" title=""></a>
                <profile />
              </div>
            </div>
            <div class="separator" />
            <div class="d-flex justify-content-between">
              <div>
                <div>
                  <label class="label">Юридическое лицо или ИП</label>
                </div>
                <div class="text-content">
                  ОАО "ПЕРВЫЙ ХЛАДОКОМБИНАТ"
                </div>
                <div class="text-details">
                  ИНН 7708046767 107140, г Москва, Красносельский р-н, ул Верхняя Красносельская, д 3А
                </div>
                <div class="red-warning">
                  Банковские реквизиты не указаны
                </div>
              </div>
              <div class="text-right">
                <a v-b-modal.modal-yur-data href="#"><img src="/images/edit.svg" alt="" title=""></a>
                <company />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box status-2 col-12">
        <h4>Ваши документы</h4>
        <div class="personal-data">
          <div>
            <label class="label">Документы по физическому лицу</label>
          </div>
          <div class="file-upload">
            <button v-b-modal.modal-phys-docs type="button" class="btn blue-button">
              Загрузить
            </button>
            <b-modal id="modal-phys-docs" centered size="xl" title="Загрузка документов">
              <v-file-input
                show-size
                single-line
                label="Документ удостоверяющий личность заявителя"
                hint="Документ удостоверяющий личность заявителя"
              />
              <v-file-input
                show-size
                single-line
                label="Документ подтверждающий полномочия представителя заявителя"
                hint="Документ подтверждающий полномочия представителя заявителя"
              />
              <template #modal-footer>
                <button type="button" class="btn blue-button">
                  Загрузить
                </button>
              </template>
            </b-modal>
          </div>
          <div class="uploaded-files d-flex mt-20 align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div class="mr-20">
                <a href=""><img src="/images/image-1.jpg" alt="" title=""></a>
              </div>
              <div>
                Документ удостоверяющий личность заявителя
              </div>
            </div>
            <div>
              <a href=""><img src="/images/upload.svg" alt="" title=""></a>
              <a href=""><img src="/images/confirm.svg" alt="" title=""></a>
              <a href=""><img src="/images/remove.svg" alt="" title=""></a>
            </div>
          </div>
          <div class="uploaded-files d-flex mt-20 align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div class="mr-20">
                <a href=""><img src="/images/image-2.jpg" alt="" title=""></a>
              </div>
              <div>
                Документ подтверждающий полномочия представителя заявителя
              </div>
            </div>
            <div>
              <a href=""><img src="/images/upload.svg" alt="" title=""></a>
              <a href=""><img src="/images/confirm.svg" alt="" title=""></a>
              <a href=""><img src="/images/remove.svg" alt="" title=""></a>
            </div>
          </div>
        </div>
        <div class="separator sep-15" />
        <div class="personal-data">
          <div>
            <label class="label">Документы по юридическому лицу или ИП</label>
          </div>
          <div class="file-upload">
            <button v-b-modal.modal-yur-docs type="button" class="btn blue-button">
              Загрузить
            </button>
            <b-modal id="modal-yur-docs" centered size="xl" title="Загрузка документов">
              <v-file-input
                show-size
                single-line
                label="Документ подтверждающий полномочия представителя заявителя"
                hint="Документ подтверждающий полномочия представителя заявителя"
              />
              <v-file-input
                show-size
                single-line
                label="Устав, решение учредителей о создании юр. лица и т.п."
                hint="Устав, решение учредителей о создании юр. лица и т.п."
              />
              <v-file-input
                show-size
                single-line
                label="Приказ, выписка из протокола, решение учредителей о назначении директора"
                hint="Приказ, выписка из протокола, решение учредителей о назначении директора"
              />
              <v-file-input
                show-size
                single-line
                label="Выписка или свидетельство о государственной регистрации заявителя в качестве юридического лица или ип"
                hint="Выписка или свидетельство о государственной регистрации заявителя в качестве юридического лица или ип"
              />
              <v-file-input
                show-size
                single-line
                label="Свидетельство о постановке заявителя на учет в налоговом органе"
                hint="Свидетельство о постановке заявителя на учет в налоговом органе"
              />
              <template #modal-footer>
                <button type="button" class="btn blue-button">
                  Загрузить
                </button>
              </template>
            </b-modal>
          </div>
          <div class="uploaded-files d-flex mt-20 align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div class="mr-20">
                <a href=""><img src="/images/image-2.jpg" alt="" title=""></a>
              </div>
              <div>
                Документ подтверждающий полномочия представителя заявителя
              </div>
            </div>
            <div>
              <a href=""><img src="/images/upload.svg" alt="" title=""></a>
              <a href=""><img src="/images/confirm.svg" alt="" title=""></a>
              <a href=""><img src="/images/remove.svg" alt="" title=""></a>
            </div>
          </div>
          <div class="uploaded-files d-flex mt-20 align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div class="mr-20">
                <a href=""><img src="/images/image-1.jpg" alt="" title=""></a>
              </div>
              <div>
                Устав, решение учредителей о создании юр. лица и т.п.
              </div>
            </div>
            <div>
              <a href=""><img src="/images/upload.svg" alt="" title=""></a>
              <a href=""><img src="/images/confirm.svg" alt="" title=""></a>
              <a href=""><img src="/images/remove.svg" alt="" title=""></a>
            </div>
          </div>
          <div class="uploaded-files d-flex mt-20 align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div class="mr-20">
                <a href=""><img src="/images/image-1.jpg" alt="" title=""></a>
              </div>
              <div>
                Приказ, выписка из протокола, решение учредителей о назначении директора
              </div>
            </div>
            <div>
              <a href=""><img src="/images/upload.svg" alt="" title=""></a>
              <a href=""><img src="/images/confirm.svg" alt="" title=""></a>
              <a href=""><img src="/images/remove.svg" alt="" title=""></a>
            </div>
          </div>
          <div class="uploaded-files d-flex mt-20 align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div class="mr-20">
                <a href=""><img src="/images/image-1.jpg" alt="" title=""></a>
              </div>
              <div>
                Выписка или свидетельство о государственной регистрации заявителя в качестве юридического лица или ип
              </div>
            </div>
            <div>
              <a href=""><img src="/images/upload.svg" alt="" title=""></a>
              <a href=""><img src="/images/confirm.svg" alt="" title=""></a>
              <a href=""><img src="/images/remove.svg" alt="" title=""></a>
            </div>
          </div>
          <div class="uploaded-files d-flex mt-20 align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div class="mr-20">
                <a href=""><img src="/images/image-1.jpg" alt="" title=""></a>
              </div>
              <div>
                Свидетельство о постановке заявителя на учет в налоговом органе
              </div>
            </div>
            <div>
              <a href=""><img src="/images/upload.svg" alt="" title=""></a>
              <a href=""><img src="/images/confirm.svg" alt="" title=""></a>
              <a href=""><img src="/images/remove.svg" alt="" title=""></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Profile from './account/Profile'
import Company from './account/Company'
import Form from './account/Form'
export default {
  name: 'Account',
  components: {
    Profile,
    Company,
    'account-form': Form
  },
  computed: {
    ...mapGetters([
      'user',
      'userProfile'
    ]),
    customerName () {
      if (this.userProfile) {
        return this.userProfile.last_name + ' ' + this.userProfile.first_name + ' ' + this.userProfile.middle_name
      }
      return ''
    },
    passportData () {
      if (this.userProfile && this.userProfile.pasport) {
        return this.userProfile.pasport
      }
      return 'Паспортные данные не указаны'
    }
  }
  // components: { Index }
}
</script>

<style scoped lang="scss">
  .personal-data {
    .label {
      margin-bottom: 5px;
    }
    .separator {
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .red-warning {
      color: $redWarning;
      font-size: 12px;
    }
    .text-details {
      font-size: 12px;
      color: $orderStatusColor;
    }
  }
</style>
