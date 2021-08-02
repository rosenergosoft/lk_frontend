<template>
  <div>
    <div class="personal-data">
      <div>
        <label class="label">Документы по физическому лицу</label>
      </div>
      <div class="file-upload">
        <button v-b-modal.modal-phys-docs type="button" class="btn blue-button">
          Загрузить
        </button>
        <upload-phys />
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
        <upload-yur />
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
</template>

<script>
import UploadPhys from './documents/UploadPhys'
import UploadYur from './documents/UploadYur'
export default {
  name: 'Documents',
  components: {
    UploadPhys,
    UploadYur
  }
}
</script>

<style scoped>

</style>
