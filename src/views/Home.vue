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
                    </div>
                    <div class="col-lg-5">
                        <header-form />
                    </div>
                </div>

            </div>
            <div class="col-lg-3">
                <CardNumber :totalValue="35052" :icon="'mask'" :title="'card.totalCases'" />
            </div>
            <div class="col-lg-3">
                <CardNumber :totalValue="82635" :icon="'hospital'" :title="'card.hospitalized'" />
            </div>
            <div class="col-lg-3">
                <CardNumber :totalValue="78945" :icon="'recover'" :title="'card.recovered'" />
            </div>
            <div class="col-lg-3">
                <CardNumber :totalValue="1243" :icon="'lung'" :title="'card.deceased'" />
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-5 mb-3">
                                <b-form-input v-model="selected" placeholder="Province/City"></b-form-input>
                            </div>
                            <div class="col-lg-5 mb-3">
                                <b-form-datepicker :date-format-options="calendarOption" :locale="$i18n.locale" :value-as-date="true" :hide-header="true" id="datepicker" v-model="date"></b-form-datepicker>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 mt-2">
                                <b-table-simple responsive>
                                    <b-thead>
                                        <b-tr>
                                            <b-th v-for="f in fields" :key="f.key">{{f.key}}</b-th>
                                        </b-tr>
                                    </b-thead>
                                    <b-tbody>
                                        <b-tr v-for="item in items" :key="item.province">
                                            <b-td class="font-weight-bold font-sm">{{item.province}}</b-td>
                                            <b-td class="font-weight-light">{{item.total | formatNumber}}</b-td>
                                            <b-td class="font-weight-light">{{item.hospitalized | formatNumber}}</b-td>
                                            <b-td class="font-weight-light">{{item.recovered | formatNumber}}</b-td>
                                            <b-td class="font-weight-light">{{item.deceased | formatNumber}}</b-td>
                                        </b-tr>
                                    </b-tbody>
                                </b-table-simple>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <interactive-map :nameLayerShown="mapSelect"></interactive-map>
                <map-switch @switchChange="onMapSwitchChanged($event)"></map-switch>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <recovery-chart></recovery-chart>
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
import CardNumber from '@/components/CardNumber.vue'
import HeaderForm from '@/components/HeaderForm.vue'
import InteractiveMap from '@/components/InteractiveMap.vue'
import RecoveryChart from '@/components/RecoveryChart.vue'
import MapSwitch from '@/components/MapSwitch.vue'

export default {
    name: 'Home',
    data: function () {
        return {
            selected: "Turin",
            mapSelect: 'totale_positivi',
            date: new Date(),
            calendarOption: {
                'year': 'numeric',
                'month': 'numeric',
                'day': 'numeric'
            },
            sortBy: 'province',
            sortDesc: false,
            fields: [{
                    key: 'province',
                    sortable: false
                },
                {
                    key: 'total',
                    sortable: true
                },
                {
                    key: 'hospitalized',
                    sortable: true
                },
                {
                    key: 'recovered',
                    sortable: true
                },
                {
                    key: 'deceased',
                    sortable: true
                }
            ],

            items: [{
                    province: "Milan",
                    total: 15359,
                    hospitalized: 2879,
                    recovered: 150,
                    deceased: 450
                },
                {
                    province: "Turin",
                    total: 4587,
                    hospitalized: 632,
                    recovered: 236,
                    deceased: 100
                },
                {
                    province: "Rome",
                    total: 26301,
                    hospitalized: 7941,
                    recovered: 6251,
                    deceased: 30
                },
                {
                    province: "Venice",
                    total: 4587,
                    hospitalized: 632,
                    recovered: 236,
                    deceased: 100
                },
                {
                    province: "Florence",
                    total: 4587,
                    hospitalized: 632,
                    recovered: 236,
                    deceased: 100
                },
                {
                    province: "Bologna",
                    total: 4587,
                    hospitalized: 632,
                    recovered: 236,
                    deceased: 100
                },
                {
                    province: "Asti",
                    total: 4587,
                    hospitalized: 632,
                    recovered: 236,
                    deceased: 100
                },
                {
                    province: "Parma",
                    total: 4587,
                    hospitalized: 632,
                    recovered: 236,
                    deceased: 100
                },
            ]
        }
    },
    filters: {
        formatNumber: function (value) {
            if (!value) return ''
            return value.toLocaleString();
        }
    },
    methods: {
        onMapSwitchChanged(element) {
            this.mapSelect = element;
        }
    },
    components: {
        CardNumber,
        HeaderForm,
        InteractiveMap,
        RecoveryChart,
        MapSwitch
    }
}
</script>
