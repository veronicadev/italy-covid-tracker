<template>
<div>
    <h2>Spread Trends</h2>
    <canvas id="chart"></canvas>
</div>
</template>

<script>
import Chart from 'chart.js';
export default {
    name: 'RegionDonut',
    props: {

    },
    data: function () {
        return {};
    },
    mounted() {

        //this.renderChart(this.data, this.options)
        var canvas = document.getElementById('chart').getContext('2d');
        var gradientBlue = canvas.createLinearGradient(0, 0, 0, 150);
        gradientBlue.addColorStop(0, '#5555FF');
        gradientBlue.addColorStop(1, '#9787FF');

        var gradientRed = canvas.createLinearGradient(0, 0, 0, 150);
        gradientRed.addColorStop(0, '#FF55B8');
        gradientRed.addColorStop(1, '#FF8787');

        var gradientGrey = canvas.createLinearGradient(0, 0, 0, 150);
        gradientGrey.addColorStop(0, '#888888');
        gradientGrey.addColorStop(1, '#AAAAAA');

        Chart.elements.Arc.prototype.draw = function () {
            var ctx = this._chart.ctx;
            var vm = this._view;
            var sA = vm.startAngle;
            var eA = vm.endAngle;

            ctx.beginPath();
            ctx.arc(vm.x, vm.y, vm.outerRadius, sA + 0.15, eA - 0.15);
            ctx.strokeStyle = vm.backgroundColor;
            ctx.lineWidth = vm.borderWidth;
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.closePath();
        };

        var config = {
            type: 'doughnut',
            data: {
                labels: ['Pink', 'Grey', 'Blue'],
                datasets: [{
                    data: [400, 540, 290],
                    backgroundColor: [
                        gradientRed,
                        gradientGrey,
                        gradientBlue,
                    ],
                }]
            },
            options: {
                cutoutPercentage: 85,
                elements: {
                    arc: {
                        borderWidth: 8
                    },
                },
                legend: {
                    display: false,
                }
            },
        };

        const ctx = document.getElementById('chart');
        const myChart = new Chart(ctx, config);
        console.log(myChart)

    }

}
</script>

<style scoped>

</style>
