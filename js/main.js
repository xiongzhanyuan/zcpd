// ios  Android  固定的
/*这段代码是固定的，必须要放到js中*/
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
Date.prototype.Format = function(formatStr)
{
    var str = formatStr;
    var Week = ['日','一','二','三','四','五','六'];
    var month=this.getMonth()+1;
    str=str.replace(/yyyy|YYYY/,this.getFullYear());
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));
    str=str.replace(/MM/,month>9?month.toString():'0' + month);
    str=str.replace(/M/g,month);
    str=str.replace(/w|W/g,Week[this.getDay()]);
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str=str.replace(/d|D/g,this.getDate());
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str=str.replace(/h|H/g,this.getHours());
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str=str.replace(/m/g,this.getMinutes());
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str=str.replace(/s|S/g,this.getSeconds());
    return str;
}
//结束
//判断 登陆
function loginJ(data){
    if( !$.cookie('userinfo')){
        if(data==1){
            self.location="login.html";
        }else{
            self.location="../login.html";
        }
    }
}


$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
String.prototype.replaceAll  = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
}
function getURL(){
    if($.cookie('postUrl')==''||$.cookie('postUrl')==undefined){
        sessionStorage.setItem('postUrl','http://lhsm.weiapp.pw:3575/AssetsDataPhone');
        $.cookie('postUrl', "http://lhsm.weiapp.pw:3575/AssetsDataPhone", { expires: 7, path: '/', secure: false });
        var postUrl='http://lhsm.weiapp.pw:3575/AssetsDataPhone'
    }else {
        //postUrl=sessionStorage.getItem('postUrl');
        var postUrl=$.cookie('postUrl');
    }
    return postUrl;
}
function sendPostUpload(reqUrl, jsonObj, callbackFun) {
    if (window.JsCallback) {
        window.JsCallback.onShowProgress();
        $.ajax({
            async : false,
            url : reqUrl,
            type : "POST",
            data : jsonObj,
            dataType : "json",
            cache : false,
        beforeSend: function(){
        },
            error : function(request) {
                if (window.JsCallback) {
                    window.JsCallback.onHideProgress()
                }else{
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('onHideProgress')
                    })
                }
                alert("网络错误");
            },
            success : function(data) {
                var reqJson = JSON.parse(jsonObj.data)[0];
                if(reqJson.barCode) {
                    data.barCode = reqJson.barCode;
                }
                callbackFun(data);
                if (window.JsCallback) {
                    window.JsCallback.onHideProgress()
                }else{
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('onHideProgress')
                    })
                }
            },
            complete :function(XMLHttpRequest,status){
                if(status=='timeout'){//超时,status还有success,error等值的情况
                    　　　　　  alert("请求超时");
                    　　　　}
                if (window.JsCallback) {
                    window.JsCallback.onHideProgress()
                }else{
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('onHideProgress')
                    })
                }
            }
        });
    }else{
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('onShowProgress','',function(){
                $.ajax({
                    async : true,
                    url : reqUrl,
                    type : "POST",
                    data : jsonObj,
                    dataType : "json",
                    timeout : 0,
                    cache : false,
                beforeSend: function(){
                },
                    error : function(request) {
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                        alert("网络错误");
                    },
                    success : function(data) {
                        var reqJson = JSON.parse(jsonObj.data)[0];                        
                        if(reqJson.barCode) {
                            data.barCode = reqJson.barCode;
                        }
                        callbackFun(data);
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                    },
                    complete :function(XMLHttpRequest,status){
                        if(status=='timeout'){//超时,status还有success,error等值的情况
                            　　　　　  alert("请求超时");
                            　　　　}
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                    }
                });
            })
        })
    }
    
}
function sendPost(reqUrl, jsonObj, callbackFun) {
    if (window.JsCallback) {
        window.JsCallback.onShowProgress();
        $.ajax({
            async : false,
            url : reqUrl,
            type : "POST",
            data : jsonObj,
            dataType : "json",
            cache : false,
        beforeSend: function(){
        },
            error : function(request) {
                if (window.JsCallback) {
                    window.JsCallback.onHideProgress()
                }else{
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('onHideProgress')
                    })
                }
                alert("网络错误");
            },
            success : function(data) {
                callbackFun(data);
                if (window.JsCallback) {
                    window.JsCallback.onHideProgress()
                }else{
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('onHideProgress')
                    })
                }
            },
            complete :function(XMLHttpRequest,status){
                if(status=='timeout'){//超时,status还有success,error等值的情况
                    　　　　　  alert("请求超时");
                    　　　　}
                if (window.JsCallback) {
                    window.JsCallback.onHideProgress()
                }else{
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('onHideProgress')
                    })
                }
            }
        });
    }else{
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('onShowProgress','',function(){
                $.ajax({
                    async : true,
                    url : reqUrl,
                    type : "POST",
                    data : jsonObj,
                    dataType : "json",
                    timeout : 0,
                    cache : false,
                beforeSend: function(){
                },
                    error : function(request) {
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                        alert("网络错误");
                    },
                    success : function(data) {
                        callbackFun(data);
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                    },
                    complete :function(XMLHttpRequest,status){
                        if(status=='timeout'){//超时,status还有success,error等值的情况
                            　　　　　  alert("请求超时");
                            　　　　}
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                    }
                });
            })
        })
    }
    
}

