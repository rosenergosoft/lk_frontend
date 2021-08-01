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
          <PersonalData />
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
import Form from './account/Form'
import PersonalData from '~/components/account/PersonalData'
export default {
  name: 'Account',
  components: {
    'account-form': Form,
    PersonalData
  }
  // components: { Index }
}
</script>

<style scoped lang="scss">

</style>
