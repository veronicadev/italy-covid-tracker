<template>
  <div class="autocomplete-search">
    <autocomplete-dropdown :options="options" :height="55" @clear-field="onClearField" @select-item="onOptionSelect">
      <template slot="item" slot-scope="option">
        <span>
          <img class="region-icon" :src="imgPath(option)" />
        </span>
      </template>
    </autocomplete-dropdown>

    <b-icon @click="onCalendarClick()" class="h1 calendar-icon" icon="calendar-week"></b-icon>
    <b-calendar :locale="$i18n.locale" class="calendar" @selected="onSelectedDate" :min="minDate" :max="maxDate" v-model="value" :hidden="!showCalendar"></b-calendar>
  </div>
</template>

<script>
import AutocompleteDropdown from "@/components/AutocompleteDropdown.vue";
import { Regions } from "../common/common.js";
import moment from "moment";
export default {
  name: "HeaderForm",
  props: {
    text: String,
    selectedDate: String,
    maxDate: String,
  },
  data() {
    return {
      showCalendar: false,
      value: "",
      query: "",
      options: [...Regions],
      minDate: new Date(),
    };
  },
  methods: {
    onCalendarClick: function () {
      this.showCalendar = !this.showCalendar;
    },
    onOptionSelect(option) {
      this.$emit("select-item", option);
      console.log(option);
    },
    onClearField(option) {
      this.$emit("clear-field", option);
    },
    onSelectedDate(date) {
      this.showCalendar = false;
      this.$emit("selected-date", date);
    },
    imgPath: function (option) {
      if (option) {
        return require(`../assets/img/regione/${option.id}.png`);
      }
    },
    setMinMaxDate() {
      this.minDate = moment("2020-02-24").toDate();
    },
  },
  mounted() {
    this.setMinMaxDate();
  },
  components: {
    AutocompleteDropdown,
  },
};
</script>

<style scoped>
.autocomplete-search {
  position: relative;
}

.autocomplete-search {
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  background-color: #fff;
  display: flex;
  align-items: center;
}

.calendar-icon {
  padding: 3px 15px;
  box-sizing: content-box;
  border-left: 1px solid #8898aa;
  margin-bottom: 0px;
  fill: #32325d;
  cursor: pointer;
}

.calendar {
  position: absolute;
  top: 60px;
  right: 0;
  z-index: 1;
  box-shadow: 0 2px 3px 0 #e9edf1;
}

.region-icon {
  height: 25px;
  margin-left: 5px;
  margin-right: 10px;
}
</style>
