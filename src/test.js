let s = `http://novel.kele8.cn/picture/http%3A%2F%2Fvip.zhuishushenqi.com%2Fchapter%2F56f8da09176d03ac1983f6d7%3Fcv%3D1486473051386`
let g = `http://novel.kele8.cn/chapters/http%3A%2F%2Fvip.zhuishushenqi.com%2Fchapter%2F56f8da09176d03ac1983f6d7%3Fcv%3D1486473051386`

// let q = s.replace(/%2F/g,'/').replace(/%3A/g,':').replace(/\/agent\//,'')
let q = s.replace(/%2F/g,'/').replace(/%3A/g,':').replace(/\/agent\//,'')
let k = g.replace(/%2F/g,'/').replace(/%3A/g,':').replace(/\/agent\//,'')
// console.log(q)
// https://novel.kele8.cn/chapters/
http://vip.zhuishushenqi.com/chapter/56f8da09176d03ac1983f6d7/cv/1486473051386


console.log(k)
let d = new Date()
// console.log(d)

// console.log(new Date()-new Date('2017-01-25T02:44:47.217Z').valueOf())
// var diff = new Date('2021-11-23T01:20:12.630Z').valueOf()
var diff = new Date().valueOf()
// var minute = 1000 * 60;
// var hour = minute * 60;
// var day = hour * 24;
// console.log(Date.parse('2017-01-25T02:44:47.217Z'))

var a = handleDate(diff)
// console.log(a)
// console.log(diff)
// console.log(d.getMonth()+1)


// toDetail(id){
//   // console.log(id)
//       this.$router.push({name:'detail',query:{
//     bookid:id,
//   }})
// }

// let h = null;
// console.log(!h)









// 计算时间差
function handleDate(dateTimeStamp){
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
  var result = '';
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    console.log("时间不对劲,服务器创建时间与当前时间不同步");
    return result = "刚刚";}
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (parseInt(dayC) > 30) {
    result = "" + format(dateTimeStamp,"yyyy-MM-dd");
  }else if(parseInt(dayC) > 1) {
    result = "" + parseInt(dayC) + "天前";
  }else if (parseInt(dayC) == 1) {
    result = "昨天";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 5) {
    result = "" + parseInt(minC) + "分钟前";
  } else
    result = "刚刚";
  return result;

  function format(date, format){
      date = new Date(date)
    var o = {
      "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format 
  }
}

// console.log(diff)
// console.log(diff-1637630412630)

// function format(date, format){
// //    if (typeof date == 'string') {
// //         if(date.indexOf('T')>=0){
// //           date = date.replace('T',' ')
// //         }
// //         date = new Date(Date.parse(date.replace(/-/g, "/")))
// //       }
//         date = new Date(date)
//       var o = {
//          "M+": date.getMonth() + 1,
//           "d+": date.getDate(),
//           "h+": date.getHours(),
//           "m+": date.getMinutes(),
//           "s+": date.getSeconds(),
//           "q+": Math.floor((date.getMonth() + 3) / 3),
//           "S": date.getMilliseconds()
//      };
//     //   var w = [
//     //       ['日', '一', '二', '三', '四', '五', '六'],
//     //       ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
//     //    ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
//     //  ];
//    if (/(y+)/.test(format)) {
//        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
//    }
//   //  if (/(w+)/.test(format)) {
//   //      format = format.replace(RegExp.$1, w[RegExp.$1.length - 1][date.getDay()]);
//   //  }
//    for (var k in o) {
//        if (new RegExp("(" + k + ")").test(format)) {
//            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
//        }
//    }
//    return format 
// }



// RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串，
// var r= /^(\d{4})-(\d{1,2})-(\d{1,2})$/; //正则表达式 匹配出生日期(简单匹配)     
// r.exec('1985-10-15');
// s1=RegExp.$1;
// s2=RegExp.$2;
// s3=RegExp.$3;
// alert(s1+" "+s2+" "+s3)//结果为1985 10 15