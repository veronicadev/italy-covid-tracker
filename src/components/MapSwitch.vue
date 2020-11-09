<template>
<div>
    <b-form-radio-group id="btn-radios-3" plain v-model="selected" @change="onSwitchChange" :options="options" buttons name="radio-btn-stacked"></b-form-radio-group>
</div>
</template>

<script>
export default {
    name: 'MapSwitch',
    data: function () {
        return {
            selected: 'totale_positivi',
            options: [{
                    text: 'Total',
                    value: 'totale_positivi'
                },
                {
                    text: 'Recovered',
                    value: 'dimessi_guariti'
                },
                {
                    text: 'Deceased',
                    value: 'deceduti'
                }
            ]
        };
    },
    mounted() {},
    methods: {
        onSwitchChange(checked) {
            console.log("EMITTING switchChange", checked);
            this.$emit("switchChange", checked);
        }
    },

}
</script>

<style scoped>
.btn-group-toggle {
    border-radius: 0.375rem;
    padding: 6px 0px;
    border: 1px solid #ced4da;
    position: relative;
}

/deep/ .btn-group-toggle .btn {
    position: relative;
    flex: 1 1 auto;
    background-color: transparent;
    border: none;
    color: #8898aa;
    padding: 5px 6px;
    border-radius: 0.375rem !important;
    font-weight: 300;
    min-width: 82px;
    margin: 0 8px;
    line-height: 26px;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/deep/ .btn-secondary:not(:disabled):not(.disabled):active,
/deep/ .btn-secondary:not(:disabled):not(.disabled).active,
/deep/ .show>.btn-secondary.dropdown-toggle {
    color: #fff;
    background-color: #32325d;
    border-color: #32325d;
    box-shadow: none;
    box-shadow: 0 8px 20px rgba(0, 0, 0, .2);
    font-weight: 500;
}
</style>
