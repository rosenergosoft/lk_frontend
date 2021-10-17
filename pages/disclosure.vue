<template>
  <div class="disclosure">
    <div class="page-title d-flex">
      <div v-if="clientType.includes('1')" class="d-flex">
        <div :class="{ active: disclosureGroup === 0 }" @click="setDisclosureGroup(0)">
          <a>Электроэнергия</a>
        </div>
        <div v-if="clientType.includes('1') && (clientType.includes('2') || clientType.includes('3'))" class="l-separator">
          /
        </div>
      </div>
      <div v-if="clientType.includes('2')" class="d-flex">
        <div :class="{ active: disclosureGroup === 1 }" @click="setDisclosureGroup(1)">
          <a>Тепло</a>
        </div>
        <div v-if="clientType.includes('2') && clientType.includes('3')" class="l-separator">
          /
        </div>
      </div>
      <div v-if="clientType.includes('3')" class="d-flex">
        <div :class="{ active: disclosureGroup === 2 }" @click="setDisclosureGroup(2)">
          <a>Водоснабжение</a>
        </div>
      </div>
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
            @click.native="openDisclosureModal(item.type)"
          />
        </div>
      </div>
    </div>
    <DisclosureModal
      :content="modalContent"
      @disclosure-list-update="getDisclosureList(disclosureGroup)"
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
      disclosureGroup: '',
      clientType: '',
      modalContent: {
        disclosure: {},
        disclosureListItem: {},
        docs: {}
      }
    }
  },
  mounted () {
    this.setLoading(true)
    this.$axios.get(process.env.LARAVEL_API_BASE_URL + '/api/settings/type/list')
      .then((res) => {
        if (res.data.success) {
          this.clientType = res.data.type
          if (this.clientType.includes('1')) {
            this.disclosureGroup = 0
          } else if (this.clientType.includes('2')) {
            this.disclosureGroup = 1
          } else if (this.clientType.includes('3')) {
            this.disclosureGroup = 2
          }
          this.getDisclosureList(this.disclosureGroup)
        }
      })
  },
  methods: {
    async openDisclosureModal (type) {
      this.setLoading(true)
      const res = await this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/disclosure/getByType/' + this.disclosureGroup + '/' + type)
      this.setLoading(false)
      if (res) {
        this.modalContent.disclosure = res.disclosure
        this.modalContent.disclosureListItem = res.disclosureListItem
        this.modalContent.docs = res.docs
      }
      this.$bvModal.show('disclosure-modal')
    },
    setDisclosureGroup (group) {
      this.disclosureGroup = group
      this.getDisclosureList(this.disclosureGroup)
    },
    async getDisclosureList (group) {
      this.setLoading(true)
      const res = await this.$axios.$get(process.env.LARAVEL_API_BASE_URL + '/api/disclosure/getList/' + group)
      if (res) {
        this.disclosureList = res.disclosures
        this.setLoading(false)
      }
    }
  }
}
</script>

<style scoped>

</style>
