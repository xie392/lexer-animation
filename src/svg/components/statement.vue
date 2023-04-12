<script setup lang="ts">
// { kind: 'int', name: 'a', value: '10000' }
interface VariableInterface {
  declarations: Array<{ kind: string; name: string; value: string | null }>
}

const props = defineProps<VariableInterface>()
</script>

<template>
  <svg width="100%" height="100%" class="svg">
    <rect x="30" y="30" class="rect"></rect>
    <text x="70" y="55" class="text">10000</text>
    <text x="75" y="90" class="text">amswr4r</text>
  </svg>
</template>

<style scoped lang="scss">
@import 'svg/style/index.scss';
</style>
