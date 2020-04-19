<template>
  <v-container>
    <v-btn @click="refreshList()">New Data</v-btn>
    <v-btn @click="swapPairs = bubbleSort(list)">Sort</v-btn>
    <BarChartVisualization
      :list="list"
      :swapPairs="swapPairs"
      />
  </v-container>
</template>

<script>
import BarChartVisualization from '@/components/BarChartVisualization.vue';

export default {
  name: 'BubbleSort',
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
      swapPairs: []
    }
  },
  computed: {
    list () {
      return Array.from(Array(this.listSize), () => this.getRandomListSize());
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
