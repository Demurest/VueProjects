<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">No hay nada seleccionado</h1>
  </div>
  <FabJournal @on:click="createNewEntry()" />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    FabJournal: defineAsyncComponent(() =>
      import("../components/FabJournal.vue")
    ),
  },
  methods: {
    createNewEntry() {
      this.$router.push({ name: "entry", params: { id: "new" } });
    },
  },
};
</script>

<style lang="scss" scoped>
dic {
  height: 100%;
}
</style>
