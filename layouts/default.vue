<template>
  <div>
    <symbol-defs />
    <global-header />
    <nuxt />
    <global-footer />
    <sounds />
  </div>
</template>

<script>
import SymbolDefs from '~/components/SymbolDefs'
import Sounds from '~/components/Sounds'
import GlobalHeader from '~/components/GlobalHeader'
import GlobalFooter from '~/components/GlobalFooter'

export default {
  components: {
    GlobalFooter,
    GlobalHeader,
    SymbolDefs,
    Sounds
  }
}
</script>
