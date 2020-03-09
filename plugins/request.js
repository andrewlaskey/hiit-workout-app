import { getExercises, getWorkouts } from './utils/datoConnect'

export default ({ app }, inject) => {
  inject('request', {
    getExercises,
    getWorkouts
  })
}