function sendPostAsync(reqUrl, jsonObj, callbackFun) {
    if (window.JsCallback) {
        window.JsCallback.onShowProgress();
        $.ajax({
            async : true,
            url : reqUrl,
            type : "POST",
            data : jsonObj,
            dataType : "json",
            cache : false,
        beforeSend: function(){
        },
            error : function(request) {
                if (window.JsCallback) {
                    window.JsCallback.onHideProgress()
                }else{
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('onHideProgress')
                    })
                }
                alert("网络错误");
            },
            success : function(data) {
                callbackFun(data);
                if (window.JsCallback) {
                    window.JsCallback.onHideProgress()
                }else{
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('onHideProgress')
                    })
                }
            },
            complete :function(XMLHttpRequest,status){
                if(status=='timeout'){//超时,status还有success,error等值的情况
                    　　　　　  alert("请求超时");
                    　　　　}
                if (window.JsCallback) {
                    window.JsCallback.onHideProgress()
                }else{
                    setupWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler('onHideProgress')
                    })
                }
            }
        });
    }else{
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('onShowProgress','',function(){
                $.ajax({
                    async : true,
                    url : reqUrl,
                    type : "POST",
                    data : jsonObj,
                    dataType : "json",
                    timeout : 0,
                    cache : false,
                beforeSend: function(){
                },
                    error : function(request) {
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                        alert("网络错误");
                    },
                    success : function(data) {
                        callbackFun(data);
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                    },
                    complete :function(XMLHttpRequest,status){
                        if(status=='timeout'){//超时,status还有success,error等值的情况
                            　　　　　  alert("请求超时");
                            　　　　}
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                    }
                });
            })
        })
    }
    
}

function sendPostBf(reqUrl, jsonObj, callbackFun) {
    if (window.JsCallback) {
        window.JsCallback.onShowProgress();
        $.ajax({
            async : false,
            url : reqUrl,
            type : "POST",
            data : jsonObj,
            dataType : "json",
            cache : false,
        beforeSend: function(){
        },
            error : function(request) {
                // if (window.JsCallback) {
                //     // window.JsCallback.onHideProgress()
                // }else{
                //     setupWebViewJavascriptBridge(function (bridge) {
                //         bridge.callHandler('onHideProgress')
                //     })
                // }
                alert("网络错误");
            },
            success : function(data) {
                callbackFun(data);
            },
            complete :function(XMLHttpRequest,status){
                if(status=='timeout'){//超时,status还有success,error等值的情况
                    　　　　　  alert("请求超时");
                    　　　　}
                // if (window.JsCallback) {
                //     window.JsCallback.onHideProgress()
                // }else{
                //     setupWebViewJavascriptBridge(function (bridge) {
                //         bridge.callHandler('onHideProgress')
                //     })
                // }
            }
        });
    }else{
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('onShowProgress','',function(){
                $.ajax({
                    async : true,
                    url : reqUrl,
                    type : "POST",
                    data : jsonObj,
                    dataType : "json",
                    timeout : 0,
                    cache : false,
                beforeSend: function(){
                },
                    error : function(request) {
                        // if (window.JsCallback) {
                        //     window.JsCallback.onHideProgress()
                        // }else{
                        //     setupWebViewJavascriptBridge(function (bridge) {
                        //         bridge.callHandler('onHideProgress')
                        //     })
                        // }
                        alert("网络错误");
                    },
                    success : function(data) {
                        callbackFun(data);
                    },
                    complete :function(XMLHttpRequest,status){
                        if(status=='timeout'){//超时,status还有success,error等值的情况
                            　　　　　  alert("请求超时");
                            　　　　}
                        // if (window.JsCallback) {
                        //     window.JsCallback.onHideProgress()
                        // }else{
                        //     setupWebViewJavascriptBridge(function (bridge) {
                        //         bridge.callHandler('onHideProgress')
                        //     })
                        // }
                    }
                });
            })
        })
    }
    
}

