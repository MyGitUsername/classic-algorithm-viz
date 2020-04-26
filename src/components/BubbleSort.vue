<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="refreshList()">New Data</v-btn>
        <v-btn @click="swapPairs = bubbleSort(list)">Sort</v-btn>
      </v-col>
      <v-col>
        <TimelineControlButtons/>
      </v-col>
    </v-row>
    <BarChartVisualization
      :list="list"
      :swapPairs="swapPairs"
      />
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
    }
  },
  mounted () {
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
