export const log = function(...args){
    console.log(...args);
}

export function queryString(url) {
    url = url || window.location.href;
    var obj = Object.create(null);
    let tempArr = url.split(/\?/);
    if (tempArr.length <= 1) return obj;
    tempArr[1].split('&').forEach((item) => {
      var tempArr = item.split('=');
      var key = tempArr[0];
      var value = decodeURIComponent(tempArr[1]);
      obj[key] = value;
    })
    return obj
  }
