import copy from 'copy-to-clipboard'

export default ({ app, store, route }, inject) => {
  const queryString = params => {
    return Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    }).join('&')
  }

  const generateShareUrl = () => {
    const {
      type,
      numExercises,
      repeatNum,
      workTimeSeconds,
      restTimeSeconds,
      selectedTags,
      excludeTags,
      exercises
    } = store.state.workout

    const ex = exercises.map(exercise => exercise.handle)

    const queryObj = {
      t: type,
      n: numExercises,
      r: repeatNum,
      wt: workTimeSeconds,
      rt: restTimeSeconds,
      st: selectedTags,
      et: excludeTags,
      ex
    }

    const query = queryString(queryObj)

    return `${window.location.origin}${route.path}?${query}`
  }

  const shareUrl = () => {
    const url = generateShareUrl()

    copy(url)
  }

  inject('shareUrl', shareUrl)
}
