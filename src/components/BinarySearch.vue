<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="refreshList()">New Data</v-btn>
        <v-btn
          @click="barChartAnimationData = binarySearch(list, list[searchIdx], 0, listSize - 1)"
          :disabled="!validSearchIdx">
          Search
        </v-btn>
      </v-col>
      <v-col>
        <v-text-field
          v-model="searchIdx"
          placeholder="Search Index"
          :rules="[rules.searchIdx]"
          solo>
        </v-text-field>
      </v-col>
    </v-row>
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
      barChartAnimationData: [],
      searchIdx: null,
      rules: {
        searchIdx: value => (value >= 0 && value < this.listSize) || 'Must be a number between 0 and ' + (this.listSize - 1)
      }
    }
  },
  computed: {
    list () {
      return Array.from(Array(this.listSize), () =>
        this.getRandomListSize()
      ).sort((a,b) => a - b);
    },
    validSearchIdx () {
      return this.searchIdx == "" || this.searchIdx == null ? false : this.searchIdx >= 0 && this.searchIdx < this.listSize;
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
        barChartAnimationData.push([start, mid, end]);
        /*
          {idx: start, color: 'highlightYellow'},
          {idx: mid, color: 'highlightGreen'},
          {idx: end, color: 'highlightYellow'}])
          */

        if (val < arr[mid]) {
          end = mid - 1;
        } else if (val > arr[mid]) {
          start = mid + 1;
        } else {
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
