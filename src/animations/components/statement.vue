<script setup>
// import Reveal from 'reveal.js'
// import highlight from 'reveal.js/plugin/highlight/highlight.esm.js'
// import markdown from 'reveal.js/plugin/markdown/markdown.esm.js'
// import 'reveal.js/plugin/highlight/monokai.css'
import { onMounted, onUpdated, ref, watch } from 'vue'

const props = defineProps({
  statement: {
    type: Array,
    default: [
      {
        type: 'identifier',
        name: 'a',
        value: ''
      },
      {
        type: 'identifier',
        name: 'b',
        value: '2'
      }
    ]
  }
})
</script>

<template>
  <p class="fragment fade-in section-flex" v-for="(v, i) in statement" :key="i">
    <span class="fragment fade-in rectangular">{{ v.value || 'NULL' }}</span>
    <span class="fragment fade-in name">{{ v.name }}</span>
  </p>
</template>

<style scoped lang="scss">
.section-flex {
  display: flex;
  flex-direction: column;
  // align-items: center;
}

.rectangular {
  display: flex;
  width: 100px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 32px;
  justify-content: center;
  align-items: center;
  color: #999;
}

.name {
  color: #999;
  // text-align: left;
}
</style>
