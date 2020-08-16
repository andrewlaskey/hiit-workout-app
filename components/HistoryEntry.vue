<template>
  <div>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <p class="title is-5" @click="showExercises = !showExercises">
            {{ date }}
          </p>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item is-hidden-touch">
          <button
            class="button is-info"
            @click="showExercises = !showExercises"
          >
            {{ showExercises ? 'Hide' : 'Show' }} Exercises
          </button>
        </div>
        <div class="level-item">
          <button class="button is-primary" @click="repeatWorkout">
            Repeat
          </button>
        </div>
      </div>
    </div>
    <div class="level is-mobile entry-summary">
      <div class="level-item">
        <div>
          <p class="heading">Rounds</p>
          <p class="title is-4">{{ entry.repeatNum }}</p>
        </div>
      </div>
      <div class="level-item">
        <div>
          <p class="heading">Exercises</p>
          <p class="title is-4">{{ entry.numExercises }}</p>
        </div>
      </div>
      <div v-if="entry.type === 'timed'" class="level-item">
        <div>
          <p class="heading">Work</p>
          <p class="title is-4">{{ entry.workTimeSeconds }}s</p>
        </div>
      </div>
      <div v-if="entry.type === 'timed'" class="level-item">
        <div>
          <p class="heading">Rest</p>
          <p class="title is-4">{{ entry.restTimeSeconds }}s</p>
        </div>
      </div>
      <div v-if="entry.type === 'timed'" class="level-item">
        <div>
          <p class="heading">Duration</p>
          <p class="title is-4">{{ totalDuration }}s</p>
        </div>
      </div>
      <div v-if="entry.type === 'reps'" class="level-item">
        <div>
          <p class="heading">Min</p>
          <p class="title is-4">{{ entry.restTimeSeconds }}</p>
        </div>
      </div>
      <div v-if="entry.type === 'reps'" class="level-item">
        <div>
          <p class="heading">Max</p>
          <p class="title is-4">{{ entry.workTimeSeconds }}</p>
        </div>
      </div>
      <div v-if="entry.type === 'reps'" class="level-item">
        <div>
          <p class="heading">Total Time</p>
          <p class="title is-4">{{ totalDuration }}s</p>
        </div>
      </div>
    </div>
    <div v-show="showExercises">
      <h4 class="title is-5">Exercises</h4>
      <ul>
        <li v-for="(exercise, index) in entry.exercises" :key="index">
          <nuxt-link :to="`/exercise/${exercise.handle}`">{{
            exercise.name
          }}</nuxt-link>
        </li>
      </ul>
    </div>
    <hr />
  </div>
</template>

<script>
import { format } from 'date-fns'
import { mapActions } from 'vuex'
import formatTime from '~/plugins/utils/formatTime'

export default {
  props: {
    entry: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showExercises: false
    }
  },
  computed: {
    date() {
      if (this.entry.dateTime) {
        return format(new Date(this.entry.dateTime), 'MM/d/y')
      }

      return ''
    },
    totalDuration() {
      if (this.entry && this.entry.type === 'timed') {
        const {
          numExercises,
          repeatNum,
          workTimeSeconds,
          restTimeSeconds
        } = this.entry
        return formatTime(
          (workTimeSeconds + restTimeSeconds) * numExercises * repeatNum -
            restTimeSeconds
        )
      }

      if (this.entry && this.entry.type === 'reps') {
        return formatTime(this.entry.totalTime)
      }

      return '0:00'
    }
  },
  methods: {
    ...mapActions('workout', ['presetWorkout', 'presetExercises']),
    formatTime,
    repeatWorkout() {
      if (this.entry) {
        this.presetWorkout(this.entry)
        this.presetExercises(this.entry.exercises)
        this.$router.push('/workout')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.entry-summary .level-item {
  justify-content: flex-start;
}
</style>
