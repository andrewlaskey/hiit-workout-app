<template>
  <div>
    <section class="section">
      <div class="container">
        <div v-if="isLoggedIn">
          <h3 class="title is-4">
            You're already logged in as {{ user.username }}
          </h3>
          <div class="field is-grouped">
            <p class="control">
              <nuxt-link class="button is-info" to="/account/user"
                >Go to Account</nuxt-link
              >
            </p>
            <p class="control">
              <button class="button is-link" @click="signOut">
                Sign Out
              </button>
            </p>
          </div>
        </div>
        <div v-else>
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

              <p v-if="isAccountError" class="help is-danger">
                {{ accountDisplayError }}
              </p>
            </div>
          </div>
          <p>
            Don't have an account?
            <nuxt-link to="/account/sign-up">Sign Up</nuxt-link>
          </p>
        </div>
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
      password: ''
    }
  },
  computed: {
    ...mapState('account', ['user', 'accountDisplayError']),
    ...mapGetters('account', ['isLoggedIn', 'isAccountError'])
  },
  methods: {
    ...mapActions('account', ['signIn', 'signOut']),
    clickSignIn() {
      this.signIn({
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>
