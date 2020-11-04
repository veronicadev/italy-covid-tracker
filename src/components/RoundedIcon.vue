<template>
<div class="rounded-icon">
    <img :src="iconPath">
</div>
</template>

<script>
export default {
    name: 'RoundedIcon',
    props: {
        name: String,
    },
    computed: {
        iconPath: function () {
            return require(`../assets/icons/${this.name}.svg`);
        }
    }
}
</script>

<style scoped>
img {
    width: 30px;
    height: 30px;
    display: inline-block;
}

.rounded-icon {
    width: 50px;
    height: 50px;
    display: inline-block;
    line-height: 50px;
    text-align: center;
    border-radius: 25px;
    background-color: #fff;
    box-shadow: 0 10px 28px rgba(0, 0, 0, .15);

}
</style>
