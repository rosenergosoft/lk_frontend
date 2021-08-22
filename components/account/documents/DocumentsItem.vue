<template>
  <div class="uploaded-files d-flex mt-20 align-items-center justify-content-between">
    <div class="d-flex align-items-center">
      <div v-if="isImage" v-viewer="{navbar:false, toolbar:false}" class="mr-20 document-preview">
        <img :src="getUrl()" :alt="doc.filename" title="">
      </div>
      <div v-if="isDoc" class="mr-20 document-preview">
        <b-icon-file-earmark class="bootstrap-icon" font-scale="3" />
      </div>
      <div>
        {{ getType() }}
      </div>
    </div>
    <div v-if="!doc.signature">
      <a @click.prevent="signDoc"><b-icon-clipboard v-tooltip="'Подписать документ'" class="bootstrap-icon hoverColor mr-0" style="top: 4px;" /></a>
      <a @click.prevent="deleteDocument"><b-icon-trash v-tooltip="'Удалить документ'" class="bootstrap-icon mr-0 red-status" style="top: 4px;" /></a>
    </div>
    <div v-else class="dark-green">
      <a @click.prevent="signDoc"><b-icon-clipboard-check v-tooltip="'Документ подписан'" class="bootstrap-icon" style="top: 3px;" /></a>
    </div>
    <Signing
      :doc="doc"
    />
  </div>
</template>
<script>
import { BIconClipboardCheck, BIconClipboard, BIconFileEarmark, BIconTrash } from 'bootstrap-vue'
import Signing from './Signing'
export default {
  name: 'DocumentsItem',
  components: {
    Signing,
    BIconClipboardCheck,
    BIconFileEarmark,
    BIconClipboard,
    BIconTrash
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
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
      },
      fileType: {
        image: [
          'jpg',
          'jpeg',
          'png'
        ],
        doc: [
          'doc',
          'pdf',
          'docx',
          'xls',
          'xlsx'
        ]
      }
    }
  },
  computed: {
    fileExtension () {
      const re = /(?:\.([^.]+))?$/
      return re.exec(this.doc.filename)[1]
    },
    isImage () {
      return this.fileType.image.includes(this.fileExtension)
    },
    isDoc () {
      return this.fileType.doc.includes(this.fileExtension)
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
      this.setLoading(true)
      this.$axios.delete(process.env.LARAVEL_API_BASE_URL + '/api/user/documents?id=' + this.doc.id)
        .then((res) => {
          if (res.data.success) {
            this.$emit('deleted')
          }
          this.setLoading(false)
        })
    },
    signDoc () {
      this.$bvModal.show('doc-signing-' + this.doc.id)
    }
  }
}
</script>
