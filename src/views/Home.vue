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
                        <Autocomplete />
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
        <div class="row mt-2 mb-3">
            <div class="col-lg-12">
                <div class="card padding-0">
                    <div class="card-body">

                        <div class="row">
                            <div class="col-lg-6">
                                <interactive-map></interactive-map>
                            </div>
                            <div class="col-lg-6">

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
import Autocomplete from '@/components/Autocomplete.vue'
import InteractiveMap from '@/components/InteractiveMap.vue'

export default {
    name: 'Home',
    components: {
        CardNumber,
        Autocomplete,
        InteractiveMap
    }
}
</script>
