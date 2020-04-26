<template>
  <v-container>
    <svg id="barChart">
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
  </v-container>
</template>

<script>
import * as d3 from 'd3';
import gsap from 'gsap';

export default {
  name: 'BarChartVisualization',
  swapTransitionDelay: 200,
  highlightDelay: 500,
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
      svgWidth: 800,
      svgHeight: 600,
      rects: [],
      idxToX: new Map()
    }
  },
  watch: {
    list () {
      this.initializeRects();
    },
    swapPairs (newVal) {
      const duration = .25
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
      this.$store.commit('setTimeline', gsap.timeline());

      newArr.forEach((highlightObj, i) => {
        let stepNum = "step" + i;
        this.$store.commit('addLabel', stepNum);
        for (let j = highlightObj.start; j <= highlightObj.end; j++) {
          const color = (j == highlightObj.mid ? '#b29e40' : '#2c397a');
          this.$store.commit('to', {
            target: this.rects[j],
            vars: {keyframes: [
            {fill: color, delay: .25 },
            {fill: this.$options.barColor, delay: .5} ]},
            position: stepNum})
        }
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
    scale () {
      const x = d3.scaleBand()
        .range([0, this.svgWidth])
        .padding(0.1);

      const y = d3.scaleLinear()
        .range([this.svgHeight, 0]);

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
          height:  this.svgHeight - this.scale.y(d),
          x: this.scale.x(i),
          y: this.scale.y(d),
          fill: 'rgba(64, 84, 178, 1)',
          style: "",
          d: d
        }
      })
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
  width: 75%;
  height: 85%;
}
</style>
