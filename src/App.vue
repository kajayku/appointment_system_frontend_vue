<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>


<style>
/* Ensure proper layout and prevent overlapping */
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa; /* Light background */
}
</style>