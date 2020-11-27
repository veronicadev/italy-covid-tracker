<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="row">
        <div class="col">
          <h5 class="card-title text-uppercase text-muted mb-0">{{ $t(title) }}</h5>
          <span class="card-number font-weight-bold mb-0" v-if="!loading">{{ totalValue | formatNumber }}</span>
          <b-skeleton class="mt-2" v-if="loading" height="30px"></b-skeleton>
          <div class="card-icon">
            <rounded-icon v-if="icon" :name="icon" />
          </div>
        </div>
      </div>
      <!--p class="mt-3 mb-0 text-sm">
        <span class="text-success mr-2">3.48%</span>
        <span class="text-nowrap font-weight-light">Since yesterday</span>
      </!--p-->
    </div>
  </div>
</template>

<script>
import RoundedIcon from "@/components/RoundedIcon.vue";

export default {
  name: "CardNumber",
  props: {
    totalValue: Number,
    title: String,
    icon: String,
    loading: Boolean,
  },
  components: {
    RoundedIcon,
  },
};
</script>

<style scoped>
.card-icon {
  position: absolute;
  top: -38px;
  right: 20px;
}

.card-number {
  font-size: 1.75rem;
}
</style>
