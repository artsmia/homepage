function fwslider(){
    var glob = {
        cs : 0,
        pause: 6000,
        duration: 750
    }
    
    this.init = function(params){
        
        if (params.duration) {
            glob.duration = parseInt(params.duration,10);
        }
        
        if (params.pause) {
            glob.pause = parseInt(params.pause,10);
        }
        
        /* Init */
        content.init();
        display.bindControls();
        controls.bindControls();
    }
    
    var display = {
        /* Resize function */
        resize: function(){
            $("#fwslider").css({height: $("#fwslider .slide").height()});
            controls.position();
        },
        
        /* Bind resize listener */
        bindControls: function(){
            $(window).resize(function(){
                display.resize()
            });
        }
    }
    
    var controls = {
        /* Adjust buttons position */
        position: function(){
            $("#fwslider .slidePrev, #fwslider .slideNext").css({
                top: $("#fwslider").height() / 2 - $("#fwslider .slideNext").height() / 2
            });
            
            $("#fwslider .slidePrev").css({left:0});
            $("#fwslider .slideNext").css({right:0});
        },
        
        /* Bind button controls */
        bindControls : function(){
            
            /* Hover effect */
            $("#fwslider .slidePrev, #fwslider .slideNext").on("mouseover", function(){
                $(this).animate({
                    opacity:1
                },{
                    queue:false, 
                    duration:1000,
                    easing:"easeOutCubic"
                });
            });
            
            /* Hover effect - mouseout */
            $("#fwslider .slidePrev, #fwslider .slideNext").on("mouseout", function(){
                $(this).animate({
                    opacity:0.5
                },{
                    queue:false, 
                    duration:1000,
                    easing:"easeOutCubic"
                });
            });
            
            /* Next Button */
            $("#fwslider .slideNext").on("click", function(){
                if ($("#fwslider .slide").is(":animated")) return; 
                
                if ($("#fwslider .slide:eq("+(glob.cs+1)+")").length <= 0) {
                    glob.cs = 0;
                    
                    $("#fwslider .timers .timer .progress").stop();
                    
                    $("#fwslider .timers .timer:last .progress").animate({
                        width:"100%"
                    },{
                        queue:false,
                        duration:glob.duration,
                        easing:"easeOutCubic",
                        complete: function(){
                            $("#fwslider .timers .timer .progress").css({
                                width:"0%"
                            });
                        }
                    });
                } else {
                    glob.cs++;
                    
                    $("#fwslider .timers .timer .progress").stop();
                    $("#fwslider .timers .timer:lt("+glob.cs+") .progress").animate({
                        width:"100%"
                    },{
                        queue:false,
                        duration:glob.duration,
                        easing:"easeOutCubic"
                    });
                    
                }
                content.show();
            });
            
            /* Previous Button */
            $("#fwslider .slidePrev").on("click", function(){
                if ($("#fwslider .slide").is(":animated")) return; 
                
                if (glob.cs <= 0) {
                    glob.cs = $("#fwslider .slide").index();
                    
                    $("#fwslider .timers .timer .progress").stop();
                    $("#fwslider .timers .timer .progress").css({
                        width:"100%"
                    });
                     $("#fwslider .timers .timer:last .progress").animate({
                        width:"0%"
                    },{
                        queue:false,
                        duration:glob.duration,
                        easing:"easeOutCubic"
                    });
                    
                } else {
                    glob.cs--;
                    
                    $("#fwslider .timers .timer .progress").stop();
                    $("#fwslider .timers .timer:gt("+glob.cs+") .progress").css({
                        width:"0%"
                    });
                    $("#fwslider .timers .timer:eq("+glob.cs+") .progress").animate({
                        width:"0%"
                    },{
                        queue:false,
                        duration:glob.duration,
                        easing:"easeOutCubic"
                    });
                }
                content.show();
            });
        }
    }
    
    var content = {
        init: function(){
            /* First run content adjustment */
            
            for (var i = 0; i < $("#fwslider .slide").length; i++){
                $('<div class="timer"><div class="progress"></div></div>').appendTo("#fwslider .timers");
            }
            
            $("#fwslider .timers").css({
                width: ($("#fwslider .timers .timer").length + 1) * 45
            });
            
            $("#fwslider .slide:eq("+glob.cs+")").fadeIn({
                duration:500, 
                easing: "swing"
            });
            
            $("#fwslider").animate({
                height: $("#fwslider .slide:first img").height()
            },{
                queue:false,
                duration:500, 
                easing: "easeInOutExpo", 
                complete: function(){
                    $("#fwslider .slidePrev").animate({
                        left:0
                    },{
                        queue:false,
                        duration:1000, 
                        easing:"easeOutCubic"
                    });
                    
                    $("#fwslider .slideNext").animate({
                        right:0
                    },{
                        queue:false,
                        duration:1000, 
                        easing:"easeOutCubic"
                    });
                    
                    content.showText();
                    controls.position();
                    display.resize();
                    auto.run();
                    auto.focus();
                }
            });
        },
        
        show: function(){
            /* Show slide */
            
            content.hideText();
            
            $("#fwslider .slide:eq("+glob.cs+")").css({
                opacity:0,
                zIndex:2
            }).show().animate({
                opacity:1
            },{
                queue:false,
                duration: glob.duration, 
                easing: "swing", 
                complete: function(){
                    $("#fwslider .slide:lt("+glob.cs+"), #fwslider .slide:gt("+glob.cs+")").css({
                        zIndex:0
                    }).hide();
                   
                    $("#fwslider .slide:eq("+glob.cs+")").css({
                        zIndex:1
                    });
                    content.showText();
                    auto.run();
                }
            });
        },
        
        showText: function(){
            /* Show slide text */
            
             $("#fwslider .slide:eq("+glob.cs+") .title").animate({
                opacity:1
            },{
                queue:false,
                duration:300,
                easing:"swing"
            });
            
            setTimeout(function(){
                $("#fwslider .slide:eq("+glob.cs+") .description").animate({
                    opacity:1
                },{
                    queue:false,
                    duration:300,
                    easing:"swing"
                });
            },150)
            
            setTimeout(function(){
                $("#fwslider .slide:eq("+glob.cs+") .readmore").animate({
                    opacity:1
                },{
                    queue:false,
                    duration:300,
                    easing:"swing"
                });
            },300)
            
            
        },
        hideText: function(){
            /* Hide slide text */
            
            $("#fwslider .slide .title").animate({
                opacity:0
            },{
                queue:false,
                duration:300,
                easing:"swing"
            });
            
            setTimeout(function(){
                $("#fwslider .slide .description").animate({
                    opacity:0
                },{
                    queue:false,
                    duration:300,
                    easing:"swing"
                });
            },150)
            
            setTimeout(function(){
                $("#fwslider .slide .readmore").animate({
                    opacity:0
                },{
                    queue:false,
                    duration:300,
                    easing:"swing"
                });
            },300)
            
            
        }
    }
    
    var auto = {
        /* Run timer */
        run: function(){
            $("#fwslider .timer:eq("+glob.cs+") .progress").animate({
                width:"100%" 
            },{
                queue:false,
                duration: (glob.pause - (glob.pause/100)*((($("#fwslider .timer:eq("+glob.cs+") .progress").width() / $("#fwslider .timer:eq("+glob.cs+")").width()) * 100))), 
                easing:"linear", 
                complete: function(){
                    $("#fwslider .slideNext").trigger("click");
                }
            });
        },
        
        /* Stop on focus */
        focus: function(){
            $("#fwslider .slide_content").on("mouseover", function(){
                if ($("#fwslider .slide").is(":animated")) return;
                $("#fwslider .timer .progress").stop();
            });
            
            $("#fwslider .slide_content").on("mouseleave", function(){
                if ($("#fwslider .slide").is(":animated")) return;
                auto.run();
            });
        }
    }
}