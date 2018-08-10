//util 公共对象函数
class util{
	//初始化对象
	constructor(){
		this.win=window.top;
		this.UA=navigator.userAgent;
		this.isPC=this.UA.indexOf('Windows NT')>-1;
		this.isAndroid=this.UA.indexOf('Android')>-1;
		this.isIos=this.UA.indexOf('Mac OS X')>-1;
		this.isIphone=this.UA.indexOf('iPhone')>-1;
		this.isIpad=this.UA.indexOf('iPad;')>-1;
		this.isIE7=this.UA.indexOf('MSIE 7.0;')>-1;
		this.isIE8=this.UA.indexOf('MSIE 8.0;')>-1;
		this.isIE9=this.UA.indexOf('MSIE 9.0;')>-1;
		this.isIE10=this.UA.indexOf('MSIE 10.0;')>-1;
		this.isIE11=this.UA.indexOf('Trident')>-1;
		this.IsWeiXin=this.UA.indexOf('MicroMessenger')>-1;
	};

	goBack(){
		window.history.go(-1);
	}

	/*根据参数生成常用的正则表达式
	*string    type 生成的正则表达式类型
	*array     numArr 生成正则的条件数组 例如:[6,16] 也可省略
	*/
	regCombination(type,numArr){
		var reg="";
		switch(type){
			case "*":     //"*":"不能为空！"   
				if(numArr){
					reg=new RegExp("^[\\w\\W]{"+numArr[0]+","+numArr[1]+"}$"); 
				}else {
					reg=new RegExp("^[\\w\\W]+$"); 
				}  
				break;
			case "n":    //"number":"请填写数字！
				if(numArr){
					reg=new RegExp("^\\d{"+numArr[0]+","+numArr[1]+"}$");
				}else{
					reg=new RegExp("^\\d+$");
				}
				break;
			case "s":  //"s":"不能输入特殊字符！"   
				if(numArr){
					reg=new RegExp("^[\\u4E00-\\u9FA5\\uf900-\\ufa2d\\w\\.\\s]{"+numArr[0]+","+numArr[1]+"}$");
				}else{
					reg=new RegExp("^[\\u4E00-\\u9FA5\\uf900-\\ufa2d\\w\\.\\s]+$");
				}
				break; 
			case "c":  //"z":"中文验证" 
				reg=new RegExp("^[\\u4E00-\\u9FA5\\uf900-\\ufa2d]{"+numArr[0]+","+numArr[1]+"}$");
				break;	
			case "p":    //"p":"邮政编码！
				reg=new RegExp("^[0-9]{6}$");
				break;	
			case "m":    //"m":"写手机号码！"
				reg=new RegExp("^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|16[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}|19[0-9]{9}$");
				break;	
			case "e":   //"e":"邮箱地址格式
				reg=new RegExp("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
				break;
			case "id":   //"id":验证身份证
				reg=new RegExp("^\\d{17}[\\dXx]|\\d{14}[\\dXx]$");
				break;
			case "money": //钱
				reg=new RegExp("^[\\d\\.]+$");	
				break;	
			case "url":   //"url":"网址"
				reg=new RegExp("^(\\w+:\\/\\/)?\\w+(\\.\\w+)+.*$");
				break;	
			case "u":    //
				reg=new RegExp("^[A-Z\\d]+$");
				break;
		}
		return reg;
	}

	/*获取 storage 缓存数据
	* type  类型   local：localStorage   session：sessionStorage
	* name  缓存数据name名
	*/
   	getStorage(type,name){
   		var type=type||'local';
   		if(type=='local'){
   			var result = localStorage.getItem(name)? localStorage.getItem(name):"";
   		}else if(type=='session'){
   			var result = sessionStorage.getItem(name)? sessionStorage.getItem(name):"";
   		}
	    return result;
 	}

 	/*设置 storage 缓存数据
 	*type  类型   local：localStorage   session：sessionStorage
 	*name  缓存数据name名
 	*content  缓存的数据内容
 	*/
	setStorage(type,name,content){
		var type=type||'local';
		var data=content;
		if(typeof(data)=='object'){ data=JSON.stringify(content) };
		if(type=='local'){
			localStorage.setItem(name,data);
		}else if(type=='session'){
			sessionStorage.setItem(name,data);
		}
	}

	/*生成随机字符串*/
	randomString(len) {
	　　len = len || 32;
	　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
	　　var maxPos = $chars.length;
	　　var pwd = '';
	　　for (i = 0; i < len; i++) {
	　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	　　}
	　　return pwd;
	}

}

//初始化util对象
module.exports=new util();



