<script>
import {
    Radar
} from 'vue-chartjs'
export default {
    name: 'RecoveryChart',
    extends: Radar,
    props: {

    },
    data: function () {
        return {
            options: {},
            data: {
                labels: ["STA", "STR", "AGI", "VIT", "CHA", "INT"],
                datasets: [{
                    label: "Donté Panlin",
                    data: [25, 59, 90, 81, 60, 82],
                    fill: true,
                    backgroundColor: "#000",
                    borderColor: 'transparent',
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    pointHoverBackgroundColor: "transparent",
                    pointHoverBorderColor: "transparent",
                    pointHitRadius: 50,
                }, {
                    label: "Mireska Sunbreeze",
                    data: [40, 100, 40, 90, 40, 90],
                    fill: true,
                    backgroundColor: "#56920",
                    borderColor: "transparent",
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    pointHoverBackgroundColor: "transparent",
                    pointHoverBorderColor: "transparent",
                    pointHitRadius: 50,
                }]
            }
        };
    },
    mounted() {
        this.renderChart(this.data, this.options)
    }

}
</script>

<style scoped>

</style>
