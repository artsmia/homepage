/* Hours Logic */
var museum_hours = {"0":"11AM—5PM", "1":"Closed", "2":"10AM—5PM", "3":"10AM—5PM", "4":"10AM—9PM", "5":"10AM—5PM", "6":"10AM—5PM"};

var set_museum_hours = function callback() {
   date = new Date();
   day = date.getDay();
   
   $("#hours").append('<a href="http://www.artsmia.org/index.php?section_id=29">Today: ' + museum_hours[day] + '</a> \
                 <a href="http://www.artsmia.org/index.php?section_id=29">Tomorrow: ' + museum_hours[day + 1] + '</a> \
                 <a class="clearfix" href="http://www.artsmia.org/index.php?section_id=29">SEE ALL<span></span></a>');
}

/* Calendar Highlights */


var get_calendar_highlights = function callback() {
      $.ajax({
         url: 'http://www.artsmia.org/calendar_feed.php',
         dataType: 'jsonp',
         success: function(event_response) {
            $.each(event_response, function(key, value) {
               $("#telephone").append('<a href="' + value.link +'">' + value.title + '<br />' + value.date + ' ' + value.start + '-' + value.end + '<br />' + value.location + '</a>');
            });
            $("#telephone").append('<a class="clearfix" href="http://www.artsmia.org/index.php?section_id=9">SEE ALL<span></span></a>');
         }
      });
}

/* Heatmap stats */
var index = 0;
var heatmaps;
var mapdata;
var disable_heatmap_for_old_IE = function () { return $('.lt-ie9').size() > 0 };

window.onload = function(){
  if(disable_heatmap_for_old_IE()) return;
 
    // heatmap configuration
    var config = {
        element: document.getElementById("full"),
        radius: 30,
        visible: false,
        opacity: 50
    };
    
    //creates and initializes the heatmap
    window.heatmap = h337.create(config);
 
    var active = true,
        idle = false,
        over = false,
        x = 0,
        y = 0,
        simulate = false;
 
    // activate capture mode
    setInterval(function(){
        active = true;
    }, 80);
 
    // check whether the mouse is idling
    var idlechecker = setInterval(function(){
        if(over && !simulate){
            // if it's idling -> start the simulation 
            // and add the last x/y coords
            simulate = setInterval(function(){
                window.heatmap.store.addDataPoint(x, y, 1);
            }, 1000);
        }
    }, 150);
        
    var add = function(e){
        x = e.layerX;
        y = e.layerY
        window.heatmap.store.addDataPoint(x, y, 1);
    };
 
    var element = document.getElementById("full");
 
    element.onmousemove = function(e){
        over = true;
        if(simulate){
            clearInterval(simulate);
            simulate = false;
        }
 
        if(active){
            add(e);
            active = false;
        }
    };
    element.onclick = function(e){
        add(e);
    };
    element.onmouseout = function(){
        over = false;
    };
};

/*
var config = {
    "radius": 30,
    "element": "full",
    "visible": true,
    "opacity": 40,
    "gradient": { 0.45: "rgb(0,0,255)", 0.55: "rgb(0,255,255)", 0.65: "rgb(0,255,0)", 0.95: "yellow", 1.0: "rgb(255,0,0)" }
};

var heatmap = heatmapFactory.create(config);
*/

var save_heatmap = function callback(dataSet) {
   dataSet.screen_width = $(window).width(); 
   dataSet.screen_height = $(window).height();
   dataSet.browser = $.browser;
   $.ajax({
      type: 'POST',
      async: false,
      url: 'controllers/heatmap_controller.php',
      dataType: 'json',
      data: 'session=' + JSON.stringify(dataSet),
      success: function (response) {
      }
   });
};

var load_heatmap = function callback(filename) {
   $("body canvas").remove();
 
   // heatmap configuration
   var config = {
      element: document.getElementById("full"),
      radius: 30,
      opacity: 50
   };
    
   //creates and initializes the heatmap
   window.heatmap = h337.create(config);
   var active = false;
 
   $.ajax({
      type: 'POST',
      async: false,
      url: 'admin.php',
      dataType: 'json',
      success: function (response) {
         heatmaps = response;
         $.ajax({
            type: 'POST',
            async: false,
            url: 'admin.php',
            dataType: 'json',
            data: 'file=' + heatmaps[index],
            success: function (map_data) {
               mapdata = map_data;
               window.heatmap.store.setDataSet(map_data);
               index++;
            }
         });
      }
   });
    
   // Kill the heatmap after adding data;
   window.heatmap.store.addDataPoint = function() {};
}


window.onbeforeunload = function (e) {
  if(window.heatmap) { // Save the heatmap if it's enabled
    var dataSet = window.heatmap.store.exportDataSet();
    save_heatmap(dataSet);
  }
};

var replace_tel_link_in_IE = function() {
  $('.lt-ie9 a[href^=tel]').attr('href', 'http://www.artsmia.org/index.php?section_id=39')
}
