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
      <g v-axis:x="scale" v-show="showXAxis" :transform="`translate(0, ${svgHeight})`"></g>
    </svg>
  </v-container>
</template>

<script>
import * as d3 from 'd3';
import gsap from "gsap";

export default {
  name: 'BarChartVisualization',
  swapTransitionDelay: 200,
  highlightDelay: 500,
  margins: { left: 20, right: 20, top: 20, bottom: 20 },
  props: {
    list: {
      type: Array,
      required: true
    },
    swapPairs: Array,
    highlightArr: Array,
    showXAxis: Boolean
  },
  data () {
    return {
      // TODO: Resize svg width and height based on window size
      svgWidth: 800,
      svgHeight: 600,
      rects: [],
      delay: 0,
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
      var tl = gsap.timeline({defaults: {duration: duration}});

      newVal.forEach((pair, i) => {
        const idx1 = pair[0],
          idx2 = pair[1];

        tl.addLabel("step" + i)
          .to(this.rects[idx1], {x: this.idxToX.get(idx2)}, "step" + i)
          .to(this.rects[idx2], {x: this.idxToX.get(idx1)}, "step" + i);

        let t = this.rects[idx1]
        this.$set(this.rects, idx1, this.rects[idx2])
        this.$set(this.rects, idx2, t)
      })
    },
    highlightArr (newArr) {
      this.delay = 0;
      newArr.forEach((obj) => {
        this.highlightBars(this.rects, obj, this.$options.highlightDelay);
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
  directives: {
    // Create the axises
    axis(el, binding) {
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];

      d3.select(el).call(d3[axisMethod](methodArg));
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
    },
    highlightBars: function (rects, highlightObj, speed) {
      this.delay += speed;
      setTimeout(() => {
        for (let i = highlightObj.start; i <= highlightObj.end; i++) {
          const color = (i == highlightObj.mid ? 'highlightBrown' : 'darkenSteelBlue');

          if (rects[i].style.length > 0) {
            rects[i].style +=  ", " + color + " 1s ease";
          } else {
            rects[i].style = "animation: " + color + " 1s ease";
          }
        }
      }, this.delay);
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
