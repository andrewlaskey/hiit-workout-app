export default ({ app }, inject) => {
  const createAudio = id => {
    if (process.browser) {
      const audioElement = document.getElementById(id)

      return audioElement
    }

    return undefined
  }

  const roundStart = createAudio('round-start')

  const complete = createAudio('complete')

  const playRoundStart = () => {
    if (process.browser) {
      roundStart.play()
    }
  }

  const playComplete = () => {
    if (process.browser) {
      complete.play()
    }
  }

  const plugin = {
    playRoundStart,
    playComplete
  }

  inject('sounds', plugin)
}
