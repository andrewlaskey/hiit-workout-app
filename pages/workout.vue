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
          <label class="label">How many rounds?</label>
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
        <h3 class="title is-clearfix">
          <span>Total Workout Duration</span>
          <span class="is-pulled-right">{{ formatTime(totalDuration) }}</span>
        </h3>
      </div>
      <div class="column is-half">
        <div class="panel" :class="panelClass">
          <div class="panel-heading">
            <span v-if="state === 'ready'">Setup Your Workout</span>
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
            <p class="is-size-1 has-text-centered">{{ formatTime(timer) }}</p>
          </div>
          <div class="panel-block" v-for="(exercise, index) in exercises" :key="index">
            <strong v-if="activeIndex === index">{{ exercise.name }}</strong>
            <span v-else>{{ exercise.name }}</span>
          </div>
          <div
            v-if="exercises.length === 0 || state === 'ready'"
            class="panel-block"
          >
            <button
              class="button is-primary is-fullwidth is-light"
              @click="selectExercises"
            >
              <span v-if="exercises.length > 0">Redraw</span>
              <span v-else>Draw Exercises</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

const ONE_SECOND = 1000
const HOUR_IN_SECONDS = 3600

export default {
  async asyncData({ app, store }) {
    const exercises = await app.$request.getExercises()

    store.commit('workout/setAllExercises', exercises)
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
    ...mapActions('workout', [
      'selectExercises',
      'startWorkout'
    ]),
    formatTime(timeInSeconds) {
      if (!isNaN(timeInSeconds) && typeof timeInSeconds === 'number') {
        // TODO: display hour if timeInSeconds is that long
        if (timeInSeconds >= HOUR_IN_SECONDS) {
          return new Date(timeInSeconds * ONE_SECOND).toISOString().substr(11, 8)
        }

        return new Date(timeInSeconds * ONE_SECOND).toISOString().substr(14, 5)
      }

      return '00:00'
    }
  }
}
</script>

<style>

</style>
