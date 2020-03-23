import { getExercises, getWorkouts } from './utils/datoConnect'

export default async () => {
  const exercises = await getExercises()
  const workouts = await getWorkouts()
  const payload = {
    exercises,
    workouts
  }

  if (exercises && workouts) {
    const exerciseRoutes = exercises.map(exercise => {
      return {
        route: `/exercise/${exercise.handle}`,
        payload
      }
    })

    console.log(exerciseRoutes)

    return [
      {
        route: '/exercises',
        payload
      },
      {
        route: '/workout',
        payload
      },
      {
        route: '/workouts',
        payload
      },
      {
        route: '/',
        payload
      },
      ...exerciseRoutes
    ]
  }

  return []
}
