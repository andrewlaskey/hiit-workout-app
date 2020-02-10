<template>
  <div class="timer">
    <button v-if="isPlaying" class="button" @click="pause">
      <icon symbol="icon-pause" />
    </button>
    <button v-if="!isPlaying" class="button" @click="play">
      <icon symbol="icon-play_arrow" />
    </button>
    <p class="is-size-1 has-text-centered">{{ formatTime(timer) }}</p>
    <div class="buttons">
      <button class="button" @click="reset">
        <icon symbol="icon-replay" />
      </button>
      <button class="button" @click="toggleSounds">
        <icon v-if="soundsOn" symbol="icon-volume_up" />
        <icon v-else symbol="icon-volume_off" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import formatTime from '~/plugins/utils/formatTime'
import Icon from '~/components/Icon'

export default {
  components: {
    Icon
  },
  computed: {
    ...mapState('workout', [
      'timer',
      'soundsOn'
    ]),
    ...mapGetters('workout', ['isPlaying'])
  },
  methods: {
    formatTime,
    ...mapMutations('workout', ['toggleSounds']),
    ...mapActions('workout', ['play', 'pause', 'reset'])
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
