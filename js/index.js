//Categories

//http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/categories?broadcaster=ITV


//Channels

//http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/channels?broadcaster=ITV


//Most Popular

//http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/productions?grouping=popular&size=15&broadcaster=ITV

var xmlhttp = new XMLHttpRequest();
var url = 'http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/categories?broadcaster=ITV';
//var url = 'http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/channels?broadcaster=ITV';
//var url = '/http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/productions?grouping=popular&size=15&broadcaster=ITV';

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //console.log('responseText ', xmlhttp.responseText);
        var response = xmlhttp.responseText;
        myFunction(response);
    }
};
xmlhttp.open("GET", url, true);

//xmlhttp.setRequestHeader("Accept", "text/html; charset=UTF-8");
xmlhttp.setRequestHeader("Accept", "application/vnd.itv.default.category.v1+hal+json; charset=UTF-8");
//xmlhttp.setRequestHeader("Accept", "text/html; application/vnd.itv.default.category.v1+hal+json;");
//xmlhttp.setRequestHeader("Accept", "text/html; charset=UTF-8");
//xmlhttp.setRequestHeader("Accept", "text/html; charset=UTF-8, application/vnd.itv.default.category.v1+hal+json; charset=UTF-8");
//xmlhttp.setRequestHeader("Accept", "text/html; charset=UTF-8, application/vnd.itv.default.category.v1+hal+json; charset=UTF-8");

xmlhttp.send();

function myFunction(response) {
   response = JSON.parse(response);
    var filter = response._embedded.categories[0].name;
    document.getElementById("output").innerHTML = filter;
}
