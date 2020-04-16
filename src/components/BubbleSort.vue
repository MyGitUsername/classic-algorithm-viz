<template>
  <v-container>
    <v-btn @click="refreshList()">Refresh</v-btn>
    <BarChart
      :list="list"
      />
  </v-container>
</template>

<script>
import BarChart from '@/components/BarChart.vue';

export default {
  name: 'BubbleSort',
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
    },

    bubbleSort: function (arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j< arr.length - i; j++) {
          if (arr[j + 1] < arr[i]) {
            let tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;
          }
        }
      }
      return arr;
    },
  },
  mounted:function () {
    console.log('mounted bubble sort')
  }
}
</script>
<style scoped>
</style>
