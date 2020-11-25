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
              <div class="updateDate">{{ updateDate | formatDate }}</div>
            </div>
            <div class="col-lg-5">
              <header-form @clear-field="onSearchClear" @select-item="onRegionSelected" />
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <CardNumber :loading="loadingSummary" :totalValue="summary.totale_positivi" :icon="'mask'" :title="'card.totalCases'" />
        </div>
        <div class="col-lg-3">
          <CardNumber :loading="loadingSummary" :totalValue="summary.totale_ospedalizzati" :icon="'hospital'" :title="'card.hospitalized'" />
        </div>
        <div class="col-lg-3">
          <CardNumber :loading="loadingSummary" :totalValue="summary.dimessi_guariti" :icon="'recover'" :title="'card.recovered'" />
        </div>
        <div class="col-lg-3">
          <CardNumber :loading="loadingSummary" :totalValue="summary.deceduti" :icon="'lung'" :title="'card.deceased'" />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-5 mb-3">
                  <b-form-input v-model="provinceSelected" placeholder="Province/City"></b-form-input>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 mt-2">
                  <div v-if="listaProvince.length == 0">
                    <b-skeleton v-for="(e, i) in 10" height="38px" :key="i"></b-skeleton>
                  </div>
                  <b-table-simple responsive class="provinceTable" v-if="listaProvince.length > 0">
                    <b-thead>
                      <b-tr>
                        <b-th v-for="f in fields" :key="f.key">{{ $t(`table.column.${f.key}`) }}</b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody>
                      <b-tr v-for="item in filterProvince()" :key="item.codice_provincia">
                        <b-td class="font-weight-bold font-sm">{{ item.denominazione_provincia | nullFilter }}</b-td>
                        <b-td class="font-weight-light">{{ item.sigla_provincia | nullFilter }}</b-td>
                        <b-td class="font-weight-light">{{ item.denominazione_regione | nullFilter }}</b-td>
                        <b-td class="font-weight-light" style="width: 110px">{{ item.totale_casi | formatNumber | nullFilter }}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <interactive-map></interactive-map>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-12">
                  <region-donut></region-donut>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-12">
                  <spread-trends></spread-trends>
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
import RegionDonut from "@/components/RegionDonut.vue";
import SpreadTrends from "@/components/SpreadTrends.vue";
const axios = require("axios");

export default {
  name: "Home",
  data: function () {
    return {
      provinceSelected: "",
      regionSelected: {},
      loadingSummary: false,
      date: "",
      calendarOption: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      },
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
      fields: [
        {
          key: "denominazione_provincia",
          sortable: false,
        },
        {
          key: "sigla_provincia",
          sortable: true,
        },
        {
          key: "denominazione_regione",
          sortable: true,
        },
        {
          key: "totale_casi",
          sortable: true,
        },
      ],
      listaProvince: [],
      listaRegioni: [],
    };
  },
  methods: {
    getInitialData() {
      this.loadingSummary = true;
      axios
        .get(`${process.env.VUE_APP_API_URL}/api/data/national/latest`)
        .then((res) => {
          const resNationalLatest = res.data;
          console.log(resNationalLatest);
          this.summary = resNationalLatest;
          this.updateDate = resNationalLatest.data;
          this.date = this.updateDate;
          this.loadingSummary = false;
          this.loadProvince();
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    filterProvince() {
      const search = this.provinceSelected.toLowerCase().trim();
      if (!search) return this.listaProvince;
      return this.listaProvince.filter((c) => c.denominazione_provincia.toLowerCase().indexOf(search) > -1);
    },
    onRegionSelected(option) {
      this.regionSelected = option;
      this.loadProvince();
      this.loadRegion();
    },
    onSearchClear(option) {
      this.regionSelected = option; //empty
      this.getInitialData();
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
  },
  mounted() {
    this.getInitialData();
  },
  components: {
    CardNumber,
    HeaderForm,
    InteractiveMap,
    RegionDonut,
    SpreadTrends,
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
