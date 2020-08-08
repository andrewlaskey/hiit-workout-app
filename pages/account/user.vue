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
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Icon from '~/components/Icon'

export default {
  components: {
    Icon
  },
  middleware: 'auth',
  computed: {
    ...mapState('account', ['user']),
    ...mapGetters('account', ['isLoggedIn'])
  }
}
</script>

<style></style>
