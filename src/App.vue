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
      <BinarySearch v-if="selected === 'BinarySearch'"/>
      <BubbleSort v-if="selected === 'BubbleSort'"/>
    </v-content>
  </v-app>
</template>

<script>
import BinarySearch from './components/BinarySearch';
import BubbleSort from './components/BubbleSort';

export default {
  name: 'App',
  components: {
    BinarySearch,
    BubbleSort
  },

  data: () => ({
    selected: "BubbleSort",
    content: [
      {
        title: 'BubbleSort'
      },
      {
        title: 'BinarySearch'
      }
    ],
  }),
};
</script>
<style>
</style>
