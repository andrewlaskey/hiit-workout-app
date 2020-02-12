<template>
  <div>
    <audio
      v-for="(sound, index) in sounds"
      :id="sound.id"
      :src="sound.src"
      :key="index"
      type="audio/mpeg"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      sounds: [
        {
          id: 'round-start',
          src: '/bell-win.mp3'
        },
        {
          id: 'complete',
          src: '/bell-deep.mp3'
        }
      ]
    }
  }
}
</script>

<style>

</style>
