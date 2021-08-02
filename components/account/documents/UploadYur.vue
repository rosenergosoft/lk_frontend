<template>
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
</template>

<script>
export default {
  name: 'UploadYur'
}
</script>

<style scoped>

</style>
