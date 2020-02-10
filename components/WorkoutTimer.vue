<template>
  <div class="timer">
    <button class="button">
      <icon symbol="icon-pause" />
    </button>
    <p class="is-size-1 has-text-centered">{{ formatTime(timer) }}</p>
    <div class="buttons">
      <button class="button">
        <icon symbol="icon-replay" />
      </button>
      <button class="button">
        <icon symbol="icon-volume_off" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import formatTime from '~/plugins/utils/formatTime'
import Icon from '~/components/Icon'

export default {
  components: {
    Icon
  },
  computed: {
    ...mapState('workout', [
      'timer'
    ])
  },
  methods: {
    formatTime
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/styles/variables';

.timer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.timer .button {
  background: none;
  border: none;
  color: $text-strong;

  &:hover,
  &:focus {
    color: $light-blue;
  }
}
</style>
