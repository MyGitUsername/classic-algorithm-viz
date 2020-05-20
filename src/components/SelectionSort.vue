<template>
  <v-container class="d-flex flex-column justify-start">
    <v-row class="flex-shrink-1 flex-grow-0">
      <v-col cols="4">
        <v-btn @click="refreshData()">New Data</v-btn>
      </v-col>
      <v-col cols="8">
        <v-btn @click="swapPairs = selectionSort(list)"
             v-show="swapPairs.length === 0"
             >
             Sort
        </v-btn>
        <TimelineControlButtons v-show="swapPairs.length !== 0"/>
      </v-col>
    </v-row>
    <v-row class="flex-grow-1">
    <v-col class="d-flex">
      <BarChartVisualization
        :list="list"
        :swapPairs="swapPairs"
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
  name: 'SelectionSort',
  components: {
    BarChartVisualization,
    TimelineControlButtons
  },
  mixins: [listGenerator],
  data () {
    return {
      listSize: 0,
      swapPairs: []
    }
  },
  methods: {
    /* Returns a an array of swaps (index pairs) that will
     * sort this list
     */
    selectionSort (arr) {
      let steps = [];
      let minIdx;
      for (let i = 0; i < arr.length; i++) {
        minIdx = i;
        for (let j = i; j < arr.length; j++) {
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }
        steps.push([minIdx, i])
        let tmp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = tmp;
      }
      return steps;
    },
    refreshData () {
      this.refreshList();
      this.swapPairs = [];
    }
  },
  mounted () {
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
