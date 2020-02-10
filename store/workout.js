const TAGS = {
  PULLUP_BAR: 'pull-up-bar',
  ARMS: 'arms',
  CORE: 'core',
  LEGS: 'legs'
}

const ONE_SECOND = 1000

const filterExercises = (exercises, state) => {
  return exercises.filter(exercise => {
    const { tags } = exercise

    if (state.noPullupBar && tags.indexOf(TAGS.PULLUP_BAR) > -1) {
      return false
    }

    if (state.noArms && tags.indexOf(TAGS.ARMS) > -1) {
      return false
    }

    if (state.noCore && tags.indexOf(TAGS.CORE) > -1) {
      return false
    }

    if (state.noLegs && tags.indexOf(TAGS.LEGS) > -1) {
      return false
    }

    return true
  })
}

const selectRandomExercises = (exercises, total) => {
  const selected = []
  const indices = []

  if (exercises.length <= total) {
    return exercises
  }

  for (let i = 0; i < total; i++) {
    let index = 0

    do {
      index = Math.floor(Math.random() * exercises.length)
    } while (indices.indexOf(index) > -1)

    selected.push(exercises[index])
    indices.push(index)
  }

  return selected
}

export const state = () => ({
  numExercises: 4,
  repeatNum: 4,
  workTimeSeconds: 30,
  restTimeSeconds: 15,
  noPullupBar: false,
  noArms: false,
  noCore: false,
  noLegs: false,
  allExercises: [],
  filteredExercises: [],
  exercises: [],
  timer: 0,
  round: 1,
  activeIndex: -1,
  intervalRef: null,
  state: 'ready'
})

export const getters = {
  totalDuration(state) {
    return (state.workTimeSeconds + state.restTimeSeconds) * state.numExercises * state.repeatNum
  }
}

export const mutations = {
  setNumExercises(state, payload) {
    state.numExercises = parseInt(payload, 10)
  },

  setRepeatNum(state, payload) {
    state.repeatNum = parseInt(payload, 10)
  },

  setWorkTimeSeconds(state, payload) {
    state.workTimeSeconds = parseInt(payload, 10)
  },

  setRestTimeSeconds(state, payload) {
    state.restTimeSeconds = parseInt(payload, 10)
  },

  setPullupBarOption(state, payload) {
    state.noPullupBar = payload
  },

  setArmOption(state, payload) {
    state.noArms = payload
  },

  setCoreOption(state, payload) {
    state.noCore = payload
  },

  setLegsOption(state, payload) {
    state.noLegs = payload
  },

  setExercises(state, payload) {
    state.exercises = payload
  },

  addExercise(state, payload) {
    state.exercises.push(payload)
  },

  resetExercises(state) {
    state.exercises = []
  },

  setAllExercises(state, payload) {
    state.allExercises = payload
  },

  setFilteredExercises(state, payload) {
    state.filteredExercises = payload
  },

  setTimer(state, payload) {
    state.timer = payload
  },

  tickOneSecond(state) {
    state.timer--
  },

  setRound(state, payload) {
    state.round = payload
  },

  nextRound(state) {
    state.round++
  },

  setActiveIndex(state, payload) {
    state.activeIndex = payload
  },

  nextActiveIndex(state) {
    state.activeIndex++
  },

  setIntervalRef(state, payload) {
    state.intervalRef = payload
  },

  setState(state, payload) {
    state.state = payload
  }
}

export const actions = {
  selectExercises({ state, commit }) {
    const filtered = filterExercises(state.allExercises, state)

    commit('setFilteredExercises', filtered)

    const selected = selectRandomExercises(filtered, state.numExercises)

    commit('setExercises', selected)

    if (selected.length < state.numExercises) {
      commit('setNumExercises', selected.length)
    }
  },

  startWorkout({ state, commit, dispatch }) {
    if (state.exercises.length === 0) {
      dispatch('selectExercises')
    }

    commit('setTimer', 10)
    commit('setState', 'countdown')

    const interval = setInterval(() => {
      dispatch('countdown')
    }, ONE_SECOND)

    commit('setIntervalRef', interval)
  },

  startWorkInterval({ state, commit, app }) {
    commit('setState', 'work')
    commit('setTimer', state.workTimeSeconds)
    this.$sounds.playRoundStart()
  },

  startRestInterval({ state, commit }) {
    commit('setState', 'rest')
    commit('setTimer', state.restTimeSeconds)
    this.$sounds.playRoundStart()
  },

  endRound({ state, commit, dispatch }) {
    commit('nextActiveIndex')

    if (state.activeIndex >= state.numExercises) {
      commit('nextRound')
      commit('setActiveIndex', 0)

      if (state.round > state.repeatNum) {
        commit('setState', 'complete')
        clearInterval(state.intervalRef)
        this.$sounds.playComplete()
      } else {
        dispatch('startWorkInterval')
      }
    } else {
      dispatch('startWorkInterval')
    }
  },

  countdown({ state, commit, dispatch }) {
    commit('tickOneSecond')

    if (state.timer < 0) {
      switch (state.state) {
        case 'countdown':
          commit('setActiveIndex', 0)
          dispatch('startWorkInterval')
          break
        case 'work':
          dispatch('startRestInterval')
          break
        case 'rest':
          dispatch('endRound')
          break
      }
    }
  }
}
