export const state = () => ({

})

export const getters = {
  user (state) {
    return state.auth.user
  },
  userProfile (state) {
    return state.auth.user.profile
  }
}

export const mutations = {
  UPDATE_USER_PROFILE (state, profile) {
    Object.assign(state.auth.user.profile, profile)
  },
  UPDATE_USER (state, user) {
    Object.assign(state.auth.user, user)
  },
  increment (state) {
    state.counter++
  }
}
