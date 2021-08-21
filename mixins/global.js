import wcmatch from 'wildcard-match'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isLoading'
    ]),
    userPermissions () {
      if (this.$store.getters.user) {
        return this.$store.getters.user.permissions.map(item => item.name)
      }
      return []
    },
    isSuper () {
      if (this.$store.getters.user) {
        return this.$store.getters.user.roles.find(item => item.name === 'super')
      }
      return false
    },
    userRoles () {
      if (this.$store.getters.user) {
        return this.$store.getters.user.roles.map(item => item.name)
      }
      return []
    },
    isExecutive () {
      return !!(this.isSuper || this.userRoles.includes('admin') || this.userRoles.includes('vendor'))
    },
    isCustomer () {
      return !(this.isSuper || this.userRoles.includes('admin') || this.userRoles.includes('vendor'))
    },
    isVendor () {
      return !!(this.userRoles.includes('vendor'))
    }
  },
  methods: {
    can (key) {
      if (this.isSuper) { return true }
      if (this.userPermissions) {
        if (key.includes('*')) {
          const isMatch = wcmatch(key)
          let result = false
          for (const permission of this.userPermissions) {
            result = isMatch(permission)
            if (result) { return result }
          }
          return result
        } else {
          return this.userPermissions.includes(key)
        }
      }
      return false
    },
    setLoading (state) {
      this.$store.commit('UPDATE_LOADING', state)
    }
  }
}
