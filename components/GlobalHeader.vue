<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item">HIIT Generator</nuxt-link>
      <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-navbar-burger-active': isMobileOpen }"
        aria-label="menu"
        aria-expanded="false"
        @click="isMobileOpen = !isMobileOpen"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{ 'is-mobile-active': isMobileOpen }">
      <div class="navbar-end">
        <a
          class="navbar-item"
          target="_blank"
          href="https://www.buymeacoffee.com/hittgeneratorapp"
        >Support</a>
        <nuxt-link to="/exercises" class="navbar-item">Exercises</nuxt-link>
        <div class="navbar-item">
          <nuxt-link to="/workout" class="button is-primary">Workout</nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMobileOpen: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/styles/variables';

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
