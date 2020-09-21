<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowMoneyFromXM">找小明借钱100</button><br>
    <button @click="borrowMoneyFromXH">找小红借钱150</button><br>
    <button @click="borrowMoneyFromALL">找所有孩子借钱200</button><br>
    
    <br>
    <Son ref="son"/>

    <br>
    <Daughter ref="dau"/>
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data () {
    return {
      money: 1000
    }
  },

  methods: {
    borrowMoneyFromXM(){
      //
      this.money += 100
      // this.$refs.son  拿的就是小明这个组件对象，子组件
      this.$refs.son.money -= 100
    },
    borrowMoneyFromXH(){
      //
      this.money += 150
      // this.$refs.son  拿的就是小红这个组件对象，子组件
      this.$refs.dau.money -= 150
    },
    borrowMoneyFromALL(){
      this.money += 400
      // this.$refs.son.money -= 200
      // this.$refs.dau.money -= 200
      // this.$children   //拿到所有的子组件对象组成的一个数组
      //this.$children拿到的数组内部谁前谁后不确定
      this.$children.forEach(item => item.money -= 200)  
    },

  },

  components: {
    Son,
    Daughter
  }
}
</script>

<style>

</style>
