'use strict'


var config=require('./config')
var Wechat=require('./wechat/wechat')

var wechatApi= new Wechat(config.wechat)


exports.reply=function*(next){
	var message=this.weixin

	if (message.MsgType ==='event') {
		if (message.Event==='subscribe') {
			if (message.EventKey) {
				console.log('扫描二维码进来：'+message.EventKey+''+message.ticket)
			}
			this.body='哈哈，你订阅了这个号\r\n'
		}
		else if (message.Event==='unsubscribe') {
			console.log('取消关注')
			this.body=''
		}
		else if (message.Event==='LOCATION') {
			this.body='您上报的位置是：'+message.Latitude+'/'+message.Longitude+
			'-' + message.Precision
		}
		else if (message.Event==='CLICK') {
			this.body='您点击了菜单：'+message.EventKey
		}
		else if (message.Event==='SCAN') {
			console.log('关注后扫二维码'+message.EventKey+''+message.Ticket)
			this.body='看到你扫了一下哦'
		}
		else if (message.Event==='VIEW') {
			this.body='您点击了菜单中的链接：'+message.EventKey
		}
	}
	else if (message.MsgType ==='text') {
			var content =message.Content
			var reply='饿，你说的'+message.Content+'太复杂了'

			if (content==='1') {
				reply='罗西尼rossini'
			}
			else if (content==='2') {
				reply='罗西尼rossini2222'
			}
			else if (content==='3') {
				reply='罗西尼rossini33333'
			}
			else if (content==='4') {
				reply=[
				{
					title:"技术改变世界",
					description:'知识个描述而已',
					picUrl:'https://img.yzcdn.cn/public_files/2016/01/04/a2db428a1c3e1adce186a69541b8eabc.png',
					url:'www.baidu.com'
				},{
					title:"nodejs开发",
					description:'知识个描述而已222',
					picUrl:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
					url:'www.baidu.com'
				}
				]
			}
			else if (content==='5') {
				var data =yield wechatApi.uploadMaterial('image',__dirname +'/2.jpg')
				reply={
					type:'image',
					mediaId:data.media_id
				}
			}
			else if (content==='6') {
				var data =yield wechatApi.uploadMaterial('image',__dirname +'/2.jpg',{type:'image'})
				reply={
					type:'image',
					mediaId:data.media_id
				}
			}

			this.body=reply
	}
	else if (message.MsgType==='image') {
		this.body='你发的是什么鬼图片啊'
	}

	yield next
}