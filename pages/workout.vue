<template>
  <div class="workout">
    <div class="columns">
      <div
        :class="{ 'is-hidden-mobile': mobileState !== 'options' }"
        class="column is-half"
      >
        <workout-options />
      </div>
      <div
        :class="{ 'is-hidden-mobile': mobileState !== 'display' }"
        class="column is-half"
      >
        <workout-display />
      </div>
    </div>
    <div
      v-if="state === 'ready'"
      class="workout-mobile-ui is-hidden-tablet"
    >
      <div
        v-if="mobileState === 'options'"
        class="workout-mobile-ui-totals is-hidden-tablet"
      >
        <span>Total Workout Duration</span>
        <span class="is-pulled-right">{{ formatTime(totalDuration) }}</span>
      </div>
      <button
        v-if="mobileState === 'options'"
        class="button is-info is-medium is-fullwidth"
        @click="mobileState = 'display'"
      >
        Next
      </button>
      <button
        v-if="mobileState === 'display'"
        class="button is-info is-medium is-fullwidth"
        @click="mobileState = 'options'"
      >
        Back
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import formatTime from '~/plugins/utils/formatTime'
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
  },
  data() {
    return {
      mobileState: 'options'
    }
  },
  computed: {
    ...mapState('workout', ['state']),
    ...mapGetters('workout', ['totalDuration'])
  },
  methods: {
    formatTime
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/styles/variables';

.workout {
  position: relative;
}

.columns {
  margin-left: 0;
  margin-right: 0;
}

.column {
  padding-left: 0;
  padding-right: 0;
  min-height: calc(100vh - 52px);

  &:first-child {
    border-right: 1px solid $grey-darker;
  }

  &:last-child {
    border-left: 1px solid $grey-darker;
  }

  @media screen and (min-width: 1024px) {
    min-height: calc(100vh - 56px)
  }
}

.workout-mobile-ui {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 2px solid $slate-darken;
}

.workout-mobile-ui-totals {
  background: $panel-heading-background-color;
  color: $panel-heading-color;
  font-size: 1.25em;
  font-weight: 700;
  line-height: 1.25;
  padding: 0.75em 1em;
}
</style>
