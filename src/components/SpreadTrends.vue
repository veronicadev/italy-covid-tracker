<template>
  <div class="row h-100">
    <div class="col-lg-12">
      <div class="d-flex justify-content-between align-items-center">
        <h2>Spread Trends</h2>
        <div class="pl-2 pr-2 d-flex align-items-center">
          <b-form-checkbox class="switch" switch size="sm">Log</b-form-checkbox>
          <b-dropdown size="sm" :text="$t(timeSpan.label)" class="pl-3 chart-dropdown">
            <b-dropdown-item v-for="type in chartTimeSpan" :key="type.key" @click="onClick(type)" href="#">{{ $t(type.label) }}</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
    <div class="col-lg-12 mt-4 mb-3">
      <div class="" id="spreadTrendsChartLegend"></div>
    </div>
    <div class="col-lg-12 align-self-end">
      <canvas id="spreadTrendsChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import { ChartTimeSpan } from "../common/common.js";
export default {
  name: "SpreadTrends",
  props: {},
  data: function () {
    return {
      timeSpan: ChartTimeSpan[0],
      chartTimeSpan: ChartTimeSpan,
    };
  },
  mounted() {
    let ctx = document.getElementById("spreadTrendsChart").getContext("2d");
    let legend = document.getElementById("spreadTrendsChartLegend");

    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Total cases",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45],
          },
          {
            label: "Deceaded",
            backgroundColor: "rgba(240, 132, 99, 0.5)",
            borderColor: "rgb(240, 132, 99)",
            data: [15, 45, 12, 15, 10, 0, 40],
          },
          {
            label: "Hospitalized",
            backgroundColor: "rgba(240, 132, 99, 0.5)",
            borderColor: "rgb(240, 132, 99)",
            data: [15, 45, 12, 15, 10, 0, 40],
          },
          {
            label: "Recovered",
            backgroundColor: "rgba(240, 132, 99, 0.5)",
            borderColor: "rgb(240, 132, 99)",
            data: [15, 45, 12, 15, 10, 0, 40],
          },
        ],
      },

      // Configuration options go here
      options: {
        legend: false,
        legendCallback: function (chart) {
          var ul = document.createElement("ul");
          ul.classList.add("legend-list");
          const datasets = chart.data.datasets;
          datasets.forEach(function (dataset) {
            ul.innerHTML += `
        <li class="legend-item cursor-pointer">
            <span class="legend-dot" style="background-color: ${dataset.borderColor}"></span>
            ${dataset.label}
         </li>
      `; // ^ ES6 Template String
          });
          return ul.outerHTML;
        },
      },
    });

    legend.innerHTML = chart.generateLegend();
  },
  methods: {
    onClick(type) {
      this.timeSpan = type;
    },
  },
};
</script>

<style scoped>
canvas {
  border-radius: 0.35rem;
}

/deep/ .chart-dropdown button {
  background-color: transparent !important;
  color: #8898aa !important;
  font-weight: 300;
  line-height: 26px;
  font-size: 14px;
  border: 1px solid #ced4da;
  min-width: 130px;
  outline: none !important;
  box-shadow: none !important;
  text-align: left;
  position: relative;
}

/deep/ .chart-dropdown button:after {
  position: absolute;
  top: 15px;
  right: 10px;
}

/deep/ .chart-dropdown .dropdown-item {
  font-weight: 300;
  color: #212529;
  font-size: 14px;
  text-align: left;
  padding: 4px 10px;
}

/deep/ .switch .custom-control-label:after,
/deep/ .switch .custom-control-label:before {
  outline: none !important;
  box-shadow: none !important;
}
/deep/ .switch .custom-control-input:checked ~ /deep/ .switch .custom-control-label:before {
  border-color: #32325d;
  background-color: #32325d;
}
</style>
