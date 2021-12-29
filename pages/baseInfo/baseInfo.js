import config from "../../common/config.js";

//获取应用实例
const app = getApp()

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		list: [],
		popupShow: false,
		addname: '' //添加的人员
	},


	// 删除
	delList: function(e) {
		let that = this,
			index = e.currentTarget.dataset.index; // 当前下标
		// 切割当前下标元素，更新数据
		that.data.list.splice(index, 1);
		that.setData({
			list: that.data.list
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		that.getBaseInfoList();
	},
	getBaseInfoList: function() {
		var that = this;
		wx.request({
			url: config.baseUrl + '/getBaseInfoList',
			method: 'GET', //请求方式
			header: {
				'Content-Type': 'application/json',
			},
			success: function(res) {
				let data = res.data
				if (res.data.code == '200' && res.data.success) {
					that.setData({
						list: res.data.data
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
	delBaseInfo: function(event) {
		console.log(event,"---")
		var id = event.currentTarget.dataset.editid;
		wx.request({
			url: config.baseUrl + '/deleteOne/' + id,
			method: 'GET', //请求方式
			header: {
				'Content-Type': 'application/json',
			},
			success: function(res) {
				console.log(res)
				let data = res.data
				if (res.data.code == '200' && res.data.success) {
					that.setData({
						list: res.data.data
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
	updateBaseInfo: function(event) {
		var id = event.currentTarget.dataset.editid;
		wx.request({
			url: config.baseUrl + '/updateOne/' + id,
			method: 'GET', //请求方式
			header: {
				'Content-Type': 'application/json',
			},
			success: function(res) {
				let data = res.data
				console.log(data,"===")
				if (res.data.code == '200' && res.data.success) {
					that.setData({
						list: res.data.data
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
	formSubmit(e) {
		console.log('form发生了submit事件，携带数据为：', e.detail.value)
		var that = this;
		wx.request({
			url: config.baseUrl + '/getBaseInfoList',
			method: 'POST', //请求方式
			param: e,
			header: {
				'Content-Type': 'application/json',
			},
			success: function(res) {
				let data = res.data
				if (res.data.code == '200' && res.data.success) {
					that.setData({
						list: res.data.data
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
	formReset(e) {
		console.log('form发生了reset事件，携带数据为：', e.detail.value)
		this.setData({
			chosen: ''
		})
	}
})
