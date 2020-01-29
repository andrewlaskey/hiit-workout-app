import { HOUR_IN_SECONDS, ONE_SECOND } from './constants'

export default (timeInSeconds) => {
  if (!isNaN(timeInSeconds) && typeof timeInSeconds === 'number') {
    // TODO: display hour if timeInSeconds is that long
    if (timeInSeconds >= HOUR_IN_SECONDS) {
      return new Date(timeInSeconds * ONE_SECOND).toISOString().substr(11, 8)
    }

    return new Date(timeInSeconds * ONE_SECOND).toISOString().substr(14, 5)
  }

  return '00:00'
}
