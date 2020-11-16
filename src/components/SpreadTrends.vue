<template>
<div>
    <div class="d-flex justify-content-between align-items-center">
        <h2>Spread Trends</h2>
        <div class="pl-2 pr-2 d-flex align-items-center">
            <b-form-checkbox switch size="sm">Log</b-form-checkbox>
            <b-dropdown size="sm" :text="$t(timeSpan.label)" class="pl-3 chart-dropdown">
                <b-dropdown-item v-for="type in chartTimeSpan" :key="type.key" @click="onClick(type)" href="#">{{$t(type.label)}}</b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
    <canvas id="spreadTrendsChart"></canvas>
</div>
</template>

<script>
import Chart from 'chart.js';
import {
    ChartTimeSpan
} from '../common/common.js';
export default {
    name: 'SpreadTrends',
    props: {

    },
    data: function () {
        return {
            timeSpan: ChartTimeSpan[0],
            chartTimeSpan: ChartTimeSpan
        };
    },
    mounted() {
        let ctx = document.getElementById("spreadTrendsChart").getContext('2d');
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#ff6c00");
        gradientStroke.addColorStop(1, "#ff3b74");

        var gradientBkgrd = ctx.createLinearGradient(0, 100, 0, 400);
        gradientBkgrd.addColorStop(0, "rgba(244,94,132,0.4)");
        gradientBkgrd.addColorStop(1, "rgba(249,135,94,0.2)");

        let draw = Chart.controllers.line.prototype.draw;
        Chart.controllers.line = Chart.controllers.line.extend({
            draw: function () {
                draw.apply(this, arguments);
                let ctx = this.chart.chart.ctx;
                let _stroke = ctx.stroke;
                ctx.stroke = function () {
                    ctx.save();
                    //ctx.shadowColor = 'rgba(244,94,132,0.8)';
                    ctx.shadowBlur = 8;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 6;
                    _stroke.apply(this, arguments)
                    ctx.restore();
                }
            }
        });

        new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
                datasets: [{
                        label: "Income",
                        backgroundColor: gradientBkgrd,
                        borderColor: gradientStroke,
                        data: [5500, 2500, 10000, 6000, 14000, 1500, 7000, 20000],
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointBackgroundColor: "rgba(255,255,255,0)",
                        pointBorderWidth: 0,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: gradientStroke,
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 4,
                        pointRadius: 1,
                        borderWidth: 3,
                        pointHitRadius: 16,
                    },
                    {
                        label: "Income",
                        backgroundColor: gradientBkgrd,
                        borderColor: gradientStroke,
                        data: [1500, 1895, 3642, 4236, 16690, 8952, 12365, 65923],
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointBackgroundColor: "rgba(255,255,255,0)",
                        pointBorderWidth: 0,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: gradientStroke,
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 4,
                        pointRadius: 1,
                        borderWidth: 3,
                        pointHitRadius: 16,

                    }
                ]
            },

            // Configuration options go here
            options: {
                tooltips: {
                    backgroundColor: '#fff',
                    displayColors: false,
                    titleFontColor: '#000',
                    bodyFontColor: '#000'

                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: false,
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        display: false,
                        gridLines: {
                            display: false
                        }
                    }],
                }
            }
        });
    },
    methods: {
        onClick(type) {
            this.timeSpan = type;
        }
    },

}
</script>

<style scoped>
canvas {
    border-radius: 0.350rem;
}

/deep/ .chart-dropdown button {
    background-color: transparent;
    color: #8898aa;
    font-weight: 300;
    line-height: 26px;
    font-size: 1rem;
    border: 1px solid #ced4da;
    min-width: 130px;
}

/deep/ .chart-dropdown .dropdown-item {
    font-weight: 300;
    color: #212529;
    font-size: 14px;
}
</style>
