<template>
  <div class="workout-options">
    <h3 class="title is-size-5">Select Options</h3>
    <div class="field">
      <label class="label">How many different exercises?</label>
      <div class="control">
        <input
          class="input"
          type="number"
          min="1"
          max="10"
          :value="numExercises"
          @input="e => { setNumExercises(e.target.value) }"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">How many rounds?</label>
      <div class="control">
        <input
          class="input"
          type="number"
          min="1"
          max="20"
          :value="repeatNum"
          @input="e => { setRepeatNum(e.target.value) }"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Work duration (seconds)</label>
      <div class="control">
        <input
          class="input"
          type="number"
          min="1"
          max="60"
          :value="workTimeSeconds"
          @input="e => { setWorkTimeSeconds(e.target.value) }"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Rest duration (seconds)</label>
      <div class="control">
        <input
          class="input"
          type="number"
          min="1"
          max="60"
          :value="restTimeSeconds"
          @input="e => { setRestTimeSeconds(e.target.value) }"
        />
      </div>
    </div>
    <h5 class="title is-6">Exercise Options</h5>
    <div class="field">
      <label class="checkbox">
        <input
          type="checkbox"
          :checked="noPullupBar"
          @change="e => { setPullupBarOption(e.target.checked) }"
        />
        No Pull-up Bar
      </label>
    </div>
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" :checked="noArms" @change="e => { setArmOption(e.target.checked) }" />
        No Arms
      </label>
    </div>
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" :checked="noCore" @change="e => { setCoreOption(e.target.checked) }" />
        No Core
      </label>
    </div>
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" :checked="noLegs" @change="e => { setLegsOption(e.target.checked) }" />
        No Legs
      </label>
    </div>
    <div class="field">
      <label class="checkbox">
        <input
          type="checkbox"
          :checked="noAdvanced"
          @change="e => { setAdvancedOption(e.target.checked) }"
        />
        No Advanced
      </label>
    </div>
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" :checked="noPlyo" @change="e => { setPlyoOption(e.target.checked) }" />
        No Plyometrics
      </label>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
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
      'noAdvanced',
      'noPlyo'
    ])
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
      'setLegsOption',
      'setAdvancedOption',
      'setPlyoOption'
    ])
  }
}
</script>

<style lang="scss" scoped>
.workout-options {
  position: relative;
  padding: 1em;
}
</style>
