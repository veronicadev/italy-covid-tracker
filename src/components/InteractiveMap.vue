<template>
<div id="map" class="map">
</div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
    name: 'InteractiveMap',
    data() {
        return {
            accessToken: "ACCESS_KEY",
            mapDefaultZoom: 4.55
        };
    },
    mounted() {
        let hoveredStateId = 0;
        mapboxgl.accessToken = this.accessToken;
        let map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/veronicavia/ckh3n0z7g02dg19nxi6vehfgr",
            center: [12.230556, 42.000001],
            zoom: this.mapDefaultZoom,
            attributionControl: false
        });

        map.scrollZoom.disable();

        map.on('load', function () {
            map.addSource('states', {
                'type': 'geojson',
                'data': require("../assets/geomap/italy-regions.json")
            });

            // The feature-state dependent fill-color expression will render the click effect
            // when a feature's click state is set to true.
            map.addLayer({
                'id': 'state-fills',
                'type': 'fill',
                'source': 'states',
                'layout': {},
                'paint': {
                    'fill-color': '#c6e4f3',
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        0.5
                    ]
                }
            });

            map.addLayer({
                'id': 'state-borders',
                'type': 'line',
                'source': 'states',
                'layout': {},
                'paint': {
                    'line-color': '#bdd8e5',
                    'line-width': 1
                }
            });
        });

        map.on('mousemove', 'state-fills', function (e) {
            if (e.features.length > 0) {
                if (hoveredStateId) {
                    map.setFeatureState({
                        source: 'states',
                        id: hoveredStateId
                    }, {
                        hover: false
                    });
                }
                hoveredStateId = e.features[0].id;
                map.setFeatureState({
                    source: 'states',
                    id: hoveredStateId
                }, {
                    hover: true
                });
            }
        });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on('mouseleave', 'state-fills', function () {
            if (hoveredStateId) {
                map.setFeatureState({
                    source: 'states',
                    id: hoveredStateId
                }, {
                    hover: false
                });
            }
            hoveredStateId = null;
        });

    }
}
</script>

<style scoped>
.map {
    border-radius: .375rem;
    overflow: hidden;
    height: 500px;
    outline: none;
}
</style>
