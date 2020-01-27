import exercises from './exercises'

export default ({ app }, inject) => {
  const getExercises = () => {
    return Promise.resolve(exercises)
  }

  inject('request', {
    getExercises
  })
}
