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
          <a v-if="doc.original_name">
            {{ doc.original_name }}
          </a>
        </div>
      </div>
      <div>
        <div v-if="(!doc.user_id || doc.user_id === user.id) && !hideDeleteButton">
          <a @click="removeMe(index, $vnode.key)"><img src="/images/remove.svg" alt="" title=""></a>
        </div>
      </div>
    </div>
    <div class="separator mt-25" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DocumentsItem',
  props: {
    doc: Object,
    index: Number,
    hideDeleteButton: {
      type: Boolean,
      default: false
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
