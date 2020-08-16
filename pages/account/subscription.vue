<template>
  <div>
    <section class="section">
      <div class="container">
        <div v-if="isLoggedIn">
          <account-nav active-tab="subscription" />
          <div class="columns">
            <div class="column is-half">
              <h3 class="title is-3">Status: {{ status }}</h3>
              <div v-if="isActive">
                <p>Cancel subscription</p>
                <p>Update payment method</p>
              </div>
              <div v-if="!isActive">
                <p>Purchase subscription</p>
              </div>
              <div v-if="isCanceling">
                <p>Subscription will end on {{ user.cancelSubscriptionAt }}</p>
                <p>Resume subscription</p>
              </div>
            </div>
          </div>
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
  data() {
    return {}
  },
  computed: {
    ...mapState('account', ['user', 'accountDisplayError', 'accountErrorFn']),
    ...mapGetters('account', ['isLoggedIn', 'isAccountError']),
    status() {
      if (this.user && this.user.subscriptionStatus) {
        switch (this.user.subscriptionStatus) {
          case 'active':
            return 'Active'
          case 'incomplete':
            return 'Incomplete'
          case 'incomplete_expired':
            return 'Incomplete Expired'
          case 'past_due':
            return 'Past Due'
          case 'canceled':
            return 'Canceled'
          case 'unpaid':
            return 'Unpaid'
        }
      }

      return 'Inactive'
    },
    isActive() {
      return (
        this.user &&
        this.user.subscriptionStatus &&
        this.user.subscriptionStatus === 'active'
      )
    },
    isCanceling() {
      return this.user && this.user.cancelSubscriptionAt
    }
  }
}
</script>

<style></style>
