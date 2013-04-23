/* Heatmap stats */
var index = 0;
var heatmaps;
var mapdata;

window.onload = function(){
 
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
   var dataSet = window.heatmap.store.exportDataSet();
   save_heatmap(dataSet);
};
