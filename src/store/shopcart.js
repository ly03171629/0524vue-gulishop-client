import {reqAddOrUpdateShopCart,reqDeleteCart,reqShopCartList, reqUpdateCartIsChecked} from '@/api'
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
  },
  async updateCartIsChecked({commit},{skuId,isChecked}){
    const result = await reqUpdateCartIsChecked(skuId,isChecked)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faild'))
    }
  },
  updateAllCartIsChecked({state,dispatch},isChecked){
    let promises = []
    state.shopCartList.forEach(item => {
      if(item.isChecked === isChecked) return 
      const promise = dispatch('updateCartIsChecked',{skuId:item.skuId,isChecked:isChecked})
      promises.push(promise)
    })
    return Promise.all(promises)
  },

  async deleteCart({commit},skuId){
    const result = await reqDeleteCart(skuId)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faild'))
    }
  },

  deleteAllCart({state,dispatch}){
    let promises = []
    state.shopCartList.forEach(item => {
      if(!item.isChecked) return
      const promise = dispatch('deleteCart',item.skuId)
      promises.push(promise)
    })

    /*
    Promise.all是一个方法
    参数：     要求是一个promise对象的数组，这个数组里面必须都是promise对象
    返回值：   返回是一个promise，
              promise状态成功 结果就是promise数组当中每个promise成功的结果组成的数组
              promise失败  结果就是promise数组当中第一个失败的promise的失败原因
    功能：     让多个promise一起执行，真正执行的时候有顺序的（数组内的先后），但是这几个promise谁先结束不清楚
    */
    return Promise.all(promises)
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