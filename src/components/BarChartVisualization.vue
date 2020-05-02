<template>
    <svg class="flex-grow-1 flex-shrink-0" ref="svg" v-resize="onResize" id="barChart">
      <g v-for="rect in rects"
         :key="rect.id">
      <rect
        :x="rect.x"
        :y="rect.y"
        :width="rect.width"
        :height="rect.height"
        :fill="rect.fill"
        :style="rect.style"
        :id="rect.id"
        >
      </rect>
      <text
        :x="rect.x + Math.floor(rect.width / 4)"
        :y="rect.d > 80 ? rect.y + 30 : rect.y - 15"
        >
      {{ rect.d }}
      </text>
      </g>
    </svg>
</template>

<script>
import * as d3 from 'd3';
import gsap from 'gsap';

export default {
  name: 'BarChartVisualization',
  margins: { left: 20, right: 20, top: 20, bottom: 20 },
  barColor: 'rgba(64, 84, 178, 1)',
  props: {
    list: {
      type: Array,
      required: true
    },
    swapPairs: Array,
    highlightArr: Array
  },
  data () {
    return {
      // TODO: Resize svg width and height based on window size
     windowSize: {
          x: window.innerWidth,
          y: window.innerHeight
        },
      rects: [],
      idxToX: new Map()
    }
  },
  watch: {
    list () {
      this.initializeRects();
    },
    swapPairs (newVal) {
      const duration = .5;
      //Map rect idx to x coordinate
      this.rects.forEach((d,i) => this.idxToX.set(i, this.rects[i].x))
      this.$store.commit('setTimeline', gsap.timeline({defaults: {duration: duration}}));

      newVal.forEach((pair, i) => {
        const idx1 = pair[0],
          idx2 = pair[1],
          stepNum = "step" + i;

        this.$store.commit('addLabel', stepNum);
        this.$store.commit('to', {
            target: this.rects[idx1],
            vars: {x: this.idxToX.get(idx2)},
            postion: stepNum});
        this.$store.commit('to', {
            target: this.rects[idx2],
            vars: {x: this.idxToX.get(idx1)},
            postion: stepNum});

        let tmp = this.rects[idx1]
        this.$set(this.rects, idx1, this.rects[idx2])
        this.$set(this.rects, idx2, tmp)
      })
    },
    highlightArr (newArr) {
      const duration = 1;
      this.$store.commit('setTimeline', gsap.timeline({defaults: {duration: duration}}));

      newArr.forEach((highlightObj, i, arr) => {
        let stepNum = "step" + (i - .5);
        let next = "stepNum" + i;
        this.$store.commit('addLabel', stepNum);
        for (let j = highlightObj.start; j <= highlightObj.end; j++) {
          const color = (j == highlightObj.mid ? '#b29e40' : '#2c397a');
          this.$store.commit('to', {
            target: this.rects[j],
            vars: {fill: color},
            position: stepNum})

        if (arr.length - 1 !== i) {
          this.$store.commit('to', {
            target: this.rects[j],
            vars: {fill: this.$options.barColor},
            position: next})
          }
        }
      })
    }
  },
  computed: {
    graphWidth () {
      return this.windowSize.x - this.$options.margins.left - this.$options.margins.right;
    },
    graphHeight () {
      return this.windowSize.y - this.$options.margins.top - this.$options.margins.bottom;
    },
    scale () {
      const x = d3.scaleBand()
        .range([0, this.graphWidth])
        .padding(0.1);

      const y = d3.scaleLinear()
        .range([this.graphHeight, 0]);

      return {x, y}
    }
  },
  methods: {
    initializeRects () {
      this.scale.x.domain(this.list.map((d, i) => i ));
      this.scale.y.domain([0, d3.max(this.list, (d) => d)]);

      this.rects = this.list.map((d,i) => {
        return {
          id: "bar-" + i,
          width: this.scale.x.bandwidth(),
          height:  this.graphHeight - this.scale.y(d),
          x: this.scale.x(i),
          y: this.scale.y(d),
          fill: 'rgba(64, 84, 178, 1)',
          style: "",
          d: d
        }
      })
    },
     onResize () {
      this.windowSize = { x: this.$refs.svg.clientWidth, y: this.$refs.svg.clientHeight }
    }
  },
  mounted () {
    this.initializeRects();
    this.$nextTick(() =>  this.onResize())

  }
}
</script>
<style scoped>
</style>
