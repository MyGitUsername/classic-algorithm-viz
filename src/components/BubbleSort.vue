<template>
  <v-container class="d-flex flex-column justify-start">
    <v-row class="flex-shrink-1 flex-grow-0">
      <v-col cols="4">
        <v-btn @click="refreshData()">New Data</v-btn>
      </v-col>
      <v-col cols="8">
        <v-btn @click="swapPairs = bubbleSort(list)"
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
  name: 'BubbleSort',
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
    bubbleSort (arr) {
      let steps = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j + 1] < arr[j]) {
            steps.push([j, j + 1])
            let tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;
          }
        }
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
  height: 100%;
  width: 100%;
  }
</style>
