import { getExercises } from './utils/datoConnect'

export default ({ app }, inject) => {
  inject('request', {
    getExercises
  })
}
