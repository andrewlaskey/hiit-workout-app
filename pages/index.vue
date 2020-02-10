<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            HIIT Generator
          </h1>
          <h2 class="subtitle">
            High intensity interval training workouts a the click of a button.
          </h2>
          <p>
            <nuxt-link class="button is-primary" to="/workout">
              <strong>START A WORKOUT</strong>
            </nuxt-link>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.hero {
  background: rgb(40,49,73);
  background: linear-gradient(142deg, rgba(40,49,73,1) 0%, rgba(40,49,73,1) 35%, rgba(85,96,124,1) 100%);
}
</style>
