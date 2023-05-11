<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="">
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
  border: 0
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
}
</style>
