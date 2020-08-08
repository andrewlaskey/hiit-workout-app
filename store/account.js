export const state = () => ({
  user: undefined,
  accountError: undefined,
  accountDisplayError: ''
})

export const getters = {
  isLoggedIn(state) {
    return !!state.user
  },

  isAccountError(state) {
    return !!state.accountError
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },

  setError(state, error) {
    state.accountError = error
  },

  setDisplayError(state, errorMessage) {
    state.accountDisplayError = errorMessage
  }
}

export const actions = {
  async init({ commit, dispatch }) {
    try {
      const session = await this.$ub.init({ appId: process.env.USERBASE_TOKEN })

      if (session.user) {
        commit('setUser', session.user)
      }
    } catch (error) {
      dispatch('triggerError', error)
    }
  },

  async signUp({ commit, dispatch }, { username, email, password, navigate = true }) {
    if (this.$ub) {
      try {
        let user

        if (email && email.length > 0) {
          user = await this.$ub.signUp({ username, email, password, rememberMe: 'local' })
        } else {
          user = await this.$ub.signUp({ username, password, rememberMe: 'local' })
        }

        commit('setUser', user)

        if (navigate) {
          this.$router.push('/account/user')
        }
      } catch (error) {
        dispatch('triggerError', error)
      }
    }
  },

  async signIn({ commit, dispatch }, { username, password, navigate = true }) {
    if (this.$ub) {
      try {
        const user = await this.$ub.signIn({ username, password, rememberMe: 'local' })

        commit('setUser', user)

        if (navigate) {
          this.$router.push('/account/user')
        }
      } catch (error) {
        dispatch('triggerError', error)
      }
    }
  },

  async signOut({ commit, dispatch }, { navigate }) {
    if (this.$ub) {
      try {
        await this.$ub.signOut()

        commit('setUser', undefined)

        if (navigate) {
          this.$router.push('/')
        }
      } catch (error) {
        dispatch('triggerError', error)
      }
    }
  },

  triggerError({ commit }, error) {
    console.error(error)
    commit('setError', error)
    commit('setDisplayError', error.message)
  },

  clearErrors({ commit }) {
    commit('setError', undefined)
    commit('setDisplayError', '')
  }
}
