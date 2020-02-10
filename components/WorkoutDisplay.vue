<template>
  <div class="panel" :class="panelClass">
    <div class="panel-heading">
      <div v-if="state === 'ready'">
        <span>Total Workout Duration</span>
        <span class="is-pulled-right">{{ formatTime(totalDuration) }}</span>
      </div>
      <span v-if="state === 'countdown'">Get Ready!</span>
      <div v-if="state === 'work'">
        <span>Work</span>
        <span class="is-pulled-right">Round {{ round }} of {{ repeatNum }}</span>
      </div>
      <div v-if="state === 'rest'">
        <span>Rest</span>
        <span class="is-pulled-right">Round {{ round }} of {{ repeatNum }}</span>
      </div>
      <span v-if="state === 'complete'">Complete!</span>
    </div>
    <div
      v-if="state === 'ready' && exercises.length > 0"
      class="panel-block"
    >
      <button class="button is-primary is-fullwidth" @click="startWorkout">Start</button>
    </div>
    <div
      v-if="state !== 'ready' && state !== 'complete'"
      class="panel-block"
    >
      <workout-timer />
    </div>
    <workout-exercise
      v-for="(exercise, index) in exercises"
      :key="index"
      :index="index"
      :activeIndex="activeIndex"
      :exercise="exercise"
    />
    <div
      v-if="exercises.length === 0 || state === 'ready'"
      class="panel-block info-block"
    >
      <p
        v-if="exercises.length === 0"
        class="has-text-centered"
      >
        When you have finished setting up your options, click below to randomly draw this workout's exercises.
      </p>
      <button
        class="button is-info is-fullwidth"
        @click="selectExercises"
      >
        <span v-if="exercises.length > 0">Redraw</span>
        <span v-else>Draw Exercises</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import formatTime from '~/plugins/utils/formatTime'
import WorkoutTimer from '~/components/WorkoutTimer'
import WorkoutExercise from '~/components/WorkoutExercise'

export default {
  components: {
    WorkoutTimer,
    WorkoutExercise
  },
  computed: {
    ...mapState('workout', [
      'repeatNum',
      'exercises',
      'timer',
      'round',
      'activeIndex',
      'state'
    ]),
    ...mapGetters('workout', ['totalDuration']),
    panelClass() {
      switch (this.state) {
        case 'coundown':
          return 'is-warning'
        case 'work':
          return 'is-link'
        case 'rest':
          return 'is-info'
        case 'complete':
          return 'success'
      }

      return ''
    }
  },
  methods: {
    ...mapActions('workout', [
      'selectExercises',
      'startWorkout'
    ]),
    formatTime
  }
}
</script>

<style lang="scss">
  .info-block {
    padding-top: 2rem;
    flex-direction: column;

    p {
      padding: 0 0 1rem;
      max-width: 80%;
    }
  }

  .button {
    text-transform: uppercase;
    font-weight: 600;
  }
</style>
