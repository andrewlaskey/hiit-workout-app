const DB_NAME = 'history-entries'

export const state = () => ({
  dbOpen: false,
  historyError: undefined,
  historyErrorMessage: '',
  entries: []
})

export const mutations = {
  setDbOpen(state, isOpen) {
    state.dbOpen = isOpen
  },

  addEntry(state, entry) {
    state.entries.push(entry)
  },

  setEntries(state, entries) {
    state.entries = entries
  },

  clearEntries(state) {
    state.entries = []
  },

  setHistoryError(state, error) {
    state.historyError = error
  },

  setHistoryErrorMessage(state, errorMessage) {
    state.historyErrorMessage = errorMessage
  }
}

export const actions = {
  triggerError({ commit }, error) {
    console.error(error)
    commit('setHistoryError', error)
    commit('setHistoryErrorMessage', error.message)
  },

  async initHistory({ dispatch, commit, rootGetters }) {
    try {
      if (this.$ub && rootGetters['account/isLoggedIn']) {
        await this.$ub.openDatabase({
          databaseName: DB_NAME,
          changeHandler: (items) => {
            commit('setEntries', items)
            commit('setDbOpen', true)
          }
        })
      }
    } catch (error) {
      dispatch('triggerError', error)
    }
  },

  async saveEntry({ dispatch, commit, rootGetters, state }, entry) {
    try {
      if (this.$ub && rootGetters['account/isLoggedIn']) {
        if (!state.dbOpen) {
          await dispatch('initHistory')
        }

        await this.$ub.insertItem({
          databaseName: DB_NAME,
          item: {
            ...entry,
            dateTime: Date.now()
          }
        })
      }
    } catch (error) {
      dispatch('triggerError', error)
    }
  }
}
