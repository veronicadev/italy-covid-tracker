<template>
  <div id="map" class="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
  name: "Mappa",
  props: {
    nameLayerShown: String,
    regions: Array,
  },
  data() {
    return {
      regionsMap: {},
      mapDefaultZoom: 4.35,
      map: null,
    };
  },
  mounted() {
    let hoveredStateId = 0;
    let that = this;
    mapboxgl.accessToken = process.env.VUE_APP_MAP_TOKEN;
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/veronicavia/ckh7xc1gz0uux19od7j5b3x9c",
      center: [13.156892, 41.370085],
      zoom: this.mapDefaultZoom,
      attributionControl: false,
      dragPan: false,
    });

    this.map.scrollZoom.disable();

    this.map.on("load", function () {
      that.map.addSource("states", {
        type: "geojson",
        data: require("../assets/geomap/italy-regions.json"),
      });

      that.map.addLayer({
        id: "dimessi_guariti",
        type: "fill",
        source: "states",
        layout: {
          visibility: "none",
        },
        paint: {
          "fill-opacity": 0.8,
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "dimessi_guariti"],
            0,
            ["to-color", "#91c385"],
            4500,
            ["to-color", "#5a9e4a"],
            70000,
            ["to-color", "#006d2c"],
          ],
        },
      });

      that.map.addLayer({
        id: "deceduti",
        type: "fill",
        source: "states",
        layout: {
          visibility: "none",
        },
        paint: {
          "fill-opacity": 1,
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "deceduti"],
            0,
            ["to-color", "#c38a8a"],
            4500,
            ["to-color", "#a53535"],
            70000,
            ["to-color", "#800303"],
          ],
        },
      });

      that.map.addLayer({
        id: "totale_positivi",
        type: "fill",
        source: "states",
        layout: {
          visibility: "visible",
        },
        paint: {
          "fill-opacity": 1,
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "totale_positivi"],
            0,
            ["to-color", "#e2cb00"],
            5000,
            ["to-color", "#eca10b"],
            10000,
            ["to-color", "#dc5109"],
            80000,
            ["to-color", "#9a0606"],
          ],
        },
      });

      that.map.addLayer({
        id: "state-fills",
        type: "fill",
        source: "states",
        layout: {},
        paint: {
          "fill-color": "#fff",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.4,
            0,
          ],
        },
      });

      that.map.addLayer({
        id: "state-borders",
        type: "line",
        source: "states",
        layout: {},
        paint: {
          "line-color": "#f8f9fe",
          "line-width": 1.5,
        },
      });
    });

    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    this.map.on("mousemove", "state-fills", function (e) {
      that.map.getCanvas().style.cursor = "pointer";
      if (e.features.length > 0) {
        if (hoveredStateId) {
          that.map.setFeatureState(
            {
              source: "states",
              id: hoveredStateId,
            },
            {
              hover: false,
            }
          );
          const prop = e.features[0].properties;
          //const labelKey = `map.popup.${that.nameLayerShown}`;
          const popupHTML = `<strong class="popup-title">${prop.name}</strong>
                            <br/>
                            ${prop[that.nameLayerShown].toLocaleString()}`;
          popup.setLngLat(e.lngLat).setHTML(popupHTML).addTo(that.map);
        }
        hoveredStateId = e.features[0].id;
        that.map.setFeatureState(
          {
            source: "states",
            id: hoveredStateId,
          },
          {
            hover: true,
          }
        );
      }
    });

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    this.map.on("mouseleave", "state-fills", function () {
      that.map.getCanvas().style.cursor = "default";
      if (hoveredStateId) {
        that.map.setFeatureState(
          {
            source: "states",
            id: hoveredStateId,
          },
          {
            hover: false,
          }
        );
      }
      hoveredStateId = null;
      popup.remove();
    });
  },
  watch: {
    nameLayerShown: function (newLayer, oldLayer) {
      // watch it
      this.map.setLayoutProperty(newLayer, "visibility", "visible");
      if (oldLayer) {
        this.map.setLayoutProperty(oldLayer, "visibility", "none");
      } else {
        this.map.setLayoutProperty(this.nameLayerShown, "visibility", "none");
      }
    },
    regions: function () {
      this.regions.forEach((el) => {
        this.regionsMap[+el.codice_regione] = el;
      });
      let regObj = require("../assets/geomap/italy-regions.json");
      regObj.features.forEach((el, index) => {
        regObj.features[index].properties.totale_positivi = +this.regionsMap[el.id]
          .totale_positivi;
        regObj.features[index].properties.dimessi_guariti = +this.regionsMap[el.id]
          .dimessi_guariti;
        regObj.features[index].properties.deceduti = +this.regionsMap[el.id].deceduti;
      });
      if (this.map && this.map.getSource("states")) {
        this.map.getSource("states").setData(regObj);
      }
    },
  },
};
</script>

<style scoped>
.map {
  border-radius: 0.375rem;
  overflow: hidden;
  height: 500px;
  outline: none;
}
</style>
