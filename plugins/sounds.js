import { Howl } from 'howler'

export default ({ app }, inject) => {
  const roundStart = new Howl({
    src: ['bell-win.mp3']
  })

  const complete = new Howl({
    src: ['bell-deep.mp3']
  })

  const playRoundStart = () => {
    roundStart.play()
  }

  const playComplete = () => {
    complete.play()
  }

  const plugin = {
    playRoundStart,
    playComplete
  }

  inject('sounds', plugin)
}
