const filterExercises = (exercises, state) => {
  return exercises.filter(exercise => {
    const { tags } = exercise

    if (state.noPullupBar && tags.indexOf('pullup-bar') > -1) {
      return false
    }

    if (state.noArms && tags.indexOf('arms') > -1) {
      return false
    }

    if (state.noCore && tags.indexOf('core') > -1) {
      return false
    }

    if (state.noLegs && tags.indexOf('legs') > -1) {
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
  exercises: []
})

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
  }
}

export const actions = {
  async selectExercises({ state, commit }) {
    const allExercises = await this.$request.getExercises()
    const filteredExercises = filterExercises(allExercises, state)
    const selected = selectRandomExercises(filteredExercises, state.numExercises)

    commit('setExercises', selected)
  }
}
