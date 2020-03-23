<template>
  <div>
    <symbol-defs />
    <global-header />
    <nuxt />
    <sounds />
  </div>
</template>

<script>
import SymbolDefs from '~/components/SymbolDefs'
import Sounds from '~/components/Sounds'
import GlobalHeader from '~/components/GlobalHeader'

export default {
  components: {
    GlobalHeader,
    SymbolDefs,
    Sounds
  }
}
</script>
