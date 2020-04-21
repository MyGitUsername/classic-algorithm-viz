<template>
  <v-app>
    <v-app-bar
      app
      color="#ffdb58"
      >
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">{{ selected }}</v-toolbar-title>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in content"
            :key="index"
            @click="selected=item.title"
            >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
        title: 'BinarySearch'
      },
      {
        title: 'BubbleSort'
      }
    ],
  }),
};
</script>

<style>
@keyframes darkenSteelBlue {
  50% {fill: #2c397a; }
}

@keyframes highlightBrown {
  50% {fill: #b29e40; }
}
</style>
