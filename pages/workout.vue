<template>
  <div class="workout">
    <div class="columns">
      <div class="column is-half">
        <workout-options />
      </div>
      <div class="column is-half">
        <workout-display />
      </div>
    </div>
  </div>
</template>

<script>
import WorkoutOptions from '~/components/WorkoutOptions'
import WorkoutDisplay from '~/components/WorkoutDisplay'

export default {
  components: {
    WorkoutOptions,
    WorkoutDisplay
  },
  async asyncData({ app, store }) {
    const exercises = await app.$request.getExercises()

    store.commit('workout/setAllExercises', exercises)
  }
}
</script>

<style>

</style>
