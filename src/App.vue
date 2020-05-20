<template>
  <v-app>
    <v-app-bar
      app
      color="#ffdb58"
      >

      <v-tabs>
        <v-tab
            v-for="(item, index) in content"
            :key="index"
            @click="selected=item.title"
          >
         {{ item.title }}
         </v-tab>
        </v-tabs>
    </v-app-bar>

    <v-content>
      <BinarySearch v-if="selected === 'Binary Search'"/>
      <BubbleSort v-if="selected === 'Bubble Sort'"/>
      <SelectionSort v-if="selected === 'Selection Sort'"/>
    </v-content>
  </v-app>
</template>

<script>
import BinarySearch from './components/BinarySearch';
import BubbleSort from './components/BubbleSort';
import SelectionSort from './components/SelectionSort';

export default {
  name: 'App',
  components: {
    BinarySearch,
    BubbleSort,
    SelectionSort
  },

  data: () => ({
    selected: 'Bubble Sort',
    content: [
      {
        title: 'Bubble Sort'
      },
      {
        title: 'Binary Search'
      },
      {
        title: 'Selection Sort'
      }
    ],
  }),
};
</script>
<style>
</style>
