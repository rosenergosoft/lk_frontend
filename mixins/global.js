import wcmatch from 'wildcard-match'

export default {
  computed: {
    userPermissions () {
      return this.$store.getters.user.permissions.map(item => item.name)
    },
    isSuper () {
      return this.$store.getters.user.roles.find(item => item.name === 'super')
    },
    userRoles () {
      return this.$store.getters.user.roles.map(item => item.name)
    },
    isExecutive () {
      return !!(this.isSuper || this.userRoles.includes('admin') || this.userRoles.includes('vendor'))
    },
    isCustomer () {
      return !(this.isSuper || this.userRoles.includes('admin') || this.userRoles.includes('vendor'))
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
      return false
    }
  }
}
