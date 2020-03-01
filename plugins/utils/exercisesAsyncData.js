export default async (app, store, payload) => {
  let exercises = []

  if (payload) {
    exercises = payload
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

  return exercises
}
