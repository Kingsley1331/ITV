var res;
function Request(url, method, accept, cb){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open(method, url, true);
  xmlhttp.setRequestHeader("Accept", accept);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var response = xmlhttp.responseText;
          response = JSON.parse(response);
          res = response;
          cb();
      }
  };
}

function firstRequest(cb){
 Request('http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/categories?broadcaster=ITV', 'GET', 'application/vnd.itv.default.category.v1+hal+json; charset=UTF-8', cb);
}
