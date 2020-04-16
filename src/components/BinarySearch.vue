<template>
  <v-container>
    <v-btn @click="refreshList()">Refresh</v-btn>
    <BarChart
      :list='list'
      :animationData='barChartAnimationData'
      />
  </v-container>
</template>

<script>
import BarChart from '@/components/BarChart.vue';

export default {
  name: 'BinarySearch',
  components: {
    BarChart
  },
  maxNumber: 100,
  props: {
    title: String
  },
  data: function () {
    return {
      delay: 3000,
      barChartAnimationData: [],
      itemsNumber: Math.floor(Math.random() * this.$options.maxNumber) + 1
    }
  },
  computed: {
    list: function () {
      return Array.from(Array(this.itemsNumber), () =>
        Math.floor(Math.random() * this.$options.maxNumber)
      ).sort((a,b) => a - b)
    }
  },
  methods: {
    refreshList: function() {
      console.log('refresh')
      this.delay = 3000;
      this.barChartAnimationData =  [];
      do {
        var newItemsNumber = Math.floor(Math.random() * this.$options.maxNumber) + 1;
      } while (this.itemsNumber == newItemsNumber)
      this.itemsNumber = newItemsNumber; // triggers the list to recompute
      let rndIdx = Math.floor(Math.random() * this.itemsNumber);
      this.binarySearch(this.list, this.list[rndIdx], 0, this.itemsNumber - 1);
    },

    binarySearch: function (array, val, start, end) {
      console.log('in binary search start ' + start + ', end: ' + end)
      let mid  = Math.floor((start + end) / 2)

      if (val != array[mid]) {
        this.barChartAnimationData.push(
          {idx: start, color: 'highlightYellow', delay: this.delay},
          {idx: end, color: 'highlightYellow', delay: this.delay},
          {idx: mid, color: 'highlightGreen', delay: this.delay})
      } else {
        console.log('in binary search pushing ' + mid)
        this.barChartAnimationData.push({idx: mid, color: 'highlightGreen', delay: this.delay})
      }
      this.delay += 1000;

      if (val < array[mid]) {
        return this.binarySearch(array, val, start, mid - 1)
      } else if (val > array[mid]) {
        return this.binarySearch(array, val, mid + 1, end)
      } else {
        return mid;
      }
    },
  },
  mounted:function () {
    let rndIdx = Math.floor(Math.random() * this.itemsNumber);
    this.binarySearch(this.list, this.list[rndIdx], 0, this.itemsNumber - 1);
  }
}
</script>
<style scoped>
</style>
