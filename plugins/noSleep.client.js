import NoSleep from 'nosleep.js'

export default ({ app }, inject) => {
  inject('noSleep', new NoSleep())
}
