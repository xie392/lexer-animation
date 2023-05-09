<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock/index.vue'
import CodeAnimation from '@/components/CodeAnimation/index.vue'
</script>

<template>
  <div class="grid container">
    <div class="grid-item">
      <CodeBlock />
    </div>
    <div class="grid-item">
      <CodeAnimation />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  grid-template-columns: repeat(2, 1fr);

  .grid-item {
    background-color: var(--bg-color, #fff);
    // height: calc(100vh - 60px);
    height: 100vh;
    padding: 0 0px 0 0;

    &:first-child {
      border-right: 1px solid #e8e8e8;
    }
  }
}
</style>
