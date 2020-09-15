import {reqAddOrUpdateShopCart,reqShopCartList} from '@/api'
//存数据的地方，多个属性的对象
const state = {
  shopCartList:[]
}
//直接修改数据的地，是多个方法的一个对象  方法当中不能出现if  for   异步操作
const mutations = {
  RECEIVESHOPCARTLIST(state,shopCartList){
    state.shopCartList = shopCartList
  }
}


//和用户对接的地方  也是多个方法的一个对象 方法当中可以出现if  for  异步操作
const actions = {
  async addOrUpdateShopCart({commit},{skuId,skuNum}){
    const result = await reqAddOrUpdateShopCart(skuId,skuNum)
    //async函数返回值不看return  返回的一定是一个promise
    //但是async函数返回值promise，是成功还是失败，要看return

    //promise成功还是失败：
    //   成功：return 非失败的promise，那么就是成功
    //   失败：return 失败的promise  / 抛出错误的时候
    //promise成功的结构就是return的结果
    //promise失败的原因就是抛出的错误或者return后失败的promise的失败原因

    if(result.code === 200){
      return 'ok'
    }else{
      // return 'faild'
      return Promise.reject(new Error('faild'))
    }
  },
  async getShopCartList({commit}){
    const result = await reqShopCartList()
    if(result.code === 200){
      commit('RECEIVESHOPCARTLIST',result.data)
    }
  }
}

//通过state计算出来的属性数据（只有读没有写，只能使用state数据不能修改state数据）
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}