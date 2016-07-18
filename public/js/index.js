(function() {
  var title = document.getElementById('title');
  title.innerHTML = 'Selection';

  var Model = {
      makeRequest: function(url, method, accept, callback){
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
  };


  var Controller = {
    init: function(callback){
      Model.makeRequest('http://fetd.prod.cps.awseuwest1.itvcloud.zone/platform/itvonline/samsung/categories?broadcaster=ITV', 'GET', 'application/vnd.itv.default.category.v1+hal+json; charset=UTF-8', callback);
    },
    makeRequest: function(url, method, accept, callback){
      Model.makeRequest(url, method, accept, callback);
    }

  };


  var View = {
    init: function (response){
      var length = response._embedded.categories.length;
      for(var i = 0; i < length; i++){
        var subCatObj = response._embedded.categories[i];
        var subCat = subCatObj.name;
        var productionsURL = subCatObj._links.productions.href;
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
              title.innerHTML = 'Selection - ' + this.innerHTML;
              Controller.makeRequest(url, 'GET', 'application/vnd.itv.default.production.v2+hal+json; charset=UTF-8', View.renderSeries);
            };
          })();
        }
      console.log(response);
    },
    renderSeries: function(response, selection){
        console.log('selection ', selection);
        console.log('logSeries ', response);
        var display = document.getElementById('display');
        display.innerHTML = "";

        var length = response._embedded.productions.length;
        for(var i = 0; i < length; i++){
          var production = response._embedded.productions[i];
          var programmeTitle = production.programmeTitle;
          var imageURL = production._links.image.href;
          var allEpisodesURL = production._links.allEpisodes.href;


          var showsTable = document.createElement('table');
          var row = document.createElement('tr');
          var nameTD = document.createElement('td');
          var thumbnailTD = document.createElement('td');
          var thumbnail = document.createElement('img');
          var titleText = document.createTextNode(programmeTitle);
          display.appendChild(showsTable);
          showsTable.appendChild(row);

          row.appendChild(thumbnailTD);
          row.appendChild(titleText);

          thumbnailTD.appendChild(thumbnail);
          thumbnail.src = imageURL;
          thumbnail.width = 200;


          thumbnail.onclick = (function(){
            return function(){
              console.log('this', this.parentNode.parentNode.childNodes[1]);
              title.innerHTML = 'Selection - ';
              title.appendChild(this.parentNode.parentNode.childNodes[1]);
              Controller.makeRequest(allEpisodesURL, 'GET', 'application/vnd.itv.default.production.v2+hal+json; charset=UTF-8', View.renderEpisodes);
            };
          })();
        }
        console.log(response);
      },
      renderEpisodes: function(response){
          console.log('renderEpisodes ', response);
          var display = document.getElementById('display');
          display.innerHTML = "";
          var length = response._embedded.productions.length;
          for(var i = 0; i < length; i++){
            var production = response._embedded.productions[i];
            var episodeTitle = production.episodeTitle;
            var imageURL = production._links.image.href;
            var synopsis = production.synopsis;

            var showsTable = document.createElement('table');
            var row = document.createElement('tr');
            var nameTD = document.createElement('td');
            var thumbnailTD = document.createElement('td');
            var synopsisTD = document.createElement('td');
            var thumbnail = document.createElement('img');
            var titleText = document.createTextNode(episodeTitle);
            var synopsisText = document.createTextNode('  - Description: ' + synopsis);

            display.appendChild(showsTable);
            showsTable.appendChild(row);

            thumbnailTD.appendChild(thumbnail);
            row.appendChild(thumbnailTD);

            nameTD.appendChild(titleText);
            row.appendChild(nameTD);

            synopsisTD.appendChild(synopsisText);
            row.appendChild(synopsisTD);

            thumbnail.src = imageURL;
            thumbnail.width = 200;

          }
      }
  };

  Controller.init(View.init);

})();
