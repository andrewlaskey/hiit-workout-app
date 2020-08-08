<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item">HIIT Generator</nuxt-link>
      <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-navbar-burger-active': menuOpen }"
        aria-label="menu"
        aria-expanded="false"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{ 'is-mobile-active': menuOpen }">
      <div class="navbar-end">
        <nuxt-link to="/workouts" class="navbar-item">Workouts</nuxt-link>
        <nuxt-link to="/exercises" class="navbar-item">Exercises</nuxt-link>
        <nuxt-link v-if="!isLoggedIn" to="/account/login" class="navbar-item"
          >Log in</nuxt-link
        >
        <nuxt-link v-if="isLoggedIn" to="/account/user" class="navbar-item"
          >Account</nuxt-link
        >
        <button
          v-if="isLoggedIn"
          class="navbar-item navbar-button"
          @click="clickSignOut"
        >
          Sign Out
        </button>
        <div class="navbar-item">
          <nuxt-link to="/workout" class="button is-primary">Workout</nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('menu', ['menuOpen']),
    ...mapGetters('account', ['isLoggedIn'])
  },
  methods: {
    ...mapMutations('menu', ['toggleMenu']),
    ...mapActions('account', ['signOut']),
    async clickSignOut() {
      this.signOut({ navigate: true })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/styles/variables';

.navbar-button {
  border: none;
  font-size: 1em;
  background: none;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #15171c;
  }
}

.navbar-burger.is-navbar-burger-active {
  @media screen and (max-width: 1023px) {
    span:nth-child(1) {
      transform: translateY(5px) rotate(45deg);
    }

    span:nth-child(2) {
      opacity: 0;
    }

    span:nth-child(3) {
      transform: translateY(-5px) rotate(-45deg);
    }
  }
}

.navbar-menu.is-mobile-active {
  @media screen and (max-width: 1023px) {
    position: fixed;
    top: 52px;
    bottom: 0;
    left: 0;
    right: 0;
    background: $grey-darker;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    text-align: center;
    text-transform: uppercase;

    .navbar-end {
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>
