export default {
  methods: {
    giveMoney(money){
      this.money -= money
      this.$parent.money += money  //不要滥用  如果一个儿子多个爹，无法使用
    }
  },
}