<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      top
    >
      something went wrong!!

      <template #action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <div class="d-flex justify-space-between my-5">
      <v-btn-toggle
        v-model="range"
        color="primary"
        mandatory
        @change="fetch"
      >
        <v-btn v-for="(r, index) in ranges" :key="`range-${index}`" :value="r">
          {{ r }}
        </v-btn>
      </v-btn-toggle>
      <v-btn-toggle
        v-model="displayType"
        color="secondary"
        mandatory
      >
        <v-btn value="TABLE">
          <v-icon>mdi-table</v-icon>
        </v-btn>
        <v-btn value="CHART">
          <v-icon>mdi-chart-box-outline</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>

    <DataTable v-if="displayType === 'TABLE'" :headers="headers" :items="items" :items-per-page="10" :loading="loading" />
    <client-only>
      <LineChart v-if="displayType === 'CHART' && data.length > 0" :data="barChartData" :options="barChartOptions" :height="200" />
    </client-only>
  </div>
</template>

<script>
export default {
  data: () => ({
    range: '1D',
    ranges: ['1D', '1W', '1M', '1Y'],
    displayType: 'TABLE',
    snackbar: false,
    loading: false,
    headers: [
      { text: 'อันดับของกองทุน', align: 'left', value: 'rating', width: '15%' },
      { text: 'ชื่อกองทุน', align: 'left', value: 'name', sortable: false, width: '30%' },
      { text: 'ราคา', align: 'left', value: 'price', width: '15%' },
      { text: 'ผลตอบแทน', align: 'left', value: 'reward', width: '15%' },
      { text: 'เวลาที่ข้อมูลถูกอัพเดต', align: 'left', sortable: false, value: 'updatedAt', width: '25%' }
    ],
    items: [],
    labels: [],
    data: [],
    max: 1
  }),
  computed: {
    barChartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'ผลตอบแทน',
            data: this.data,
            backgroundColor: 'rgba(20, 192, 109, 0.3)',
            borderColor: 'rgba(100, 192, 109, 1)',
            borderWidth: 2
          }
        ]
      }
    },
    barChartOptions () {
      return {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'ผลตอบแทน',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: this.max,
                min: 0,
                stepSize: 1,
                display: false
              },
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      this.loading = true
      this.$axios.get(`/api/fund-rankings?range=${this.range}`)
        .then((res) => {
          this.items = res.data.map((d, index) => ({
            rating: index + 1,
            name: d.thailand_fund_code,
            price: d.nav,
            reward: d.nav_return,
            updatedAt: this.$dayjs(d.nav_date).format('DD/MM/YYYY'),
            updatedUnixTime: this.$dayjs(d.nav_date).unix()
          }))
          const sortItems = this.items.sort((a, b) => a.updatedUnixTime - b.updatedUnixTime)
          this.data = sortItems.map(i => i.reward)
          this.max = Math.floor(Math.max(...this.data)) + 1
          this.labels = sortItems.map(i => i.price)
        })
        .catch((err) => {
          this.snackbar = true
          console.error(err)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
