<template>
<div id="map" class="map">
</div>
<div class='map-overlay' id='legend'></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
    name: 'InteractiveMap',
    data() {
        return {
            accessToken: "ACCESS_KEY",
            mapDefaultZoom: 4.45
        };
    },
    mounted() {
        let hoveredStateId = 0;
        let legend = document.getElementById("legend");
        mapboxgl.accessToken = this.accessToken;
        let map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/veronicavia/ckh4lugx70p5h19lmucinw700",
            center: [12.230556, 42.000001],
            zoom: this.mapDefaultZoom,
            attributionControl: false
        });

        map.scrollZoom.disable();

        map.on('load', function () {
            var layers = ['0-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+'];
            var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];

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
                    'fill-color': '#a7d1e5',
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        0.7
                    ]
                }
            });

            map.addLayer({
                'id': 'state-borders',
                'type': 'line',
                'source': 'states',
                'layout': {},
                'paint': {
                    'line-color': '#f8f9fe',
                    'line-width': 1.5
                }
            });

            /* for (let i = 0; i < layers.length; i++) {
                 var layer = layers[i];
                 var color = colors[i];
                 var item = document.createElement('div');
                 var key = document.createElement('span');
                 key.className = 'legend-key';
                 key.style.backgroundColor = color;

                 var value = document.createElement('span');
                 value.innerHTML = layer;
                 item.appendChild(key);
                 item.appendChild(value);
                 legend.appendChild(item);
             }*/
        });

        map.on('mousemove', 'state-fills', function (e) {
            map.getCanvas().style.cursor = 'pointer';
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
            map.getCanvas().style.cursor = 'default';
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
