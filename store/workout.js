// const TAGS = {
//   PULLUP_BAR: 'pull-up-bar',
//   ARMS: 'arms',
//   CORE: 'core',
//   LEGS: 'legs',
//   ADVANCED: 'advanced',
//   PLYO: 'plyometrics'
// }

const ONE_SECOND = 1000

const filterExercises = (exercises, state) => {
  const include = includeExercises(exercises, state.selectedTags)
  const exclude = excludeExercises(include, state.excludeTags)

  return exclude
}

const includeExercises = (exercises, tags) => {
  if (tags.length > 0) {
    return exercises.filter(exercise => {
      return tags.every(tag => {
        return exercise.tags.indexOf(tag) > -1
      })
    })
  }

  return exercises
}

const excludeExercises = (exercises, tags) => {
  if (tags.length > 0) {
    return exercises.filter(exercise => {
      return !tags.some(tag => {
        return exercise.tags.indexOf(tag) > -1
      })
    })
  }

  return exercises
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
  type: 'timed',
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
  repCount: 0,
  state: 'ready',
  soundsOn: true,
  selectedTags: [],
  excludeTags: []
})

export const getters = {
  totalDuration(state) {
    return ((state.workTimeSeconds + state.restTimeSeconds) * state.numExercises * state.repeatNum) - state.restTimeSeconds
  },

  isPlaying(state) {
    return state.intervalRef !== null
  }
}

export const mutations = {
  setWorkoutType(state, payload) {
    state.type = payload
  },

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

  plusOneSecond(state) {
    state.timer++
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
  },

  setSelectedTags(state, payload) {
    state.selectedTags = payload
  },

  addSelectedTag(state, payload) {
    state.selectedTags.push(payload)
  },

  removeSelectedTag(state, payload) {
    const index = state.selectedTags.indexOf(payload)

    if (index > -1) {
      state.selectedTags.splice(index, 1)
    }
  },

  setRepCount(state, payload) {
    state.repCount = payload
  },

  setExcludeTags(state, payload) {
    state.excludeTags = payload
  },

  addExcludeTag(state, payload) {
    state.excludeTags.push(payload)
  },

  removeExcludeTag(state, payload) {
    const index = state.excludeTags.indexOf(payload)

    if (index > -1) {
      state.excludeTags.splice(index, 1)
    }
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

    if (state.type === 'timed') {
      commit('setTimer', 10)
      commit('setState', 'countdown')
    } else {
      commit('setTimer', 0)
      commit('setState', 'work')
      dispatch('setRandomRepCount')
      commit('setActiveIndex', 0)
    }

    dispatch('play')
  },

  startWorkInterval({ state, commit, app }) {
    if (state.type === 'timed') {
      commit('setState', 'work')
      commit('setTimer', state.workTimeSeconds)

      if (state.soundsOn) {
        this.$sounds.playRoundStart()
      }
    }
  },

  startRestInterval({ state, commit }) {
    if (state.type === 'timed') {
      commit('setState', 'rest')
      commit('setTimer', state.restTimeSeconds)

      if (state.soundsOn) {
        this.$sounds.playRoundStart()
      }
    }
  },

  endRound({ state, commit, dispatch }) {
    commit('nextActiveIndex')

    if (state.type === 'reps') {
      dispatch('setRandomRepCount')
    }

    if (state.activeIndex >= state.numExercises) {
      commit('nextRound')
      commit('setActiveIndex', 0)

      if (state.round > state.repeatNum) {
        dispatch('completeWorkout')
      } else {
        dispatch('startWorkInterval')
      }
    } else {
      dispatch('startWorkInterval')
    }
  },

  completeWorkout({ state, commit }) {
    this.$noSleep.disable()

    commit('setState', 'complete')
    clearInterval(state.intervalRef)
    if (state.soundsOn) {
      this.$sounds.playComplete()
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
          if (
            state.activeIndex + 1 === state.numExercises &&
            state.round === state.repeatNum
          ) {
            dispatch('endRound')
          } else {
            dispatch('startRestInterval')
          }
          break
        case 'rest':
          dispatch('endRound')
          break
      }
    }
  },

  countup({ state, commit }) {
    commit('plusOneSecond')
  },

  pause({ state, commit }) {
    clearInterval(state.intervalRef)
    commit('setIntervalRef', null)
  },

  play({ state, commit, dispatch }) {
    const interval = setInterval(() => {
      if (state.type === 'timed') {
        dispatch('countdown')
      } else {
        dispatch('countup')
      }
    }, ONE_SECOND)

    commit('setIntervalRef', interval)
  },

  presetWorkout({ commit }, options) {
    const {
      type = 'timed',
      numExercises = 4,
      repeatNum = 4,
      workTimeSeconds = 30,
      restTimeSeconds = 15,
      noPullupBar = false,
      noArms = false,
      noCore = false,
      noLegs = false,
      noPlyo = false,
      noAdvanced = false,
      selectedTags = [],
      excludeTags = []
    } = options

    commit('setWorkoutType', type)
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
    commit('setSelectedTags', selectedTags)
    commit('setExcludeTags', excludeTags)
  },

  setRandomRepCount({ state, commit }) {
    let min = state.restTimeSeconds
    const max = state.workTimeSeconds

    if (min > max) {
      commit('setRestTimeSeconds', max)
      min = max
    }

    const ran = Math.floor(Math.random() * (max - min)) + min

    commit('setRepCount', ran)
  }
}
