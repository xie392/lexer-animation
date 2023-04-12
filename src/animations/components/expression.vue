<script setup>
// 表达式 传入的参数 例如  1 + 2

const props = defineProps({
  // 表达式
  expression: {
    type: Array,
    default: {
      left: {
        type: 'identifier',
        name: 'a',
        value: 10,
        id: 'int'
      },
      // 符号
      operator: '+',
      // 右边的值
      right: {
        type: 'identifier',
        name: 'b',
        value: 20,
        id: 'int'
      }
    }
  }
})

const code = `

`
</script>

<template>
  <!-- 表示表达式 -->
  <p class="fragment fade-in section-flex">
    <!-- <span class="fragment fade-in rectangular">{{ v.value || 'NULL' }}</span> -->
    <!-- <span>{{ v.name }}</span> -->
  </p>
</template>

<style scoped lang="scss">
.section-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rectangular {
  display: flex;
  width: 100px;
  height: 50px;
  border: 1px solid #000;
  border-radius: 4px;
  font-size: 32px;
  justify-content: center;
  align-items: center;
}
</style>
