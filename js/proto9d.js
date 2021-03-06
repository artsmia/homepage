var socialArray = new Array();

socialArray[0] = "http://www.facebook.com/artsmia";
socialArray[1] = "http://www.flickr.com/photos/minneapolisinstituteofarts/";
socialArray[2] = "http://www.twitter.com/artsmia";
socialArray[3] = "http://www.vimeo.com/artsmia";
socialArray[4] = "http://www.youtube.com/user/artsmia";
socialArray[5] = "http://pinterest.com/search/boards/?q=minneapolis%20institute%20of%20arts";
socialArray[6] = "http://instagram.com/artsmia#";

$(document).ready(function() {

	$('.socialbox').each(function(){
		var c = $(this).attr('class').split(' ')[1];
		switch(c){
			case "facebook":
				$(this).data('loc', 0);
				break;
			case "flickr":
				$(this).data('loc', 1);
				break;
			case "twitter":
				$(this).data('loc', 2);
				break;
			case "vimeo":
				$(this).data('loc', 3);
				break;
			case "youtube":
				$(this).data('loc', 4);
				break;
			case "pinterest":
				$(this).data('loc', 5);
				break;
			case "instagram":
				$(this).data('loc', 6);
				break;
			default:
				break;
		}
	})
	
	$('.socialbox').click(function(){
		var whatNum = $(this).data('loc');
		var whatLoc = socialArray[whatNum];
	  	window.location = whatLoc;
	});
	
	$('.gm').click(function(){
	  	window.location = "http://generalmills.com";
	});
	
	$(".orbit-wrapper > .orbit-caption").live("click", function(){ 
		var whatLoc = $(this).children('.caption-wrap').data('link');
	  	window.location = whatLoc;
	  	return false;
	});
	
	//@media only screen and (max-width: 760px) {
	
	function doneResizing() {
        if(Modernizr.mq('screen and (max-width: 760px)')) {
            $('.top-bar .has-dropdown').fadeIn('fast');
        }
        else{
            $('.top-bar .has-dropdown').fadeOut('fast');
        }
    }

    var id;
    $(window).resize(function() {
        clearTimeout(id);
        id = setTimeout(doneResizing, 0);
    });
    
    $('.top-bar .has-dropdown').fadeOut('fast');

    doneResizing();
	 
});