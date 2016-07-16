//Categories

//http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/categories?broadcaster=ITV


//Channels

//http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/channels?broadcaster=ITV


//Most Popular

//http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/productions?grouping=popular&size=15&broadcaster=ITV


//var xmlhttp = new XMLHttpRequest();
//var url = 'http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/categories?broadcaster=ITV';
//var url = 'http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/channels?broadcaster=ITV';
//var url = 'http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/productions?grouping=popular&size=15&broadcaster=ITV';

//makeRequest('http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/categories?broadcaster=ITV', 'GET', renderCat);
makeRequest('http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/categories?broadcaster=ITV', 'GET', 'application/vnd.itv.default.category.v1+hal+json; charset=UTF-8', renderCat);

//makeRequest('http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/channels?broadcaster=ITV', 'GET', render);
//makeRequest('http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/productions?grouping=popular&size=15&broadcaster=ITV', 'GET', render);


function makeRequest(url, method, accept, callback){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open(method, url, true);
  //xmlhttp.setRequestHeader("Accept", "text/html; charset=UTF-8");
  xmlhttp.setRequestHeader("Accept", accept);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          //console.log('responseText ', xmlhttp.responseText);
          var response = xmlhttp.responseText;
          response = JSON.parse(response);
          //console.log('xmlhttp ', xmlhttp);
          callback(response);
      }
  };
}

function renderCat(response){
  var length = response._embedded.categories.length;
  for(var i = 0; i < length; i++){
    var subCatObj = response._embedded.categories[i];
    var subCat = subCatObj.name;
    var productionsURL = subCatObj._links.productions.href;
    /*var productions;
    var episode = productions[0];*/
    var output = document.getElementById('output');
    var categories = document.createElement('ul');
    var name = document.createElement('li');
    var item = document.createTextNode(subCat);
    name.appendChild(item);
    categories.appendChild(name);
    output.appendChild(categories);

    name.onclick = (function(){
      var url = subCatObj._links.productions.href;
      return function(){
        makeRequest(url, 'GET', 'application/vnd.itv.default.production.v2+hal+json; charset=UTF-8', renderSeries);
      };
    })();
  }
  console.log(response);
}


function renderSeries(response){
    console.log('logSeries ', response);
    var length = response._embedded.productions.length;
    for(var i = 0; i < length; i++){
      var production = response._embedded.productions[i];
      var programmeTitle = production.programmeTitle;
      var imageURL = production._links.image.href;
      var allEpisodesURL = production._links.allEpisodes.href;
      var display = document.getElementById('display');
      var shows = document.createElement('ul');
      var item = document.createElement('li');
      var thumbnail = document.createElement('img');
      display.appendChild(shows);
      shows.appendChild(item);
      item.appendChild(thumbnail);
      thumbnail.src = imageURL;
      thumbnail.width = 100;


      thumbnail.onclick = (function(){
        return function(){
          makeRequest(allEpisodesURL, 'GET', 'application/vnd.itv.default.production.v2+hal+json; charset=UTF-8', renderEpisodes);
        };
      })();
    }
    console.log(response);
  }

  function renderEpisodes(response){
      console.log('renderEpisodes ', response);
  }
