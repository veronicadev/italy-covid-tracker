<template>
  <div>
    <canvas :id="chartId"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
export default {
  name: "RegionDonut",
  props: {
    chartId: String,
    data: Array,
  },
  data: function () {
    return {
      chart: null,
    };
  },
  mounted() {
    var config = {
      type: "doughnut",
      data: {
        labels: ["totale_positivi_nazionale", "totale_positivi"],
        datasets: [
          {
            data: this.data,
            backgroundColor: ["#dee2e6", "#1775BE"],
          },
        ],
      },
      options: {
        cutoutPercentage: 80,
        aspectRatio: 1,
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    };

    const ctx = document.getElementById(this.chartId);
    this.chart = new Chart(ctx, config);
  },
  watch: {
    data: function () {
      this.chart.data.datasets[0].data = this.data;
      this.chart.update();
    },
  },
};
</script>

<style scoped></style>
