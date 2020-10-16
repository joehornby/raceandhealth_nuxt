<template>
</template>

<script>
export default {
  middleware: [
        function({ redirect }) {
            redirect('/');
        },
    ],
}
</script>