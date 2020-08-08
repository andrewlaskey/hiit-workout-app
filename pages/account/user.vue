<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Account</h1>
        <div v-if="isLoggedIn">
          <h2 class="title is-3">{{ user.username }}</h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  computed: {
    ...mapState('account', ['user']),
    ...mapGetters('account', ['isLoggedIn'])
  }
}
</script>

<style></style>
