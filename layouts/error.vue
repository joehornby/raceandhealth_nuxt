<template>
  <div>
    <HeaderTwoLogo />
    <Sidebar />
    <div v-if="error.statusCode === 404">
      Page not found
    </div>
    <div v-else>
      Something went wrong.
    </div>
    <div>
      <a @click="$router.back()">
        <button class="btn btn-secondary icon-arrow-right">
            Go Back
        </button> 
      </a>
      <nuxt-link to="/">
        <button class="btn btn-primary icon-arrow-right">
          Home page
        </button>
      </nuxt-link>
    </div>
    <Footer />
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
html {
  height: 100%;
}
.body {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 0;
  padding: 0;
  min-height: 100%;
  height: auto;
}
</style>