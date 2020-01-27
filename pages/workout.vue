<template>
  <div class="section">
    <div class="columns">
      <div class="column is-half">
        <div class="field">
          <label class="label">How many different exercises?</label>
          <div class="control">
            <input class="input" type="number" min="1" max="10" :value="numExercises" @input="e => { setNumExercises(e.target.value) }">
          </div>
        </div>
        <div class="field">
          <label class="label">How many circuit repetitions?</label>
          <div class="control">
            <input class="input" type="number" min="1" max="20" :value="repeatNum" @input="e => { setRepeatNum(e.target.value) }">
          </div>
        </div>
        <div class="field">
          <label class="label">Work duration (seconds)</label>
          <div class="control">
            <input class="input" type="number" min="1" max="60" :value="workTimeSeconds" @input="e => { setWorkTimeSeconds(e.target.value) }">
          </div>
        </div>
        <div class="field">
          <label class="label">Rest duration (seconds)</label>
          <div class="control">
            <input class="input" type="number" min="1" max="60" :value="restTimeSeconds" @input="e => { setRestTimeSeconds(e.target.value) }">
          </div>
        </div>
        <h4>Exercise Options</h4>
        <div class="field">
          <label class="checkbox">
            <input type="checkbox" :value="noPullupBar" @input="e => { setPullupBarOption(e.target.checked) }">
            No Pull-up Bar
          </label>
        </div>
        <div class="field">
          <label class="checkbox">
            <input type="checkbox" :value="noArms" @input="e => { setArmOption(e.target.checked) }">
            No Arms
          </label>
        </div>
        <div class="field">
          <label class="checkbox">
            <input type="checkbox" :value="noCore" @input="e => { setCoreOption(e.target.checked) }">
            No Core
          </label>
        </div>
        <div class="field">
          <label class="checkbox">
            <input type="checkbox" :value="noLegs" @input="e => { setLegsOption(e.target.checked) }">
            No Legs
          </label>
        </div>
      </div>
      <div class="column is-half">
        <h3>Total Workout Duration</h3>
        <h4>{{ workoutDurationFormatted }}</h4>
        <button class="button is-primary" @click="selectExercises">Draw Exercises</button>
        <button class="button is-primary" @click="startWorkout">Start</button>
        <p>{{ state }}</p>
        <p>Round {{ round }} of {{ repeatNum }}</p>
        <p>{{ timerFormatted }}</p>
        <ul>
          <li v-for="(exercise, index) in exercises" :key="index">
            <strong v-if="activeIndex === index">{{ exercise.name }}</strong>
            <span v-else>{{ exercise.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

const ONE_SECOND = 1000

export default {
  data() {
    return {
      timer: 0,
      round: 1,
      activeIndex: 0,
      intervalRef: null,
      state: 'ready'
    }
  },
  computed: {
    ...mapState('workout', [
      'numExercises',
      'repeatNum',
      'workTimeSeconds',
      'restTimeSeconds',
      'noPullupBar',
      'noArms',
      'noCore',
      'noLegs',
      'exercises'
    ]),
    workoutDurationSeconds() {
      return (this.workTimeSeconds + this.restTimeSeconds) * this.numExercises * this.repeatNum
    },
    workoutDurationFormatted() {
      return this.formatTime(this.workoutDurationSeconds)
    },
    timerFormatted() {
      return this.formatTime(this.timer)
    }
  },
  methods: {
    ...mapMutations('workout', [
      'setNumExercises',
      'setRepeatNum',
      'setWorkTimeSeconds',
      'setRestTimeSeconds',
      'setPullupBarOption',
      'setArmOption',
      'setCoreOption',
      'setLegsOption'
    ]),
    ...mapActions('workout', ['selectExercises']),
    async startWorkout() {
      if (this.exercises.length === 0) {
        await this.selectExercises()
      }

      this.state = 'countdown'
      this.timer = 10

      this.intervalRef = setInterval(this.countdown, ONE_SECOND)
    },
    pauseTimer() {
      clearInterval(this.intervalRef)
    },
    resumeTimer() {
      this.intervalRef = setInterval(this.countdown, ONE_SECOND)
    },
    countdown() {
      this.timer--

      if (this.timer < 0) {
        switch (this.state) {
          case 'countdown':
            this.state = 'work'
            this.timer = this.workTimeSeconds
            break
          case 'work':
            this.state = 'rest'
            this.timer = this.restTimeSeconds
            break
          case 'rest':
            this.activeIndex++
            this.state = 'work'
            this.timer = this.workTimeSeconds

            if (this.activeIndex >= this.numExercises) {
              this.round++
              this.activeIndex = 0

              if (this.round > this.repeatNum) {
                this.state = 'complete'
                clearInterval(this.intervalRef)
              }
            }
        }
      }
    },
    formatTime(timeInSeconds) {
      if (!isNaN(timeInSeconds) && typeof timeInSeconds === 'number') {
        // TODO: display hour if timeInSeconds is that long
        return new Date(timeInSeconds * 1000).toISOString().substr(14, 5)
      }

      return '00:00'
    }
  }
}
</script>

<style>

</style>
