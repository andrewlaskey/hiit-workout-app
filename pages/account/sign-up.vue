<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Sign Up</h1>
        <div class="columns">
          <div class="column is-half">
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="username"
                  name="username"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Email (optional)</label>
              <div class="control">
                <input class="input" type="text" v-model="email" name="email" />
              </div>
              <p class="help">
                Email is only required if you forget your password.
              </p>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  v-model="password"
                  name="password"
                />
              </div>
              <p class="help">
                Keep your password safe. Your data is end-to-end encrypted. With
                this security password recovery is only possible if you give
                your email and if you still have the same device.
                <nuxt-link to="/">Learn more</nuxt-link>
              </p>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-primary" @click="clickSignUp">
                  Sign Up
                </button>
              </div>
              <p v-if="isAccountError" class="help is-danger">
                {{ accountDisplayError }}
              </p>
            </div>
          </div>
        </div>
        <p>
          Already have an account?
          <nuxt-link to="/account/login">Log in</nuxt-link>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: '',
      email: ''
    }
  },
  computed: {
    ...mapState('account', ['user', 'accountDisplayError']),
    ...mapGetters('account', ['isAccountError'])
  },
  methods: {
    ...mapActions('account', ['signUp']),
    clickSignUp() {
      this.signUp({
        username: this.username,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
