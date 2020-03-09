<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Exercises</h1>
        <div class="buttons">
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
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-half">
            <div v-for="exercise in filteredExercises" :key="exercise.id" class="exercise">
              <h3 class="title is-3">{{ exercise.name }}</h3>
              <div class="tags">
                <span
                  v-for="(tag, index) in exercise.tags"
                  :key="index"
                  class="tag is-info"
                >{{ tag }}</span>
              </div>
              <div class="content" v-html="mdDescription(exercise)" />
            </div>
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
  async asyncData({ app, store, payload }) {
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

    return {
      exercises,
      tags,
      selectedTags: []
    }
  },
  computed: {
    filteredExercises() {
      if (this.exercises) {
        if (this.selectedTags.length > 0) {
          return this.exercises.filter(exercise => {
            const { tags } = exercise

            return this.selectedTags.every(tag => {
              return tags.indexOf(tag) > -1
            })
          })
        }

        return this.exercises
      }

      return []
    }
  },
  methods: {
    mdDescription(exercise) {
      if (exercise && exercise.description) {
        return this.$md(exercise.description)
      }

      return ''
    },
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag)

      if (index > -1) {
        this.selectedTags.splice(index, 1)
      } else {
        this.selectedTags.push(tag)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/styles/variables';

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
