<template>
  <v-container>
    <svg id="barChart">
      <g>
      <rect
        v-for="rect in rects"
        :key="rect.id"
        :x="rect.x"
        :y="rect.y"
        :width="rect.width"
        :height="rect.height"
        :fill="rect.fill"
        :style="rect.style"
        :id="rect.id"
        >
      </rect>
      </g>
    </svg>
  </v-container>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'BarChartVisualization',
  props: {
    list: Array,
    swapPairs: Array,
    highlightBars: Array
  },
  margins: { left: 20, right: 20, top: 20, bottom: 20 },
  data () {
    return {
      // TODO: Resize svg width and height based on window size
      svgWidth: 800,
      svgHeight: 600,
      rects: [],
      delay: 0
    }
  },
  watch: {
    list () {
      this.initializeRects();
    },
    swapPairs (newVal) {
      this.delay = 0;
      newVal.forEach((arr) => {
        this.swapBars(this.rects, arr[0], arr[1], 100);
      });
    },
    highlightBars (newArr) {
      this.delay = 0;
      newArr.forEach((algoStep) => {
        this.highlightBar(this.rects, algoStep, 1000);
      })
    }
  },
  computed: {
    graphWidth () {
      return this.svgWidth - this.$options.margins.left - this.$options.margins.right;
    },
    graphHeight () {
      return this.svgHeight - this.$options.margins.top - this.$options.margins.bottom;
    },
    linearScale () {
      return d3
        .scaleLinear()
        .domain([0, this.$parent.$options.maxListSize])
        .range([0, this.graphHeight]);
    }
  },
  methods: {
    initializeRects () {
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
          style: "",
          d: d
        }
      })
    },
    swapBars (arr, idx1, idx2, speed) {
      this.delay += speed;
      setTimeout(() => {
        let tmpY = arr[idx1].y,
          tmpHeight = arr[idx1].height;
        this.$set(arr[idx1], 'y', arr[idx2].y)
        this.$set(arr[idx1], 'height', arr[idx2].height)
        this.$set(arr[idx2], 'y', tmpY)
        this.$set(arr[idx2], 'height', tmpHeight)
      }, this.delay)
    },
    highlightBar: function (rects, highlightArr, speed) {
      this.delay += speed;
      for (let i = highlightArr[0]; i <= highlightArr[2]; i++) {
        let color = 'darkenSteelBlue';
        if (i == highlightArr[1]) color = 'highlightBrown';

        if (rects[i].style.length > 0) {
          rects[i].style +=  ", " + color + " 1s " + this.delay + "ms ease ";
        } else {
          rects[i].style = "animation: " + color + " 1s " + this.delay + "ms ease ";
        }
      }

      /*
      highlightArr.forEach((obj) => {
        if (rects[obj.idx].style.length > 0) {
          rects[obj.idx].style +=  ", " + obj.color + " 1s " + this.delay + "ms ease ";
        } else {
          rects[obj.idx].style = "animation: " + obj.color + " 1s " + this.delay + "ms ease ";
        }
      })
      */
    }
  },
  mounted () {
    this.initializeRects();
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
#barChart {
  width: 100%;
  height: 100%;
}
</style>
