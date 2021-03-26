<template>
  <div>

  </div>
</template>

<script>
  export default {
    middleware: [
        function({ store, redirect }) {
            redirect(`/quarterly/${store.state.quarterlyLatestEdition}`);
        },
    ],
  };
</script>

<style lang="scss" scoped>

</style>