<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="itemsPerPage"
    class="elevation-1"
    :loading="loading"
    :footer-props="{ showFirstLastPage: true }"
  />
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    itemsPerPage: {
      type: Number,
      default: 5
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
