<template>
  <v-container class="d-flex flex-column justify-start">
    <v-row class="flex-shrink-1 flex-grow-0">
      <v-col>
        <v-btn @click="refreshData()">New Data</v-btn>
      </v-col>
      <v-col>
        <v-btn
          @click="barChartAnimationData = binarySearch(list, searchVal, 0, listSize - 1)"
          :disabled="!isValidSearchVal"
          v-show="barChartAnimationData.length === 0"
          >
          Search
        </v-btn>
        <TimelineControlButtons v-show="barChartAnimationData.length !== 0"/>
      </v-col>
      <v-col>
        <v-text-field
          v-model="searchVal"
          placeholder="Search Value"
          :rules="[rules.searchVal]"
          :disabled="barChartAnimationData.length !== 0"
          solo>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row class="flex-grow-1">
    <v-col class="d-flex">
      <BarChartVisualization
        :list='list'
        :highlightArr='barChartAnimationData'
        />
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BarChartVisualization from '@/components/BarChartVisualization.vue';
import listGenerator from '@/mixins/listGenerator.js';
import TimelineControlButtons from '@/components/TimelineControlButtons.vue';

export default {
  name: 'BinarySearch',
  components: {
    BarChartVisualization,
    TimelineControlButtons
  },
  mixins: [listGenerator],
  data () {
    return {
      barChartAnimationData: [],
      searchVal: null,
      rules: {
        searchVal: () => this.isValidSearchVal || "Must be a value in the list"
      }
    }
  },
  computed: {
    isValidSearchVal () {
      const isEmpty = this.searchVal == "" || this.searchVal == null,
        inRange = this.list.includes(Number.parseInt(this.searchVal))
      return !isEmpty && inRange;
    }
  },
  methods: {
    binarySearch: function (arr, val, start, end) {
      const barChartAnimationData = [];

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
    refreshData () {
      this.refreshList(true);
      this.barChartAnimationData = [];
    }
  },
  mounted:function () {
    this.refreshData();
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
