export const state = () => ({
  list: []
})

export const mutations = {
  setWorkouts(state, payload) {
    state.list = payload
  }
}
