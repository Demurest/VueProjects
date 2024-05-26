<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>
    </div>
    <div>
      <button class="btn btn-danger">
        Borrar
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="btn btn-primary">
        Subir foto
        <i class="fa fa-upload"></i>
      </button>
    </div>

    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea
        v-model="entry.text"
        placeholder="¿ Que sucedió hoy? "
      ></textarea>
    </div>
    <img
      src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fes-es%2Fbuscar%2Ffondo%2520del%2520bosque%2F&psig=AOvVaw1zuH2L0whYWkMqbd5s4G0_&ust=1716174716721000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIjT_JTfmIYDFQAAAAAdAAAAABAE"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </template>

  <FabJournal icon="fa-save" @on:click="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

import getDayMonthYear from "../helpers/getDayMonthYear.js";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      entry: null,
    };
  },
  components: {
    FabJournal: defineAsyncComponent(() =>
      import("../components/FabJournal.vue")
    ),
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },
  methods: {
    /**mapActions son metodos */
    ...mapActions("journal", ["updateEntry", "createEntry"]),
    loadEntry() {
      let entry;

      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },
    async saveEntry() {
      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const id = await this.createEntry(this.entry);
        this.$router.push({ name: "entry", params: { id } });
      }
      console.log("guardando la entrada");
      this.updateEntry(this.entry);
    },
  },
  created() {
    this.loadEntry();
  },

  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }

  img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
  }
}
</style>
