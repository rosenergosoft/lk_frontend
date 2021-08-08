<template>
  <div class="disclosure">
    <div class="page-title d-flex">
      <div class="active">
        Электроэнергия
      </div>
      <div class="l-separator">
        /
      </div>
      <div><a href="">Водоснабжение</a></div>
      <div class="l-separator">
        /
      </div>
      <div><a href="">Тепло</a></div>
    </div>
    <div class="disclosure-documents">
      <div class="boxes">
        <div class="box status-6">
          <div class="notice">
            Это итоговый вид таблицы раскрытия информации. Именно эти пункты будут отображены на странице раскрытия.
          </div>
        </div>
        <div class="box status-2 pl-0">
          <h4 class="pl-20">
            Все пункты
          </h4>
          <DocItem
            v-for="item in disclosureList"
            :key="item.id"
            :item="item"
            status="green"
            @click.native="openDisclosureModal(item.type)"
          />
        </div>
      </div>
    </div>
    <DisclosureModal
      :content="modalContent"
    />
  </div>
</template>

<script>
import DisclosureModal from '~/components/disclosure/DisclosureModal'
import DocItem from '~/components/disclosure/DocItem'
export default {
  name: 'Disclosure',
  components: {
    DocItem,
    DisclosureModal
  },
  data () {
    return {
      disclosureList: '',
      modalContent: {
        disclosure: {},
        disclosureListItem: {},
        docs: {}
      }
    }
  },
  created () {
    this.getDisclosureList(0)
  },
  methods: {
    async openDisclosureModal (type) {
      const res = await this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/disclosure/getByType/0/' + type)
      if (res) {
        this.modalContent.disclosure = res.disclosure
        this.modalContent.disclosureListItem = res.disclosureListItem
        this.modalContent.docs = res.docs
      }
      this.$bvModal.show('disclosure-modal')
    },
    async getDisclosureList (group) {
      const res = await this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/disclosure/getList/' + group)
      if (res) {
        this.disclosureList = res.disclosures
      }
    }
  }
}
</script>

<style scoped>

</style>
