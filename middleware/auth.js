export default function ({ store, redirect }) {
  const isLoggedIn = !!store.state.account.user

  if (!isLoggedIn) {
    return redirect('/account/login')
  }
}
