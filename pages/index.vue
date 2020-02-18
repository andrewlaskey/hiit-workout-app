<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1">
            HIIT Generator
          </h1>
          <h2 class="subtitle is-3">
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

    <section class="section has-background-light">
      <div class="container has-text-dark">
        <h2 class="title is-2 has-text-dark has-text-centered has-p-bottom-medium">
          Randomized Workouts in 3 Steps
        </h2>
        <div class="columns is-centered">
          <div class="column is-four-fifths">

            <div class="columns is-vcentered has-p-bottom-medium">
              <div class="column is-one-third">
                <h3 class="title has-text-dark has-text-centered is-spaced">
                  1<br>Choose Options
                </h3>
              </div>
              <div class="column">
                <p class="is-size-5 has-text-dark">
                  Select the number of exercises per round, rounds to repeat,
                  rest and work time and which exercise types you want to filter
                  out.
                </p>
                <p class="is-size-5 has-text-dark">
                  You will try to perform one exercise for the duration of the
                  work interval followed by a rest period. Then continue with
                  the next exercise and repeat all of them each round.
                </p>
              </div>
            </div>

            <div class="columns is-vcentered has-p-bottom-medium">
              <div class="column is-one-third">
                <h3 class="title has-text-dark has-text-centered is-spaced">
                  2<br>Draw Exercises
                </h3>
              </div>
              <div class="column">
                <p class="is-size-5 has-text-dark">
                  Using your options, random exercises are drawn from the collection.
                  Review and redraw if you need to. Update filters in the previous
                  steps if there are exercises you can not perform.
                </p>
              </div>
            </div>

            <div class="columns is-vcentered has-p-bottom-medium">
              <div class="column is-one-third">
                <h3 class="title has-text-dark has-text-centered is-spaced">
                  3<br>Start!
                </h3>
              </div>
              <div class="column">
                <p class="is-size-5 has-text-dark">
                  Click "Start" and go for it!
                </p>
                <p class="is-size-5 has-text-dark">
                  Take breaks if you need to but try to
                  only rest during the rest period.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>

    <section class="section has-background-info">
      <div class="container has-text-dark">
        <div class="columns is-centered">
          <div class="column is-two-thirds">
            <h2 class="title is-2 has-text-dark has-text-centered is-spaced">
              Works Like an App
            </h2>
            <h3 class="subtitle is-5 has-text-dark has-text-centered">
              Save this site to your home screen for a seamless, app-like
              experience.
            </h3>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-thirds">
            <h2 class="title is-2 has-text-centered is-spaced">
              Be Safe!
            </h2>
            <h3 class="subtitle is-6 has-text-centered">
              Interval workouts are challenging. Know your own limits. While any
              workout may at times be uncomfortable it should never be painful.
              Consult with your doctor, if needed, before beginning any new
              exercise regime.
            </h3>
          </div>
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

.has-p-bottom-medium {
  padding-bottom: 1.5em;
}
</style>
