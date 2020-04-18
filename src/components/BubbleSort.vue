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
  maxNumber: 25,
  props: {
    title: String
  },
  data: function () {
    return {
      listSize: Math.floor(Math.random() * this.$options.maxNumber) + 1,
      swapPairs: []
    }
  },
  computed: {
    list: function () {
      return Array.from(Array(this.listSize), () =>
        Math.floor(Math.random() * this.$options.maxNumber)
      );
    }
  },
  methods: {
    /* Return an integer in the range of [0, maxNumber]
     * not equal to current listSize
     */
    getRandomListSize() {
      do {
        var randomListSize = Math.floor(Math.random() * this.$options.maxNumber) + 1;
      } while (this.listSize === this.randomListSize);
      return randomListSize;
    },
    refreshList: function() {
      this.listSize = this.getRandomListSize();
    },
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
</style>
