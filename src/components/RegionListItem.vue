<template>
  <div class="region-container mt-2">
    <div class="row align-items-center justify-content-center">
      <div class="col-lg-2 pr-0 col-4">
        <div class="donut-wrap">
          <div class="donut-percentage">
            <span>{{ percentuale }}</span>
            <span class="symbol">%</span>
          </div>
          <region-donut :data="donutData" :chartId="region.codice_regione"></region-donut>
        </div>
        <!--img class="region-icon" :src="imgPath" /-->
      </div>
      <div class="col-lg-10 pl-4">
        <h5 class="mb-2">{{ region.denominazione_regione }}</h5>
        <div class="row">
          <div class="col-lg-4 col-4">
            <div class="subtitle text-uppercase text-muted mb-0">Total cases</div>
            <span class="region-number">{{ region.totale_positivi | formatNumber }}</span>
          </div>
          <div class="col-lg-4 col-4">
            <div class="subtitle text-uppercase text-muted mb-0">Recovered</div>
            <span class="region-number">{{ region.dimessi_guariti | formatNumber }}</span>
          </div>
          <div class="col-lg-4 col-4">
            <div class="subtitle text-uppercase text-muted mb-0">Deceaded</div>
            <span class="region-number">{{ region.deceduti | formatNumber }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegionDonut from "@/components/RegionDonut.vue";

export default {
  name: "RegionListItem",
  props: {
    region: Object,
    totalePositiviNationale: Number,
  },
  data() {
    return {
      donutData: Array,
      percentuale: Number,
    };
  },
  computed: {
    imgPath: function () {
      return require(`../assets/img/regione/18.png`);
    },
  },
  mounted() {
    this.percentualeTotalePositivi();
  },
  methods: {
    percentualeTotalePositivi() {
      if (this.region && this.totalePositiviNationale) {
        this.percentuale = Math.round((this.region.totale_positivi / this.totalePositiviNationale) * 100) || 0;
        this.donutData = [];
        this.donutData.push(Number(this.totalePositiviNationale) - Number(this.region.totale_positivi));
        this.donutData.push(Number(this.region.totale_positivi));
      }
    },
  },
  watch: {
    region() {
      this.percentualeTotalePositivi();
    },
    totalePositiviNationale() {
      this.percentualeTotalePositivi();
    },
  },
  components: {
    RegionDonut,
  },
};
</script>

<style scoped>
.region-icon {
  width: 25px;
}
.region-container {
  border: 2px dotted #dee2e6;
  border-radius: 0.375rem;
  padding: 10px;
}
.subtitle {
  color: #8898aa;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.region-info {
}
.region-info .col-lg-4 {
}
.region-number {
  font-size: 0.75rem;
  color: #32325d;
  font-weight: 500;
}
.donut-wrap {
  position: relative;
}
.donut-percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: 500;
}

.symbol {
  font-size: 11px;
}
</style>
