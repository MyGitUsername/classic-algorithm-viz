<template>
  <div>
    <ul>
      <li> {{ title}} </li>
      <li>
        <button @click="refreshList()">Refresh</button>
      </li>
    </ul>
    <BarChart
      :viewWidth='width'
      :viewHeight='height'
      :list='list'
      :animationData='barChartAnimationData'
      />
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue';

export default {
  name: 'BinarySearch',
  components: {
    BarChart
  },
  props: {
    title: String
  },
  data: function () {
    return {
      delay: 2000,
      barChartAnimationData: [],
      width: 800,
      height: 400,
      itemsNumber: Math.floor(Math.random() * 100) + 1
    }
  },
  computed: {
    list: function () {
      const MAX_NUMBER = 1000;
      return Array.from(Array(this.itemsNumber), () =>
        Math.floor(Math.random() * MAX_NUMBER)
      ).sort((a,b) => a - b)
    }
  },
  methods: {
    refreshList: function() {
      this.delay = 2000;
      this.barChartAnimationData =  [];
      this.itemsNumber = Math.floor(Math.random() * 100) + 1;
      let rndIdx = Math.floor(Math.random() * this.itemsNumber);
      this.binarySearch(this.list, this.list[rndIdx], 0, this.itemsNumber - 1);
    },

    binarySearch: function (array, val, start, end) {
      let mid  = Math.floor((start + end) / 2)
      //console.log('searching for ' + val + ' in ' + array + " end " + end)

      if (val != array[mid]) {
        this.barChartAnimationData.push(
          {idx: mid, color: 'green', delay: this.delay},
          {idx: start, color: 'black', delay: this.delay},
          {idx: end, color: 'black', delay: this.delay})
      } else {
        this.barChartAnimationData.push({idx: mid, color: 'green', delay: this.delay})
      }
      this.delay += 1000;

      if (val < array[mid]) {
        return this.binarySearch(array, val, start, mid - 1)
      } else if (val > array[mid]) {
        return this.binarySearch(array, val, mid + 1, end)
      } else {
        return mid;
        //return mid;
      }
    },
  },
  mounted:function () {
    let rndIdx = Math.floor(Math.random() * this.itemsNumber);
    this.binarySearch(this.list, this.list[rndIdx], 0, this.itemsNumber - 1);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 2128, 404.467;
  overflow: hidden;
}

li {
  float: left;
  display: inline-block;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
</style>