function sendPost2(reqUrl, jsonObj, callbackFun) {
    if (window.JsCallback) {
    }else{
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('onShowProgress','',function(){
                $.ajax({
                    async : true,
                    url : reqUrl,
                    type : "POST",
                    data : jsonObj,
                    dataType : "json",
                    timeout : 0,
                    cache : false,
                beforeSend: function(){
                },
                    error : function(request) {
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                        alert("网络错误");
                    },
                    success : function(data) {
                        callbackFun(data);
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                    },
                    complete :function(XMLHttpRequest,status){
                        if(status=='timeout'){//超时,status还有success,error等值的情况
                            　　　　　  alert("请求超时");
                            　　　　}
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                    }
                });
            })
        })
    }
    
}
function sendPost3(reqUrl, jsonObj, callbackFun) {
    if (window.JsCallback) {
    }else{
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('onShowProgress','',function(){
                $.ajax({
                    async : true,
                    url : reqUrl,
                    type : "POST",
                    data : jsonObj,
                    dataType : "json",
                    timeout : 0,
                    cache : false,
                beforeSend: function(){
                },
                    error : function(request) {
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                        alert("网络错误");
                    },
                    success : function(data) {
                        callbackFun(data);
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                    },
                    complete :function(XMLHttpRequest,status){
                        if(status=='timeout'){//超时,status还有success,error等值的情况
                            　　　　　  alert("请求超时");
                            　　　　}
                        if (window.JsCallback) {
                            window.JsCallback.onHideProgress()
                        }else{
                            setupWebViewJavascriptBridge(function (bridge) {
                                bridge.callHandler('onHideProgress')
                            })
                        }
                    }
                });
            })
        })
    }
    
}
function sendGet(reqUrl, jsonObj, callbackFun) {
    $.ajax({
        url : reqUrl,
        type : "GET",
        data : jsonObj,
        dataType : "json",
        cache : false,
        async : false,
        error : function(request) {
        },
        success : function(data) {
            if (callbackFun) {
                callbackFun(data);
            }
        },
        complete :function(XMLHttpRequest,status){
            if(status=='timeout'){//超时,status还有success,error等值的情况
                　　　　　  alert("请求超时");
                　　　　}
        }
    });
}


//图片上传缩略图
$("input[type='file']").on("change", function(){
    var that = $(this)
    if ($(this).val() != '') {
        // Get a reference to the fileList
        var files = !!this.files ? this.files : [];
        
        // If no files were selected, or no FileReader support, return
        if (!files.length || !window.FileReader) return;
        
        // Only proceed if the selected file is an image
        if (/^image/.test( files[0].type)){
            
            // Create a new instance of the FileReader
            var reader = new FileReader();
            
            // Read the local file as a DataURL
            reader.readAsDataURL(files[0]);
            
            // When loaded, set image data as background of div
            reader.onloadend = function(){
                res_img_base64 = this.result;
                that.siblings(".fileImg").css("backgroundImage", "url("+res_img_base64+")");
                
            }
            
        }
    }else{
        $(this).siblings(".fileImg").css("background-image", "");
    }
});//关于 input  属性type=file 很多地方可以更深的学习一下
//tab切换
$(".nav-tabs li").click(function(){
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    var hid=$(this).attr("hid");
    $(this).closest(".nav-tabs").next(".tab-content").find(".tab-pane").removeClass("active");
    $('#'+hid).addClass("active");
})


$(".closebtn").click(function(){
    $(this).closest('.bomb').removeClass("active")
})

function closeClick(){
    $(".bomb").removeClass("active");
}
//清空表单reset
// jQuery.fn.extend( {
// reset:function(){
//     this.find("input").val("");
//     this.find("select").val("请选择");
//     this.find("textarea").val("");
// },
    
// })
//数组去重
Array.prototype.unique = function(key) {
    var arr = this;
    var n = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (key === undefined) {
            if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
        } else {
        inner: {
            var has = false;
            for (var j = 0; j < n.length; j++) {
                if (arr[i][key] == n[j][key]) {
                    has = true;
                    break inner;
                }
            }
        }
            if (!has) {
                n.push(arr[i]);
            }
        }
    }
    return n;
}
// 过滤包含
function callBH(arr1,arr2){
    var res=[];
    $.each(arr1,function(){
        
        var that=this;
        var ress = arr2.filter(function(val){return val.planNumber==that[0]});
        console.log(ress)
        res.push(ress);
    })
    return  res;
}

// cookie
function setCookie(cname,cvalue,exdays)
{
    var date = new Date();
    date.setDate(date.getDate()+exdays);//getDate返回一个月中的某一天
    var expires = "expires="+date.toUTCString();//根据世界时 (UTC) 把 Date 对象转换为字符串
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
// 获取
function getCookie(name)
{
    if (document.cookie.length>0)
    {
        start=document.cookie.indexOf(name + "=")//返回某指定值在字符串中首次出现的位置。
        if (start!=-1)
        {
            start = start + name.length+1;
            end=document.cookie.indexOf(";",start)//返回';'在字符串中首次出现的位置。
            if (end ==-1)
                end = document.cookie.length;
            unescape(document.cookie.substring(start,end));
        }
    }
    return ""
}

//
function judgmentUrl(data,src){
    if(data==null||!data||data=="null"){
        self.location=src;
    }else{
        
    }
}
//弹窗
function pd_confirm(dom){
    
    dom.show();
    $("#sure").click(function(){
        dom.hide()
        return true;
    })
    $("#cancle").click(function(){
        dom.hide()
        return false
    })
}
// 是因为刚登陆就退出 cookie失效，这是个应急办法。后期可以把所有的cookie重新新改一个存取方式
$.cookie('userinfo', localStorage.getItem("userinfo"), { expires: 30, path: '/', secure: false });
$.cookie('departList', localStorage.getItem("departList"), { expires: 30, path: '/', secure: false });










