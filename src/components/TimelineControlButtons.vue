<template>
  <v-row>
    <v-btn @click='tl.tweenTo(tl.previousLabel())' >
      <img src="@/assets/step-backward-solid.svg" height=20 width=20>
    </v-btn>
    <v-btn @click='tl.play()' >
      <img src="@/assets/play-solid.svg" height=20 width=20>
    </v-btn>
    <v-btn @click='tl.tweenTo(tl.nextLabel())'>
      <img src="@/assets/pause-solid.svg" height=20 width=20>
    </v-btn>
    <v-btn @click='tl.tweenTo(tl.nextLabel())' >
      <img src="@/assets/step-forward-solid.svg" height=20 width=20>
    </v-btn>
  </v-row>
</template>

<script>
/*
 * The svg icons used in this componenet were provided by font-awesome
 * under the Creative * Commons license (https://fontawesome.com/license).
 * No changes have been made to the original svg.
 */


export default {
  name: 'TimelineControlButtons',
  data () {
    return {
      //
    }
  },
  props: {
    tl: {
      type: Object,
      required: true
    }
  },
  methods: {
    play () {
      console.log('you hit play')
    }
  }
}
</script>
<style scoped>
</style>
