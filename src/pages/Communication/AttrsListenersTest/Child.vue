<template>
  <div>Child</div>
</template>

<script>
export default {
  name: 'Child',
  props:['aaa','ccc'],
  mounted(){
    
    console.log(this.$attrs,this.$listeners)
  }
}
</script>

<style lang="less" scoped>

</style>
