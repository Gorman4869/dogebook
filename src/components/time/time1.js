// export function book(id) {
//     return axios.get(`book-sources?view=summary&book=${id}`)
//   }

export function handleDate(dateTimeStamp){
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
let result = '';
let now = new Date().getTime();

let diffValue = now - dateTimeStamp;

if (diffValue < 0) {
  console.log("时间不对劲,服务器创建时间与当前时间不同步");
  return result = "刚刚";}
let dayC = diffValue / day;
let hourC = diffValue / hour;
let minC = diffValue / minute;
if (parseInt(dayC) > 30) {

  result = "33333" ;
  // result = "" + format(dateTimeStamp,"yyyy-MM-dd");
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

// function format(date, format){
//     date = new Date(date)
//   var o = {
//     "M+": date.getMonth() + 1,
//       "d+": date.getDate(),
//       "h+": date.getHours(),
//       "m+": date.getMinutes(),
//       "s+": date.getSeconds(),
//       "q+": Math.floor((date.getMonth() + 3) / 3),
//       "S": date.getMilliseconds()
// };
//   if (/(y+)/.test(format)) {
//     format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
//   }
//   for (var k in o) {
//     if (new RegExp("(" + k + ")").test(format)) {
//         format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
//     }
//   }
//   return format 
//   }
}
// export function
