<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Account</h1>
        <div v-if="isLoggedIn">
          <h2 class="title is-3">
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <icon symbol="icon-account_circle" extra-classes="is-large" />
                </div>
                <div class="level-item">{{ user.username }}</div>
              </div>
            </div>
          </h2>
          <div class="columns">
            <div class="column is-half">
              <hr />
              <h3 class="title is-4">Update Profile</h3>
              <div class="field">
                <label class="label" for="username">Username</label>
                <div class="control">
                  <input
                    name="username"
                    class="input"
                    type="text"
                    v-model="username"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label" for="email">Email</label>
                <div class="control">
                  <input
                    name="email"
                    class="input"
                    type="text"
                    v-model="email"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button class="button is-primary" @click="clickUpdateProfile">
                    Update
                  </button>
                </div>
                <p
                  v-if="isAccountError && accountErrorFn === 'updateUser'"
                  class="help is-danger"
                >
                  {{ accountDisplayError }}
                </p>
              </div>
              <hr />
              <h3 class="title is-4">Change Password</h3>
              <div class="field">
                <label class="label" for="current-password"
                  >Current Password</label
                >
                <div class="control">
                  <input
                    name="current-password"
                    class="input"
                    type="password"
                    v-model="currentPassword"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label" for="new-password">New Password</label>
                <div class="control">
                  <input
                    name="new-password"
                    class="input"
                    type="password"
                    v-model="newPassword"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button
                    class="button is-primary"
                    @click="clickUpdatePassword"
                  >
                    Change
                  </button>
                </div>
                <p
                  v-if="isAccountError && accountErrorFn === 'updatePassword'"
                  class="help is-danger"
                >
                  {{ accountDisplayError }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Icon from '~/components/Icon'

export default {
  components: {
    Icon
  },
  middleware: 'auth',
  data() {
    return {
      username: '',
      email: '',
      currentPassword: '',
      newPassword: ''
    }
  },
  computed: {
    ...mapState('account', ['user', 'accountDisplayError', 'accountErrorFn']),
    ...mapGetters('account', ['isLoggedIn', 'isAccountError'])
  },
  watch: {
    user() {
      this.updateFieldValues()
    }
  },
  mounted() {
    this.updateFieldValues()
  },
  methods: {
    ...mapActions('account', ['updateUser', 'updatePassword']),
    updateFieldValues() {
      if (this.user) {
        this.username = this.user.username
        this.email = this.user.email
      }
    },

    clickUpdateProfile() {
      this.updateUser({
        username: this.username,
        email: this.email
      })
    },

    clickUpdatePassword() {
      this.updatePassword({
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      })
    }
  }
}
</script>

<style></style>
