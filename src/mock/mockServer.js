//这个文件才是正儿八经的去把数据模拟称为接口去获取 
//模拟接口使用一个包  mockjs

import Mock from 'mockjs'
import banner from './banner.json'
import floor from '@/mock/floor'

Mock.mock('/mock/banner',{code:200,data:banner})//就是用来把数据和路径注册为接口
Mock.mock('/mock/floor',{code:200,data:floor})//就是用来把数据和路径注册为接口


//最后切记在main当中运行这个文件