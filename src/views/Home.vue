<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 mb-5 mt-4 pb-5">
          <div class="row align-items-center">
            <div class="col-lg-7">
              <h1 class="d-flex font-weight-normal mb-0">
                <img class="mr-2" src="../assets/img/virus.png" />
                <div><span class="font-weight-bold">Italy</span> COVID-19 Tracker</div>
              </h1>
              <div class="updateDate">
                {{ updateDate | formatDate }}
                <b-icon
                  icon="info-circle"
                  v-b-popover.hover.top="$t('updateDateInfo')"
                  class="cursor-pointer"
                  variant="#8898aa"
                ></b-icon>
              </div>
            </div>
            <div class="col-lg-5">
              <header-form
                :selectedDate="date"
                :maxDate="updateDate"
                @selected-date="onSelectedDate"
                @clear-field="onSearchClear"
                @select-item="onRegionSelected"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <CardNumber
            :loading="loadingSummary"
            :totalValue="+summary.totale_positivi"
            :icon="'mask'"
            :title="'card.totalCases'"
          />
        </div>
        <div class="col-lg-3">
          <CardNumber
            :loading="loadingSummary"
            :totalValue="+summary.totale_ospedalizzati"
            :icon="'hospital'"
            :title="'card.hospitalized'"
          />
        </div>
        <div class="col-lg-3">
          <CardNumber
            :loading="loadingSummary"
            :totalValue="+summary.dimessi_guariti"
            :icon="'recover'"
            :title="'card.recovered'"
          />
        </div>
        <div class="col-lg-3">
          <CardNumber
            :loading="loadingSummary"
            :totalValue="+summary.deceduti"
            :icon="'lung'"
            :title="'card.deceased'"
          />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-5 mb-3">
                  <b-form-input
                    v-model="provinceSelected"
                    placeholder="Province/City"
                  ></b-form-input>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 mt-2">
                  <div v-if="listaProvince.length == 0">
                    <b-skeleton v-for="(e, i) in 10" height="38px" :key="i"></b-skeleton>
                  </div>
                  <b-table-simple
                    responsive
                    class="provinceTable"
                    v-if="listaProvince.length > 0"
                  >
                    <b-thead>
                      <b-tr>
                        <b-th v-for="f in fields" :key="f.key">{{
                          $t(`table.column.${f.key}`)
                        }}</b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody>
                      <b-tr v-for="item in filterProvince()" :key="item.codice_provincia">
                        <b-td class="font-weight-bold font-sm">{{
                          item.denominazione_provincia | nullFilter
                        }}</b-td>
                        <b-td class="font-weight-light">{{
                          item.sigla_provincia | nullFilter
                        }}</b-td>
                        <b-td class="font-weight-light">{{
                          item.denominazione_regione | nullFilter
                        }}</b-td>
                        <b-td class="font-weight-light" style="width: 110px">{{
                          item.totale_casi | formatNumber | nullFilter
                        }}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <interactive-map :regions="regions"></interactive-map>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-7 mb-4">
          <div class="card d-flex h-100">
            <div class="card-body">
              <div class="row h-100">
                <div class="col-lg-12">
                  <spread-trends
                    @time-span-changed="onTimeSpanChanged"
                    :timeSpan="timeSpan"
                    :data="trendData"
                  ></spread-trends>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-12">
                  <h2 class="mb-3">Top affected regions</h2>
                  <region-list-item
                    :totalePositiviNationale="totalePositiviNationale"
                    v-for="region in regions.slice(0, 4)"
                    :key="region.codice_regione"
                    :region="region"
                  ></region-list-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardNumber from "@/components/CardNumber.vue";
import HeaderForm from "@/components/HeaderForm.vue";
import InteractiveMap from "@/components/InteractiveMap.vue";
import SpreadTrends from "@/components/SpreadTrends.vue";
import RegionListItem from "@/components/RegionListItem.vue";
import { TableColumns, ChartTimeSpan } from "../common/common";
const axios = require("axios");

export default {
  name: "Home",
  metaInfo() {
    return {
      title: this.$t("webappTitle"),
    };
  },
  data: function () {
    return {
      provinceSelected: "",
      regionSelected: {},
      totalePositiviNationale: 0,
      loadingSummary: false,
      date: "",
      calendarOption: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      },
      regions: [],
      trendData: {
        totalePositivi: [],
        ospedalizzati: [],
        dimessiGuariti: [],
        deceduti: [],
        date: [],
      },
      timeSpan: ChartTimeSpan[0],
      summary: {
        totale_positivi: 0,
        totale_ospedalizzati: 0,
        deceduti: 0,
        dimessi_guariti: 0,
        data: "",
      },
      updateDate: "",
      sortBy: "province",
      sortDesc: false,
      fields: TableColumns,
      listaProvince: [],
      listaRegioni: [],
    };
  },
  methods: {
    getInitialData(firstLoad) {
      this.loadingSummary = true;
      axios
        .post(`${process.env.VUE_APP_API_URL}/api/data/national`, {
          date: this.date,
        })
        .then((res) => {
          const resNationalLatest = res.data;
          this.summary = resNationalLatest;
          this.totalePositiviNationale = +resNationalLatest.totale_positivi;
          if (firstLoad) {
            this.updateDate = resNationalLatest.data;
            this.date = this.updateDate;
            this.loadTrendNational();
          }
          this.loadingSummary = false;
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    filterProvince() {
      const search = this.provinceSelected.toLowerCase().trim();
      if (!search) return this.listaProvince;
      return this.listaProvince.filter(
        (c) => c.denominazione_provincia.toLowerCase().indexOf(search) > -1
      );
    },
    onRegionSelected(option) {
      this.regionSelected = option;
      this.loadProvince();
      this.loadRegion();
    },
    onSearchClear(option) {
      this.regionSelected = option; //empty
      this.getInitialData(false);
      this.loadProvince();
    },
    onSelectedDate(date) {
      this.date = date;
      if (this.regionSelected && this.regionSelected.id) {
        this.loadRegion();
      } else {
        this.getInitialData(false);
      }
      this.loadRegions();
      this.loadProvince();
    },
    loadProvince() {
      this.listaProvince = [];
      axios
        .post(`${process.env.VUE_APP_API_URL}/api/data/province`, {
          regionId: this.regionSelected.id,
          date: this.date,
        })
        .then((res) => {
          this.listaProvince = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadRegion() {
      this.loadingSummary = true;
      axios
        .post(`${process.env.VUE_APP_API_URL}/api/data/region`, {
          regionId: this.regionSelected.id,
          date: this.date,
        })
        .then((res) => {
          this.loadingSummary = false;
          this.summary = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadRegions() {
      axios
        .post(`${process.env.VUE_APP_API_URL}/api/data/region/all`, {
          date: this.date,
        })
        .then((res) => {
          this.regions = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadTrendNational() {
      axios
        .post(`${process.env.VUE_APP_API_URL}/api/data/trend/national`, {
          timeSpan: this.timeSpan.days,
          lastUpdateDate: this.updateDate,
        })
        .then((res) => {
          this.trendData = res.data;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onTimeSpanChanged(timeSpan) {
      this.timeSpan = timeSpan;
      this.loadTrendNational();
    },
  },
  mounted() {
    this.getInitialData(true);
    this.loadRegions();
    this.loadProvince();
  },
  components: {
    CardNumber,
    HeaderForm,
    InteractiveMap,
    SpreadTrends,
    RegionListItem,
  },
};
</script>
<style scoped>
.provinceTable {
  height: 400px;
  overflow-y: auto;
}
.updateDate {
  font-size: 12px;
  padding-left: 42px;
}
</style>
