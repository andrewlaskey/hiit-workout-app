<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <nuxt-link to="/" class="navbar-item">
          Home
        </nuxt-link>
      </div>
      <div class="navbar-end">
        <nuxt-link to="/exercises" class="navbar-item">
          Exercises
        </nuxt-link>
        <div class="navbar-item">
          <nuxt-link to="/workout" class="button is-primary">
            Workout
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>
