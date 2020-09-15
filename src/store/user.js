import {getUserTempId} from '@/utils/userabout'
//存数据的地方，多个属性的对象
const state = {
  userTempId:getUserTempId() 
  //在state当中存储userTempId是为了效率更高一些，因为从localstorage获取比从state直接拿要慢
  //我们只是在项目初始化的时候从localstorage获取一次，然后村给state，以后要用从state直接拿
}
//直接修改数据的地，是多个方法的一个对象  方法当中不能出现if  for   异步操作
const mutations = {}


//和用户对接的地方  也是多个方法的一个对象 方法当中可以出现if  for  异步操作
const actions = {}

//通过state计算出来的属性数据（只有读没有写，只能使用state数据不能修改state数据）
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}