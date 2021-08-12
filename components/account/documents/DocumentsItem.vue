<template>
  <div class="uploaded-files d-flex mt-20 align-items-center justify-content-between">
    <div class="d-flex align-items-center">
      <div v-viewer="{navbar:false, toolbar:false}" class="mr-20 document-preview">
        <img :src="getUrl()" :alt="doc.filename" title="">
      </div>
      <div>
        {{ getType() }}
      </div>
    </div>
    <div v-if="!doc.signature">
      <a href=""><img src="/images/upload.svg" alt="" title=""></a>
      <a @click.prevent="signDoc"><img src="/images/confirm.svg" alt="" title=""></a>
      <a @click.prevent="deleteDocument"><img src="/images/remove.svg" alt="" title=""></a>
    </div>
    <Signing
      :doc="doc"
    />
  </div>
</template>
<script>
import Signing from './Signing'
export default {
  name: 'DocumentsItem',
  components: {
    Signing
  },
  props: {
    doc: Object
  },
  data () {
    return {
      types: {
        personal_id: 'Документ удостоверяющий личность заявителя',
        proxy: 'Документ подтверждающий полномочия представителя заявителя',
        yur_proxy: 'Документ подтверждающий полномочия представителя заявителя',
        yur_ustav: 'Устав, решение учредителей о создании юр. лица',
        yur_prikaz: 'Приказ, выписка из протокола, решение учредителей о назначении директора',
        yur_sgr: 'Выписка или свидетельство о государственной регистрации заявителя в качестве юридического лица или ип',
        yur_pszun: 'Свидетельство о постановке заявителя на учет в налоговом органе'
      }
    }
  },
  methods: {
    getUrl () {
      return process.env.LARAVEL_API_BASE_URL + '/storage/' + this.doc.path
    },
    getType () {
      return this.types[this.doc.type]
    },
    deleteDocument () {
      this.$axios.delete(process.env.LARAVEL_API_BASE_URL + '/api/user/documents?id=' + this.doc.id)
        .then((res) => {
          if (res.data.success) {
            this.$emit('deleted')
          }
        })
    },
    signDoc () {
      this.$bvModal.show('doc-signing')
    }
  }
}
</script>
