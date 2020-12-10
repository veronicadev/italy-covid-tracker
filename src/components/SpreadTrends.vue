<template>
  <div class="row h-100">
    <div class="col-lg-12">
      <div class="d-flex justify-content-between align-items-center">
        <h2>National Spread Trend</h2>
        <div class="pl-2 pr-2 d-flex align-items-center">
          <b-form-checkbox @change="onLogToggle" class="switch" switch size="sm"
            >Log</b-form-checkbox
          >
          <b-dropdown size="sm" :text="$t(timeSpan.label)" class="pl-3 chart-dropdown">
            <b-dropdown-item
              v-for="type in chartTimeSpan"
              :key="type.key"
              @click="onClick(type)"
              href="#"
              >{{ $t(type.label) }}</b-dropdown-item
            >
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
import moment from "moment";
export default {
  name: "SpreadTrends",
  props: {
    data: Object,
    timeSpan: Object,
  },
  data: function () {
    return {
      chartTimeSpan: ChartTimeSpan,
      chart: null,
    };
  },
  mounted() {
    let ctx = document.getElementById("spreadTrendsChart").getContext("2d");
    let legend = document.getElementById("spreadTrendsChartLegend");

    this.chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: [],
        datasets: [
          {
            label: "Total positive",
            backgroundColor: "rgba(242, 177, 58, 0.2)",
            borderColor: "rgba(242, 177, 58, 0.7)",
            data: [],
          },
          {
            label: "Deceased",
            backgroundColor: "rgba(240, 132, 99, 0.2)",
            borderColor: "rgb(240, 132, 99)",

            data: [],
          },
          {
            label: "Hospitalized",
            backgroundColor: "rgba(127, 99, 240, 0.2)",
            borderColor: "rgba(127, 99, 240, 0.5)",
            data: [],
          },
          {
            label: "Recovered",
            backgroundColor: "rgba(72, 158, 43, 0.2)",
            borderColor: "rgba(72, 158, 43, 0.5)",

            data: [],
          },
        ],
      },

      // Configuration options go here
      options: {
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              console.log(data.datasets[tooltipItem[0]["datasetIndex"]]);
              return data.datasets[tooltipItem[0]["datasetIndex"]].label;
            },
            label: function (tooltipItem, data) {
              return moment(data["labels"][tooltipItem["index"]]).format("L");
            },
            afterLabel: function (tooltipItem) {
              return Number(tooltipItem.value).toLocaleString();
            },
          },
          backgroundColor: "#FFF",
          titleFontSize: 14,
          titleFontColor: "#000",
          bodyFontColor: "#000",
          bodyFontSize: 12,
          displayColors: false,
        },
        legend: false,
        legendCallback: () => {
          var ul = document.createElement("ul");
          ul.classList.add("legend-list");
          const datasets = this.chart.data.datasets;
          datasets.forEach(function (dataset, index) {
            ul.innerHTML += `
        <li data-index="${index}" class="legend-item cursor-pointer">
            <span class="legend-dot" style="background-color: ${dataset.borderColor}"></span>
            ${dataset.label}
         </li>
      `; // ^ ES6 Template String
          });
          return ul.outerHTML;
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                callback: () => {
                  return "";
                },
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                callback: function (value) {
                  return value && value >= 1000 ? `${value / 1000}K` : value;
                },
              },
            },
          ],
        },
      },
    });

    legend.innerHTML = this.chart.generateLegend();

    var legenTags = document.getElementsByClassName("legend-item");

    for (var i = 0; i < legenTags.length; i++) {
      const legendItem = legenTags[i];
      legendItem.addEventListener(
        "click",
        () => {
          const index = legendItem.dataset["index"];
          legendItem.classList.toggle("hidden");
          this.chart.data.datasets[index].hidden = !this.chart.data.datasets[index]
            .hidden;
          this.chart.update();
        },
        false
      );
    }
  },
  methods: {
    onClick(type) {
      this.$emit("time-span-changed", type);
    },
    onLogToggle(isLog) {
      this.chart.options.scales["yAxes"][0].type = isLog ? "logarithmic" : "linear";
      this.chart.update();
    },
  },
  watch: {
    data: function () {
      this.chart.data.labels = this.data.date;
      this.chart.data.datasets[0].data = this.data.totalePositivi;
      this.chart.data.datasets[1].data = this.data.deceduti;
      this.chart.data.datasets[2].data = this.data.ospedalizzati;
      this.chart.data.datasets[3].data = this.data.dimessiGuariti;
      this.chart.update();
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
/deep/
  .switch
  .custom-control-input:checked
  ~ /deep/
  .switch
  .custom-control-label:before {
  border-color: #32325d;
  background-color: #32325d;
}
</style>
