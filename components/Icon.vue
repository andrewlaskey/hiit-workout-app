<template>
  <svg class="icon" :class="computedClass">
    <use :xlink:href="xlink"></use>
  </svg>
</template>

<script>
export default {
  props: {
    symbol: {
      type: String,
      default: ''
    },
    extraClasses: {
      type: String,
      default: ''
    }
  },
  computed: {
    xlink() {
      return `#${this.symbol}`
    },
    computedClass() {
      return `${this.symbol} ${this.extraClasses}`
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  fill: currentColor;
}
</style>
