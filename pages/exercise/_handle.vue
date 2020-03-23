<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-half" v-if="exercise">
            <h1 class="title is-1">{{ exercise.name }}</h1>
            <div class="exercise">
              <div class="tags">
                <span
                  v-for="(tag, index) in exercise.tags"
                  :key="index"
                  class="tag is-info"
                >{{ tag }}</span>
              </div>
              <div class="content" v-html="mdDescription(exercise)" />
            </div>
            <nuxt-link to="/exercises">View All Exercises</nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import exercisesAsyncData from '~/plugins/utils/exercisesAsyncData'

export default {
  data() {
    return {
      selectedTags: []
    }
  },
  async asyncData({ app, store, payload, params }) {
    const { handle } = params
    let tags = []
    const { exercises, workouts } = await exercisesAsyncData(
      app,
      store,
      payload
    )

    if (Array.isArray(exercises)) {
      tags = exercises.reduce((tags, exercise) => {
        return [...new Set(tags.concat(exercise.tags))]
      }, [])
    }

    store.commit('workout/setAllExercises', exercises)
    store.commit('workouts/setWorkouts', workouts)

    const exercise = exercises.find(exercise => handle === exercise.handle)

    return {
      exercises,
      tags,
      selectedTags: [],
      exercise
    }
  },
  methods: {
    mdDescription(exercise) {
      if (exercise && exercise.description) {
        return this.$md(exercise.description)
      }

      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/styles/variables';

// .field.has-addons .button {

// }

.button.is-info.is-active {
  background: #92cde2;
}

.exercise {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid $grey-darker;
}
</style>
