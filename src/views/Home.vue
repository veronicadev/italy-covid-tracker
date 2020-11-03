<template>
<div class="home">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 mb-5 mt-4">
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
                <CardNumber />
            </div>
            <div class="col-lg-3">
                <CardNumber />
            </div>
            <div class="col-lg-3">
                <CardNumber />
            </div>
            <div class="col-lg-3">
                <CardNumber />
            </div>
        </div>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import CardNumber from '@/components/CardNumber.vue'
import Autocomplete from '@/components/Autocomplete.vue'

export default {
    name: 'Home',
    components: {
        CardNumber,
        Autocomplete
    }
}
</script>
