const listGenerator = {
  maxValue: 100,
  maxListSize: 25,
  minListSize: 3,
  data () {
    return {
      listSize: 0
    }
  },
  computed: {
    /* Contains unique randomly generated numbers */
    list () {
      let set = new Set();
      while (set.size !== this.listSize) {
          set.add(Math.floor(Math.random() * this.$options.maxValue) + 1);
      }
      return [...set];
    }
  },
  methods: {
    /* Return an integer in the range of [minListSize, maxListSize]
     * not equal to current listSize
     */
    getRandomListSize () {
      do {
        var randomListSize = Math.floor(Math.random() * this.$options.maxListSize) + 1;
      } while (this.listSize === randomListSize || randomListSize < this.$options.minListSize)
      return randomListSize;
    },
    refreshList (sorted) {
      this.listSize = this.getRandomListSize();
      if (sorted) this.list.sort((a, b) => a - b);
    }
  }
}

export default listGenerator;
