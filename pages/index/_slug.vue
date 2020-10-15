<template>
  <div class="content--right vision">
    <p>{{ vision.fields.vision }}</p>
  </div>
</template>

<script>
  export default {
    props: ["vision"],
    trasition: ""
  }
</script>

<style lang="scss" scoped>
  .vision {
    min-height: 40vh;
  }
</style>