<template>
  <v-container>
    <v-btn @click="refreshList()">Refresh</v-btn>
    <BubbleSortVisualization
      :list="list"
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
      itemsNumber: Math.floor(Math.random() * this.$options.maxNumber) + 1
    }
  },
  computed: {
    list: function () {
      return Array.from(Array(this.itemsNumber), () =>
        Math.floor(Math.random() * this.$options.maxNumber)
      )
    }
  },
  methods: {
    refreshList: function() {
    },
  },
  mounted:function () {
    console.log('mounted bubble sort')
  }
}
</script>
<style scoped>
</style>
