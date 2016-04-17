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
			else if (content==='10') {
				var picData =yield wechatApi.uploadMaterial('image',__dirname +'/2.jpg',{})
				console.log(picData)
				var media={
					articles:[{
						title:'tupian1',
						thumb_media_id:picData.media_id,
						author:'liudo',
						digest:'没有摘要',
						show_cover_pic:1,
						content:"没有内容",
						content_source_url:"www.baidu.com",
					}]
				}

				var data= yield wechatApi.uploadMaterial('news', media,{})
				//console.log(data)
								console.log(data.media_id)
												console.log(data.media_id)
				var data=yield wechatApi.fetchMaterial(data.media_id,'news',{})

				//console.log(data)
				var items=data.news_item
				var news=[]
				console.log(items)
				items.forEach(function(item){
					news.push({
						title:item.title,
						description:item.digest,
						picUrl:picData.url,
						url:item.url,
					})
				})
				reply=news
			}
			else if (content==='11') {
				var count =yield wechatApi.countMaterial()
				console.log(JSON.stringify(count))
				reply=count
			}
			else if (content==='12') {
				// var group=yield wechatApi.createGroup('wechat2')
				// console.log('新分组 wechat2')
				// console.log(group)

				// var groups =yield wechatApi.fetchGroups()
				// console.log('加了wechat后的分组列表')
				// console.log(groups)

				var group2 = yield wechatApi.checkGroup(message.FromUserName)
				console.log(message.FromUserName)
				console.log('查看自己分组')
				console.log(group2)

				var result =yield wechatApi.moveGroup(message.FromUserName,100)
				console.log('移动到100分组')
				console.log(result)

				var groups2 =yield wechatApi.fetchGroups()
				console.log('移动后分组列表')
				console.log(groups2)

				var result2 =yield wechatApi.moveGroup([message.FromUserName],101)
				console.log('批量移动到101分组')
				console.log(result2)

				var groups3 =yield wechatApi.fetchGroups()
				console.log('批量移动后分组列表')
				console.log(groups3)

				var result3 =yield wechatApi.updateGroup(102,'liudo168')
				console.log('102改名liudo168')
				console.log(result3)

				var groups4 =yield wechatApi.fetchGroups()
				console.log('改名后查看分组列表')
				console.log(groups4)

				var result4 =yield wechatApi.deleteGroup(125)
				console.log('删除125')
				console.log(result4)

				var groups5 =yield wechatApi.fetchGroups()
				console.log('删除后查看分组列表')
				console.log(groups5)

				reply='分组成功'
			}
			else if (content==='13') {
				var user=yield wechatApi.fetchUsers(message.FromUserName,'en')
				console.log(user)
				var openIds=[
					{
						openid:message.FromUserName,
						lang:'en'

					}
				]
				var users=yield wechatApi.fetchUsers(openIds)
				console.log(users)
				reply=JSON.stringify(user)
			}

			else if (content==='14') {
				var userlist=yield wechatApi.listUsers()
				console.log(userlist)
				reply=userlist.total
			}



			this.body=reply
	}
	else if (message.MsgType==='image') {
		this.body='你发的是什么鬼图片啊'
	}

	yield next
}