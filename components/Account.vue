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
                <a href=""><img src="/images/edit.svg" alt="" title=""></a>
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
                <a href=""><img src="/images/edit.svg" alt="" title=""></a>
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
            <input type="file" class="invisible position-absolute">
            <button class="btn blue-button">
              Загрузить
            </button>
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
        <div class="separator sep-15"></div>
        <div class="personal-data">
          <div>
            <label class="label">Документы по юридическому лицу или ИП</label>
          </div>
          <div class="file-upload">
            <input type="file" class="invisible position-absolute">
            <button class="btn blue-button">
              Загрузить
            </button>
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
export default {
  name: 'Account'
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
