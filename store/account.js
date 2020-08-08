export const state = () => ({
  user: undefined,
  accountError: undefined
})

export const getters = {
  isLoggedIn(state) {
    return !!state.user
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },

  setError(state, error) {
    state.accountError = error
  }
}

export const actions = {
  async init({ commit }) {
    try {
      const session = await this.$ub.init({ appId: process.env.USERBASE_TOKEN })

      if (session.user) {
        commit('setUser', session.user)
      }
    } catch (error) {
      console.log(error)
      commit('setError', error)
    }
  },

  async signUp({ commit }, { username, email, password, navigate = true }) {
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
        console.log(error)
        commit('setError', error)
      }
    }
  },

  async signIn({ commit }, { username, password, navigate = true }) {
    if (this.$ub) {
      try {
        const user = await this.$ub.signIn({ username, password, rememberMe: 'local' })

        commit('setUser', user)

        if (navigate) {
          this.$router.push('/account/user')
        }
      } catch (error) {
        console.log(error)
        commit('setError', error)
      }
    }
  },

  async signOut({ commit }, { navigate }) {
    if (this.$ub) {
      try {
        await this.$ub.signOut()

        commit('setUser', undefined)

        if (navigate) {
          this.$router.push('/')
        }
      } catch (error) {
        console.log(error)
        commit('setError', error)
      }
    }
  }
}
