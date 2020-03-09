export default async (app, store, payload) => {
  let exercises = []
  let workouts = []

  if (payload && payload.exercises) {
    exercises = payload.exercises
  } else {
    if (
      store &&
      store.state &&
      store.state.workout &&
      store.state.workout.allExercises &&
      store.state.workout.allExercises.length > 0
    ) {
      exercises = store.state.workout.allExercises
    } else {
      exercises = await app.$request.getExercises()
    }
  }

  if (payload && payload.workouts) {
    workouts = payload.workouts
  } else {
    if (
      store &&
      store.state &&
      store.state.workouts &&
      store.state.workouts.list &&
      store.state.workouts.list.length > 0
    ) {
      workouts = store.state.workouts.list
    } else {
      workouts = await app.$request.getWorkouts()
    }
  }

  return {
    exercises,
    workouts
  }
}
