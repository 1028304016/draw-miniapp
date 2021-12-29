import config from "../../common/config.js";

//获取应用实例
const app = getApp();
//创建背景音乐
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.src = config.baseUrl + '/music/music.mp3';
innerAudioContext.loop = true;

Page({
	data: {
		array: []
	},

	onLoad: function(option) {
		this.getHistory()
	},
	onUnload() {},
	getHistory: function() {
		var that = this;
		wx.request({
			url: config.baseUrl + '/getHistoryList',
			method: 'GET', //请求方式
			header: {
				'Content-Type': 'application/json',
			},
			success: function(res) {
				let data = res.data
				if (res.data.code == '200' && res.data.success) {
					for (var i = 0; i < res.data.data.length; ++i) {
						res.data.data[i].createTime = that.getDateTime(res.data.data[i].createTime)
					}
					that.setData({
						array: res.data.data
					});

				} else {
					wx.showToast({
						title: '请求数据失败',
						icon: 'none',
						duration: 2000
					})
				}
			}
		});
	},
	getDateTime: function(data) {
		var date = new Date(data)
		var Y = date.getFullYear() + '-'
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
		var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
		return Y + M + D + h + m + s
	}

})
