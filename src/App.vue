<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
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
@keyframes highlightGreen {
  50% {fill: green;}
}

@keyframes highlightYellow {
  50% {fill: yellow;}
}
</style>
