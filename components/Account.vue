<template>
  <div class="connection">
    <div class="page-title d-flex">
      <div class="active">
        Ваш профиль
      </div>
    </div>
    <div class="account">
      <div class="d-flex boxes">
        <div class="box status-1 col-6 mr-20">
          <h4>Доступ к личному кабинету</h4>
          <div class="inputs">
            <div class="form-group">
              <input type="text" placeholder="СНИЛС" class="form-control">
            </div>
            <div class="form-group">
              <input type="email" placeholder="Имейл" class="form-control">
            </div>
            <label class="label">Смена пароля</label>
            <div class="form-group">
              <input type="password" placeholder="Старый пароль" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Новый пароль" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Новый пароль еще раз" class="form-control">
            </div>
            <div class="form-group">
              <button class="btn blue-button">
                Сохранить
              </button>
            </div>
          </div>
        </div>
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
                  Петр Иванович Язь
                </div>
                <div class="red-warning">
                  Паспортные данные не указаны
                </div>
              </div>
              <div class="text-right">
                <a v-b-modal.modal-phys-data href="#"><img src="/images/edit.svg" alt="" title=""></a>
                <b-modal id="modal-phys-data" centered title="Паспортные данные">
                  <div class="d-flex inputs justify-content-between">
                    <div class="form-group col-4 mr-20">
                      <input type="text" class="form-control" placeholder="Имя">
                    </div>
                    <div class="form-group col-4 mr-20">
                      <input type="text" class="form-control" placeholder="Фамилия">
                    </div>
                    <div class="form-group col-4">
                      <input type="text" class="form-control" placeholder="Отчество">
                    </div>
                  </div>
                  <div class="inputs form-group">
                    <input type="text" class="form-control" placeholder="Серия и номер паспорта">
                  </div>
                  <div class="d-flex inputs justify-content-between">
                    <div class="form-group col-9 mr-20">
                      <input type="text" class="form-control" placeholder="Кем выдан">
                    </div>
                    <div class="form-group col-3">
                      <input type="text" class="form-control" placeholder="Дата выдачи">
                    </div>
                  </div>
                  <div class="inputs form-group">
                    <input type="text" class="form-control" placeholder="Адрес регистрации">
                  </div>
                  <div class="inputs form-group">
                    <input type="text" class="form-control" placeholder="Адрес проживания (если отличается)">
                  </div>
                  <template #modal-footer>
                    <button type="button" class="btn blue-button">
                      Сохранить
                    </button>
                  </template>
                </b-modal>
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
                <b-modal id="modal-yur-data" centered title="Данные о Юридическом лице или ИП">
                  <div class="inputs form-group">
                    <input type="text" class="form-control" placeholder="Название компании/ИП/ИНН">
                  </div>
                  <label class="label">Банковские реквизиты</label>
                  <div class="inputs form-group">
                    <input type="text" class="form-control" placeholder="БИК">
                  </div>
                  <template #modal-footer>
                    <button type="button" class="btn blue-button">
                      Сохранить
                    </button>
                  </template>
                </b-modal>
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
// import Index from "@/pages";
export default {
  name: 'Account'
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
