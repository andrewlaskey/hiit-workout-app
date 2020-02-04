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

<style lang="scss" scoped>
.columns {
  margin-left: 0;
  margin-right: 0;
}

.column {
  height: 100vh;
  padding-left: 0;
  padding-right: 0;

  &:first-child {
    border-right: 1px solid;
  }

  &:last-child {
    border-left: 1px solid;
  }
}
</style>
