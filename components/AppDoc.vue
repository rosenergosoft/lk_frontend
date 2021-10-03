<template>
  <div>
    <div class="uploaded-files d-flex mt-20 align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <div class="mr-20 document-preview">
          <div class="notice">
            {{ doc.name }}
          </div>
          <div v-if="doc.document_date" class="notice">
            Дата: {{ $moment(doc.document_date).format('DD MMMM yyyy') }}
          </div>
          <a v-if="doc.original_name" class="file-link" @click="downloadFile(doc.id, doc.original_name)">
            <b-icon-file-richtext class="bootstrap-icon" />{{ doc.original_name }}
          </a>
          <div v-if="showOwner" class="notice">
            Загружено <span v-if="doc.user.type === 'customer'">пользователем</span><span v-else>администратором</span>
          </div>
        </div>
      </div>
      <div>
        <div v-if="(!doc.user_id || doc.user_id === user.id) && !hideDeleteButton">
          <a @click="removeMe(index, $vnode.key)"><img src="/images/remove.svg" alt="" title=""></a>
        </div>
      </div>
    </div>
    <div v-if="index+1 !== count" class="separator mt-25" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { BIconFileRichtext } from 'bootstrap-vue'
export default {
  name: 'AppDoc',
  components: {
    BIconFileRichtext
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    doc: Object,
    // eslint-disable-next-line vue/require-default-prop
    index: Number,
    hideDeleteButton: {
      type: Boolean,
      default: false
    },
    showOwner: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    downloadFile (id, name) {
      const fileData = { id, name }
      this.$emit('download-file', fileData)
    },
    removeMe (index, id) {
      const fileData = {
        index,
        id
      }
      this.$emit('remove-file', fileData)
    }
  }
}
</script>
