<template>
<div id="map" class="map">
</div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
    name: 'InteractiveMap',
    props: {
        nameLayerShown: String
    },
    data() {
        return {
            accessToken: "ACCESS_KEY",
            mapDefaultZoom: 4.45,
            map: null
        };
    },
    mounted() {
        let hoveredStateId = 0;
        let that = this;
        mapboxgl.accessToken = this.accessToken;
        this.map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/veronicavia/ckh7xc1gz0uux19od7j5b3x9c",
            center: [12.230556, 42.000001],
            zoom: this.mapDefaultZoom,
            attributionControl: false
        });

        this.map.scrollZoom.disable();

        this.map.on('load', function () {
            that.map.addSource('states', {
                'type': 'geojson',
                'data': require("../assets/geomap/italy-regions.json")
            });

            // The feature-state dependent fill-color expression will render the click effect
            // when a feature's click state is set to true.
            that.map.addLayer({
                'id': 'state-fills',
                'type': 'fill',
                'source': 'states',
                'layout': {},
                'paint': {
                    'fill-color': '#fff',
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        0.6,
                        0
                    ]
                }
            });

            that.map.addLayer({
                'id': 'state-borders',
                'type': 'line',
                'source': 'states',
                'layout': {},
                'paint': {
                    'line-color': '#f8f9fe',
                    'line-width': 1.5
                }
            });
        });

        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        this.map.on('mousemove', 'state-fills', function (e) {
            that.map.getCanvas().style.cursor = 'pointer';
            if (e.features.length > 0) {
                if (hoveredStateId) {
                    that.map.setFeatureState({
                        source: 'states',
                        id: hoveredStateId
                    }, {
                        hover: false
                    });
                    const prop = e.features[0].properties;
                    const popupHTML = `<strong>${prop.name}</strong>
                                        <br/>
                                        ${prop.totale_positivi.toLocaleString()}`
                    popup.setLngLat(e.lngLat).setHTML(popupHTML).addTo(that.map);
                }
                hoveredStateId = e.features[0].id;
                that.map.setFeatureState({
                    source: 'states',
                    id: hoveredStateId
                }, {
                    hover: true
                });
            }
        });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        this.map.on('mouseleave', 'state-fills', function () {
            that.map.getCanvas().style.cursor = 'default';
            if (hoveredStateId) {
                that.map.setFeatureState({
                    source: 'states',
                    id: hoveredStateId
                }, {
                    hover: false
                });
            }
            hoveredStateId = null;
            popup.remove();
        });

    },
    watch: {
        nameLayerShown: function (newLayer, oldLayer) { // watch it
            console.log(newLayer, oldLayer)
        }
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
