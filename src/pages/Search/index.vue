<template>
  <div>
    Search

    params参数：{{$route.params.keyword}}  -----   {{keyword}}
    <br>
    query参数： {{$route.query.keyword2}} ---- {{keyword2}}
  </div>
</template>

<script>
export default {
  name: 'Search',
  props:['keyword','keyword2']
}
</script>

<style lang="less" scoped>

</style>
