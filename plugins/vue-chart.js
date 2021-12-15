import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'

Vue.component('LineChart', {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['data', 'options', 'chartData'],
  watch: {
    data (val) {
      this.renderChart(val, this.options)
    },
    options (val) {
      this.renderChart(this.data, val)
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
})
