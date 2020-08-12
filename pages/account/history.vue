<template>
  <div>
    <section class="section">
      <div class="container">
        <div v-if="isLoggedIn">
          <account-nav active-tab="history" />
          <p>workout log</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AccountNav from '~/components/AccountNav'

export default {
  components: {
    AccountNav
  },
  middleware: 'auth',
  computed: {
    ...mapState('account', ['user']),
    ...mapGetters('account', ['isLoggedIn'])
  }
}
</script>

<style></style>
