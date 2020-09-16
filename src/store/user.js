import { reqUserRegister,reqUserLogin,reqUserLogout} from '@/api'
import {getUserTempId} from '@/utils/userabout'
//存数据的地方，多个属性的对象
const state = {
  userTempId:getUserTempId(), 
  //在state当中存储userTempId是为了效率更高一些，因为从localstorage获取比从state直接拿要慢
  //我们只是在项目初始化的时候从localstorage获取一次，然后村给state，以后要用从state直接拿
  userInfo: JSON.parse(localStorage.getItem('USERINFO_KEY')) || {}

}
//直接修改数据的地，是多个方法的一个对象  方法当中不能出现if  for   异步操作
const mutations = {
  RECEIVEUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  RESETUSERINFO(state){
    state.userInfo = {}
  }
}


//和用户对接的地方  也是多个方法的一个对象 方法当中可以出现if  for  异步操作
const actions = {
  async userRegister({commit},userInfo){
    const result = await reqUserRegister(userInfo)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faild'))
    }
  },

  async userLogin({commit},userInfo){
    const result = await reqUserLogin(userInfo)
    if(result.code === 200){
      commit('RECEIVEUSERINFO',result.data) //修改state当中userInfo
      localStorage.setItem('USERINFO_KEY',JSON.stringify(result.data)) //存储登录成功用户信息
      return 'ok'
    }else{
      return Promise.reject(new Error('faild'))
    }
  },

  async userLogout({commit}){
    const result = await reqUserLogout()
    if(result.code === 200){
      //清空state当中用户数据
      commit('RESETUSERINFO')
      //清空localStorage用户数据
      localStorage.removeItem('USERINFO_KEY')
      return 'ok'
    }else{
      return Promise.reject(new Error('faild'))
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