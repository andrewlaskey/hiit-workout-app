<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Log In</h1>
        <div class="columns">
          <div class="column is-half">
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input class="input" type="text" v-model="username" />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="password" v-model="password" />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button class="button is-primary" @click="clickSignIn">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
        <p>
          Don't have an account?
          <nuxt-link to="/account/sign-up">Sign Up</nuxt-link>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState('account', ['user'])
  },
  methods: {
    ...mapActions('account', ['signIn']),
    clickSignIn() {
      this.signIn({
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>
