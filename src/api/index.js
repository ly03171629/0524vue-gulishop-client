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

//请求获取search的商品列表数据  /api/list
// post
// data 请求体参数
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }

export const reqGoodsListInfo = (searchParams) => {
  return Ajax({
    url:'/list',
    method:'post',
    data:searchParams //必须是对象
  })
}


//searchParams代表的是搜索参数  如果搜索参数里面什么都没有  只是一个{} 也没问题
//返回的是所有的商品信息
//如果搜索参数当中有东西，那么返回的就是按照这些参数搜索到的商品信息
//我们测试的时候可以使用{}去作为参数发请求，但是不能不传递参数，不传递那么就相当于没有传递参数undefined
// reqGoodsListInfo({})   



