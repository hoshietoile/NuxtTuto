<template>
  <md-app-toolbar class="md-primary">
    <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
      <md-icon>menu</md-icon>
    </md-button>
    <span class="md-title">My Title</span>
  </md-app-toolbar>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>
