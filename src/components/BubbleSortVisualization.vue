<template>
  <v-container>
    <svg id="barChart" :width="svgWidth" :height="svgHeight">
      <g>
      <rect
        v-for="rect in rects"
        :key="rect.id"
        :x="rect.x"
        :y="rect.y"
        :width="rect.width"
        :height="rect.height"
        :fill="rect.fill"
        class="rect"
        :style="rect.style"
        :d="rect.d"
        :id="rect.id"
        >
      </rect>
      </g>
    </svg>
    <button v-on:click="animateSort()">Swap Bars</button>
  </v-container>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'BubbleSortVisualization',
  props: {
    list: Array
  },
  margins: { left: 20, right: 20, top: 20, bottom: 20 },
  data: function () {
    return {
      // TODO: don't hardcode, make adjust to size of window?
      svgWidth: 800,
      svgHeight: 400,
      rects: [],
      delay: 5
    }
  },
  computed: {
    graphWidth: function () {
      return this.svgWidth - this.$options.margins.left - this.$options.margins.right;
    },
    graphHeight: function () {
      return this.svgHeight - this.$options.margins.top - this.$options.margins.bottom;
    },
    linearScale: function () {
      return d3
        .scaleLinear()
        .domain([0, this.$parent.$options.maxNumber])
        .range([0, this.graphHeight]);
    }
  },
  methods: {
    initializeRects: function () {
      console.log('computing rects, this.list is ' + this.list);
      let gap = 1;
      let barWidth = (this.graphWidth - gap * (this.list.length - 1)) / this.list.length;

      this.rects = this.list.map((d,i) => {
        return {
          id: "bar-" + i,
          width: barWidth,
          height:  this.linearScale(d),
          x: i * barWidth + i * gap + this.$options.margins.left,
          y: this.graphHeight - this.linearScale(d),
          fill: 'rgba(64, 84, 178, 1)',
          style: '',
          d: d
        }
      })
    },
    swapBars: function (idx1, idx2, speed) {
      this.delay += speed;
      setTimeout(() => { //timeout is problem
        let tmpY = this.rects[idx1].y,
          tmpHeight = this.rects[idx1].height;
        this.$set(this.rects[idx1], 'y', this.rects[idx2].y)
        this.$set(this.rects[idx1], 'height', this.rects[idx2].height)
        this.$set(this.rects[idx2], 'y', tmpY)
        this.$set(this.rects[idx2], 'height', tmpHeight)
      }, this.delay)
    },
    animateSort() {
      console.log('before bub sort' + JSON.stringify(this.rects))
      this.steps = this.bubbleSort(this.rects)
      console.log('after bub sort' + JSON.stringify(this.rects))
      this.steps.forEach((v) => {
        this.swapBars(v[0], v[1], 50)
      });
    },
    /* Returns an ordered array of swapped indices pairs */
    bubbleSort: function (data) {
      let arr = Array.from(data); //deep copy
      console.log('calling buble sort')
      let steps = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j + 1].height < arr[j].height) {
            steps.push([j, j + 1])
            //this.swapBars(j, j+1, 5);

            let tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;
          }
        }
      }
      return steps;
    },
  },
  mounted:function () {
    console.log('mounted bar chart');
    this.initializeRects(); // Move to earlier hook
  }
}
</script>
<style scoped>
.bars-move {
  transition: transform 1s;
}
</style>
