<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="logo">
      <Icon name="logo" />
      <span class="appName">口袋记账简易版</span>
    </div> 
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  export default {
    props: ['classPrefix'],
    name: 'Layout',
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .layout-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .logo {
    padding: 24px 16px 16px;
    font-size: 24px;
    font-weight: bold;
    background: $color-background; 
    > .appName {
      padding-left: 8px;
    }
  } 
  .content {
    overflow: auto;
    flex-grow: 1;
    background: $color-background;
  }
</style>