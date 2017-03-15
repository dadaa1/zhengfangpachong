var http = require("http"),
 url = require("url"),
 charset = require('superagent-charset');
 request = require("superagent"),
 cheerio = require("cheerio"),
 fs=require('fs'),
 jiexi=require('./oo.js'),
 superagent = charset(request);
 var url='http://192.168.109.231/default6.aspx';
 var cookie='';
 var one='';
 var xinxi=[];
function init(xue,mima){
superagent.get(url).end(function(err, res){
 cookie=findcookie(res);
 $ = cheerio.load(res.text);
 one=$('input[name="__VIEWSTATE"]').val();
 post(one,cookie,xue,mima);
});
}

function main(cookie,xue,aa){
	var url='http://192.168.109.231/xs_main.aspx';
	var cha='xh='+xue;
	var referer='http://192.168.109.231/default6.aspx';
	get(url,cookie,cha,referer,function(err,res){
		var $=cheerio.load(res.text);
		var a =$('ul.nav').find('li.top').each(function(i,e){
			if(i==5){
				var $=cheerio.load(e);
				$('ul>li').each(function(i,e){
					if(i==2){
						xinxi.push(cheerio.load(e)('a').attr('href'));
						if(typeof aa==='function'){
								aa(cookie,xinxi,xue);
								console.log(xinxi)
							}else{
								throw new error('缺少参数~');
						}
					}
					if(i==3){
						xinxi2.push(cheerio.load(e)('a').attr('href'));
						if(typeof aa==='function'){
								aa(cookie,xinxi2,xue);
								console.log(xinxi2)
							}else{
								throw new error('缺少参数~');
						}
					}					
				})
			}
		})
	});
}
function kebiao(cookie,xinxi,xue){
	var url='http://192.168.109.231/xskbcx.aspx';
	var cha=encodeURI(xinxi.toString().split('?')[1]);//url编码
	var referer='http://192.168.109.231/xs_main.aspx?xh='+xue;
	get(url,cookie,cha,referer,function(err,res){
		jiexi(res.text);
		fs.writeFile('hhh.html',res.text,function(){
			console.log('sy')
		})
	})
}
function findcookie(res){
	cookie1=res.headers['set-cookie'][0].toString();
 	cookie1=cookie1.split(";");
 	cookie=cookie1[0];
 	return cookie;
}
function post(one,cookie,xue,mima){
superagent.post(url).charset('gb2312').redirects(1).set({
'Cookie':cookie,
'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
'Accept-Encoding':'gzip, deflate',
'Accept-Language':'zh-CN,zh;q=0.8',
'Cache-Control':'max-age=0',
'Content-Length':438,
'Content-Type':'application/x-www-form-urlencoded',
'Host':'192.168.109.231',
'Origin':'http://192.168.109.231',
'Proxy-Connection':'keep-alive',
'Referer':'http://192.168.109.231/default6.aspx',
'Upgrade-Insecure-Requests':1,
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
}).send({
'__VIEWSTATE':one,
'tname':'',
'tbtns'	:'',
'tnameXw':'yhdl',
'tbtnsXw':'yhdl%7Cxwxsdl',
'txtYhm':xue,
'txtXm':'',
'txtMm':mima,
'rblJs':'%D1%A7%C9%FA',
'btnDl':'%B5%C7+%C2%BC'
 }).end(function(err,res){
 	console.log('登陆成功~');
 	main(cookie,xue,kebiao);
 })
}
function get(url,cookie,chaxun,referer,aa){
superagent.get(url).query(chaxun).set({
'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
'Accept-Encoding':'gzip, deflate, sdch',
'Accept-Language':'zh-CN,zh;q=0.8',
'Cache-Control':'max-age=0',
'Connection':'keep-alive',
'Cookie':cookie,
'Host':'192.168.109.231',
'Referer':referer,
'Upgrade-Insecure-Requests':'1',
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
}).charset('gb2312').end(function(err,res){
	if(typeof aa==='function'){
		aa(err,res);
	}else{
		throw new error('缺少参数~');
	}
})
 }


//init('201401011111','******');