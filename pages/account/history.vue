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
            <history-entry
              v-for="entry in sortedEntries"
              :key="entry.itemId"
              :entry="entry.item"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import AccountNav from '~/components/AccountNav'
import HistoryEntry from '~/components/HistoryEntry'

export default {
  components: {
    AccountNav,
    HistoryEntry
  },
  middleware: 'auth',
  computed: {
    ...mapState('account', ['user']),
    ...mapGetters('account', ['isLoggedIn']),
    ...mapState('history', ['entries', 'historyError', 'historyErrorMessage']),
    sortedEntries() {
      if (this.entries && this.entries.length) {
        const entries = [...this.entries]
        return entries.reverse()
      }
      return []
    }
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
