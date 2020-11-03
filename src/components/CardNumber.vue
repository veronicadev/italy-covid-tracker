<template>
<div class="card mb-4">
    <div class="card-body">
        <div class="row">
            <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0">Total traffic</h5>
                <span class="h2 font-weight-bold mb-0">350,897</span>
            </div>
            <div class="col-auto">
                <div class="icon icon-shape text-white rounded-circle shadow bg-gradient-red">
                    <i class="ni ni-active-40"></i>
                </div>
            </div>
        </div>
        <p class="mt-3 mb-0 text-sm">
            <span class="text-success mr-2">3.48%</span>
            <span class="text-nowrap font-weight-light">Since last month</span>
        </p>
    </div>
</div>
</template>

<script>
export default {
    name: 'CardNumber',
    props: {
        msg: String
    }
}
</script>

<style scoped>
.card {
    border-radius: .375rem;
    box-shadow: 0 2px 3px 0 #e9edf1;
    border: none;
}

.card-body {
    padding: 1rem 1.5rem;
}
</style>
