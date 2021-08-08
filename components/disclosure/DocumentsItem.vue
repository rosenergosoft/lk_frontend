<template>
  <div>
    <div class="uploaded-files d-flex mt-20 align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <div class="mr-20 document-preview">
          <div class="notice">
            {{ doc.name }}
          </div>
          <div class="notice">
            Дата: {{ $moment(doc.document_date).format('DD MMMM yyyy') }}
          </div>
          <a>
            {{ doc.original_name }}
          </a>
        </div>
      </div>
      <div>
        <a @click="removeMe(index, $vnode.key)"><img src="/images/remove.svg" alt="" title=""></a>
      </div>
    </div>
    <div class="separator mt-25" />
  </div>
</template>
<script>
export default {
  name: 'DocumentsItem',
  props: {
    doc: Object,
    index: Number
  },
  data () {
    return {
    }
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
