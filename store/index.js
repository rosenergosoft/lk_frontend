export const state = () => ({

})

export const getters = {
  user (state) {
    return state.auth.user
  }
}

export const mutations = {
  increment (state) {
    state.counter++
  }
}
