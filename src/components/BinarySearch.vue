<template>
  <v-container>
    <v-btn @click="refreshList()">New Data</v-btn>
    <v-btn @click="barChartAnimationData = binarySearch(list, list[3], 0, listSize - 1)">Search</v-btn>
    <BarChartVisualization
      :list='list'
      :highlightBars='barChartAnimationData'
      />
  </v-container>
</template>

<script>
import BarChartVisualization from '@/components/BarChartVisualization.vue';

export default {
  name: 'BinarySearch',
  components: {
    BarChartVisualization
  },
  maxListSize: 25,
  props: {
    title: String
  },
  data () {
    return {
      listSize: 0,
      barChartAnimationData: []
    }
  },
  computed: {
    list () {
      return Array.from(Array(this.listSize), () =>
        this.getRandomListSize()
      ).sort((a,b) => a - b);
    }
  },
  methods: {
    /* Return an integer in the range of [0, maxListSize]
     * not equal to current listSize
     */
    getRandomListSize () {
      do {
        var randomListSize = Math.floor(Math.random() * this.$options.maxListSize) + 1;
      } while (this.listSize === randomListSize)
      return randomListSize;
    },
    refreshList () {
      this.listSize = this.getRandomListSize();
    },
    binarySearch: function (arr, val, start, end) {
      let barChartAnimationData = [];

      while (start <=end) {
        let mid  = Math.floor((start + end) / 2)
        if (val < arr[mid]) {
          barChartAnimationData.push([
            {idx: start, color: 'highlightYellow'},
            {idx: end, color: 'highlightYellow'},
            {idx: mid, color: 'highlightGreen'}])
          end = mid - 1;
        } else if (val > arr[mid]) {
          barChartAnimationData.push([
            {idx: start, color: 'highlightYellow'},
            {idx: end, color: 'highlightYellow'},
            {idx: mid, color: 'highlightGreen'}])
          start = mid + 1;
        } else {
          barChartAnimationData.push([{idx: mid, color: 'highlightGreen'}])
          return barChartAnimationData;
        }
      }
    },
  },
  mounted:function () {
    this.refreshList();
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
