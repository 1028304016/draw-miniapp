
import config from "../../common/config.js";

//获取应用实例
const app = getApp()

Page({
  data: {
      isRuleTrue:false,//弹出框控制
  },

  onLoad: function () {
    
  },
  
  showRule: function () {
	  this.setData({
		  isRuleTrue: true
	  })
   },
   
   //关闭规则提示
   hideRule: function () {
	   this.setData({
		   isRuleTrue: false
	   })
   },
  
  //选择后开始答题
  problowTypeClick:function(e){
  	  wx.navigateTo({
  	    url: '/pages/drawlots/drawlots'
  	  })
  },

//查看历史数据
  selectClick() {
  	wx.navigateTo({
  		url: '/pages/history/history'
  	})
  },
  //维护页面
  baseInfoClick() {
	 wx.navigateTo({
	 	url: '/pages/baseInfo/baseInfo'
	 }) 
  }
})
