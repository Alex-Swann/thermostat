$(document).ready(function(){
  var thermo = new Thermostat();
    updateTemp();

  $('#increase').click(function(){
    thermo.increase();
    updateTemp();
  });
  $('#decrease').click(function(){
    thermo.decrease();
    updateTemp();
  });
  $('#reset').click(function(){
    thermo.reset();
    updateTemp();
  });
  $('#powerSave').click(function(){
    thermo.powerSave();
    $('#powersaving').text(thermo.powerSaveStatus());
  });



  $('#current-city').change(function() {
    var city = $('#current-city').val();
    var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var key = '&appid=f5ceec348230deb171e07ab0c5a85862&units=metric';
    $.get(api + city + key, function(data) {
    $('#current-temperature').text(data.main.temp);
    });
  });

  var apiKey = "f5ceec348230deb171e07ab0c5a85862";
  var units = "metric";

  function updateTemp(){
    $('#temperature').text(thermo.temp());
    $('#temperature').attr('class', thermo.energyUsage());

    var latLon;
    $.getJSON("http://ipinfo.io", function(ipinfo){
      console.log("Found location ["+ipinfo.loc+"] by ipinfo.io");
      latLon = ipinfo.loc.split(",");
      var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + latLon[0] + "&lon=" + latLon[1] + "&units=" + units + "&appid=" + apiKey;
      $.getJSON(apiUrl, function(weatherData){
        var curTemp = Math.round(weatherData["main"]["temp"]);
        var curLoc = weatherData["name"];
        var desc = weatherData["weather"][0]["main"];
        var wIcon = "http://openweathermap.org/img/w/" + weatherData["weather"][0]["icon"] + ".png";
        $("#curLocation").text(curLoc);
        $("#current").children(".data").text(curTemp + "°");
        $("#icon").attr("src",wIcon);

        var cTemp = curTemp;
        if(units === "imperial"){ cTemp= 5/9 * (curTemp - 32); }
        var cTempPercent = ((cTemp+50)/100)*200;
        var cMargin = -cTempPercent+20;
        if(cTemp>-50){
          if(cTemp>=50){
            $('.temperature').height(200);
            $('.temperature').css({'margin-top':'-180px'});
          }
          $('.temperature').height(cTempPercent);
          $('.temperature').css({'margin-top': cMargin + 'px'});
        }
        else{
          $('.temperature').height(0);
        }
      });
    });
  }

  $("#deg-f").click(function(){
    $(this).addClass("selected");
    $("#deg-c").removeClass("selected");
    units = "imperial";
    updateWeather();
  });
  $("#deg-c").click(function(){
    $(this).addClass("selected");
    $("#deg-f").removeClass("selected");
    units = "metric";
    updateWeather();
  });


});
