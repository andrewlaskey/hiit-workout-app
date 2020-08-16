<template>
  <div>
    <section class="section">
      <div class="container">
        <div v-if="isLoggedIn">
          <account-nav active-tab="history" />
          <div v-if="historyError">
            <p>{{ historyErrorMessage }}</p>
          </div>
          <div v-else>
            <p>{{ JSON.stringify(entries) }}</p>
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
  computed: {
    ...mapState('account', ['user']),
    ...mapGetters('account', ['isLoggedIn']),
    ...mapState('history', ['entries', 'historyError', 'historyErrorMessage'])
  },
  mounted() {
    this.initHistory()
  },
  methods: {
    ...mapActions('history', ['initHistory'])
  }
}
</script>

<style></style>
