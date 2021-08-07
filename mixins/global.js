import wcmatch from 'wildcard-match'

export default {
  computed: {
    userPermissions () {
      return this.$store.getters.user.permissions.map(item => item.name)
    },
    isSuper () {
      return this.$store.getters.user.roles.find(item => item.name === 'super')
    }
  },
  methods: {
    can (key) {
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
      if (this.isSuper) {
        return true
      }
      return false
    }
  }
}
