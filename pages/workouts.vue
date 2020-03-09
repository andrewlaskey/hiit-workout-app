<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Workouts</h1>
        <h2
          class="subtitle is-4"
        >Preset workout configurations for getting started with the right routine quickly</h2>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div v-for="workout in workouts" :key="workout.id" class="column is-one-third">
            <div class="card">
              <div class="card-content">
                <h3 class="title is-4 has-text-dark">{{ workout.title }}</h3>
                <p>{{ mdDescription(workout) }}</p>
                <p>
                  <strong class="has-text-dark">Duration: {{ formatTime(totalDuration(workout)) }}</strong>
                  <button
                    class="button is-primary is-pulled-right"
                    @click="startWorkout(workout)"
                  >Start</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import formatTime from '~/plugins/utils/formatTime'
import exercisesAsyncData from '~/plugins/utils/exercisesAsyncData'

export default {
  async asyncData({ app, store, payload }) {
    const { exercises, workouts } = await exercisesAsyncData(
      app,
      store,
      payload
    )

    store.commit('workout/setAllExercises', exercises)
    store.commit('workouts/setWorkouts', workouts)

    return {
      workouts
    }
  },
  methods: {
    ...mapActions('workout', ['presetWorkout']),
    formatTime,
    startWorkout(workout) {
      if (workout && workout.options) {
        this.presetWorkout(workout.options)
        this.$router.push('/workout')
      }
    },
    totalDuration(workout) {
      if (workout && workout.options) {
        const { options } = workout
        const {
          numExercises,
          repeatNum,
          workTimeSeconds,
          restTimeSeconds
        } = options
        return (workTimeSeconds + restTimeSeconds) * numExercises * repeatNum
      }

      return 0
    },
    mdDescription(workout) {
      if (workout && workout.description) {
        return this.$md(workout.description)
      }

      return ''
    }
  }
}
</script>

<style>
</style>
