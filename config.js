'use strict'

var path=require('path')
var util=require('./libs/util')
var wechat_file=path.join(__dirname,'./config/wechat.txt')
var config={
	wechat:{
		appID:'wxc9a05f165da29c74',
		appSecret:'f66c3d3ebaf8e49e5aeed8128d4a708d',
		token:'liudo',
		getAccessToken:function(){
			return util.readFileAsync(wechat_file)
		},
		saveAccessToken:function(data){
			data=JSON.stringify(data)
			return util.writeFileAsync(wechat_file,data)
		}
	}
}

module.exports=config