import Vue from 'vue'
import Vuex from 'vuex'
import gsap from 'gsap';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timeline: gsap.timeline()
  },
  mutations: {
    setTimeline (state, timeline) {
      state.timeline = timeline;
    },
    to (state, payload) {
      state.timeline.to(payload.target, payload.vars, payload.position || "+=0");
    },
    addLabel (state, label) {
      state.timeline.addLabel(label);
    },
    play (state) {
      state.timeline.play()
    }, 
    pause (state) {
      let tl = state.timeline;
      if (!tl.paused()) tl.tweenTo(tl.nextLabel())
    },
    stepForward (state) {
      let tl = state.timeline;
      tl.tweenTo(tl.nextLabel())
    },
    stepBackward (state) {
      let tl = state.timeline;
      tl.tweenTo(tl.previousLabel())
    }
  }
})

