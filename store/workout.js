const TAGS = {
  PULLUP_BAR: 'pull-up-bar',
  ARMS: 'arms',
  CORE: 'core',
  LEGS: 'legs',
  ADVANCED: 'advanced',
  PLYO: 'plyometrics'
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

    if (state.noAdvanced && tags.indexOf(TAGS.ADVANCED) > -1) {
      return false
    }

    if (state.noPlyo && tags.indexOf(TAGS.PLYO) > -1) {
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
  noPlyo: false,
  noAdvanced: false,
  allExercises: [],
  filteredExercises: [],
  exercises: [],
  timer: 0,
  round: 1,
  activeIndex: -1,
  intervalRef: null,
  state: 'ready',
  soundsOn: true
})

export const getters = {
  totalDuration(state) {
    return (state.workTimeSeconds + state.restTimeSeconds) * state.numExercises * state.repeatNum
  },

  isPlaying(state) {
    return state.intervalRef !== null
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

  setPlyoOption(state, payload) {
    state.noPlyo = payload
  },

  setAdvancedOption(state, payload) {
    state.noAdvanced = payload
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
  },

  toggleSounds(state) {
    state.soundsOn = !state.soundsOn
  }
}

export const actions = {
  reset({ commit, dispatch }) {
    dispatch('pause')
    commit('setState', 'ready')
    commit('setTimer', 0)
    commit('setActiveIndex', -1)
    commit('setRound', 1)
  },

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
    dispatch('play')
  },

  startWorkInterval({ state, commit, app }) {
    commit('setState', 'work')
    commit('setTimer', state.workTimeSeconds)

    if (state.soundsOn) {
      this.$sounds.playRoundStart()
    }
  },

  startRestInterval({ state, commit }) {
    commit('setState', 'rest')
    commit('setTimer', state.restTimeSeconds)

    if (state.soundsOn) {
      this.$sounds.playRoundStart()
    }
  },

  endRound({ state, commit, dispatch }) {
    commit('nextActiveIndex')

    if (state.activeIndex >= state.numExercises) {
      commit('nextRound')
      commit('setActiveIndex', 0)

      if (state.round > state.repeatNum) {
        commit('setState', 'complete')
        clearInterval(state.intervalRef)
        if (state.soundsOn) {
          this.$sounds.playComplete()
        }
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
  },

  pause({ state, commit }) {
    clearInterval(state.intervalRef)
    commit('setIntervalRef', null)
  },

  play({ commit, dispatch }) {
    const interval = setInterval(() => {
      dispatch('countdown')
    }, ONE_SECOND)

    commit('setIntervalRef', interval)
  },

  presetWorkout({ commit }, options) {
    const {
      numExercises = 4,
      repeatNum = 4,
      workTimeSeconds = 30,
      restTimeSeconds = 15,
      noPullupBar = false,
      noArms = false,
      noCore = false,
      noLegs = false,
      noPlyo = false,
      noAdvanced = false
    } = options

    commit('setNumExercises', numExercises)
    commit('setRepeatNum', repeatNum)
    commit('setWorkTimeSeconds', workTimeSeconds)
    commit('setRestTimeSeconds', restTimeSeconds)
    commit('setPullupBarOption', noPullupBar)
    commit('setArmOption', noArms)
    commit('setCoreOption', noCore)
    commit('setLegsOption', noLegs)
    commit('setPlyoOption', noPlyo)
    commit('setAdvancedOption', noAdvanced)
  }
}
