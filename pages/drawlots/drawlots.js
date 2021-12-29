import config from "../../common/config.js";

//获取应用实例
const app = getApp();
// //创建背景音乐
// const innerAudioContext = wx.createInnerAudioContext();
// //innerAudioContext.src = 'https://www.zhitaochan.cn/Opening.mp3';
// innerAudioContext.src = config.baseUrl + '/music/music.mp3';
// innerAudioContext.loop = true;

Page({
	data: {
		drawName: '',
		maskShow: false,
		selects: [], //选项
		disabled: false,
		buttonName: '开始抽签',
		istryagain: true
	},

	onLoad: function(option) {
		this.getDrawName()
	},
	onUnload() {
		//停止播放   
		// innerAudioContext.autoplay = false;
		// innerAudioContext.stop();
	},
	getDrawName: function() {

		var that = this
		wx.request({
			url: config.baseUrl + '/getDrawName', //
			method: 'GET',
			header: {
				'Content-Type': 'application/json',
			},
			data: {},
			success: function(res) {
				let icon = 'none';
				if (res.data.code == '200' && res.data.success) {
					icon = 'success';
					//有再来一次按钮
					if (!that.data.istryagain) {
						that.setData({
							selects: []
						});
					} else {
						that.setData({
							selects: res.data.data.array
						});
					}
					that.setData({
						drawName: res.data.data.drawName,
						disabled: false,
						buttonName: '开始抽签',
						istryagain: true
				 });

				}else{
					
				}
				
			}
		});

	},
	//开始抽签
	startTouch: function() {
		var that = this;
		that.setData({
			maskShow: true,
			disabled: true
		});
		wx.request({
			url: config.baseUrl + '/lottery',
			method: 'GET',
			header: {
				'Content-Type': 'application/json',
			},
			data: {
				drawName: that.data.drawName
			},
			success: function(res) {
				that.setData({
					maskShow: false,
				});
				let icon = 'none';
				if (res.data.code == '200' && res.data.success) {
					icon = 'success';
					that.setData({
						selects: res.data.data.array,
						drawName: res.data.data.drawName,
						disabled: false
					});

					if (res.data.data.drawName == '') {
						that.setData({
							disabled: true,
							buttonName: '本次抽签结束',
							istryagain: false
						});
					}
				}else{
					
				}
				
			}
		});
	}

})
