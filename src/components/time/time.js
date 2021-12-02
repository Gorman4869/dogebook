// export function book(id) {
//     return axios.get(`book-sources?view=summary&book=${id}`)
//   }

export function handleDate(dateTimeStamp){
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
}

// export function
