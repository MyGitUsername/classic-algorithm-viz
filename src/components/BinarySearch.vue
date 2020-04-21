<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="refreshList(true)">New Data</v-btn>
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
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-row>
    <BarChartVisualization
      :list='list'
      :highlightArr='barChartAnimationData'
      />
  </v-container>
</template>

<script>
import BarChartVisualization from '@/components/BarChartVisualization.vue';
import listGenerator from '@/mixins/listGenerator.js';

export default {
  name: 'BinarySearch',
  components: {
    BarChartVisualization
  },
  mixins: [listGenerator],
  data () {
    return {
      barChartAnimationData: [],
      searchIdx: null,
      rules: {
        searchIdx: value => (value >= 0 && value < this.listSize) || 'Must be a number between 0 and ' + (this.listSize - 1)
      }
    }
  },
  computed: {
    validSearchIdx () {
      return this.searchIdx == "" || this.searchIdx == null ? false : this.searchIdx >= 0 && this.searchIdx < this.listSize;
    }
  },
  methods: {
    binarySearch: function (arr, val, start, end) {
      let barChartAnimationData = [];

      while (start <=end) {
        let mid  = Math.floor((start + end) / 2)
        barChartAnimationData.push({start: start, mid: mid, end: end});

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
    this.refreshList(true);
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
