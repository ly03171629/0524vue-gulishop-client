import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'

//存数据的地方，多个属性的对象
const state = {
  categoryList : [], //初始化存储的共享状态数据
  bannerList:[],
  floorList:[]
}
//直接修改数据的地，是多个方法的一个对象  方法当中不能出现if  for   异步操作
const mutations = {
  RECEIVECATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  },
  RECEIVEBANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  RECEIVEFLOORLIST(state,floorList){
    state.floorList = floorList
  },
}

//和用户对接的地方  也是多个方法的一个对象 方法当中可以出现if  for  异步操作
const actions = {
  async getCategoryList({commit}){
    const result = await reqCategoryList()
    if(result.code === 200){
      commit('RECEIVECATEGORYLIST',result.data)
    }
  },

  async getBannerList({commit}){
    const result = await reqBannerList()
    if(result.code === 200){
      commit('RECEIVEBANNERLIST',result.data)
    }
  },

  async getFloorList({commit}){
    const result = await reqFloorList()
    if(result.code === 200){
      commit('RECEIVEFLOORLIST',result.data)
    }
  },

}

//通过state计算出来的属性数据（只有读没有写，只能使用state数据不能修改state数据）
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}