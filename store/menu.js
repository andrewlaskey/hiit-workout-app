export const state = () => ({
  menuOpen: false
})

export const mutations = {
  toggleMenu(state) {
    state.menuOpen = !state.menuOpen
  },

  closeMenu(state) {
    state.menuOpen = false
  },

  openMenu(state) {
    state.menuOpen = true
  }
}
