<template>
<div class="autocomplete-search">
    <b-form-input v-model="text" size="lg" placeholder="Choose region"></b-form-input>
    <div class="icon">
        <b-icon icon="search" variant="#8898aa"></b-icon>
    </div>
</div>
</template>

<script>
export default {
    name: 'Autocomplete',
    props: {
        text: String
    }
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

.autocomplete-search .form-control {
    padding-left: 50px;
    height: calc(1.8em + 1rem + 2px);
    font-weight: 400;
    border: none;
    box-shadow: 0 10px 35px rgba(0, 0, 0, .1);
}
</style>
