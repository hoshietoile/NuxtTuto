<template>
  <div class="page-container">
    <md-app>
      <TheHeader />
      <TheDrawer />
      <md-app-content>
        <nuxt />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
// components
import TheHeader from './TheHeader'
import TheDrawer from './TheDrawer'

export default {
  name: 'default',
  components: {
    TheHeader,
    TheDrawer
  }
}
</script>

<style lang="scss">
#__nuxt,
.page-container,
.md-app {
  height: 100vh;
}
.md-app {
  border: 1px solid rgba(#000, .12);
}
.md-app-content {
  padding: 1rem 1.5rem;
}
</style>