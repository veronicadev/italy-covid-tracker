<template>
<div>
    <b-form-radio-group id="btn-radios-3" v-model="selected" :options="options" buttons stacked name="radio-btn-stacked"></b-form-radio-group>
</div>
</template>

<script>
export default {
    name: 'MapSwitch',
    data: function () {
        return {
            selected: 'radio1',
            options: [{
                    text: 'Radio 1',
                    value: 'radio1'
                },
                {
                    text: 'Radio 3',
                    value: 'radio2'
                },
                {
                    text: 'Radio 3 (disabled)',
                    value: 'radio3',
                    disabled: true
                },
                {
                    text: 'Radio 4',
                    value: 'radio4'
                }
            ]
        };
    },
    mounted() {}

}
</script>

<style scoped>

</style>
