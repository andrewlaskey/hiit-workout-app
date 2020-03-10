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
