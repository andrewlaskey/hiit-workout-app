<template>
  <div class="panel-block exercise" :class="{ 'is-active': isActive }">
    <div class="exercise-heading">
      <strong v-if="isActive">{{ exercise.name }}</strong>
      <span v-else>{{ exercise.name }}</span>
      <button class="button" @click="isOpen = !isOpen">
        <icon symbol="icon-info" />
      </button>
    </div>
    <div v-show="isOpen" class="exercise-body content" v-html="mdDescription" />
  </div>
</template>

<script>
import Icon from '~/components/Icon'

export default {
  components: {
    Icon
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    exercise: {
      type: Object,
      default: () => {
        return {
          name: '',
          description: ''
        }
      }
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    isActive() {
      return (this.activeIndex === this.index)
    },
    mdDescription() {
      if (this.exercise && this.exercise.description) {
        return this.$md(this.exercise.description)
      }

      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/styles/variables';

.exercise {
  flex-direction: column;
  padding: 0;
  width: 100%;
}

.is-active .exercise-heading {
  background-color: $slate;
  color: $text-strong;
}

.exercise-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 0.75em;
  width: 100%;
}

.exercise-heading .button {
  background: none;
  border: none;
  color: $text-strong;

  &:hover,
  &:focus {
    color: $light-blue;
  }
}

.exercise-body {
  padding: 1em 0.75em 2em;
  width: 100%;
  color: $text-strong;
}
</style>
