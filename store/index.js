export const state = () => ({

})

export const getters = {
  user (state) {
    return state.auth.user
  },
  userProfile (state) {
    return state.auth.user.profile
  },
  userCompany (state) {
    return state.auth.user.company
  }
}

export const mutations = {
  UPDATE_USER (state, user) {
    Object.assign(state.auth.user, user)
  },
  UPDATE_USER_PROFILE (state, profile) {
    if (state.auth.user.profile) {
      Object.assign(state.auth.user.profile, profile)
    } else {
      state.auth.user.profile = profile
    }
  },
  UPDATE_USER_COMPANY (state, company) {
    if (state.auth.user.company) {
      Object.assign(state.auth.user.company, company)
    } else {
      state.auth.user.company = company
    }
  },
  increment (state) {
    state.counter++
  },
  DELETE_USER_COMPANY (state) {
    state.auth.user.company = null
  }
}
