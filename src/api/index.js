import Ajax from '@/ajax/Ajax'
import mockAjax from '@/ajax/mockAjax'
//用来书写所有的接口请求函数
//15个接口，每一个接口我们都去封装一个函数来对应
//以后哪里需要数据，那我就调哪一个相应的接口请求函数就ok

//请求三级分类列表数据函数
///api/product/getBaseCategoryList 请求地址
//GET：请求方式
//参数：无

export const reqCategoryList = () => {
  return Ajax({
    url:'/product/getBaseCategoryList',
    method:'get'
  })
}

// reqCategoryList()

//请求获取mock的banner和floor数据
export const reqBannerList = () => {
  return mockAjax({
    url:'/banner',
    method:'get'
  })
}

export const reqFloorList = () => {
  return mockAjax({
    url:'/floor',
    method:'get'
  })
}