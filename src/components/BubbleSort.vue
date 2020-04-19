<template>
  <v-container>
    <v-btn @click="refreshList()">New Data</v-btn>
    <v-btn @click="swapPairs = bubbleSort(list)">Sort</v-btn>
    <BubbleSortVisualization
      :list="list"
      :swapPairs="swapPairs"
      />
  </v-container>
</template>

<script>
import BubbleSortVisualization from '@/components/BubbleSortVisualization.vue';

export default {
  name: 'BubbleSort',
  components: {
    BubbleSortVisualization
  },
  maxListSize: 25,
  props: {
    title: String
  },
  data: function () {
    return {
      listSize: Math.floor(Math.random() * this.$options.maxListSize) + 1,
      swapPairs: []
    }
  },
  computed: {
    list: function () {
      return Array.from(Array(this.listSize), () =>
        Math.floor(Math.random() * this.$options.maxListSize)
      );
    }
  },
  methods: {
    /* Return an integer in the range of [0, maxListSize]
     * not equal to current listSize
     */
    getRandomListSize() {
      do {
        var randomListSize = Math.floor(Math.random() * this.$options.maxListSize) + 1;
      } while (this.listSize === this.randomListSize);
      return randomListSize;
    },
    refreshList: function() {
      this.listSize = this.getRandomListSize();
    },
    /* Returns a an array of swaps (index pairs) necessary
       to sort this list
     */
    bubbleSort: function (arr) {
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
  mounted:function () {
    console.log('mounted bubble sort')
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
