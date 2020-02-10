<template>
  <div class="panel-block exercise" :class="{ 'is-active': isActive }">
    <div class="exercise-heading">
      <strong v-if="isActive">{{ exercise.name }}</strong>
      <span v-else>{{ exercise.name }}</span>
      <button class="button">
        <icon symbol="icon-info" />
      </button>
    </div>
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
          name: ''
        }
      }
    }
  },
  computed: {
    isActive() {
      return (this.activeIndex === this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/styles/variables';

.exercise {
  padding: 0;
  width: 100%;
}

.is-active .exercise-heading {
  background-color: $slate;
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
</style>
