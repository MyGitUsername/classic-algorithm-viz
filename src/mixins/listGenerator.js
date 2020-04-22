const listGenerator = {
  maxListSize: 25,
  minListSize: 3,
  data () {
    return {
      listSize: 0
    }
  },
  computed: {
    list () {
      return Array.from(Array(this.listSize), () =>
        this.getRandomNumber()
      );
    }
  },
  methods: {
    getRandomNumber () {
      return Math.random() * this.$options.maxListSize;
    },
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
