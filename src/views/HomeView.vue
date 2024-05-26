<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>

  <h1>Hola Mundo</h1>

  <button @click="goToDayBook" class="btn btn-primary">Primary</button>
</template>

<script>
export default {
  methods: {
    goToDayBook() {
      this.$router.push({ name: "no-entry" });
    },
  },
};
</script>
