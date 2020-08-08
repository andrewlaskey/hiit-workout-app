export default ({ store }, inject) => {
  inject('ub', window.userbase)

  store.dispatch('account/init')
}
