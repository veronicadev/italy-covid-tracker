<template>
<div class="container-map">
    <mappa :nameLayerShown="mapSelect"></mappa>
    <map-switch class="map-switch" @switchChange="onMapSwitchChanged($event)"></map-switch>
</div>
</template>

<script>
import MapSwitch from '@/components/MapSwitch.vue'
import Mappa from '@/components/Mappa.vue'

export default {
    name: 'InteractiveMap',
    props: {},
    data: function () {
        return {
            mapSelect: 'totale_positivi'
        }
    },
    methods: {
        onMapSwitchChanged(element) {
            this.mapSelect = element;
        },
    },
    components: {
        MapSwitch,
        Mappa
    }

}
</script>

<style scoped>
.container-map {
    position: relative;
}

.map-switch {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
