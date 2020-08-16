export const state = () => ({
  user: undefined,
  accountError: undefined,
  accountDisplayError: '',
  accountErrorFn: ''
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
  },

  setErrorFn(state, errorFn) {
    state.accountErrorFn = errorFn
  }
}

export const actions = {
  async init({ commit, dispatch }) {
    try {
      const session = await this.$ub.init({ appId: process.env.USERBASE_TOKEN })

      dispatch('clearErrors')

      if (session.user) {
        commit('setUser', session.user)
      }
    } catch (error) {
      dispatch('triggerError', { error, errorFn: 'init' })
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

        dispatch('clearErrors')
        commit('setUser', user)

        await this.$ub.purchaseSubscription({
          successUrl: 'http://localhost:3000/account/success',
          cancelUrl: 'http://localhost:3000/account/cancel'
        })
      } catch (error) {
        dispatch('triggerError', { error, errorFn: 'signUp' })
      }
    }
  },

  async signIn({ commit, dispatch }, { username, password, navigate = true }) {
    if (this.$ub) {
      try {
        const user = await this.$ub.signIn({ username, password, rememberMe: 'local' })

        dispatch('clearErrors')
        commit('setUser', user)

        if (navigate) {
          this.$router.push('/account/user')
        }
      } catch (error) {
        dispatch('triggerError', { error, errorFn: 'signIn' })
      }
    }
  },

  async signOut({ commit, dispatch }, { navigate }) {
    if (this.$ub) {
      try {
        await this.$ub.signOut()

        dispatch('clearErrors')
        commit('setUser', undefined)

        if (navigate) {
          this.$router.push('/')
        }
      } catch (error) {
        dispatch('triggerError', { error, errorFn: 'signOut' })
      }
    }
  },

  async updateUser({ state, commit, dispatch }, user) {
    if (this.$ub) {
      try {
        await this.$ub.updateUser(user)
        dispatch('clearErrors')
        commit('setUser', {
          ...state.user,
          ...user
        })
      } catch (error) {
        dispatch('triggerError', { error, errorFn: 'updateUser' })
      }
    }
  },

  async updatePassword({ state, dispatch }, { currentPassword, newPassword }) {
    if (this.$ub) {
      try {
        await this.$ub.updateUser({
          username: state.user.username,
          currentPassword,
          newPassword
        })
        dispatch('clearErrors')
      } catch (error) {
        dispatch('triggerError', { error, errorFn: 'updatePassword' })
      }
    }
  },

  triggerError({ commit }, { error, errorFn }) {
    console.error(error)
    commit('setError', error)
    commit('setDisplayError', error.message)
    commit('setErrorFn', errorFn)
  },

  clearErrors({ commit }) {
    commit('setError', undefined)
    commit('setDisplayError', '')
    commit('setErrorFn', '')
  }
}
