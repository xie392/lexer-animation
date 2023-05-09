<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <header class="flex header">
      <div class="flex logo-image">
        <img src="@/assets/logo.svg" alt="logo" class="logo" />
      </div>
    </header>
    <main class="main">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  min-height: 100vh;

  .header {
    height: 60px;
    background-color: var(--bg-color, #fff);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    padding: 0 30px;
    border-bottom: 1px solid var(--border-color, #e8e8e8);

    .logo-image {
      max-width: 160px;
      overflow: hidden;
      transform: scale(2);
      margin-right: 20px;
      .logo {
        height: 60px;
      }
    }
  }

  .main {
    flex: 1 0 auto;
  }
}
</style>
