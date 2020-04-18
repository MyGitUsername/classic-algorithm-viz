<template>
  <v-container>
    <svg :width="svgWidth" :height="svgHeight">
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
    </svg>
  </v-container>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'BarChart',
  props: {
    list: Array,
    animationData: Array
  },
  margins: { left: 20, right: 20, top: 20, bottom: 20 },
  data: function () {
    return {
      // TODO: don't hardcode, make adjust to size of window?
      svgWidth: 800,
      svgHeight: 400,
    }
  },
  watch: {
    animationData: function () {
      //console.log('watching animation data, this.rects: %s', this.rects.length)

      if (this.rects.length > 0) this.animate();
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
    },
    rects: function () {
      //console.log('computing rects, this.list is ' + this.list);
      let gap = 1;
      let barWidth = (this.graphWidth - gap * (this.list.length - 1)) / this.list.length;

      var res = this.list.map((d,i) => {
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
      });
      //this.animate();
      return res;
    }
  },
  methods: {
    animate: function () {
      //console.log('inside watch animation data')
      this.animationData.forEach((obj) => {
        //console.log('obj ' + JSON.stringify(obj))
        this.highlightBar(obj.idx, obj.color, obj.delay);
      })
    },
    highlightBar: function (barId, color, delay) {
      console.log('barId: %s, color: %s, delay: %s', barId, color, delay);
      if (this.rects[barId].style.length > 0) {
        //console.log('style exists %s',this.rects[barId].style)
        //let res = this.rects[barId].style + ", " +
        var res =  this.rects[barId].style + ", " + color + " 1s " + delay + "ms ";
        console.log('after concat ' + res)
        this.rects[barId].style = res;
      } else {
        this.rects[barId].style = "animation: " + color + " 1s " + delay + "ms ";
      }
      /*
      d3.select(barId)
        .transition()
        .delay(delay)
        .attr("fill", color)
        .transition()
        .duration(1000)
        .attr("fill", 'rgb(64, 84, 178, 1)');
        */
    }
  },
  mounted:function () {
    console.log('mounted bar chart')
  }
}
</script>
<style scoped>
/*
#bar-1 {
  animation: highlightGreen 1s 1s ease, highlightGreen 1s 2s ease, highlightGreen 1s 3s ease
}
*/
</style>
