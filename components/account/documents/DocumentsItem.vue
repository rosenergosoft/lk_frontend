<template>
  <div class="uploaded-files d-flex mt-20 align-items-center justify-content-between">
    <div class="d-flex align-items-center">
      <div class="mr-20 document-preview">
        <a href=""><img :src="getUrl()" alt="" title=""></a>
      </div>
      <div>
        {{ getType() }}
      </div>
    </div>
    <div>
      <a href=""><img src="/images/upload.svg" alt="" title=""></a>
      <a href=""><img src="/images/confirm.svg" alt="" title=""></a>
      <a href=""><img src="/images/remove.svg" alt="" title=""></a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DocumentsItem',
  props: {
    doc: Object
  },
  data () {
    return {
      types: {
        personal_id: 'Документ удостоверяющий личность заявителя',
        proxy: 'Документ подтверждающий полномочия представителя заявителя'
      }
    }
  },
  methods: {
    getUrl () {
      return process.env.LARAVEL_API_BASE_URL + '/storage/' + this.doc.path
    },
    getType () {
      return this.types[this.doc.type]
    }
  }
}
</script>
