<template>
  <div class="workout-options">
    <h3 class="title is-size-5">Select Options</h3>
    <div class="field">
      <div class="control">
        <button
          class="button is-info"
          :class="{ 'is-active': type === 'timed' }"
          @click="updateWorkoutType('timed')"
        >Timed Workout</button>
        <button
          class="button is-info"
          :class="{ 'is-active': type === 'reps' }"
          @click="updateWorkoutType('reps')"
        >Rep Workout</button>
      </div>
    </div>
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
    <div v-if="type === 'reps'">
      <div class="field">
        <label class="label">Max Reps</label>
        <div class="control">
          <input
            class="input"
            type="number"
            min="1"
            max="15"
            :value="workTimeSeconds"
            @input="e => { setWorkTimeSeconds(e.target.value) }"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Minimum Reps</label>
        <div class="control">
          <input
            class="input"
            type="number"
            min="1"
            max="15"
            :value="restTimeSeconds"
            @input="e => { setRestTimeSeconds(e.target.value) }"
          />
        </div>
      </div>
    </div>
    <div v-if="type === 'timed'">
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
    </div>
    <h5 class="title is-6">Filter Exercises</h5>
    <button
      v-for="(tag, index) in tags"
      :key="index"
      class="button is-info is-small"
      :class="{ 'is-active': selectedTags.indexOf(tag) > -1 }"
      @click="toggleTag(tag)"
    >
      <span>{{ tag }}</span>
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState('workout', [
      'type',
      'numExercises',
      'repeatNum',
      'workTimeSeconds',
      'restTimeSeconds',
      'noPullupBar',
      'noArms',
      'noCore',
      'noLegs',
      'noAdvanced',
      'noPlyo',
      'selectedTags'
    ])
  },
  methods: {
    ...mapMutations('workout', [
      'setWorkoutType',
      'setNumExercises',
      'setRepeatNum',
      'setWorkTimeSeconds',
      'setRestTimeSeconds',
      'setPullupBarOption',
      'setArmOption',
      'setCoreOption',
      'setLegsOption',
      'setAdvancedOption',
      'setPlyoOption',
      'addSelectedTag',
      'removeSelectedTag'
    ]),
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag)

      if (index > -1) {
        this.removeSelectedTag(tag)
      } else {
        this.addSelectedTag(tag)
      }
    },
    updateWorkoutType(type) {
      this.setWorkoutType(type)

      if (type === 'reps') {
        this.setWorkTimeSeconds(10)
        this.setRestTimeSeconds(2)
        this.addSelectedTag('reps')
      } else {
        this.setWorkTimeSeconds(30)
        this.setRestTimeSeconds(15)
        this.removeSelectedTag('reps')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.workout-options {
  position: relative;
  padding: 1em;
}

.button.is-info {
  margin-right: 10px;
  margin-bottom: 10px;
}

.button.is-info.is-active {
  background: #92cde2;
}
</style>
