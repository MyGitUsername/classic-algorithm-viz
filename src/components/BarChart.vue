<template>
  <div>
    <svg :width="viewWidth" :height="viewHeight">
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
        :d="rect.d"
        :id="rect.id"
        >
      </rect>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'BarChart',
  props: {
    list: Array,
    viewWidth: Number,
    viewHeight: Number,
    animationData: Array
  },
  data: function () {
    return {
      MARGINS: { left: 20, right: 20, top: 20, bottom: 20 },
      MAX_NUMBER: 1000,
      GAP: 1
    }
  },
  computed:  {
    graphWidth: function () {
      return this.viewWidth - this.MARGINS.left - this.MARGINS.right;
    },
    graphHeight: function () {
      return this.viewHeight - this.MARGINS.top - this.MARGINS.bottom;
    },
    linearScale: function () {
      return d3
        .scaleLinear()
        .domain([0, this.MAX_NUMBER])
        .range([0, this.graphHeight]);
    },
    rects: function () {
      console.log('computing rects, this.list is ' + this.list);
      const barWidth = (this.graphWidth - this.GAP * (this.list.length - 1)) / this.list.length;

      var res = this.list.map((d,i) => {
        return {
          id: "bar-" + i,
          width: barWidth,
          height:  this.linearScale(d),
          x: i * barWidth + i * this.GAP + this.MARGINS.left,
          y: this.graphHeight - this.linearScale(d),
          fill: 'rgba(64, 84, 178, 1)',
          d: d
        }
      });
      this.animate();
      return res;
    }
  },
  methods: {
    animate: function () {
      console.log('inside watch animation data')
      this.animationData.forEach((obj) => {
        //console.log('obj ' + json.stringify(obj))
        this.highlightBar('#bar-' + obj.idx, obj.color, obj.delay);
      })
    },
    highlightBar: function (barId, color, delay) {
      console.log('barId: %s, color: %s, delay: %s', barId, color, delay);
      d3.select(barId)
        .transition()
        .delay(delay)
        .attr("fill", color)
        .transition()
        .duration(500)
        .attr("fill", 'rgb(64, 84, 178, 1)');
    }
  },
  mounted:function () {
    console.log('mounted bar chart')
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
