<template>
  <div>
    <section class="section">
      <div class="container">
        <div v-if="isLoggedIn">
          <account-nav active-tab="settings" />
          <div class="columns">
            <div class="column is-half">
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
import AccountNav from '~/components/AccountNav'

export default {
  components: {
    AccountNav
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
