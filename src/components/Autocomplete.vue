<template>
<div class="autocomplete-search">
    <b-form-input v-model="text" size="lg" placeholder="Choose region"></b-form-input>
    <div class="icon">
        <b-icon icon="search" variant="#8898aa"></b-icon>
    </div>
    <b-icon @click="onCalendarClick()" class="h1 calendar-icon" icon="calendar-week"></b-icon>
    <b-calendar class="calendar" v-model="value" :hidden="!showCalendar"></b-calendar>

</div>
</template>

<script>
export default {
    name: 'Autocomplete',
    props: {
        text: String
    },
    data() {
        return {
            showCalendar: false,
            value: ''
        };
    },
    methods: {
        onCalendarClick: function () {
            this.showCalendar = !this.showCalendar;
        }

    },
}
</script>

<style scoped>
.autocomplete-search {
    position: relative;
}

.icon {
    position: absolute;
    top: 16px;
    left: 16px;
}

.icon svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: #8898aa;
}

.autocomplete-search {
    box-shadow: 0 10px 35px rgba(0, 0, 0, .1);
    border-radius: 0.375rem;
    background-color: #fff;
    display: flex;
    align-items: center;
}

.calendar-icon {
    padding: 3px 15px;
    box-sizing: content-box;
    border-left: 1px solid #8898aa;
    margin-bottom: 0px;
    fill: #32325d;
    cursor: pointer;
}

.autocomplete-search .form-control {
    padding-left: 50px;
    height: calc(1.8em + 1rem + 2px);
    font-weight: 400;
    border: none;
    box-shadow: none;
}

.calendar {
    position: absolute;
    top: 60px;
    right: 0;
    z-index: 1;
    box-shadow: 0 2px 3px 0 #e9edf1;
}
</style>
