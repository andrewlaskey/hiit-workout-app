<template>
  <div class="account-nav">
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
    <div class="tabs">
      <ul>
        <li :class="{ 'is-active': activeTab === 'settings' }">
          <nuxt-link to="/account/user">Settings</nuxt-link>
        </li>
        <li :class="{ 'is-active': activeTab === 'history' }">
          <nuxt-link to="/account/history">History</nuxt-link>
        </li>
        <li :class="{ 'is-active': activeTab === 'subscription' }">
          <nuxt-link to="/account/subscription">Subscription</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Icon from '~/components/Icon'

export default {
  components: {
    Icon
  },
  props: {
    activeTab: {
      type: String,
      default: 'settings'
    }
  },
  computed: {
    ...mapState('account', ['user'])
  }
}
</script>

<style lang="scss" scoped>
.account-nav {
  padding-bottom: 2rem;
}
</style>
