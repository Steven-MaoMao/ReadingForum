<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="background">
    <RouterView />
  </div>
</template>

<style>
#app {
  margin: 0px;
}

body {
  margin: 0;
  padding: 0;
  border: 0;
}

#background {
  background: url("./assets/DSC_5955.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom, center;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  z-index: 0;
  min-height: 800px;
}

.el-header {
  background-color: rgba(255, 255, 255);
  /*box-shadow: 0px 6px 6px 0px #95d475 inset*/
}

.el-row {
  background-color: rgba(255, 255, 255);
  border-radius: 20px;
}

.block {
  /*box-shadow: 0px 0px 16px 2px #95d475 inset*/
}
</style>
