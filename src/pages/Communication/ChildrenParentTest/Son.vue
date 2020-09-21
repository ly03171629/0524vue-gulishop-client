<template>
  <div style="background: #ccc; height: 50px;">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="giveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
import myMixin from "@/pages/Communication/ChildrenParentTest/myMixin";
export default {
  mixins: [myMixin],
  name: "Son",
  data() {
    return {
      money: 30000,
    };
  },

  methods: {
    test1() {
      console.log(111);
    },
  },
};
</script>
